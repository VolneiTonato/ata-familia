<?php


namespace VTT\UtilsBundle\Libraries;

interface InterfaceRenderView {
    
    
    public function toRender();
    
    public function toRenderMerge(Array $options = array());
}
