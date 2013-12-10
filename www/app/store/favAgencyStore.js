Ext.define('SOG_Directory.store.favAgencyStore', {
    extend: 'Ext.data.Store',

    requires: [
        'SOG_Directory.model.favoriteAgency'
    ],

    config: {
        autoLoad: true,
        model: 'SOG_Directory.model.favoriteAgency',
        storeId: 'favAgencyStore',
        proxy: {
            type: 'localstorage',
            id: 'fav-Agency'
        },
        sorters: [{
        property: 'Name',
        direction: 'ASC'
        }]
    }
});