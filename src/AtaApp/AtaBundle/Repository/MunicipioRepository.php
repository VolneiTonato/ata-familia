<?php
namespace AtaApp\AtaBundle\Repository;

use Doctrine\ORM\EntityRepository;
use AtaApp\AtaBundle\FormPesquisa\MunicipioPesq;
use AtaApp\AtaBundle\Entity;

class MunicipioRepository extends EntityRepository {
    
    private $toArray = false;
    
    public function setToArray($vData = false)
    {
        $this->toArray = (bool) $vData;
        
        return $this;
    }
    
    
    public function save(Entity\Municipio $o)
    {
        $em = $this->_em;
        
        if ($o->getId())
            $em->merge($o);
        else
            $em->persist($o);


        $em->flush();
        
        return $em->getRepository('AtaAppAtaBundle:Municipio')->find($o->getId());
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
