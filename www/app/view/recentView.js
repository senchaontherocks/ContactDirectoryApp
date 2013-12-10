Ext.define('SOG_Directory.view.recentView', {
    extend: 'Ext.Container',
    alias: 'widget.mycontainer111',

    config: {
        id: 'recentView',
        itemId: 'recentView',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'navigationview',
                id: 'recentNavBar',
                itemId: 'recentNavBar',
                layout: {
                    animation: false,
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'container',
                        title: 'RECENT',
                        id: 'recentListCont',
                        itemId: 'recentListCont',
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
                                                itemId: 'mybutton',
                                                width: '50%',
                                                text: 'Employee'
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'mybutton1',
                                                width: '50%',
                                                text: 'Agency'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'list',
                                id: 'recentEmpList',
                                itemId: 'recentEmpList',
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
                                store: 'recEmpStore',
                                onItemDisclosure: false
                            },
                            {
                                xtype: 'list',
                                hidden: true,
                                id: 'recentAgencyList',
                                itemId: 'recentAgencyList',
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
                                store: 'recAgencyStore',
                                onItemDisclosure: false
                            }
                        ]
                    }
                ],
                navigationBar: {
                    docked: 'top',
                    ui: 'secondary',
                    itemId: 'recNavigationBar',
                    id: 'recNavigationBar'
                }
            }
        ],
        listeners: [
            {
                fn: 'onMybuttonTap',
                event: 'tap',
                delegate: '#mybutton'
            },
            {
                fn: 'onMybutton1Tap',
                event: 'tap',
                delegate: '#mybutton1'
            }
        ]
    },
    initialize: function() {
        var delBtn= { xtype: 'button',iconMask: true, text:'Back', align:'left', id:'recBackBtn', itemId:'recBackBtn', ui:'back', data: ''};
        Ext.getCmp("recNavigationBar").add(delBtn);
    },

    onMybuttonTap: function(button, e, eOpts) {
        Ext.getCmp("recentAgencyList").hide();
        Ext.getCmp("recentEmpList").show();
    },

    onMybutton1Tap: function(button, e, eOpts) {
        Ext.getCmp("recentEmpList").hide();
        Ext.getCmp("recentAgencyList").show();
    }

});