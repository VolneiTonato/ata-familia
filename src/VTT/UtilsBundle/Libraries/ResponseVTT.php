<?php

namespace VTT\UtilsBundle\Libraries;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ResponseVTT {
    const ALERT = "warnig";
    const ERROR = "danger";
    const SUCCESS = "success";
    const INFO = "info";
    
    public static function json($mensagem, $tipo, $statusResponse = true, $extras = array())
    {
        $dadosMsg = array(
            'mensagemVTT' => $mensagem,
            'tipoVTT' => $tipo,
            'statusResponseVTT' => $statusResponse,
        );
        if(count($extras) > 0){
            $dadosMsg = array_merge($dadosMsg, $extras);
        }
        return new JsonResponse($dadosMsg);
    }
    
    public static function errorValidatorSymfony($listErros = array())
    {
        $msg = "";
        foreach($listErros as $erro){
            if($erro instanceof \Symfony\Component\Validator\ConstraintViolation){
                $msg.= $erro->getMessage() . '<br />';
            }
        }
        return $msg;
    }
}
