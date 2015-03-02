<?php

namespace VTT\UtilsBundle\Helpers;

class DataUtilsVTT {
    const tpPtbr = 'PT-BR';
    const tpUS = 'US';
    
    /**
     * 
     * @param type $data
     * @param type $timesTamp
     * @param type $tp
     * @return string
     */
    public static function formatDate($data, $timesTamp = false, $tp = self::tpPtbr)
    {
        
        if(empty($data))
            return null;
        
        $dtAux = substr($data, 0,10);
        $time = null;
        
        if($timesTamp == true)
            $time = substr($data, 10, 19);
        
        if(substr_count($dtAux, '/') > 0 && $tp == self::tpUS ){
            list($dia, $mes, $ano) = explode('/', $dtAux);
            $dtAux = sprintf('%s-%s-%s', $ano, $mes, $dia);
        }elseif (substr_count($dtAux, '-') > 0 && $tp == self::tpPtbr) {
            list($ano, $mes, $dia) = explode('-', $dtAux);
            $dtAux = sprintf('%s/%s/%s', $dia, $mes, $ano);
        }
        
        return $dtAux . $time;
    }
    
    /**
     * @var \DateTime
     * @param integer $mes
     * @return \DateTime
     */
    public static function firstDay($mes, $ano = 'now')
    {
        return new \DateTime(date('Ymd', mktime(0,0,0,$mes, 1 ,$ano == 'now' ? date('Y') : $ano)));
    }
    
    public static function endDay($mes, $ano = 'now')
    {
        return new \DateTime(date('Ymd', mktime(0,0,0,$mes, date('t', mktime(0,0,0,$mes,0,0)) , $ano == 'now' ? date('Y') : $ano)));
    }
    
    public static function getDateTime($dia = 'now', $mes = 'now', $ano = 'now')
    {
        return new \DateTime(date('Ymd', mktime(0,0,0,$mes == 'now' ? date('m') : $mes, $dia == 'now' ? date('d') : $dia ,$ano == 'now' ? date('Y') : $ano)));
    }
    
}
