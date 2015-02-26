<?php

namespace AtaApp\AtaBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Method,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\DependencyInjection\Container,
    Symfony\Component\HttpFoundation\Request,
    Symfony\Component\HttpFoundation\JsonResponse;

use AtaApp\AtaBundle\Form\AtaType;

/**
 * @Route("/")
 */
class DefaultController extends BaseController
{
    
    public function __init(Container $container, Request $request) {
        parent::__init($container, $request);
        
        $this->_libRenderView->setPageTitle('demo js');
        $this->_libBreadCrumb->addItem('Inicio', $this->generateUrl('ata_familia'));
    }

    /**
     * @Route("/", name="ata_familia")
     * @Template("AtaAppAtaBundle:Default:index.html.twig")
     */
    public function indexAction()
    {        
        $this->_libRenderView->setBreadCrumb($this->_libBreadCrumb);
        
        $atas = $this->repository('AtaAppAtaBundle:Ata')->findAll();
        
        return $this->_libRenderView->toRenderMerge(array(
           'atas' => $atas
        ));
        
    }
    
    /**
     * @Template("AtaAppAtaBundle:Default:form.html.twig")
     * @Route("/add", name="ata_add")
     */
    public function cadastroAction()
    {
        $this->_libBreadCrumb->addItem('Festa Família Gaieschki');
        $this->_libRenderView->setBreadCrumb($this->_libBreadCrumb);
        
        $form = $this->createForm(new AtaType());
        
        return $this->_libRenderView->toRenderMerge(array(
            'form' => $form->createView()
        ));
    }
    
    /**
     * @Route("/teste", name="ata_teste")
     * @Method({"POST"})
     */
    public function teste()
    {
        return new JsonResponse(array('ok' => true, 'mensagem' => 'blza'));
    }

}
