<?php

namespace AtaApp\AtaBundle\Controller;

use EventApp\OverrideBundle\Event\Controller\InitializableBaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\Container;

class BaseController extends InitializableBaseController {  
    
    use \TemplateVTT\UtilsBundle\Libraries\traitControllerTemplateVTT;   

    public function __init(Container $container, Request $request) {    
        $this->_libRenderView = $container->get('vtt.render_view_janux');
        $this->_libBreadCrumb = $container->get('vtt.breads_crumb');
    }

}

