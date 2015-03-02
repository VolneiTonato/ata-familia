<?php

namespace AtaApp\AtaBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Method,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\DependencyInjection\Container,
    Symfony\Component\HttpFoundation\Request,
    Symfony\Component\HttpFoundation\JsonResponse,
   Symfony\Component\HttpFoundation\Response;

use AtaApp\AtaBundle\FormPesquisa;
use VTT\UtilsBundle\Libraries\ResponseController\ResponseVTT;
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
        
        $atas = $this->repository('AtaAppAtaBundle:Ata')->findAll();
        
        dump($atas);
        
        
        
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
        $ata = new \AtaApp\AtaBundle\Entity\Ata();
        $form = $this->createForm(new AtaType(), $ata);
        
        if($request->isMethod('POST')){
            $form->submit($request);
            
            
            $errosList = $this->get('validator')->validate($ata);
        
            if(!count($errosList) > 0){
                $this->repository('AtaAppAtaBundle:Ata')->save($ata);
                
                return ResponseVTT::json('Ata registrada com sucesso', ResponseVTT::SUCCESS);
                
            }else{
                return ResponseVTT::json(ResponseVTT::errorValidatorSymfony($errosList), ResponseVTT::ERROR, false);
            }
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
    
    /**
     * @Route("/pesquisar-municipio", name="ata_pesquisar_municipio")
     * @Method({"POST"})
     * @Template("AtaAppAtaBundle:Default:ajax/autocomplete-municipio.html.twig")
     */
    public function pesquisarMunicipioAction(Request $request)
    {
        
        $txtPesq = $request->get('nome');

        $municipios = $this->repository('AtaAppAtaBundle:Municipio')->setToArray(true)->pesquisar(
           (new FormPesquisa\MunicipioPesq())->setNome($txtPesq)
        );
        
        return array('municipios' => $municipios);
        
    }

}
