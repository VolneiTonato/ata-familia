<?php

namespace VTT\Templates\ClipOneBundle\Libraries;

use VTT\UtilsBundle\Libraries\BreadsCrumb\BreadsCrumb,
    VTT\Templates\InterfaceRenderView;

class RenderView implements InterfaceRenderView {
    
    const PAGE_TITLE = 'PageTitle';
    const PAGE_SUBTITLE = 'PageSubTitle';
    const PAGE_SUBTITLE_DETAIL = 'PageSubTitleDetail';
    const PAGE_NAME_LOGO = 'PageNameLogo';
    const PAGE_NAME_LINK = 'PageNameLink';
    const BREAD = 'Bread';
    
    private $settings = array();
    private $defaults = array();
    
    
    private function defaults(){
       return $this->defaults = array(
            self::PAGE_TITLE => '',
            self::PAGE_NAME_LINK => '',
            self::PAGE_NAME_LOGO => '',
            self::BREAD => null,
            self::PAGE_SUBTITLE => '',
            self::PAGE_SUBTITLE_DETAIL => ''
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
    
    public function setPageNameLogo($value){
        $this->add(self::PAGE_NAME_LOGO, $value);
        
        return $this;
    }
    
    public function setPageLinkLogo($value){
        $this->add(self::PAGE_NAME_LINK, $value);
        
        return $this;
    }
    
    public function setSubTitle($value){
        $this->add(self::PAGE_SUBTITLE, $value);
        
        return $this;
    }
    
    public function setSubTitleDetail($value){
        $this->add(self::PAGE_SUBTITLE_DETAIL, $value);
        
        return $this;
    }
    
    public function setBreadCrumb(BreadsCrumb $bread){
        $this->add(self::BREAD, $bread->show());
        
        return $this;
    }

}
