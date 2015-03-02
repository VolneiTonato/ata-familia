<?php
namespace AtaApp\AtaBundle\Repository;

use Doctrine\ORM\EntityRepository;
use AtaApp\AtaBundle\FormPesquisa\MunicipioPesq;

class MunicipioRepository extends EntityRepository {
    
    private $toArray = false;
    
    public function setToArray($vData = false)
    {
        $this->toArray = (bool) $vData;
        
        return $this;
    }

    public function pesquisar(MunicipioPesq $o)
    {
        $dq = $this->createQueryBuilder('Municipio');
        
        if(!is_null($o->getNome())){
            $dq->where($dq->expr()->like('Municipio.nome', ':nome'))
               ->setParameter('nome', '%' . $o->getNome() . '%');
        }
        
        if(!is_null($o->getSigla())){
            $dq->andWhere($dq->expr()->like('Municipio.sigla', ':sigla'))
               ->setParameter('sigla', '%' . $o->getSigla() . '%');
        }
        
        if($this->toArray)
            return $dq->getQuery ()->getArrayResult ();
        return $dq->getQuery()->getResult();
        
    }
    
}
