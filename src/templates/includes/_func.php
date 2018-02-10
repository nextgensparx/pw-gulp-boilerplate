<?php

function getResource($type, $name) {
    if ($type == "css") {
        $file = "css/$name.css";
        if(is_file(wire("config")->paths->templates . $file)) {
            return "<link rel='stylesheet' type='text/css' href='".wire("config")->urls->templates.$file."' />";
        }
    } else if ($type == "js") {
        $file = "js/$name.js";
        if(is_file(wire("config")->paths->templates . $file)) {
            return "<script src='".wire("config")->urls->templates.$file."'></script>";
        }
    } else {
        return null;
    }
}

function getResources($type, $names) {
    $str = "";
    foreach ($names as $name) {
        $str .= getResource($type, $name);
    }
    return $str;
}