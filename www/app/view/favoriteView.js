Ext.define('SOG_Directory.view.favoriteView', {
    extend: 'Ext.Container',
    alias: 'widget.mycontainer13',

    config: {
        id: 'favoriteView',
        itemId: 'favoriteView',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'navigationview',
                id: 'favEmpNavBar',
                itemId: 'favEmpNavBar',
                ui: 'secondary',
                layout: {
                    animation: false,
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'container',
                        title: 'FAVORITES',
                        layout: {
                            type: 'fit'
                        },
                        items: [
                            {
                                xtype: 'toolbar',
                                docked: 'top',
                                ui: 'serchToolBar',
                                items: [
                                    {
                                        xtype: 'segmentedbutton',
                                        width: '100%',
                                        items: [
                                            {
                                                xtype: 'button',
                                                pressed: true,
                                                itemId: 'mybutton2',
                                                width: '50%',
                                                text: 'Employee'
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'mybutton3',
                                                width: '50%',
                                                text: 'Agency'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'list',
                                id: 'favEmpList',
                                itemId: 'favEmpList',
                                emptyText: 'No employee  found.',
                                itemTpl: [
                                    '<div class="listParentTplDiv">',
                                    '	<div>',
                                    '		<div style="float:left;">',
                                    '            <tpl if="HoSPictureURL==null">',
                                    '            	<img class="listImg" src="images/emp_50.png" alt="image" />',
                                    '            <tpl else >',
                                    '                <img class="listImg" src="{HoSPictureURL}" alt="image" />',
                                    '           	</tpl>',
                                    '        </div>',
                                    '		<div class="textDiv">',
                                    '               <font class="nameSpan">{Name}</font><font class="desSpan">, <i>{Designation}</i></font><br />',
                                    '               <p class="desSpan parentTxt">{ParentUnitName}</p><p class="desSpan">{UnitName}</p>',
                                    '		</div>',
                                    '	</div>',
                                    '   <div class="disclose" style="float:right">',
                                    '       <img class="discloseImg" src="images/arrow.png" alt=""/>',
                                    '   </div>',
                                    '</div>',
                                    '<div class="clear">&nbsp;</div>'
                                ],
                                selectedCls: 'my-item-selected',
                                store: 'favEmp',
                                onItemDisclosure: false
                            },
                            {
                                xtype: 'list',
                                hidden: true,
                                id: 'favAgencyList',
                                itemId: 'favAgencyList',
                                emptyText: 'No agency found.',
                                itemTpl: [
                                    '<div class="listParentTplDiv">',
                                    '	<div>',
                                    '		<div style="float:left;">',
                                    '            <tpl if="HoSPictureURL">',
                                    '            	<img class="listImg" src="{HoSPictureURL}" alt="image" />',
                                    '            <tpl else >',
                                    '                <img class="listImg" src="images/emp_50.png" alt="image" />',
                                    '           	</tpl>',
                                    '        </div>',
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
                                store: 'favAgencyStore',
                                onItemDisclosure: false
                            }
                        ]
                    }
                ],
                navigationBar: {
                    docked: 'top',
                    ui: 'secondary',
                    itemId: 'favNavigationBar',
                    id: 'favNavigationBar'
                }
            }
        ],
        listeners: [
            {
                fn: 'onMybutton2Tap',
                event: 'tap',
                delegate: '#mybutton2'
            },
            {
                fn: 'onMybutton3Tap',
                event: 'tap',
                delegate: '#mybutton3'
            }
        ]
    },
    initialize: function() {
        var delBtn= { xtype: 'button',iconMask: true, text:'Back', align:'left', id:'favBackBtn', itemId:'favBackBtn', ui:'back', data: ''};
        Ext.getCmp("favNavigationBar").add(delBtn);
    },

    onMybutton2Tap: function(button, e, eOpts) {
        Ext.getCmp("favAgencyList").hide();
        Ext.getCmp("favEmpList").show();
    },

    onMybutton3Tap: function(button, e, eOpts) {
        Ext.getCmp("favEmpList").hide();
        Ext.getCmp("favAgencyList").show();
    }

});