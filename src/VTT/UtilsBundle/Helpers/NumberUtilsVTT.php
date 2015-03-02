<?php

namespace VTT\UtilsBundle\Helpers;

class NumberUtilsVTT {
    
    public static function percent($valor, $percentual)
    {
        return $valor * ($percentual / 100);
    }
    
    public static function numeral($valor)
    {
        return preg_replace('/\D/', '', $valor);
    }
    
    public static function currencyPTBr($numero, $decimal = 2)
    {        
        $numero = str_replace('.', ' ', $numero);
        $numero = str_replace(',' , '.', $numero);

        if(substr_count($numero, '.' )== 0){
                $numero = str_replace(' ', '.', $numero);
        }
   
        return number_format($numero, $decimal);
    }

}
