<?php
namespace Util\HelpersBundle\Helpers;

class UtilsXMLHelper {
    private static $nameSpace = 'Db\DataBaseBundle\Entity\\';
    private static $_namesExistente = array();
    private static $_controleName = array();


    public static function getEntryName($obj){
        
        $dataAux = $obj;
        
        if(is_string($dataAux))
            return $dataAux;
        
        $data = self::arrayToObject($dataAux);
        
        
        
        if(is_object($data)){

            $nameClass = get_class($data);

            if(substr_count($nameClass, '\\') > 0){
                $nameClass = explode('\\', $nameClass);
                if(is_array($nameClass)){
                    $nameClass = end($nameClass);
                }
            }
            
            if(in_array($nameClass, self::$_controleName)){
                $max = strlen($nameClass);
                
                $maxAuxS = $max - 1;
                $maxAuxOes = $max - 3;
                
                if (substr($nameClass, $maxAuxOes , $max) == 'oes') {
                    $nameClass = substr($nameClass, 0, $maxAuxOes);
                }elseif(substr($nameClass, $maxAuxS , $max) == 's'){
                    $nameClass = substr($nameClass, 0, $maxAuxS);
                }
                
            }else{
                self::$_controleName[] = $nameClass;
            }
            
            return strtolower(substr($nameClass, 0,1)) . substr($nameClass, 1, strlen($nameClass));
        }
        return 'entry';
    }   
    
    public static function replaceTagEntry($result, $type)
    {
        $annotations = (new \ReflectionClass((new $type())))->getDocComment();
        
        if(trim($annotations) != ""){
            $annotations = str_replace('*', '', $annotations);
            $annotations = str_replace('/', '', $annotations);
            $annotations = str_replace('\\', '', $annotations);
            @preg_match('/[@]\w+\(\"(\w+)\"\)/', $annotations, $res);
            if(is_array($res)){
                if(isset($res[1])){
                    $type = $res[1];
                }
            }
        }
        return preg_replace('/entry/', $type, $result);
        
    }
    
    
    private static function arrayToObject(&$list)
    {
        if(is_object($list)){
            return $list;
        }
        
        if(is_array($list)){
            foreach($list as $o){
                return self::arrayToObject($o);
            }
        }   
    }
    
    public static function getXmlError($msg = null, $type = 'xml', $code = 0)
    {
        if($code > 4 || $code < 0){
            $code = 0;
        }
        if($type == 'xml'){
            $msg = empty($msg) ? "Internal Server Error" : $msg;
            $xml = '<?xml version="1.0" encoding="UTF-8"?>';
            $xml .= '<error code="' . $code .'" message="' . $msg .'"></error>';
            return $xml;
        }else if($type == 'json'){
            return json_encode(array('mensagem' => $msg, 'error' => $code));
        }
    }
    
    public static function getXmlJsonSerializer(\stdClass $obj, $type = 'xml')
    {
        $list = UtilsArrayHelper::objectToArray($obj);
        
        if($type == 'xml'){
           
            $xml = new \SimpleXmlElement('<result/>');
             self::to_xml($xml, $list);            
            return $xml->asXML();
        }else{
            return json_encode(array($list));
        }
    }
    
    public static function to_xml(\SimpleXMLElement $object, array $data)
    {   
        foreach ($data as $key => $value)
        {   
            if (is_array($value))
            {   
                $new_object = $object->addChild($key);
                self::to_xml($new_object, $value);
            }   
            else
            {   
                $object->addChild($key, $value);
            }   
        } 
    } 

}





