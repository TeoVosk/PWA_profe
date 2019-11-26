<?php

require_once "fn/render.inc.php";
require_once "fn/database.inc.php";

$dic = array();

// $elems = database\get_elements();
// error_reporting(0);

// if($_SERVER['REQUEST_METHOD'] === "POST"){

// }

echo render\render("index.html", $dic);