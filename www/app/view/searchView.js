Ext.define('SOG_Directory.view.searchView', {
    extend: 'Ext.Container',

    requires: [
        'SOG_Directory.view.serchForm',
        'SOG_Directory.view.employeeView',
        'SOG_Directory.view.favoriteView',
        'SOG_Directory.view.recentView',
        'SOG_Directory.view.agencyView'
    ],

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'tabpanel',
                id: 'mainTab',
                itemId: 'mainTab',
                layout: {
                    animation: false,
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'mycontainer10',
                        title: 'Search',
                        iconCls: 'search'
                    },
                    {
                        xtype: 'mycontainer14',
                        id: 'employeeView',
                        itemId: 'employeeView',
                        title: 'Employee',
                        iconCls: 'user'
                    },
                    {
                        xtype: 'mycontainer4',
                        title: 'Agency',
                        iconCls: 'home'
                    },
                    {
                        xtype: 'mycontainer13',
                        html: 'Favorite',
                        title: 'Favorites',
                        iconCls: 'favorites'
                    },
                    {
                        xtype: 'mycontainer111',
                        title: 'Recent',
                        iconCls: 'time'
                    }
                    
                ],
                tabBar: {
                    cls: 'mainTab',
                    docked: 'bottom',
                    ui: 'none'
                }
            }
        ],
        listeners: [
            {
                fn: 'onMainTabActiveItemChange',
                event: 'activeitemchange',
                delegate: '#mainTab'
            },
            {
               fn: 'onContainerPainted',
               event: 'painted'
           }
        ]
    },
    onMainTabActiveItemChange: function(container, value, oldValue, eOpts) {
        if(oldValue.id =="employeeView")
        {
            Ext.getCmp("empNavBar").pop();
        }
        else if(oldValue.id == "favoriteView")
        {
            Ext.getCmp("favEmpNavBar").pop();
        }
        else if(oldValue.id == "recentView")
        {
            Ext.getCmp("recentNavBar").pop();
        }
        else if(oldValue.id == "agencies")
        {
            Ext.getCmp("agencyNavBar").pop();
        }
    },
    onContainerPainted: function(element, eOpts) {
        navigator.splashscreen.hide();
   }

});