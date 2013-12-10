Ext.define('SOG_Directory.view.employeeView', {
    extend: 'Ext.Container',
    alias: 'widget.mycontainer14',
    

    config: {
        layout: {
            type: 'fit'
        },
        listeners : {
            element  : 'element',
            tap      : function (el){
                            if(el.target.type != 'search')
                            {
                                Ext.getCmp('mysearchfield').blur();
                            }
                        }
        },
        items: [
            {
                xtype: 'navigationview',
                id: 'empNavBar',
                itemId: 'empNavBar',
                ui: 'light',
                layout: {
                    animation: false,
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'container',
                        title: 'EMPLOYEE SEARCH',
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
                                        id: 'mysearchfield',
                                        itemId: 'mysearchfield',
                                        placeHolder: 'Type to search'
                                    },
                                    {
                                        xtype: 'button',
                                        flex: 1,
                                        id: 'empBtn',
                                        itemId: 'empBtn',
                                        iconCls:'search'
                                    }
                                    
                                ]
                            },
                            {
                                xtype: 'list',
                                id: 'employeeList',
                                itemId: 'employeeList',
                                emptyText: 'No employee  found.',
                                itemCls: 'custom_list_items',
                                itemTpl: [
                                    '<div class="listParentTplDiv">',
                                    '	<div style="border:0px solid green">',
                                    '	        <div style="float:left;">',
                                    '               <tpl if="HoSPictureURL==null">',
                                    '                   	<img class="listImg" src="images/emp_50.png" alt="image" />',
                                    '               <tpl else >',
                                    '                           <img class="listImg" src="{HoSPictureURL}" alt="image" />',
                                    '               </tpl>',
                                    '           </div>',
                                    '	        <div class="textDiv">',
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
                                store: 'employees',
                                variableHeights: true,
                                plugins: [
                                    {
                                        autoPaging: true,
                                        type: 'listpaging',
                                        itemId:'empPaging',
                                        id:'empPaging'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                navigationBar: {
                    docked: 'top',
                    ui: 'secondary',
                    id: 'empNavigationBar',
                    itemId:'empNavigationBar'
                }
            }
        ]
    },
    initialize: function() {
        var delBtn= { xtype: 'button',iconMask: true, text:'Back', align:'left', id:'empBackBtn', itemId:'empBackBtn', ui:'back', data: ''};
        Ext.getCmp("empNavigationBar").add(delBtn);
    }

});