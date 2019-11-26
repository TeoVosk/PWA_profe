<?php

namespace database{

    require_once "config.inc.php";

    use \PDO;
    use \render;

    function query_builder($table = NULL, $mode = "s", $cols = "*", $insert_cols = NULL, $conditions = NULL, $limit = NULL, $offset = NULL){

        $query;

        if($mode === "s")
            $query = "SELECT $cols FROM $table";
        else if($mode === "i" && $insert_cols){
            $query = "INSERT INTO $table (";
            $values = " VALUES (";
            foreach ($insert_cols as $key => $value) {
                $query .= $key . ",";
                if(is_string($value))
                    $values .= "'$value',";
                else
                    $values .= $value . ",";
            }
            $query[strlen($query)-1] = ')';
            $values[strlen($values)-1] = ')';
            $query .= $values;
        }

        if($conditions)
            $query .= " WHERE " . implode(" AND ", $conditions);

        if($limit){
            $query .= " LIMIT " . $limit;
            if($offset)
                $query .= " OFFSET " . $offset;
        }

        $query .= ";";

        return $query;

    }

    function query_exec($db, $query, $select = 1){

        // echo $query . "<br>";


        $cnx = create_connection($db);
        $statement = $cnx->prepare($query);
        $exec = $statement->execute();
        $cnx = NULL;
        
        if($select){
            $res = $statement->fetchall(PDO::FETCH_ASSOC);
            $cnx = create_connection($db);
            $contador = explode("LIMIT", $query)[0];
            if($contador){
                $statement = $cnx->prepare($contador);
                $statement->execute();
                $long = $statement->rowCount();
            }
            else   
                $long = 0;
                
            return array($res, $long);
            
        }

        return $exec;
        
    }

    function create_connection($db){
        return new PDO("mysql:host=".HOST.";dbname=" . $db . ";port=" . PORT, USER, PASS);
    }

    function check_connection($db){
        try{
            $cnx = new PDO("mysql:host=".HOST.";dbname=" . $db . ";port=" . PORT, USER, PASS);
            // $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e){
            return false;
        }
        return true;
    }

    function get_elements(){
        $elements = "";
        $list_item = render\load_file("templates/list-item.html");
        $query = 
        "SELECT 
            elem_id as '{{INDEX}}',
            c.nombre,
            elem_nombre as '{{NOMBRE}}',
            elem_cantidad as '{{CANTIDAD}}',
            elem_precio as '{{PRECIO}}'
        FROM elementos
        INNER JOIN carro as c ON carro_id = c.id;";
        $ret = query_exec("compras", $query)[0];
        foreach ($ret as $key => $value){
            $elements += render\render_file($list_item, $value);
        }
    }

}