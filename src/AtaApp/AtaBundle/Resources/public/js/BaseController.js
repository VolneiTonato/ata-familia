var BaseController = (function () {
    
    var _model = function (name, attribute) {
        return '[vtt-model=\'' + name + '[' + attribute + ']\']';
    };
    
    var _modelName = function (name, attribute) {
        return '[name=\'' + name + '[' + attribute + ']\']';
    };

    var _init = function () {
        ModalVTT.init();        
        QuestionVTT.init();
    };

    return {
        init: function () {
            _init();
            return this;
        },
        modelVTT : function(name, attribute){
            return _model(name, attribute);
        },
        modelName : function(name, attribute){
            return _modelName(name, attribute);
        }
    };
})();
