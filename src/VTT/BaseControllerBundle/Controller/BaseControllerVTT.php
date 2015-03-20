<?php

namespace VTT\BaseControllerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\Container;

class BaseControllerVTT extends Controller implements BaseControllerVTTInterface {


    
    public function __init(Container $container) {

    }
    
    /**
     * 
     * @return  \Symfony\Component\HttpFoundation\Request
     */
    public function request()
    {
        return $this->get('request');
    }
    
    /**
     * 
     * @return \Doctrine\ORM\EntityManager
     */
    public function em()
    {
        return $this->getDoctrine()->getManager();
    }
    
    /**
     * 
     * @param string EntityName
     * @return \Doctrine\ORM\Repository
     */
    public function repository($repository)
    {
        return $this->getDoctrine()->getRepository($repository);
    }
    
    public function validarPermissao(Array $permissoes, $lResponseAjax = FALSE)
    {
        $lTemPermissao = FALSE;
        foreach($permissoes as $permissao){
            if($this->get('security.context')->isGranted($permissao)){
                $lTemPermissao = TRUE;
            }
        }
        
        if($lTemPermissao == FALSE){
            if($lResponseAjax)
                throw new \Exception('Sem permissão');
            throw new \Symfony\Component\Security\Core\Exception\AccessDeniedException();
        }
    }

}
