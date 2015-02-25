<?php

namespace VTT\BaseControllerBundle\Listener;

use Symfony\Component\HttpKernel\Event\FilterControllerEvent;

class BaseControllerVTTListener {
    
    private $container;
    
    public function __construct(\Symfony\Component\DependencyInjection\Container $container) {
        $this->container = $container;
    }
    
    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();

        if (!is_array($controller)) {
            // not a object but a different kind of callable. Do nothing
            return;
        }

        $controllerObject = $controller[0];
        if ($controllerObject instanceof \VTT\BaseControllerBundle\Controller\BaseControllerVTTInterface) {
            $controllerObject->__init($this->container, $event->getRequest());
        }
    }
}
