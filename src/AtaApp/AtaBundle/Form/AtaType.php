<?php

namespace AtaApp\AtaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class AtaType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nome', null, array('label' => 'Nome'))
            ->add('municipio', new MunicipioType(), array(
                'data_class' => 'AtaApp\AtaBundle\Entity\Municipio'
            ))
            ->add('telefones', 'collection', array(
                'type' => new TelefoneType(),
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'prototype_name' => '0',
                'options' => array('data_class' => 'AtaApp\AtaBundle\Entity\Telefone'),
            ))
                
        ;
        
        $builder->addEventListener(FormEvents::PRE_SUBMIT, function(FormEvent $event){});
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AtaApp\AtaBundle\Entity\Ata',
            'csrf_protection' => false,
            'cascade_validation' => true,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'form_ata';
    }
}
