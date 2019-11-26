<?php

namespace render{

    $root = $_SERVER['DOCUMENT_ROOT'];

    require_once "fn/database.inc.php";

    function display_page($POST){

        // print_r($POST);

        $main;
        $url;
        $css = NULL;
        $script = NULL;

        $sub_dic = select_script($POST);

        if($POST){
            $folder = "apps/" . $POST['app'] . "/";
            $url = $folder . $POST['app'] . ".html";
            $css = $folder . $POST['app'] . ".css";
            $script = $folder . $POST['app'] . ".js";
        }
        else
            $url = "apps/main/main.html";

        // echo "Calling: " . $url;

        $main = load_file($url);

        $dic = array(
            "{{HEAD}}"=> header(),
            "{{FOOT}}" => footer(),
            "{{MAIN}}" => $main,
            "{{SIDEBAR}}" => sidebar(),
            "{{ERROR}}" => ""
        );

        $dic = array_merge($dic, $sub_dic);
        
        if($css)
            $dic["{{STYLE}}"] = $css;
        if($script)
            $dic["{{SCRIPT}}"] = $script;
        if(!database\check_connection("vulnerable"))
            $dic["{{ERROR}}"] = "<span id=\"no-connection\" style=\"display: none\">.</span>";

        // print_r($dic);

        return render("index.html", $dic);

    }

    function load_file($url){
        return file_get_contents($url);
    }

    function render_file($file, $dic){
        foreach ($dic as $key => $value)
            $file = str_replace($key, $value, $file);
        return $file;
    }

    function render($url, $dic){
        return render_file(load_file($url), $dic);
    }

    function header(){
        return file_get_contents("templates/header.html");
    }

    function footer(){
        return file_get_contents("templates/footer.html");
    }

    function sidebar(){
        return file_get_contents("templates/sidebar.html");
    }

    // function select_script($POST){

    //     if(!isset($POST['app']))
    //         return array();

    //     $dic;
    //     $app = strtolower($POST['app']);
    //     switch ($app) {
    //         case 'vulnerabledb':
    //             $dic = vulnerabledb\vulnerabledb($POST);
    //             break;

    //         case 'red_social':
    //             $dic = red_social\red_social($POST);
    //             break;
            
    //         default:
    //             $dic = array();
    //             break;
    //     }

    //     return $dic;

    // }

}
