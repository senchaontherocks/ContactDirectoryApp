Ext.define('SOG_Directory.store.empfavStore', {
    extend: 'Ext.data.Store',

    requires: [
        'SOG_Directory.model.favoriteEmployee'
    ],

    config: {
        autoLoad: true,
        model: 'SOG_Directory.model.favoriteEmployee',
        storeId: 'favEmp',
        proxy: {
            type: 'localstorage',
            id: 'fav-Employee'
        },
        sorters: [{
        property: 'Name',
        direction: 'ASC'
        }]
    }
});