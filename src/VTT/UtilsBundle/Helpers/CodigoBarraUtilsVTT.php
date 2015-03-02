<?php

namespace VTT\UtilsBundle\Helpers;

/**
 * @link http://gs1ec.org/contenido/index.php?option=com_content&view=article&id=43:calcular-digito-verificador&Itemid=51
 * @link http://www.morovia.com/education/utility/upc-ean.asp
 */

class CodigoBarraUtilsVTT {
    
    
    public static function validar($codigo)
    {
        $factor = 3;
        $sum = 0;
	$codigoAux = 0;
        
        $codigo = NumberUtilsVTT::numeral($codigo);

        $tamanho = strlen($codigo);
        
        $tamanhosValidos = array(8,12,13,14);
        
        if(in_array($tamanho, $tamanhosValidos))
                $codigoAux = substr($codigo, 0,$tamanho - 1);
	   
        if($codigoAux == 0) return false;
        
        $tamanhoAux = strlen($codigoAux);
        
        for($i = $tamanhoAux; $i > 0; --$i){
            $sum += substr($codigoAux, $i - 1, 1) * $factor;
            $factor = 4 - $factor;
        }
        
        $digito = ((1000 - $sum) % 10);
		
        $codigoVerificador = (string)  $codigoAux . $digito;

        if((string) $codigoVerificador == (string) $codigo)
            return true;
        else
            return false;
    }
}
