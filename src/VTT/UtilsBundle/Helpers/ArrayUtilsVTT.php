<?php

namespace Util\HelpersBundle\Helpers;

use JMS\Serializer as SRL;

class ArrayUtilsVTT {
    /**
     * 
     * @param Entity ORM $entity
     */
    public static function toSerializeEntity($entity, $format = 'xml', $group = array('externo'))
    {
        $serializer = SRL\SerializerBuilder::create()->build();
        $context = SRL\SerializationContext::create()->setGroups($group);
        
        $s = $serializer->serialize($entity, $format, $context);
        
        if($format == 'xml'){
            $obj = self::searchFirstObjectInArray($entity, TRUE);
            
            if(is_null($obj))
                throw new \LogicException('Erro ao serializar dados! Nenhum objeto carregado.');

            return UtilsXMLHelper::replaceTagEntry($s, get_class($obj));
        }
        
        return $s;
    }
    
    public static function toSerializeStdClass($obj, $format = 'xml'){
        if(is_array($obj)){
            $obj = self::arrayToObject($obj);
        }
        return UtilsXMLHelper::getXmlJsonSerializer($obj,  $format);
    }
    
    
    public static function toDeserializeEntity($serialization, $type, $format = 'xml', $group = array('externo'))
    {
        if(substr_count($type, '\\') == 0){
            $type = sprintf('Db\DataBaseBundle\Entity\%s', $type);
        }
        $context = SRL\DeserializationContext::create()->setGroups($group);
        
        $dados = @json_decode($serialization);
        
        $serializer = SRL\SerializerBuilder::create()->build();
        
        if(is_array($dados)){
            return $serializer->deserialize($serialization, sprintf('ArrayCollection<%s>', $type), $format, $context);
        }      
        return $serializer->deserialize($serialization,$type, $format, $context);
    }
    
    /**
     * 
     * @param string $serialization
     * @return array deserialize to use Ajax
     */
    public static function toArrayBySerialization($serialization)
    {
        return self::objectToArray(json_decode($serialization));
    }
    
    /**
     * 
     * @param stdClass or array $objeto
     * @return array list
     * @link http://stackoverflow.com/questions/4345554/convert-php-object-to-associative-array
     */
    public static function objectToArray($objeto)
    {

        if (is_object($objeto)) {
            // Gets the properties of the given object
            // with get_object_vars function
            $objeto = get_object_vars($objeto);
        }

        if (is_array($objeto)) {
            /*
            * Return array converted to object
            * Using __FUNCTION__ (Magic constant)
            * for recursive call
            */
            return array_map(__METHOD__, $objeto);
        } else {
            // Return array
            return $objeto;
        }
    }
    
    public static function searchFirstObjectInArray($array, $typeEntity = false)
    {
        $namespace = null;
        if($typeEntity)
            $namespace = 'Db\DataBaseBundle\Entity\\';
        
        if(is_object($array)){
            if(!strstr(get_class($array), $namespace) && $typeEntity == true){
                return self::searchFirstObjectInArray(get_object_vars($array), $typeEntity);
            }else{
                return $array;
            }
        }
        
        if(is_array($array)){
            foreach($array as $k => $v){
                if(is_array($v)){
                    return self::searchFirstObjectInArray($v, $typeEntity);
                }else{
                    if($typeEntity){
                        if(!strstr(get_class($v), $namespace) && $typeEntity == true){
                            continue;
                        }else{
                            return $v;
                        }
                    }else{
                        return $v;
                    }
                }
            }
        }
        return null;
    }
    
    
    public static function getDuplicates( $array ) 
    {
        return array_unique( array_diff_assoc( $array, array_unique( $array ) ) );
    }
    
    
    public static function arrayToObject($d) {
		if (is_array($d)) {
			/*
			* Return array converted to object
			* Using __FUNCTION__ (Magic constant)
			* for recursive call
			*/
			return (object) array_map(__METHOD__, $d);
		}
		else {
			// Return object
			return $d;
		}
	}
        
        
        
    public static function  recursive_array_search($needle,$haystack)
    {
        foreach ($haystack as $key => $value) {
            $current_key = $key;
            if ($needle === $value OR ( is_array($value) && self::recursive_array_search($needle, $value) !== -1)) {
                return $current_key;
            }
        }
        return -1;
    }

}