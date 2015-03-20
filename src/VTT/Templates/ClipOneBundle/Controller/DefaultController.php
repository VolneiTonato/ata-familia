<?php

namespace VTT\Templates\ClipOneBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('VTTTemplatesClipOneBundle:Default:index.html.twig', array('name' => $name));
    }
}
