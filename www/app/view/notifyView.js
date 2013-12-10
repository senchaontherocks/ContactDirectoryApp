Ext.define('SOG_Directory.view.notifyView', {
    extend: 'Ext.Container',
    xtype: 'notifyView',
    config: {        
        border: '0px',
        centered: true,
        height: '70%',
        id: 'notifyView',
        itemId: 'notifyView',
        style: 'background:#fff',
        width: '80%',
        hideOnMaskTap: true,
        modal: true,
        layout:{type:'fit'},
        listeners : {
            element  : 'element',
            tap      : function (el) {
                if(el.target.type != 'textarea')
                {
                    Ext.getCmp('txtNotify').blur();
                }
            }
        }
    },
    initialize: function(){
        
        //console.log(this.getData());
        if(this.getData().UnitName)
        {
            var noteHeading='<div><div class="mainName" >'+this.getData().Name+'<div><div class="unitName">'+this.getData().UnitName+'</div></div>';
        }
        else
        {
            var noteHeading='<div><div class="mainName" >'+this.getData().Name+'</div></div>';
        }
        var items= [
            {
                xtype: 'toolbar',
                docked: 'top',
                style: 'font-weight:normal;',
                ui: 'secondary',
                title: '<div align="center"><font class="alertTool">Report Incorrect Information</font></div>'
            },
            {
                xtype: 'container',
                layout: {
                    type: 'vbox'
                },
                scrollable:false,
                items:[
                       {
                            xtype: 'container',
                            padding: '10',
                            minHeight:'15%',
                            html: '<div align="center">'+noteHeading+'</div>',
                            style: 'color:#4ec2f5;'
                        },
                        {
                            xtype: 'formpanel',
                            flex:1,
                            ui: 'none',
                            layout: 'vbox',
                            style: 'background:none !important;',
                            scrollable:false,
                            items:[
                                    {
                                        xtype: 'fieldset',
                                        style: 'background:none !important;',
                                        flex:3,
                                        items: [									        
                                            {
                                                xtype: 'textareafield',									            
                                                maxRows: 10,
                                                draggable:false,
                                                id: 'txtNotify',
                                                name: 'bio',
                                                labelWidth:'0%',
                                                clearIcon:false,
                                                placeHolder:'Please provide details...',
                                                style:'font-size: 14px;font-style: italic;'
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'label',
                                        html: 'Reported By:',
                                        style: 'padding-left: 15px; font-size: 14px; font-weight: bold;'
                                    },
                                    {
                                        xtype: 'fieldset',
                                        style: 'background:none !important;',
                                        items: [									        
                                            {
                                                xtype: 'textfield',									            
                                                draggable:false,
                                                id: 'reportByTxt',
                                                labelWidth:'0%',
                                                clearIcon:false,
                                                placeHolder:'Full Name, Email, Phone',
                                                style:'font-size: 14px;font-style: italic;'
                                            },
                                        ]
                                    }
                            ]
                        }
                ]
                
            },
            {
                xtype: 'container',
                docked: 'bottom',
                padding: '0px 10px 10px 10px',
                ui: 'secondary',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        flex: 1,
                        ui: 'blue',                        
                        text: 'SUBMIT',
                        listeners:{
                            scope:this,
                            tap:this.submitButtonTap
                        }
                    },
                    {
                        xtype: 'spacer',
                        width: 10
                    },
                    {
                        xtype: 'button',
                        flex: 1,
                        ui: 'orange',                        
                        text: 'CANCEL',
                        listeners:{
                            scope:this,
                            tap:this.cancelButtonTap
                        }
                    }
                ]
            }
        ];
        this.add(items);
    },
    submitButtonTap:function(record){        
        this.fireEvent('submitButtonTap',this);
    },
    cancelButtonTap:function(record){        
        this.fireEvent('cancelButtonTap',this);
    }

});