Ext.define('SOG_Directory.controller.agencyController', {
    extend: 'Ext.app.Controller',

    config: {
	refs:{
	    agencyDetailView: 'agencyDetailView',
	    favAgencyDetailView: 'favAgencyDetailView'
	},
        control: {
	    agencyDetailView:{
		onMainAccordDisclose:'onMainAccordDisclose'
	    },
	    favAgencyDetailView:{
		onMainAccordDisclose:'onMainAccordDisclose'
	    },
            "#favAgencyList": {
                itemtap: 'onFavAgencyListDisclose',
                itemtaphold: 'onFavAgencyListItemTaphold'
            },
            "#recentAgencyList": {
                itemtap: 'onRecentAgencyListDisclose',
                itemtaphold: 'onRecentAgencyListItemTaphold'
            },
            "list#agencyList": {
                itemtap: 'onAgencyListDisclose',
                itemtaphold: 'onAgencyListItemTaphold'
            },
	    "accordionlist#mainAccord":{
		heightchange:'onMainAccordHeightChange'
	    },
            "button#agencyBtn":{
                tap: 'onAgencyBtn'
            },
	    "#agencyNavBar":{
		activeitemchange: 'onAgeNavBarActiveitemchange'
	    },
	    "button#ageBackBtn":{
		tap: 'onAgeBackBtnTap'
	    }
        }
    },
    onAgeBackBtnTap: function(){
	Ext.getCmp("mainTab").setActiveItem(0);
    },
    
    onAgeNavBarActiveitemchange: function( me, value, oldValue, eOpts ){
	if(value.id=="ext-container-8")
	Ext.getCmp("ageBackBtn").show();
	else
	Ext.getCmp("ageBackBtn").hide();
    },
    // search agency on agency view
    onAgencyBtn: function(){
	Ext.Viewport.setMasked({ xtype: 'loadmask'});
        var serchType = "Agency";
        var SearchText=Ext.getCmp("agencySearchField").getValue();
        if(SearchText=="")
        {
            var serchStore = Ext.getStore('agenciesStore');
	    Ext.Viewport.unmask();
        }
        else
        {
            var serchStore = Ext.getStore('searchAgencyStore');
            serchStore.getProxy().setUrl(webServiceUrl+'SearchEntity?AuthCode=AKIAIDIGOYOYAOOAGHTQ&SearchText='+SearchText+'&Type='+serchType);
            serchStore.load({	
		params: {start: 0, limit: 25},
		callback: function (records, options, success) {
		    Ext.getCmp("agencyList").setStore(serchStore);
		    Ext.Viewport.unmask();
		}
            });
        }
    },
    // view agency detail from favorite view
    onFavAgencyListDisclose: function(list, index, target, record, e, eOpts) {
        var disclose= e.getTarget('.disclose');
        if(disclose){
	    Ext.Viewport.setMasked({ xtype: 'loadmask'});
            list.getParent().getParent().push(Ext.create("SOG_Directory.view.favAgencyDetailView",{
                title:"AGENCY DETAIL"
            }));
            Ext.getCmp("tplContainer").setData(record.data);
	    this.addAccordian(record);
	    var btnData={store:"favAgencyStore", data:record.data};
	    var delBtn= { xtype: 'button', iconCls: 'trash', iconMask: true, align: 'right', id:'delBtn', itemId:'delBtn', data: btnData }
	    Ext.getCmp("favNavigationBar").add(delBtn);
        }
    },
    // view agency detail from recent view
    onRecentAgencyListDisclose: function(list, index, target, record, e, eOpts) {
        
	var disclose= e.getTarget('.disclose');
        if(disclose){
	    Ext.Viewport.setMasked({ xtype: 'loadmask'});
            list.getParent().getParent().push(Ext.create("SOG_Directory.view.agencyDetailView",{
                title:"AGENCY DETAIL"
            }));
            Ext.getCmp("tplContainer").setData(record.data);
            this.addAccordian(record);
	    var btnData={store:"recAgencyStore", data:record.data};
	    var delBtn= { xtype: 'button', iconCls: 'trash', iconMask: true, align: 'right', id:'delBtn', itemId:'delBtn', data: btnData }
	    Ext.getCmp("recNavigationBar").add(delBtn);
        }
    },
    // view agency detail from agency view
    onAgencyListDisclose: function(list, index, target, record, e, eOpts) {
        
        var disclose= e.getTarget('.disclose');
        if(disclose){
	    Ext.Viewport.setMasked({ xtype: 'loadmask'});
            list.getParent().getParent().push(Ext.create("SOG_Directory.view.agencyDetailView",{
                title:"AGENCY DETAIL"
            }));
            this.addAccordian(record);
            Ext.getCmp("tplContainer").setData(record.data);
            var recAgencyStore = Ext.getStore("recAgencyStore");
            if( null === recAgencyStore.findRecord('Id', record.data.Id))
            {
                recAgencyStore.add(record.data);
            }
	    else
	    {
		var localRecord= recAgencyStore.find('Id', record.data.Id);
		if(localRecord >= 0)
		{
		    recAgencyStore.removeAt(localRecord);
		    recAgencyStore.sync();
		}
		recAgencyStore.add(record.data);
	    }
            recAgencyStore.sync();
	}
    },
    
    onAgencyListItemTaphold: function(dataview, index, target, record, e, eOpts) {
        this.selectedItem= record.data;
        this.navigationView=dataview.getParent().getParent();
        this.getApplication().getController('empController').showShortCut(this);
    },

    onRecentAgencyListItemTaphold: function(dataview, index, target, record, e, eOpts) {
        this.selectedItem= record.data;
        this.navigationView=dataview.getParent().getParent();
        this.getApplication().getController('empController').showShortCut(this);
    },

    onFavAgencyListItemTaphold: function(dataview, index, target, record, e, eOpts) {
        this.selectedItem= record.data;
        this.navigationView=dataview.getParent().getParent();
        this.getApplication().getController('empController').showShortCut(this);
    },
    
    addAccordian: function(record) {
        var accordStore = Ext.getStore('accordStore');
        var params = {
                url: webServiceUrl+'ShowUnitDetails?AuthCode=AKIAIDIGOYOYAOOAGHTQ&UnitId='+record.data.Id,
                method: 'GET',
		success:function(data){
                    var res = Ext.encode(data);
                    accordStore.setData(res);
		    Ext.Viewport.unmask();
                },
                failure: function(response)
                {           
                    Ext.Viewport.unmask();
		    Ext.Msg.alert(appName,'Server not responding.');
                },
                timeout:20000
            };
        Ext.data.JsonP.request(params);
    },
    
    onMainAccordDisclose: function(list, index, target, record, e, eOpts) {
	var clickTarget=eOpts.getTarget('.accordEmpName');
	var clickTarget2=eOpts.getTarget('.accordEmpName2');
	if(clickTarget){
	    var empId=eOpts.getTarget('.accordEmpName').id;
	    Ext.Viewport.setMasked({ xtype: 'loadmask'});
	    var params = {
		    url: webServiceUrl+'ShowEmployeeDetails?AuthCode=AKIAIDIGOYOYAOOAGHTQ&EmployeeId='+empId,
		    method: 'GET',
		    dataType: 'jsonp',
		    success:function(data){
			list.getParent().getParent().getParent().push(Ext.create("SOG_Directory.view.empDetailView",{
			    title:"EMPLOYEE DETAIL",
			    data:data
			}));
			Ext.Viewport.unmask();
		    },
		    failure: function(response)
		    {           
			Ext.Viewport.unmask();
			Ext.Msg.alert(appName,'Server not responding.');
		    },
		    timeout:20000
		};
	    Ext.data.JsonP.request(params);
	}
	else if(clickTarget2)
	{
	    var valtype=eOpts.getTarget('.accordEmpName2').id;
	    data=valtype.split('#~#');
	    if(data[0]=="Phone"){
		window.location="tel:"+data[1];
	    }
	    else if(data[0]=="Email"){
		window.location="mailto:"+data[1];
	    }
	}
    }
});