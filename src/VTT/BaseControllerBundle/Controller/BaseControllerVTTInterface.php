<?php


namespace VTT\BaseControllerBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\Container;

interface BaseControllerVTTInterface
{
    public function __init(Container $container, Request $request);
}
