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
        
        //$data = array();
        
        foreach($atas as $ata){
            
            $telefones = array();
            if(count($ata->getTelefones()) > 0){
                foreach($ata->getTelefones() as $telefone){
                    $telefones[] = $telefone->getNumero();
                }
            } 
            
            $emails = array();
            if(count($ata->getEmails()) > 0){
                foreach($ata->getEmails() as $email){
                    $emails[] = $email->getEmail();
                }
            } 
             
             
            $data[] = array(
                'DT_RowId' => $ata->getId(),
                'DT_RowData' => array('pkey' => $ata->getId()),
                'descricao' => $ata->getNome(),
                'telefones' => implode(',', $telefones),
                'emails' => implode(',', $emails),
                'municipio' => $ata->getMunicipio()->getNome(),
                'estado' => $ata->getMunicipio()->getSigla()
            );
        }
        
        return $dataTable->setData($data)->getOutPutJson();
    }
    
}
