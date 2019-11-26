console.log('Lista de Supermercado en AWP v0.0.3')

let productos = [];
let src;

function config_buttons(){

    $('#boton-agregar').click(()=> {
        //console.log('boton-agregar')
        let producto = document.querySelector('#entrada-producto').value
        console.log(producto)
        if(producto != '') {
            productos.unshift({
                nombre : producto,
                cantidad : 1,
                precioUnitario : 0
            })
            renderProductos()
            document.querySelector('#entrada-producto').value = ''
        }
    })

    $('#boton-borrar-todo').click(()=> {
        console.log('boton-borrar-todo')
        productos = []    
        renderProductos()
    })

}

let borrar = index => {
    productos.splice(index,1)
    renderProductos()
}

let actualizarCantidad = (index, e) => {
    let cantidad = parseInt(e.value)
    console.log('cantidad',index,cantidad)
    productos[index].cantidad = cantidad
    guardarListaProductos();
}

let actualizarPrecio = (index, e) => {
    let precio = Number(e.value)
    console.log('precio',index,precio)
    productos[index].precioUnitario = precio;
    guardarListaProductos();
}


function guardarListaProductos() {
    let productosStr = JSON.stringify(productos)
    localStorage.setItem('lista',productosStr)
}

function leerListaProductos() {
    if(localStorage.getItem('lista'))
        productos = JSON.parse(localStorage.getItem('lista'))
}

function renderProductos(ini) {
    if(ini)
        leerListaProductos();

    productos;

    // let src = $("#lista-template").html()
    let template = Handlebars.compile(src);
    let data = { productos };
    $("div#lista").html(template(data));
    

    if(!ini) {
        const ul = $("#contenedor-lista");
        componentHandler.upgradeElements(ul)
        guardarListaProductos()
    }
    
}

function get_from_mockapi(cb){
    const url = "https://5ddc6a8d041ac10014de1e4c.mockapi.io/test01/pwa_clase";
    let response;

    fetch(url)
    .then(res => res.json())
    .then(res => {
        response = res;
        cb(response)
    })
    .catch(err => console.error(err));

    

}


if ('serviceWorker' in navigator) {
    $(window).ready(() => {
        navigator.serviceWorker.register('./sw.js').then(function(reg) {
            console.log('Successfully registered service worker', reg);
        }).catch(function(err) {
            console.warn('Error whilst registering service worker', err);
        });
    })
}

function start(){
    config_buttons();
    renderProductos(1);         
    let res = get_from_mockapi(
        response => {
            fetch("../templates/lista.hbs")
            .then(res => res.text())
            .then(res => {
                src = res;
                console.log(response.slice());
                response.forEach(element => {
                    productos.push(element);
                    renderProductos();            
                });
            })
            .catch(err => console.error(err));
        }
    );
    
}

$(document).ready(start());


/*

function init_list(){
    let ul = document.createElement('ul')
    ul.classList.add('demo-list-item')
    ul.classList.add('mdl-list')
    return ul;
}

function renderProductos(ini) {
    let ul = document.querySelector("ul");
    if(ini){
        ul = init_list();
        leerListaProductos();
    }

    
    ul.innerHTML = '';
    productos.forEach((producto, index) => {
        ul.innerHTML += 
        `
            <li class="mdl-list__item" >
                <!-- NOMBRE -->
                <span class="w-25 mdl-list__item-primary-content">
                    ${producto.nombre}
                </span>

                <!-- Simple Textfield : CANTIDAD -->
                <div class="w-25 ml-items mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="text" id="cantidad${index}" onchange="actualizarCantidad(${index},this)">
                    <label class="mdl-textfield__label" for="cantidad${index}">${producto.cantidad}</label>
                </div>

                <!-- Simple Textfield : PRECIO -->
                <div class="w-25 ml-items mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="text" id="precio${index}" onchange="actualizarPrecio(${index},this)">
                    <label class="mdl-textfield__label" for="precio${index}">${producto.precioUnitario}</label>
                </div>

                <!-- Accent-colored raised button with ripple : BORRAR -->
                <button class="w-25 ml-items mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="borrar(${index})">
                    <i class="material-icons">clear</i>
                </button>                        
            </li >
        `
    })
    let lista = document.querySelector('#lista')
    lista.appendChild(ul)
    

    if(!ini) {
        componentHandler.upgradeElements(ul)
        guardarListaProductos()
    }
    
}
*/