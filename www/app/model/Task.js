Ext.define('SOG_Directory.model.Task', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'Name',
                type: 'string'
            },
            {
                name: 'Employee'
            },
            {
                name: 'level'
            },
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
                name: 'Address1Line1'
            },
            {
                name: 'Address1Line2'
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
                name: 'Address2Line1'
            },
            {
                name: 'Address2Line2'
            },
            {
                name: 'Address2Longitude'
            },
            {
                name: 'ChildUnit'
            },
            {
                name: 'Email'
            },
            {
                name: 'Fax'
            },
            {
                name: 'Id'
            },
            {
                name: 'Leaf'
            },
            {
                name: 'Other_Information'
            },
            {
                name: 'ParentId'
            },
            {
                name: 'Phone1'
            },
            {
                name : 'Phone2'   
            },
            {
                name: 'SortOrder'
            },
            {
                name: 'URL'
            },
            {
                name: 'EntityName'
            },
            {
                name: 'HoSPictureURL'
            }
        ]
    }
});