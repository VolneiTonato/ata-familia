<?php

namespace AtaApp\AtaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Telefone
 */
class Telefone
{
    /**
     * @var string
     */
    private $numero;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \AtaApp\AtaBundle\Entity\Ata
     */
    private $ata;


    /**
     * Set numero
     *
     * @param string $numero
     * @return Telefone
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;

        return $this;
    }

    /**
     * Get numero
     *
     * @return string 
     */
    public function getNumero()
    {
        return $this->numero;
    }

    /**
     * Set id
     *
     * @param integer $id
     * @return Telefone
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
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
     * Set ata
     *
     * @param \AtaApp\AtaBundle\Entity\Ata $ata
     * @return Telefone
     */
    public function setAta(\AtaApp\AtaBundle\Entity\Ata $ata = null)
    {
        $this->ata = $ata;

        return $this;
    }

    /**
     * Get ata
     *
     * @return \AtaApp\AtaBundle\Entity\Ata 
     */
    public function getAta()
    {
        return $this->ata;
    }
}
