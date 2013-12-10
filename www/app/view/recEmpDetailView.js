Ext.define('SOG_Directory.view.recEmpDetailView', {
    extend: 'Ext.Panel',

    config: {
        id: 'recEmpDetailView',
        itemId: 'recEmpDetailView',
        autoDestroy: false,
        layout: {
            type: 'fit'
        },
        scrollable: 'vertical',
        tpl: new Ext.XTemplate(
                '<div class="detailParentTplDiv">',
                '    <div class="shortDesDiv">',
                '        <div class="detailImgDiv">',
                '            <tpl if="HoSPictureURL==null">',
                '               <img class="detailImg" src="images/emp_88.png" alt="image" />',
                '            <tpl else >',
                '                <img class="detailImg" src="{HoSPictureURL}" alt="{HoSPictureURL}" />',
                '            </tpl>',
                '        </div>',
                '        <div class="textDetailDiv">',
                '            <p><font class="nameSpan">{Name}</font><font class="desSpan">, <i>{Designation}</i></font><p/>',
                '            <p class="desSpan parentTxt">{ParentUnitName}</p><p class="desSpan">{UnitName}</p><p class="desSpan">{address}</p>',
                '            <tpl if="Room!=null">',
                '            <p class="desSpan">Room: {Room}</p>',
                '            </tpl>',
                '            <tpl if="Fax!=null">',
                '            <p class="desSpan">Fax: {Fax}</p>',
                '            </tpl>',
                '        </div>',
                '    </div>',
                '<div class="clear">&nbsp;</div>',
                '    <div class="shortDivParent">',
                '        <div class="call divHide_{Phone1}"><img class="call" src="images/phone.png"/><font class="labelFont call">Phone:</font><font class="call valueFont">{Phone1}</font></div>',
                '       {Phone2:this.shorten}',
                '        <div class="email divHide_{Email}"><img class="email" src="images/message.png" alt="" /><font class="labelFont email">Email:</font><font class="email valueFont">{Email}</font></div>',
                '        <div class="browse divHide_{Url}"><img class="browse" src="images/web.png"/><font class="labelFont browse">Website:</font><font class="browse valueFont">{Url}</font></div>',
                //'        <div class="addContact"><img class="addContact" src="images/add.png" /><font class="labelFont addContact">Add to Contacts </font></div>',
                //'        <div class="favorite"><img class="favorite" src="images/fav.png" /><font class="labelFont favorite">Add to Favorites</font></div>',
                //'       <div class="notify"><img class="notify" src="images/notify.png" /><font class="labelFont notify">Incorrect Info?</font></div>',
                '    </div>',
                '</div>',
                
                {
                    shorten: function(phon){
                        if(phon != null)
                        {
                          return '<div class="call2 divHide_{Phone2}"><img class="call2" src="images/phone.png"/><font class="labelFont call2">Phone:</font><font class="valueFont">'+phon+'</font></div>';
                        }
                    }
                })
    },

    initialize: function() {
        this.callParent();
        var me = this;
        this.element.on({
            tap: function(e)
            {
                var clsname = e.target.className;
                if(clsname.indexOf("favorite")!== -1)
                {
                    SOG_Directory.app.getController("empController").addFavEmp();
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
                    SOG_Directory.app.getController('empController').addContacts(me.getData());
                }
                else if(clsname.indexOf("call")!== -1)
                {
                    window.location="tel:"+me.getData().Phone1;
                }
                else if(clsname.indexOf("call2")!== -1)
                {
                    window.location="tel:"+me.getData().Phone2;
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
    }
});