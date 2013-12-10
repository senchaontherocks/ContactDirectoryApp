Ext.define('SOG_Directory.controller.empController', {
    extend: 'Ext.app.Controller',

    config: {
	    refs:{
		notifyView: 'notifyView'    
	    },
	control: {            
            "button#searchBtn": {
                tap: 'onSearchBtnTap'
            },
            "#mysearchfield": {
                keyup: 'onMysearchfieldKeyup',
                clearicontap: 'onMysearchfieldClearicontap'
            },
            "#agencySearchField": {
                keyup: 'onAgencySearchFieldKeyup',
                clearicontap: 'onAgencySearchFieldClearicontap'
            },
            "#employeeList": {
                itemtaphold: 'onEmployeeListItemTaphold',
                itemtap: 'onEmployeeListDisclose'
            },
            "#favEmpList": {
                itemtap: 'onFavEmpListDisclose',
                itemtaphold: 'onFavEmpListItemTaphold'
            },
            "#recentEmpList": {
                itemtap: 'onRecentEmpListDisclose',
                itemtaphold: 'onRecentEmpListItemTaphold'
            },
            "button#empBtn":{
                tap: 'onEmpBtn'
            },
	    "#favEmpNavBar":{
                pop: 'onFavEmpNavBarPop',
		activeitemchange: 'onFavEmpNavBarActiveitemchange'
            },
	    "#recentNavBar":{
                pop: 'onRecentNavBarPop',
		activeitemchange: 'onRecentNavBarActiveitemchange'
            },
	    "button#delBtn":{
		tap: 'onDelBtnTap'
	    },
	    "#empNavBar":{
		activeitemchange: 'onEmpNavBarActiveitemchange'
	    },
	    "button#empBackBtn":{
		tap:'onNavBackButtonTap'
	    },
	    "button#favBackBtn":{
		tap:'onNavBackButtonTap'
	    },
	    "button#recBackBtn":{
		tap:'onNavBackButtonTap'
	    },
	    notifyView: {
                cancelButtonTap:'cancelButtonTap',
                submitButtonTap: 'submitButtonTap'
            }
        }
    },
    onNavBackButtonTap: function(){
	Ext.getCmp("mainTab").setActiveItem(0);
    },
    onEmpNavBarActiveitemchange: function( me, value, oldValue, eOpts ){
	if(value.id=="ext-container-4")
	Ext.getCmp("empBackBtn").show();
	else
	Ext.getCmp("empBackBtn").hide();
    },
    
    onFavEmpNavBarActiveitemchange: function(me, value, oldValue, eOpts){
	if(value.id=="ext-container-12")
	Ext.getCmp("favBackBtn").show();    
	else
	Ext.getCmp("favBackBtn").hide();    
    },
    
    onRecentNavBarActiveitemchange: function(me, value, oldValue, eOpts){
	if(value.id=="recentListCont")
	Ext.getCmp("recBackBtn").show();    
	else
	Ext.getCmp("recBackBtn").hide();
    },
    
    cancelButtonTap: function(record){
        record.destroy();
    },
    
    submitButtonTap: function(record){
        var content= Ext.getCmp('txtNotify').getValue();
	var reportedBy=Ext.getCmp('reportByTxt').getValue();
        if(content==""){
            Ext.Msg.alert(appName,'Please enter notify detail.');
        }
	else if(reportedBy=="")
	{
	    Ext.Msg.alert(appName,'Please enter your Full Name, Email and Phone detail.');
	}
        else{
	    if(record.getData().UnitId)
	    {
		var UnitId=record.getData().UnitId;
		var EmployeeId=record.getData().Id;
	    }
	    else
	    {
		var UnitId=record.getData().Id;
		var EmployeeId="0";
	    }
	    
	    var params={
                url: webServiceUrl+'SendEmailToEmployee?AuthCode=AKIAIDIGOYOYAOOAGHTQ&UnitID='+UnitId+'&EmployeeId='+EmployeeId+'&body='+content+'&reportedBy='+reportedBy,
                method: 'GET',
                success: function(data){
                    if(data.statusText=="OK")
                    {
                        record.hide();
                        Ext.Msg.alert(appName,'Thank you for alerting us of a potential error in this directory.');
                    }
                },
                failure: function(response)
                {           
                    Ext.Msg.alert(appName,'Please try again.');
                },
                timeout:20000,
                callback: function(response) {}
            }
	    Ext.data.JsonP.request(params);
	    
	    /*Ext.data.JsonP.request({
		url: webServiceUrl+'SendEmailToEmployee?AuthCode=AKIAIDIGOYOYAOOAGHTQ&UnitID='+UnitId+'&EmployeeId='+EmployeeId+'&body='+content+'&reportedBy='+reportedBy,
		callbackKey: 'callback',
		params: {
		    format: 'json'
		},
		success: function(result) {
		    if(result.statusText=="OK")
                    {
                        record.hide();
                        Ext.Msg.alert(appName,'Thank you for alerting us of a potential error in this directory.');
                    }else
		    {
			record.hide();
                        Ext.Msg.alert(appName,'Please try again.');
		    }
		}
		failure: function(response)
		{           
		    record.hide();
		    Ext.Msg.alert(appName,'Please try again.');
		},
		timeout:20000
	    });*/
        }
    },
    onEmpBtn: function(){
	Ext.Viewport.setMasked({ xtype: 'loadmask'});
        var serchType = "Employee";
        var SearchText=Ext.getCmp("mysearchfield").getValue();
        if(SearchText=="")
        {
            var serchStore = Ext.getStore('employees');
	    Ext.Viewport.unmask();
        }
        else
        {
            var serchStore = Ext.getStore('searchEmpStore');
            var beforeLoadCount=serchStore.getCount();
	    serchStore.getProxy().setUrl(webServiceUrl+'SearchEntity?AuthCode=AKIAIDIGOYOYAOOAGHTQ&SearchText='+SearchText+'&Type='+serchType);
            serchStore.load({	
		params: {start: 0, limit: 25},
		callback: function (records, options, success) {
		    Ext.getCmp("employeeList").setStore(serchStore);
		    Ext.Viewport.unmask();
		}
	    });
	}
        
    },
    
    onSearchBtnTap: function(button, e, eOpts) {
	var SearchText = Ext.getCmp("homeSearchBtn").getValue();
	if(Ext.getCmp("empRadio").getChecked())
	{
	    var emp_url= webServiceUrl+'GetAllEmployees?AuthCode=AKIAIDIGOYOYAOOAGHTQ';
	    if(SearchText!="")
	    {
	    	emp_url= webServiceUrl+'SearchEntity?AuthCode=AKIAIDIGOYOYAOOAGHTQ&SearchText='+SearchText+'&Type=Employee';
	    }
	    Ext.Viewport.setMasked({ xtype: 'loadmask'});		
	    var serchStore = Ext.getStore('searchEmpStore');
	    serchStore.getProxy().setUrl(emp_url); 
	    serchStore.load({	
		params: {start: 0, limit: 25},
		callback: function (records, options, success) {
		    Ext.getCmp("employeeList").setStore(serchStore);
		    Ext.Viewport.unmask();
		}
	    });
	    Ext.getCmp("mysearchfield").setValue(SearchText);
	    Ext.getCmp("mainTab").setActiveItem(1);
	}
	else
	{
	    var agencyUrl= webServiceUrl+'GetAllUnit?AuthCode=AKIAIDIGOYOYAOOAGHTQ';
	    if(SearchText!="")
	    {
		agencyUrl= webServiceUrl+'SearchEntity?AuthCode=AKIAIDIGOYOYAOOAGHTQ&SearchText='+SearchText+'&Type=Agency';
	    }
	    Ext.Viewport.setMasked({ xtype: 'loadmask'});
	    var serchType = "Agency";
	    var serchStore = Ext.getStore('searchAgencyStore');
	    serchStore.getProxy().setUrl(agencyUrl);
	    serchStore.load({	
		params: {start: 0, limit: 25},
		callback: function (records, options, success) {				
		    Ext.getCmp("agencyList").setStore(serchStore);
		    Ext.Viewport.unmask();
		}
	    });
	    Ext.getCmp("agencySearchField").setValue(SearchText);
	    Ext.getCmp("mainTab").setActiveItem(2);
	}
    },

    onMysearchfieldKeyup: function(textfield, e, eOpts) {
        //this.onEmpBtn();
    },

    onMysearchfieldClearicontap: function(textfield, e, eOpts) {
        var serchStore = Ext.getStore('employees');
        Ext.getCmp("employeeList").setStore(serchStore);
        //Ext.getStore('employees').clearFilter();
	Ext.select('.x-list-paging').setStyle('display', 'block');
    },

    onAgencySearchFieldKeyup: function(textfield, e, eOpts) {
      //this.getApplication().getController('agencyController').onAgencyBtn();
    },

    onAgencySearchFieldClearicontap: function(textfield, e, eOpts) {
        var serchStore = Ext.getStore('agenciesStore');
        Ext.getCmp("agencyList").setStore(serchStore);
	Ext.select('.x-list-paging').setStyle('display', 'block');
    },

    onEmployeeListItemTaphold: function(dataview, index, target, record, e, eOpts) {
	var disclose= e.getTarget('.disclose');
        if(!disclose){
	    this.selectedItem= record.data;
	    this.navigationView=dataview.getParent().getParent();
	    this.getApplication().getController('empController').showShortCut(this);    
	}
        
    },

    onEmployeeListDisclose: function(list, index, target, record, e, eOpts) {
	var disclose= e.getTarget('.disclose');
        if(disclose){
            list.getParent().getParent().push(Ext.create("SOG_Directory.view.empDetailView",{
		title:"EMPLOYEE DETAIL",
		data:record.data
	    }));
	    var currentEmp = record.data;
	    var recEmpStore = Ext.getStore("recEmpStore");
	    if(recEmpStore.findRecord('Id', currentEmp.Id)=== null)
	    {
		recEmpStore.add(currentEmp);
	    }
	    else
	    {
		var localRecord= recEmpStore.find('Id', currentEmp.Id);
		if(localRecord >= 0)
		{
		    recEmpStore.removeAt(localRecord);
		    recEmpStore.sync();
		}
		recEmpStore.add(currentEmp);
	    }
	    recEmpStore.sync();
        }
    },
    
    onFavEmpListDisclose: function(list, index, target, record, e, eOpts) {
	var disclose= e.getTarget('.disclose');
        if(disclose){
	    list.getParent().getParent().push(Ext.create("SOG_Directory.view.favEmpDetailView",{
		title:"EMPLOYEE DETAIL"
	    }));
	    Ext.getCmp("favEmpDetailView").setData(record.data);
	    var btnData={store:"favEmp", data:record.data};
	    var delBtn= { xtype: 'button', iconCls: 'trash', iconMask: true, align: 'right', id:'delBtn', itemId:'delBtn', data: btnData}
	    Ext.getCmp("favNavigationBar").add(delBtn);
	}
    },

    onFavEmpListItemTaphold: function(dataview, index, target, record, e, eOpts) {
        this.selectedItem= record.data;
        this.navigationView=dataview.getParent().getParent();
        this.getApplication().getController('empController').showShortCut(this);
    },

    onRecentEmpListDisclose: function(list, index, target, record, e, eOpts) {
	var disclose= e.getTarget('.disclose');
        if(disclose){
	    list.getParent().getParent().push(Ext.create("SOG_Directory.view.recEmpDetailView",{
		title:"EMPLOYEE DETAIL",
		data:record.data
	    }));
	    var btnData={store:"recEmpStore", data:record.data};
	    var delBtn= { xtype: 'button', iconCls: 'trash', iconMask: true, align: 'right', id:'delBtn', itemId:'delBtn', data: btnData }
	    Ext.getCmp("recNavigationBar").add(delBtn);
	}
    },

    onRecentEmpListItemTaphold: function(dataview, index, target, record, e, eOpts) {
        this.selectedItem= record.data;
        this.navigationView=dataview.getParent().getParent();
        this.getApplication().getController('empController').showShortCut(this);
    },

    sendAjaxRequest: function() {
        var params = {
            url: webServiceUrl+'GetAllEmployees?AuthCode=AKIAIDIGOYOYAOOAGHTQ',
            method: this.type,
            params: this.data,
            success: this.callback,
            failure: function(response)
            {			
                Ext.Msg.alert(Ext.encode(response));
            },
            timeout:20000,
            callback: function(response) {}
        };			
        Ext.Ajax.request(params);
    },

    onButtonTap: function(record, actionSheet) {
        var index = record.getData().index;
        if(index=="0")
        {
            window.location="tel:"+this.conData.Phone1;
            record.getParent().hide();
        }
        else if(index=="1")
        {
            window.location="mailto:"+this.conData.Email;
            record.getParent().hide();
        }
        else if(index=="2")
        {
            this.navigationView.push(Ext.create("SOG_Directory.view.mapView",{
                title:"MAP",
                data:this.conData
            }));
            record.getParent().hide();
        }
        else if(index=="3")
        {
            record.getParent().hide();
	    SOG_Directory.app.getController('empController').addContacts(this.conData);
	}
        else if(index=="4")
        {
            record.getParent().hide();
        }
    },

    addFavEmp: function() {
	var currentEmp = Ext.getCmp("empDetailView").getData();
        var favEmp = Ext.getStore("favEmp");
        if( null === favEmp.findRecord('Id', currentEmp.Id))
        {
            favEmp.add(currentEmp);
	    Ext.Msg.alert(appName, currentEmp.Name+" added to favorites.");
	    favEmp.sync();
        }
	else
	{
	    Ext.Msg.confirm(appName, currentEmp.Name+" already exists, do you want to overwrite?", function(e){
		if(e=="yes")
		{
		    var localRecord= favEmp.find('Id', currentEmp.Id);
		    if(localRecord >= 0)
		    {
			favEmp.removeAt(localRecord);
			favEmp.sync();
		    }
		    favEmp.add(currentEmp);
		    Ext.Msg.alert(appName, currentEmp.Name+" added to favorites.");
		    favEmp.sync();
		}
	    });
	}
    },

    addFavAgency: function() {
        var currentAgency = Ext.getCmp("tplContainer").getData();
        var favAgency = Ext.getStore("favAgencyStore");
        if( null === favAgency.findRecord('Id', currentAgency.Id))
        {
            favAgency.add(currentAgency);
	    Ext.Msg.alert(appName, currentAgency.Name+" added to favorites.");
	    favAgency.sync();
        }
	else
	{
	    Ext.Msg.confirm(appName, currentAgency.Name+" already exists, do you want to overwrite?", function(e){
		if(e=="yes")
		{
		    var localRecord= favAgency.find('Id', currentAgency.Id);
		    if(localRecord >= 0)
		    {
			favAgency.removeAt(localRecord);
			favAgency.sync();
		    }
		    favAgency.add(currentAgency);
		    Ext.Msg.alert(appName, currentAgency.Name+" added to favorites.");
		    favAgency.sync();
		}
	    });    
	}
        
    },
    
    addContacts: function(data){
	Ext.Viewport.setMasked({ xtype: 'loadmask',message: 'Adding Contact..'});
	var options = new ContactFindOptions();
	options.filter   = data.Name;
	options.multiple = true;
	var fields       = ["displayName", "name", "phoneNumbers", "emails","addresses", "organizations", "urls", "photos"];
	navigator.contacts.find(fields, onSuccess, onError, options);
	function onSuccess(contacts) {
	    if(contacts.length > 0){
		for(i=0; i<contacts.length; i++){
		    if(contacts[i]["phoneNumbers"][0]["value"]==data.Phone1)
		    {
            
           if(contacts[i]["emails"]){
	    if(contacts[i]["emails"].length>0){
		
		 for(j=0; j<contacts[i]["emails"].length; j++)
		 {
		     if(contacts[i]["emails"][j]["value"]==data.Email)
		     {
			 data['isEmail']=1;
			 break;
		     }
		 }
	    }
           
           }
			Ext.Viewport.unmask();
			var conId=contacts[i].id;
			var conRawId= contacts[i].rawId
			Ext.Msg.confirm(appName, "Contact already exists? Do you want to want to update?", function(e){
			    if(e=="yes")
			    {
				Ext.Viewport.setMasked({ xtype: 'loadmask',message: 'Updating Contact..'});
				SOG_Directory.app.getController('empController').addContactDetail(data, conId, conRawId);
			    }
			});
		    }
		    else
		    {
			SOG_Directory.app.getController('empController').addContactDetail(data);
		    }
		}
	    }
	    else
	    {
		SOG_Directory.app.getController('empController').addContactDetail(data);
	    }
	    
	};
	function onError(contactError) {
	    Ext.Msg.alert(appName, "Try again");
	}
    },
    
    addContactDetail: function(data, id, rawId){
	var contact = navigator.contacts.create({"displayName": data.Name});
	var name = new ContactName();
	name.givenName = data.Name;
	var phone = []; 
	phone[0]=  new ContactField('mobile',data.Phone1 , true);
	if(data.Phone2 != null)
	{
	    phone[1]=  new ContactField('work',data.Phone2 , true);
	}
	var email = [];
	email[0]= new ContactField('email',data.Email , true);
	
	contact.name = name;
	contact.displayName = data.Name;
	contact.nickname = data.Name;
           if(data.isEmail)
           {
                if(data.isEmail!=1){
                    contact.emails = email;
                }
           }
           else
           {
		contact.emails = email;
           }
	if(id){
	   contact.id=id;
	   contact.rawId=rawId;
	}
	else
	{
	    contact.phoneNumbers = phone;
    }
	// save
	contact.save();
	Ext.Viewport.unmask();
	Ext.Msg.alert(appName, "Contact Saved");
    },
    
    
    onFavEmpNavBarPop:function( obj, view, eOpts){
	if(Ext.getCmp("delBtn"))
	Ext.getCmp("delBtn").destroy( obj, view, eOpts);
    },
    onRecentNavBarPop:function(){
	if(Ext.getCmp("delBtn"))
	Ext.getCmp("delBtn").destroy();
    },
    onDelBtnTap: function(obj, e, eOpts ){
	var parentNavView = obj.getParent().getParent().getParent();
	var currentData = obj.getData().data;
        var currentStore = Ext.getStore(obj.getData().store);
	var localRecord= currentStore.find('Id', currentData.Id);
	if(localRecord >= 0)
        {
	    currentStore.removeAt(localRecord);
	    currentStore.sync();
	    parentNavView.pop();
	    //Ext.Msg.alert(appName, currentData.Name+" removed.", Ext.emptyFn);
        }
    },
    showShortCut: function(record) {
        this.navigationView=record.navigationView;
        this.conData=record.selectedItem;
        if(Ext.getCmp('employeeOptions'))
        	Ext.getCmp('employeeOptions').destroy();
        
        this.actionSheet = Ext.create('Ext.ActionSheet', {
            defaults:{
                listeners:{
                    tap: {
                        fn: this.onButtonTap,
                        scope:this
                    }
                }
            },
            hidden:true,
            id: 'employeeOptions',            
            hideOnMaskTap: true,
            items: [
            {
                xtype:'button',
                text: '<img src="images/phone_w.png" class="imgAction"/>CALL',
                hidden:(record.selectedItem.Phone1==null)?true:false,
                ui:'pink',
                data : {index:0}
            },
            {
                xtype:'button',
                text: '<img src="images/e-mail_w.png" class="imgAction"/>E-MAIL',
		hidden:(record.selectedItem.Email==null)?true:false,
                ui:'blue',
                data : {index:1}
            },
            {
                xtype:'button',
                text: '<img src="images/add_w.png" class="imgAction"/>ADD TO CONTACTS',
                data : {index:3},
                ui:'green'
            },
	    {
                xtype:'button',
                text: '<img src="images/map.png" class="imgAction"/>MAP',
                ui:'orange',
                data : {index:2},
                iconAlign: 'center'
            },
            {
                xtype:'button',
                text: 'CANCEL',
                data : {index:4},
                ui:'red'
            }
            ]
        });

        Ext.Viewport.add(this.actionSheet);
        this.actionSheet.show();
    },
});