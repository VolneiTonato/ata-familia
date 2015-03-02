<?php

namespace VTT\UtilsBundle\Libraries\DataTableJs;

use Symfony\Component\HttpFoundation\Request;

class DataTable {
    const _DRAW = 'draw';
    const _TOTAL_RECORDS = 'recordsTotal';
    const _RECORDS_FILTERED = 'recordsFiltered';
    const _DATA = 'data';
    const _START = 'start';
    const _LENGTH = 'length';
    const _COLUMNS = 'columns';
    const _SEARCH = 'search';
    const _ORDER = 'order';    
            
    
    private $request;
    private $paginaAtual;
    private $quantidadeItemPagina;
    private $totalRegistros;
    private $outPut = array();
    private $paginator;
    private $columns = array();
    private $search;
    private $idxColumnSort;
    private $typeOrderColumn;
    private $order;
    
    
    public function __construct(Request $request) {
        $this->request = $request;
        $this->run();
        
        return $this;
    }
    
    private function run()
    {
        $this->paginaAtual = intval($this->request->get(self::_START));
        $this->quantidadeItemPagina = intval($this->request->get(self::_LENGTH));
        
        $this->columns = $this->request->get(self::_COLUMNS);       
        
        $this->search = $this->request->get(self::_SEARCH)['value'];
        $this->order = $this->request->get(self::_ORDER);        
        $this->idxColumnSort = $this->order[0]['column'];
        $this->typeOrderColumn = $this->order[0]['dir'];
        
        $this->defaults();
    }
    
    private function defaults()
    {
        $this->outPut = array(
            self::_DRAW => $this->request->get(self::_DRAW),
            self::_TOTAL_RECORDS => 0,
            self::_RECORDS_FILTERED => 0
        );
    }
    
    
    
    public function setTotal($total)
    {
        $this->totalRegistros = $total;
    }
   
    public function getTotal()
    {
        return @ceil($this->totalRegistros / $this->quantidadeItemPagina);
    }
    
    public function getTotalGeral(){
        return $this->totalRegistros;
    }
    
    public function isLimitOffSetQuery()
    {
        return !is_null($this->paginaAtual) && $this->quantidadeItemPagina !== -1;
    }
    
    public function getPaginaAtual()
    {
        return $this->paginaAtual;
    }
    
    public function getQuantidadeItemPagina()
    {
        return $this->quantidadeItemPagina;
    }
    
    public function paginationToPaginatorORM(\Doctrine\ORM\Tools\Pagination\Paginator $paginator)
    {
        $this->setTotal($paginator->count());
        $this->paginator = $paginator;
        
        $dados = array(
            self::_TOTAL_RECORDS => $this->getTotalGeral(),
            self::_RECORDS_FILTERED => $this->getTotalGeral(),
        );
        
        $this->outPut = array_merge($this->outPut, $dados);
    }
    
    /**
     * 
     * @return \Doctrine\ORM\Tools\Pagination\Paginator
     */
    public function getPaginator()
    {
        return $this->paginator;
    }
    
    public function setData($dados = array())
    {
        $this->outPut[self::_DATA] = (array) $dados;
        
        return $this;
    }
    
    public function getOutPutJson()
    {
        return json_encode($this->outPut);
    }
    
    public function getSearch()
    {
        return $this->search;
    }
    
    public function getColumns()
    {
        return $this->columns;
    }

    public function getColumnNameOrderBy()
    {
        return $this->columns[$this->idxColumnSort]['name'];
    }
    
    public function getTypeOrderBy()
    {
        return $this->typeOrderColumn;
    }
    
    
}
