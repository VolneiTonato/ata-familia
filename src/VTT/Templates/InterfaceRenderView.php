<?php


namespace VTT\Templates;

interface InterfaceRenderView {
    
    
    public function toRender();
    
    public function toRenderMerge(Array $options = array());
}
