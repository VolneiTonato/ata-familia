function AjaxVTT() {

    var defaults = {
        vttType: 'POST',
        vttDataType: 'JSON',
        vttDebug: false,
        vttData: {},
        vttUrl: null,
        vttAsync: true,
        vttEvent: null,
        vttCache: false,
        vttLoader : true
    };

    var barProgress = function () {

    };

    this.send = function (options, fnc) {

        var settings = $.extend({}, defaults, options);
        
        if(settings.vttEvent === undefined || settings.vttEvent === null){
            settings.vttEvent = window.event || arguments.callee.caller.arguments[0];
        }

        settings.vttEvent.preventDefault();

        $.ajax({
            url: settings.vttUrl,
            data: settings.vttData,
            type: settings.vttType,
            dataType: settings.vttDataType,
            async: settings.vttAsync,
            cache : settings.vttCache,
            beforeSend: function (xhr) {
                if(settings.vttLoader === true)
                    LoaderVTT().run();
            }
        }).done(function (data, textStatus, jqXHR) {
            
            if(settings.vttLoader === true)
                LoaderVTT().stop();
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            
            MensagemVTT().show({mensagem : textStatus}).close(function(){
                if(jqXHR.responseText && settings.vttDebug === true)
                    ModalVTT().show(jqXHR.responseText);
            });
            
        }).always(function (data, textStatus, errorThrown) {

            if (textStatus !== 'success') {
                data.abort();
            } else {

                switch (settings.vttDataType.toString().toLowerCase()) {
                    case 'html':
                    case 'post':
                    case 'get':
                    case 'script':
                        fnc(data);
                        break;
                    case 'json':
                    default :
                        if (!data.ok) {
                            MensagemVTT().show({mensagem: data.mensagem});
                        } else {
                            fnc(data);
                            fnc = undefined;
                        }
                        break;
                }
            }
        });
    };
    return this;
};

$.xhrPool = [];
$.xhrPool.abortAll = function () {
    $(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });
    $.xhrPool = [];
};

$.ajaxSetup({
    cache : false,
    beforeSend: function (jqXHR) {
        $.xhrPool.push(jqXHR);
    },
    complete: function (jqXHR) {
        var index = $.xhrPool.indexOf(jqXHR);
        if (index > -1) {
            $.xhrPool.splice(index, 1);
        }
    }
});
