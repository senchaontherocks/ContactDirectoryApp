Ext.define('SOG_Directory.model.favoriteEmployee', {
    extend: 'Ext.data.Model',

    config: {
        idProperty: 'name',
        proxy: {
            type: 'localstorage',
            id: 'fav-Employee'
        },
        fields: [
            {
                name: 'Message'
            },
            {
                name: 'ResultCode'
            },
            {
                name: 'Address1Latitude'
            },
            {
                name: 'Address1Longitude'
            },
            {
                name: 'Address2Flag'
            },
            {
                name: 'Address2Latitude'
            },
            {
                name: 'Address2Longitude'
            },
            {
                name: 'Designation'
            },
            {
                name: 'Email'
            },
            {
                name: 'Fax'
            },
            {
                name: 'Phone1'
            },
            {
                name: 'Phone2'
            },
            {
                name: 'HoSFlag'
            },
            {
                name: 'HoSPictureURL'
            },
            {
                name: 'Id'
            },
            {
                name: 'Name'
            },
            {
                name: 'Phone'
            },
            {
                name: 'Room'
            },
            {
                name: 'SortOrder'
            },
            {
                name: 'UnitId'
            },
            {
                name: 'UnitName'
            },
            {
                name : 'EmployeeName'
            },
            {
                name: 'ParentUnitID'
            },
            {
                name: 'ParentUnitName'
            }
        ]
    }
});