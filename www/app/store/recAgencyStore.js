Ext.define('SOG_Directory.store.recAgencyStore', {
    extend: 'Ext.data.Store',

    requires: [
        'SOG_Directory.model.recentAgency'
    ],

    config: {
        autoLoad: true,
        model: 'SOG_Directory.model.recentAgency',
        storeId: 'recAgencyStore',
        proxy: {
            type: 'localstorage',
            id: 'recent-Agency'
        },
        sorters: [{
            property: 'name',    
            direction: 'DESC'
        }]
    }
});

//{"Fax":null,"Message":null,"Address1Latitude":0,"Address1Line1":"Agriculture Building 19 Martin Luther King, Jr. Dr","Address1Line2":"Atlanta, Georgia 30334-4201","Address1Longitude":0,"Address2Flag":false,"Address2Latitude":0,"Address2Line1":"","Address2Line2":"","Address2Longitude":0,"ChildUnit":null,"Email":null,"ResultCode":null,"Id":43,"Name":"Agriculture, Georgia Department of ","Other_Information":null,"ParentId":1,"Phone1":"(404) 656-3600 ","Phone2":null,"SortOrder":8,"URL":"www.agr.georgia.gov","HoSPictureURL":"http://50.23.221.50/ContactDirectory/Content/Images/HoS/8154c91f-5d68-4137-b3d9-98f8b09c6401.jpg","name":"ext-record-88"}