Ext.define('SOG_Directory.store.agencies', {
    extend: 'Ext.data.Store',

    requires: [
        'SOG_Directory.model.agency'
    ],

    config: {
        autoLoad: true,
        model: 'SOG_Directory.model.agency',
        storeId: 'agenciesStore',
        proxy: {
            type: 'jsonp',
            url: webServiceUrl+'GetAllUnit?AuthCode=AKIAIDIGOYOYAOOAGHTQ',
            reader: {
                type: 'json',
                rootProperty: 'Units'
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