<?php

namespace EventApp\OverrideBundle\Event\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use EventApp\OverrideBundle\Event\Controller\InitializableControllerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\Container;

class InitializableBaseController extends Controller implements InitializableControllerInterface {

    private $request;
    
    public function __init(Container $container, Request $request) {
        $this->request = $request;
    }
    
    public function request()
    {
        return $this->request;
    }
    
    public function em()
    {
        return $this->getDoctrine()->getManager();
    }
    
    public function repository($repository)
    {
        return $this->getDoctrine()->getRepository($repository);
    }

//put your code here
}
