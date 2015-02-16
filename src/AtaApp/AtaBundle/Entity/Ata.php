<?php

namespace AtaApp\AtaBundle\Entity;

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
     * Constructor
     */
    public function __construct()
    {
        $this->telefones = new \Doctrine\Common\Collections\ArrayCollection();
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
    public function addTelefone(\AtaApp\AtaBundle\Entity\Telefone $telefones)
    {
        $telefones->setAta($this);
        $this->telefones[] = $telefones;

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
}
