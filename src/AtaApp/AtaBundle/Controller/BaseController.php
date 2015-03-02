<?php

namespace AtaApp\AtaBundle\Controller;

use VTT\BaseControllerBundle\Controller\BaseControllerVTT;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\Container;

class BaseController extends BaseControllerVTT {  
    
    use \VTT\Templates\traitVariaveisControllerTemplateVTT;  

    public function __init(Container $container, Request $request) {    
        $this->_libRenderView = $container->get('vtt.render_view_janux');
        $this->_libBreadCrumb = $container->get('vtt.breads_crumb');
    }

}

