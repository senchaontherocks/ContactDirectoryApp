Ext.define('SOG_Directory.view.favAgencyDetailView', {
    extend: 'Ext.Panel',
    xtype: 'favAgencyDetailView',
    requires: [
        'Ext.ux.AccordionList'
    ],

    config: {
        fullscreen: true,
        id: 'favAgencyDetailView',
        itemId: 'favAgencyDetailView',
        layout: 'fit',
        items: [               
            {
                xtype: 'panel',
                id: 'tplContainer',
                itemId: 'tplContainer',
		hidden: true,
                style: '',
		tpl: new Ext.XTemplate(
                    '<div class="detailParentTplDiv">',
                    '    <div class="shortDesDiv">',
                    '        <div class="detailImgDiv">',
                    '            <tpl if="HoSPictureURL">',
                    '            	<img class="detailImg" src="{HoSPictureURL}" alt="image" />',
                    '            <tpl else >',
                    '                <img class="detailImg" src="images/emp_88.png" alt="{HoSPictureURL}" />',
                    '           	</tpl>',
                    '        </div>',
                    '        <div class="textDetailDiv">',
                    '            <p class="nameSpan">{Name}</p>',
                    '            <p class="desSpan">{Address1Line1}</p>',
		    '            <p class="desSpan">{Address1Line2}</p>',
		    '            <tpl if="Fax">',
		    '            	<p class="desSpan">Fax No.:{Fax}</p>',
		    '            </tpl>',
                    '        </div>',
                    '    </div>',
                    '    <div class="shortDivParent">',
                    '        <div class="call divHide_{Phone1}"><img class="call" src="images/phone.png"/><font class="labelFont call">Phone:</font><font class="call valueFont">{Phone1}</font></div>',
                    '       {Phone2:this.shorten}',
                    '        <div class="browse divHide_{URL}"><img class="browse" src="images/web.png"/><font class="labelFont browse">Website:</font><font class=" browse valueFont">{URL}</font></div>',
                    '        <div class="addContact"><img class="addContact" src="images/add.png" /><font class="labelFont addContact">Add to Contacts </font></div>',
		    '        <div class="favorite"><img class="favorite" src="images/fav.png" /><font class="labelFont favorites">Add to Favorites</font></div>',
                    '		<div class="notify"><img class="notify" src="images/notify.png" /><font class="labelFont notify">Incorrect Info?</font></div>',
                    '    </div>',
                    '</div>',
		    '<div class="clear">&nbsp;</div>',
                    {        
                        shorten: function(phon)
			{
			    if(phon != null)
                            {
                              return '<div class="call"><img class="call" src="images/phone.png"/><font class="labelFont call">Phone:</font><font class="valueFont">{Phone2}</font></div>';
                            }
                        }
                    })
            },
            {
                xtype: 'container',
                id:'testcontainer',
                layout: 'fit'
            }
        ]
    },

    initialize: function() {
	    
	    this.element.on({
            tap: function(e)
            {
                var clsname = e.target.className;
		var me = Ext.getCmp('tplContainer');
                if(clsname.indexOf("favorite")!== -1)
                {
                    SOG_Directory.app.getController("empController").addFavAgency();
                }
                else if(clsname.indexOf("notify")!== -1)
                {
                    if(Ext.getCmp('popupNotify'))
                        Ext.getCmp('popupNotify').destroy();
			Ext.Viewport.add({
			    xtype: 'notifyView',
			    id: 'popupNotify',
			    data: me.getData()
			});
                }
                else if(clsname.indexOf("addContact")!== -1)
                {
                    var me = Ext.getCmp('tplContainer');
                    SOG_Directory.app.getController('empController').addContacts(me.getData());
		}
                else if(clsname.indexOf("call")!== -1)
                {
		    window.location="tel:"+me.getData().Phone1;
                }
                else if(clsname.indexOf("email")!== -1)
                {
                    window.location="mailto:"+me.getData().Email;
                }
                else if(clsname.indexOf("browse")!== -1)
                {
                    window.open("http://"+me.getData().URL,'_newtab');
		}
            }
        });

        var items = [
        {
            xtype: 'accordionlist',
            store: Ext.create('SOG_Directory.store.accordStore'),
            flex: 1,            
            id:'mainAccord',
	    itemId: 'mainAccord',
	    selectedCls: 'my-item-selected',
	    itemCls: 'custom_list_items',
	    headerItemTpl: [
			    '<div class="mainAccordDiv3">',
			    '<tpl if="this.isExpanded(values)">',
                                '<div class="down"></div>',
                                '<div style="padding:0px 0px 10px {level*20}px">{Name}</div>',
				'<tpl else>',
				    '<div class="right"></div>',
				    '<div style="padding:0px 0px 10px {level*20}px">{Name}</div>',
				'</tpl>',
			    '</div>'	
			    ].join(''),
	    contentItemTpl: [
			    '<tpl>',
			    '	<div style="border:1xp solid green; width: 100%;">',
			    '		<tpl if="level==2">',
			    //----------------//
			    '		<div class="detailParentTplDiv">',
			    '		    <div class="shortDesDiv">',
			    '		        <div class="detailImgDiv">',
			    '		            <tpl if="HoSPictureURL">',
			    '		            	<img class="detailImg" src="{HoSPictureURL}" alt="image" />',
			    '		            <tpl else >',
			    '		                <img class="detailImg" src="images/emp_88.png" alt="{HoSPictureURL}" />',
			    '		            </tpl>',
			    '		        </div>',
			    '		        <div class="textDetailDiv">',
			    '		            <p class="nameSpan">{Name}</p>',
			    '		            <p class="desSpan">{Address1Line1}</p>',
			    '		            <p class="desSpan">{Address1Line2}</p>',
			    '		            <p class="desSpan">{Address2Line1}</p>',
			    '		            <p class="desSpan">{Address2Line2}</p>',
			    '		            <tpl if="Fax">',
			    '		            	<p class="desSpan">Fax:{Fax}</p>',
			    '		            </tpl>',
			    '		        </div>',
			    '		    </div>',
			    '<div class="clear">&nbsp;</div>',
			    '		    <div class="shortDivParent">',
			    '				<div class="call divHide_{Phone1}"><img class="call" src="images/phone.png"/><font class="labelFont call">Phone No.:</font><font class="call valueFont">{Phone1}</font></div>',
			    '				<div class="browse divHide_{URL}"><img class="browse" src="images/web.png"/><font class="labelFont browse">Website:</font><font class=" browse valueFont">{URL}</font></div>',
			    '				<div class="addContact"><img class="addContact" src="images/add.png" /><font class="labelFont addContact">Add to Contacts </font></div>',
			    '				<div class="favorite"><img class="favorite" src="images/fav.png" /><font class="labelFont favorites">Add to Favorites</font></div>',
			    //'				<div class="notify"><img class="notify" src="images/notify.png" /><font class="labelFont notify">Incorrect Info?</font></div>',
			    '		    </div>',
			    '		</div>',
			    '	<tpl else>',
			    '	<div class="mainAccordDiv" >',
			    '		<div style="padding: 0px 0px 5px {level*20}px">',
			    '			<tpl if="Address1Line1">',
			    '			<div class="accordEmpName2" >',
			    '				<img class="call" src="images/address.png"/>',
			    '				<div class="valDiv">{Address1Line1}</div>',
			    '			</div>',
			    '			</tpl>',
			    '			<tpl if="Phone1">',
			    '			<div class="accordEmpName2" id="Phone#~#{Phone1}">',
			    '				<img  call" src="images/phone.png"/>',
			    '				<div class="valDiv">{Phone1}</div>',
			    '			</div>',
			    '			</tpl>',
			    '			<tpl if="Fax">',
			    '			<div class="accordEmpName2" >',
			    '				<div class="faxDiv">Fax:</div>',
			    //'				<img class="call" src="images/fax.png"/>',
			    '				<div class="valDiv">{Fax}</div>',
			    '			</div>',
			    '			</tpl>',
			    '			<tpl if="Email">',
			    '			<div class="accordEmpName2" id="Email#~#{Email}">',
			    '				<img class="email" src="images/message.png"/>',
			    '				<div class="valDiv">{Email}</div>',
			    '			</div>',
			    '			</tpl>',
			    '		</div>',
			    '	</div>',
			    '	</tpl>',
			    //----//
			    '	<div class="mainAccordDiv2" >',
			    '		<div style="padding: 0px 0px 5px {level*20}px">',
			    '			<tpl if="Employee.length!=0">',
			    '				<tpl for="Employee">',
			    '					<div class="accordEmpName" id={"Id"}>',
			    '						<div style="width: 95%";>{"Name"}</div><div class="desigDiv">{Designation}</div>',
			    '						<div ><img class="spanDiv" src="images/white_arrow.png" alt=""/></div>',
			    '					</div>',
			    '				</tpl>',
			    '			<tpl else>',
			    //'				<div class="accordEmpName" style="" align="center">No Employee Found</div>',
			    '			</tpl>',
			    '		</div>',
			    '	</div>',
			    '</div>',
			    '</tpl>'
	    ].join(''),
	    listeners: {
                itemtap:{
		    scope:this,
		    fn: 'onMainAccordDisclose'
		}
	    }}];
            Ext.getCmp('testcontainer').add(items);
            this.callParent(arguments);
    },
    onMainAccordDisclose:function(list, index, target, record, e, eOpts){
	console.log(this);
	this.fireEvent('onMainAccordDisclose',list, index, target, record, e, eOpts);
    },
});