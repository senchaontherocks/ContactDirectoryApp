Ext.define('SOG_Directory.store.recEmpStore', {
    extend: 'Ext.data.Store',

    requires: [
        'SOG_Directory.model.recentEmployee'
    ],

    config: {
        autoLoad: true,
        model: 'SOG_Directory.model.recentEmployee',
        storeId: 'recEmpStore',
        proxy: {
            type: 'localstorage',
            id: 'recent-Employee'
        },
        sorters: [{
            property: 'name',    
            direction: 'DESC'
        }]
    }
});