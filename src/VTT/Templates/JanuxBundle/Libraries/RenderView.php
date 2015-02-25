<?php

namespace VTT\Templates\JanuxBundle\Libraries;

use VTT\UtilsBundle\Libraries\BreadsCrumb,
    VTT\UtilsBundle\Libraries\InterfaceRenderView;

class RenderView implements InterfaceRenderView {
    
    const PAGE_TITLE = 'januxPageTitle';
    const PAGE_LINK_TITLE = 'januxPageLinkTitle';
    const BREAD = 'januxBread';
    
    private $settings = array();
    private $defaults = array();
    
    
    private function defaults(){
       return $this->defaults = array(
            self::PAGE_TITLE => 'Janux Template',
            self::PAGE_LINK_TITLE => 'Janux Template',
            self::BREAD => null,
        );
    }
    
    private function add($const, $value) {
        $this->settings[$const] = $value;
    }

    public function toRender(){
        return array_merge($this->defaults(), $this->settings);
    }
    
    public function toRenderMerge(Array $options = array()){
        return array_merge($this->toRender(), $options);
    }
    
    public function setPageTitle($value){
        $this->add(self::PAGE_TITLE, $value);
        
        return $this;
    }
    
    public function setPageLinkTitle($value){
        $this->add(self::PAGE_LINK_TITLE, $value);
        
        return $this;
    }
    
    public function setBreadCrumb(BreadsCrumb $bread){
        $this->add(self::BREAD, $bread->show());
        
        return $this;
    }

}
