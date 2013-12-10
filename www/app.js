Ext.Loader.setConfig({
    paths: {
        Ext: 'touch/src',
        'SOG_Directory': 'app',
        'Ext.ux': 'ux'
    }
});

Ext.application({
    models: [
        'employee',
        'favoriteEmployee',
        'recentEmployee',
        'agency',
        'Task',
        'favoriteAgency',
        'recentAgency'
    ],
    stores: [
        'employees',
        'empfavStore',
        'recEmpStore',
        'agencies',
        'accordStore',
        'favAgencyStore',
        'recAgencyStore',
        'searchEmpStore',
        'searchAgencyStore'
    ],
    views: [
        'searchView',
        'serchForm',
        'employeeView',
        'favoriteView',
        'recentView',
        'agencyView',
        'empDetailView',
        'mapView',
        'favEmpDetailView',
        'agencyDetailView',
        'notifyView',
        'favAgencyDetailView',
        'recEmpDetailView'
    ],
    controllers: [
        'empController',
        'agencyController'
    ],
    name: 'SOG_Directory',

    launch: function() {
        Ext.create('SOG_Directory.view.searchView', {fullscreen: true});
        var geo = new Ext.util.Geolocation({
            autoUpdate: true,
            allowHighAccuracy: true,
            listeners: {
                locationupdate: function(geo) {
                    currLatitude = geo.getLatitude();
                    currLongitude = geo.getLongitude();
                }
            }
        });
        navigator.geolocation.getCurrentPosition(onSuccess);
        function onSuccess(position) {
            currLatitude = position.coords.latitude;
            currLongitude = position.coords.longitude;    
        }
    }

});
