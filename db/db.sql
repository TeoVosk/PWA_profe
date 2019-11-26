DROP DATABASE IF EXISTS compras;
CREATE DATABASE compras;
USE compras;

DROP TABLE IF EXISTS carro;
CREATE TABLE carro(
	id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    n_elementos INT(11) NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS elementos;
CREATE TABLE elementos(
	elem_id INT(11) NOT NULL AUTO_INCREMENT,
    carro_id INT(11) NOT NULL,
    elem_nombre VARCHAR(11) NOT NULL,
    elem_cantidad INT(11) NOT NULL,
    elem_precio INT(11) NOT NULL,
    PRIMARY KEY(elem_id)
);

INSERT INTO carro (nombre, n_elementos) VALUES ("carro-01", 4);
INSERT INTO elementos (carro_id, elem_nombre, elem_cantidad, elem_precio) VALUES
(1, 2,2,0),
(1, "b",2,1),
(1, "b",2,2),
(1, "b",2,3);

SELECT * from elementos;
SELECT * from carro;

SELECT 
	elem_id as '{{INDEX}}',
	c.nombre,
    elem_nombre as '{{NOMBRE}}',
    elem_cantidad as '{{CANTIDAD}}',
    elem_precio as '{{PRECIO}}'
FROM elementos
INNER JOIN carro as c ON carro_id = c.id;
