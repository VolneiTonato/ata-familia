app.factory('dataTableSelectRow', ['$http', function ($http) {
        return {
            selectRow : function(oTable, element){
              $(element + ' tbody').on('click', 'tr' , function(){
                if ( $(this).hasClass('selected') ) {
                  $(this).removeClass('selected');
                }else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
              });
            }
            
        };
}]);