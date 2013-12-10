Ext.define('SOG_Directory.store.accordStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'SOG_Directory.model.Task'
    ],

    config: {
        autoload: true,
        model: 'SOG_Directory.model.Task',
        storeId: 'accordStore',
        defaultRootProperty: 'ChildUnit'
    }
});