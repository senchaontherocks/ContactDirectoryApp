Ext.define('SOG_Directory.view.serchForm', {
    extend: 'Ext.Container',
    alias: 'widget.mycontainer10',

    config: {
        height: '100%',
        style: 'background-color:#fff',
        width: '100%',
        scrollable: true,
        listeners : {
                        element  : 'element',
                        tap      : function (el) {
                            if(el.target.type != 'search')
                            {
                                Ext.getCmp('homeSearchBtn').blur();
                            }
                        }
        },
        items: [
            {
                xtype: 'spacer',
                height: 70
            },
            {
                xtype: 'container',
                html: '<div align="center">     <img id="logoimage" src="images/logo.png" alt="logo" /> </div>',
                width: '100%',
                layout: {
                    type: 'vbox'
                }
            },
            {
                xtype: 'spacer',
                height: 30
            },
            {
                xtype: 'container',
                style: 'background-color:#fff',
                width: '100%',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        html: 'Search',
                        padding: '',
                        style: 'border:0px;padding:28px 0px 0px 18px;background-color:#fff; color:#348FB9;',//color:#A0A0A0;',
                        ui: 'none'
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        padding: '0px 15px 0px 15px',
                        style: 'border:1px;background-color:#fff',
                        ui: 'none',
                        width: '100%',
                        items: [
                            {
                                xtype: 'searchfield',
                                flex: 10,
                                cls: 'homeSearchBox',
                                id: 'homeSearchBtn',
                                itemId: 'homeSearchBtn',
                                style: 'border: 1px solid #3396C4; margin:0px; ',
                                clearIcon: false,
                                labelWidth: 0,
                                ui: '',
                                listeners : {
                                    keyup : function( field, e, eOpts )
                                    {
                                        if (e.event.keyCode == 13)
                                        {
                                            SOG_Directory.app.getController('empController').onSearchBtnTap();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                border: '',
                                cls: 'searchBtn',
                                height: 35,
                                itemId: 'searchBtn',
                                style: 'border-radius:0px;margin:0px; color:#fff; border:0px;',
                                ui: 'secondary',
                                iconCls: 'arrow_right',
                                text: ''
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'radioContainer',
                padding: '0px 5px',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'radiofield',
                        flex: 1,
                        cls: 'radioBtn',
                        id: 'empRadio',
                        itemId: 'empRadio',
                        style: 'background:none',
                        label: 'Employee',
                        labelAlign: 'right',
                        labelWidth: '65%',
                        name: 'searchType',
                        checked: true
                    },
                    {
                        xtype: 'radiofield',
                        flex: 1,
                        cls: 'radioBtn',
                        style: 'background:none',
                        label: 'Agency',
                        labelAlign: 'right',
                        labelWidth: '65%',
                        name: 'searchType'
                    }
                ]
            }
        ]
    }

});