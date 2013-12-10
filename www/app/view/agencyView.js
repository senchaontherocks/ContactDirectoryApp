Ext.define('SOG_Directory.view.agencyView', {
    extend: 'Ext.Container',
    alias: 'widget.mycontainer4',

    config: {
        id: 'agencies',
        itemId: 'agencies',
        layout: {
            type: 'fit'
        },
        listeners : {
            element  : 'element',
            tap      : function (el) {
                if(el.target.type != 'search')
                {
                    Ext.getCmp('agencySearchField').blur();
                }


            }
        },
        items: [
            {
                xtype: 'navigationview',
                id: 'agencyNavBar',
                itemId: 'agencyNavBar',
                layout: {
                    animation: false,
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'container',
                        title: 'AGENCY SEARCH',
                        layout: {
                            type: 'fit'
                        },
                        items: [
                            {
                                xtype: 'toolbar',
                                docked: 'top',
                                height: '20px',
                                padding: '0px',
                                style: 'border:0px',
                                ui: 'serchToolBar',
                                items: [
                                    {
                                        xtype: 'searchfield',
                                        flex: 12,
                                        id: 'agencySearchField',
                                        itemId: 'agencySearchField',
                                        placeHolder: 'Type to search'
                                    },
                                    {
                                        xtype: 'button',
                                        flex: 1,
                                        id: 'agencyBtn',
                                        itemId: 'agencyBtn',
                                        iconCls:'search'
                                    }
                                ]
                            },
                            {
                                xtype: 'list',
                                id: 'agencyList',
                                itemId: 'agencyList',
                                maxWidth: 'agencyList',
                                emptyText: 'No agency found.',
                                itemTpl: [
                                    '<div class="listParentTplDiv">',
                                    '	<div>',
                                    '		<div style="float:left;">',
                                    '               <tpl if="HoSPictureURL">',
                                    '                   <img class="listImg" src="{HoSPictureURL}" alt="image" />',
                                    '               <tpl else >',
                                    '                   <img class="listImg" src="images/emp_50.png" alt="image" />',
                                    '               </tpl>',
                                    '           </div>',
                                    '		<div class="textDiv">',
                                    '               <p class="nameSpan">{Name}</p>',
                                    '               <p class="desSpan">{Address1Line1}<br />{Address1Line2}</p>',
                                    '		</div>',
                                    '	</div>',
                                    '   <div class="disclose" style="float:right">',
                                    '       <img class="discloseImg" src="images/arrow.png" alt=""/>',
                                    '   </div>',
                                    '</div>',
                                    '<div class="clear">&nbsp;</div>'
                                ],
                                selectedCls: 'my-item-selected',
                                store: 'agenciesStore',
                                onItemDisclosure: false,
                                plugins: [
                                    {
                                        autoPaging: true,
                                        type: 'listpaging'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                navigationBar: {
                    docked: 'top',
                    ui: 'secondary',
                    id: 'ageNavigationBar',
                    itemId:'ageNavigationBar'
                }
            }
        ]
    },
    initialize: function() {
        var delBtn= { xtype: 'button',iconMask: true, text:'Back', align:'left', id:'ageBackBtn', itemId:'ageBackBtn', ui:'back', data: ''};
        Ext.getCmp("ageNavigationBar").add(delBtn);
    }

});