<?php

namespace AtaApp\AtaBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Method,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\DependencyInjection\Container,
    Symfony\Component\HttpFoundation\Request,
    Symfony\Component\HttpFoundation\JsonResponse,
   Symfony\Component\HttpFoundation\Response;

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
     * @Route("/save", name="ata_save")
     * @Method({"POST"})
     */
    public function saveAction(Request $request)
    {
        var_dump($request->request->all());
        exit();
        $ata = new \AtaApp\AtaBundle\Entity\Ata();
        $form = $this->createForm(new AtaType(), $ata);
        
        if($request->isMethod('POST')){
            $form->submit($request);
            
            var_dump($ata);
            exit();
            
        }
    }
   
    
    /**
     * @Route("/list", name="ata_list")
     * @Method({"POST", "GET"})
     */
    public function listarAtasAction(Request $request)
    {
        $dataTableAta = new \AtaApp\AtaBundle\Repository\DataTable\AtaDataTable($request, $this->em());
        return new Response($dataTableAta->getAtas());
    }
    
    
    /**
     * @Route("/teste")
     * @Method({"GET", "POST"})
     */
    public function testeAction(Request $request)
    {
        $request->setMethod('GET');
        $dados = array(
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'columns' => array( array('name' => 'descricao')),
            'search' => array('value' => 'a'),
            'order' => array('column' => 1, 'dir' => 'asc')
        );
        $request->request->replace($dados);
        $response = $this->forward('AtaAppAtaBundle:Default:listarAtas', array());
        
        var_dump($response->getContent());
        exit();
        
        
    }

}
