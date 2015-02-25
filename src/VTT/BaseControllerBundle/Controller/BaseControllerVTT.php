<?php

namespace VTT\BaseControllerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\Container;

class BaseControllerVTT extends Controller implements BaseControllerVTTInterface {

    private $request;
    
    public function __init(Container $container, Request $request) {
        $this->request = $request;
    }
    
    /**
     * 
     * @return  \Symfony\Component\HttpFoundation\Request
     */
    public function request()
    {
        return $this->request;
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

}
