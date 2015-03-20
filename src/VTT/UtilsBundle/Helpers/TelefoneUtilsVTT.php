<?php

namespace VTT\UtilsBundle\Helpers;


class TelefoneUtilsVTT {

    
    public static function format($string)
    {

        $n = NumberUtilsVTT::numeral($string);
        
        $tamanho = strlen($n);
        
        if($tamanho != 11 && $tamanho != 10)
            return null;

        $ddd = substr($n, 0,2); 
        
        if($tamanho == 11){
            $numeroAux = sprintf('(%d) %d-%d', $ddd, substr($n, 2,5), substr($n, 7, 4));
        }else{
            $numeroAux = sprintf('(%d) %d-%d', $ddd, substr($n, 2,4), substr($n, 6, 4));
        }
        return $numeroAux;
    }
    
}
