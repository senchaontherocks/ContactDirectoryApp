Ext.define('SOG_Directory.store.employees', {
    extend: 'Ext.data.Store',

    requires: [
        'SOG_Directory.model.employee'
    ],

    config: {
        autoLoad: true,
        model: 'SOG_Directory.model.employee',
        storeId: 'employees',
        proxy: {
            type: 'jsonp',
            url: webServiceUrl+'GetAllEmployees?AuthCode=AKIAIDIGOYOYAOOAGHTQ',
            reader: {
                type: 'json',
                rootProperty: 'Employees'
            }
        },
        listeners:{
                refresh: function(me, data, eOpts){
                    
                    if(this.getCount()!=this.iniCount+25){
                        Ext.select('.x-list-paging').setStyle('display', 'none');
                        Ext.select('.x-loading').setStyle('display', 'none');
                    }
                    else
                    {
                        Ext.select('.x-list-paging').setStyle('display', 'block');
                        Ext.select('.x-loading').setStyle('display', 'block');
                    }
                },
                beforeload:function( store, operation, eOpts ){
                    this.iniCount=this.getCount();
                }
        }
    }
});