<?php
namespace AtaApp\AtaBundle\FormPesquisa;

class MunicipioPesq {
    
    private $id;
    
    private $nome;
    
    private $sigla;
    
    function getId() {
        return $this->id;
    }

    function getNome() {
        return $this->nome;
    }

    function getSigla() {
        return $this->sigla;
    }

    function setId($id) {
        $this->id = $id;
        
        return $this;
    }

    function setNome($nome) {
        $this->nome = $nome;
        
        return $this;
    }

    function setSigla($sigla) {
        $this->sigla = $sigla;
        
        return $this;
    }


}
