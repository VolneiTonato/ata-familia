<?php

namespace AtaApp\AtaBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Method,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\DependencyInjection\Container;

use AtaApp\AtaBundle\FormPesquisa;
use VTT\UtilsBundle\Libraries\ResponseController\ResponseVTT;
use AtaApp\AtaBundle\Form\AtaType;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/")
 */
class DefaultController extends BaseController
{
    
    public function __init(Container $container) {
        parent::__init($container);
        
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
        $this->_libBreadCrumb->addItem('Demo js');
        $this->_libRenderView->setBreadCrumb($this->_libBreadCrumb);

        return $this->_libRenderView->toRender();
    }
    
    /**
     * @Route("/form")
     * @Template("AtaAppAtaBundle:Default:ajax/form-ata.html.twig")
     */
    public function obterForm()
    {
        $id = $this->request()->get('id');
        
        $ata = null;
        file_put_contents('log.txt', $id);
        if($id){
            $ata = $this->repository('AtaAppAtaBundle:Ata')->find($id);
        }
        
        $form = $this->createForm(new AtaType(), $ata);
        
        return array('form' => $form->createView(), 'ata' => $ata);
    }
    
    
    /**
     * @Route("/save", name="ata_save")
     * @Method({"POST"})
     */
    public function saveAction()
    {
        try{
            
            $id = $this->request()->get('form_ata')['id'];
            
            if($id)
                $ata = $this->repository ('AtaAppAtaBundle:Ata')->find ($id);
            else
                $ata = new \AtaApp\AtaBundle\Entity\Ata();

            $form = $this->createForm(new AtaType(), $ata);

            if($this->request()->isMethod('POST')){
                $form->submit($this->request());

                $errosList = $this->get('validator')->validate($ata);
                if(!count($errosList) > 0){
                    $this->repository('AtaAppAtaBundle:Ata')->save($ata);
                    return ResponseVTT::json('Ata registrada com sucesso', ResponseVTT::SUCCESS);
                }else{
                    throw new \Exception(ResponseVTT::errorValidatorSymfony($errosList));
                }
            }
        }  catch (\Exception $e){
            return ResponseVTT::json($e->getMessage(), ResponseVTT::ERROR, false);
        }
    }
    
    /**
     * @Route("/remove")
     * @Method({"POST"})
     */
    public function removeAction()
    {
        try{
            $id = $this->request()->get('id');
            
            $ata = $this->repository('AtaAppAtaBundle:Ata')->find($id);
            
            if(!$ata)
                throw new Exception ('Ata inválida!');
            
            $this->em()->remove($ata);
            $this->em()->flush();
            
            return ResponseVTT::json('Ata removida com sucesso!');
        }  catch (\Exception $e){
            return ResponseVTT::json($e->getMessage(), ResponseVTT::ERROR, false);
        }
    }
    
    /**
     * @Route("/list", name="ata_list")
     * @Method({"POST"})
     */
    public function listarAtasAction()
    {
        $dataTableAta = new \AtaApp\AtaBundle\Repository\DataTable\AtaDataTable($this->request(), $this->em());
        return new Response($dataTableAta->getAtas());
    }
    
    /**
     * @Route("/pesquisar-municipio", name="ata_pesquisar_municipio")
     * @Method({"POST"})
     * @Template("AtaAppAtaBundle:Default:ajax/autocomplete-municipio.html.twig")
     */
    public function pesquisarMunicipioAction()
    {
        
        $txtPesq = $this->request()->get('nome');

        $municipios = $this->repository('AtaAppAtaBundle:Municipio')->setToArray(true)->pesquisar(
           (new FormPesquisa\MunicipioPesq())->setNome($txtPesq)
        );
        
        return array('municipios' => $municipios);
        
    }
    
    /**
     * @Route("/view")
     * @Method({"POST"})
     * @Template("AtaAppAtaBundle:Default:ajax/view.html.twig")
     */
    public function view()
    {
        try{
            
            $id = $this->request()->get('id');
            
            $ata = $this->repository('AtaAppAtaBundle:Ata')->find($id);
            
            if(!$ata)
                throw new \Exception('Ata inválida!');
            
           return array('ata' => $ata);
            
        }  catch (\Exception $e){
            return array('erro' => $e->getMessage());
        }
    }

}
