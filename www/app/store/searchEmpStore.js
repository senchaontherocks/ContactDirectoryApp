Ext.define('SOG_Directory.store.searchEmpStore', {
    extend: 'Ext.data.Store',

    requires: [
        'SOG_Directory.model.employee'
    ],
    
    config: {
        autoLoad: false,
        model: 'SOG_Directory.model.employee',
        storeId: 'searchEmpStore',
        proxy: {
            type: 'jsonp',
            url:'',
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
                    }
                },
                beforeload:function( store, operation, eOpts ){
                    this.iniCount=this.getCount();
                }
        }
    }
});