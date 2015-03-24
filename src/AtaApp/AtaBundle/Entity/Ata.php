<?php

namespace AtaApp\AtaBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * Ata
 */
class Ata
{
    /**
     * @var string
     */
    private $nome;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $telefones;

    /**
     * @var \AtaApp\AtaBundle\Entity\Municipio
     */
    private $municipio;
    
     /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $emails;


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->telefones = new \Doctrine\Common\Collections\ArrayCollection();
        $this->emails = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set nome
     *
     * @param string $nome
     * @return Ata
     */
    public function setNome($nome)
    {
        $this->nome = $nome;

        return $this;
    }

    /**
     * Get nome
     *
     * @return string 
     */
    public function getNome()
    {
        return $this->nome;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Add telefones
     *
     * @param \AtaApp\AtaBundle\Entity\Telefone $telefones
     * @return Ata
     */
    public function addTelefone(\AtaApp\AtaBundle\Entity\Telefone $telefones = null)
    {
        
        if($telefones instanceof Telefone){
            $telefones->setAta ($this);
            $this->telefones[] = $telefones;
        }
        

        return $this;
    }

    /**
     * Remove telefones
     *
     * @param \AtaApp\AtaBundle\Entity\Telefone $telefones
     */
    public function removeTelefone(\AtaApp\AtaBundle\Entity\Telefone $telefones)
    {
        $this->telefones->removeElement($telefones);
    }

    /**
     * Get telefones
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTelefones()
    {
        return $this->telefones;
    }

    /**
     * Set municipio
     *
     * @param \AtaApp\AtaBundle\Entity\Municipio $municipio
     * @return Ata
     */
    public function setMunicipio(\AtaApp\AtaBundle\Entity\Municipio $municipio = null)
    {
        $this->municipio = $municipio;

        return $this;
    }

    /**
     * Get municipio
     *
     * @return \AtaApp\AtaBundle\Entity\Municipio 
     */
    public function getMunicipio()
    {
        return $this->municipio;
    }
   

    /**
     * Add emails
     *
     * @param \AtaApp\AtaBundle\Entity\Email $emails
     * @return Ata
     */
    public function addEmail(\AtaApp\AtaBundle\Entity\Email $emails = null)
    {
        
        if($emails instanceof Email){
            $emails->setAta ($this);
            $this->emails[] = $emails;
        }

        return $this;
    }

    /**
     * Remove emails
     *
     * @param \AtaApp\AtaBundle\Entity\Email $emails
     */
    public function removeEmail(\AtaApp\AtaBundle\Entity\Email $emails)
    {
        $this->emails->removeElement($emails);
    }

    /**
     * Get emails
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getEmails()
    {
        return $this->emails;
    }
}
