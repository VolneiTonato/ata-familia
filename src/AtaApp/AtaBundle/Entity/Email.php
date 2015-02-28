<?php

namespace AtaApp\AtaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Email
 */
class Email
{
    /**
     * @var string
     */
    private $email;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \AtaApp\AtaBundle\Entity\Ata
     */
    private $ata;


    /**
     * Set email
     *
     * @param string $email
     * @return Email
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set id
     *
     * @param integer $id
     * @return Email
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
     * @return Email
     */
    public function setAta(\AtaApp\AtaBundle\Entity\Ata $ata)
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
