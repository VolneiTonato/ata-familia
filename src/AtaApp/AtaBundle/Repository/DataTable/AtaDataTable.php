<?php

namespace AtaApp\AtaBundle\Repository\DataTable;

use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManager;

class AtaDataTable {
    
    private $request;
    private $em;
    
    public function __construct(Request $request, EntityManager $em) {
        $this->request = $request;
        $this->em = $em;
    }
    
    
    public function getAtas()
    {
        $dataTable = new \VTT\UtilsBundle\Libraries\DataTable($this->request);       
        $atas = $this->em->getRepository('AtaAppAtaBundle:Ata')->ataPaginacao($dataTable);
        
        $data = array();
        /*
        foreach($atas as $ata){
            $barras = array();
            if(count($produto->getCodigoBarras()) > 0){
                foreach($produto->getCodigoBarras() as $barra){
                    $barras[] = $barra->getCodigo();
                }
            }  
            $data[] = array(
                'DT_RowId' => $produto->getId(),
                'DT_RowData' => array('pkey' => $produto->getId()),
                'descricao' => $produto->getDescricao(),
                'codigo_barra' => implode(',', $barras)
            );
        }*/
        
        $data[] = array(
                'DT_RowId' => 1,
                'DT_RowData' => array('pkey' => 1),
                'descricao' => 'volnei',
        );
        
        return $dataTable->setData($data)->getOutPutJson();
    }
    
}
