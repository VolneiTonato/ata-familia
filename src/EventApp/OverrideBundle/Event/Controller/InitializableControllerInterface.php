<?php


namespace EventApp\OverrideBundle\Event\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\Container;

interface InitializableControllerInterface
{
    public function __init(Container $container, Request $request);
}
