<?php

namespace VTT\UtilsBundle\Helpers;


class StringUtilsVTT {
    
    public static function toUpperCase($str)
    {
        if(function_exists('mb_convert_case'))
            return mb_convert_case($str, MB_CASE_UPPER);
        
        return strtoupper($str);
    }
    
    public static function toLowerCase($str)
    {
        if(function_exists('mb_convert_case'))
            return mb_convert_case($str, MB_CASE_LOWER);
        
        return strtolower($str);
    }
    
    public static function toCWordsCase($str)
    {
        if(function_exists('mb_convert_case'))
            return mb_convert_case($str, MB_CASE_TITLE);
        
        return ucwords($str);
        
    }
            
    
}
