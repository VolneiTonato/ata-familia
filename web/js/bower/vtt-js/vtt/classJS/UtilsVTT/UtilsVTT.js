var UtilsVTT = (function(){

    /**
     * 
     * @param {jquery} obj
     * @param {bool} outrosTipos
     * @returns {mask format}
     */
    var _maskFone = function (obj, outrosTipos) {

        var numero = 0;
        var value = 0;
        var lSwitch = false;

        numero = obj.val();
        
        if(numero === undefined){
            obj.val('');
            return false;
        }
        
        numero = numero.replace(/\D/g, '');

        var init = numero.substring(0, 4);

        outrosTipos = outrosTipos === undefined || outrosTipos !== true ? false : true;

        if (outrosTipos) {
            switch (init) {
                case '0800':
                case '0300':
                    lSwitch = true;

                    if (numero.match(/^(\d{4})([a-z]{1,})/gi)) {
                        value = numero.substring(0, 4) + '-' + numero.substring(4, numero.length);
                        obj.val(value);
                        return false;
                    } else {
                        if (numero.length === 10) {
                            value = numero.substring(0, 4) + '-' + numero.substring(4, 7) + '-' + numero.substring(7, 10);
                        } else if (numero.length === 11) {
                            value = numero.substring(0, 4) + '-' + numero.substring(4, 7) + '-' + numero.substring(7, 11);
                        } else {
                            value = '';
                        }
                    }
                    obj.val(value);
                    return;
                    break;
                case '4004':
                case '4002':
                case '3003':
                    if (numero.length === 8) {
                        value = numero.substring(0, 4) + '-' + numero.substring(4, 8);
                        obj.val(value);
                        return;
                    } else if (numero.length === 7) {
                        //4004123
                        value = numero.substring(0, 4) + '-' + numero.substring(4, 7);
                        obj.val(value);
                        return;
                    } else {
                        lSwitch = false;
                    }
                    break;
            }
        }

        if (!lSwitch) {
            init = numero.substring(0, 1);
            if (numero.length === 10 && init !== 0) {
                //549999-9999
                value = '(' + numero.substring(0, 2) + ') ' + numero.substring(2, 6) + '-' + numero.substring(6, 10);
            } else if (numero.length === 11 && init !== 0) {
                value = '(' + numero.substring(0, 2) + ') ' + numero.substring(2, 7) + '-' + numero.substring(7, 11);
            }
            
            if(value !== 0 && value !== undefined){
                obj.val(value);
                return;
            }

        }
        obj.val('');
    };
    
    
    /**
     * 
     * @param {string} url
     * @returns {submit form}
     */
    var _sendPostButton = function(url){
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        form.style.display = 'hidden';
        document.body.appendChild(form);
        form.submit();
    };
    
    
    
    
    return{
        maskTelefone : function(obj, outrosTipos){
            _maskFone(obj, outrosTipos);
        },
        sendPostButton : function(url){
            _sendPostButton(url);
            return this;
        }
    };
    
})();
