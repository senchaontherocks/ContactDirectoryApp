Ext.define('SOG_Directory.view.mapView', {
    extend: 'Ext.Container',
    config:{
        listeners: [
            {
                fn: 'onMymapMaprender',
                event: 'maprender',
                delegate: '#mymap'
            }
        ]
    },
    initialize: function() {
        
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapData = this.getData();
        if(currLatitude && currLongitude)
        {
            myLatlng = new google.maps.LatLng(currLatitude, currLongitude);    
        }
        else
        {
            Ext.Msg.alert(appName, "Please enable location services to see your current location");
            myLatlng = new google.maps.LatLng(mapData.Address1Latitude, mapData.Address1Longitude);    
        }
        var items= [
            {
                xtype: 'map',
                height: '100%',
                hidden: false,
                itemId: 'mymap',
                id:'mymap',
                styleHtmlContent: true,
                modal: true,
                mapOptions: {
                    zoom: 11,
                    center: myLatlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    navigationControl: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scrollwheel: true,
                    scaleControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.LARGE
                    }
                }
            }
        ];
        
        this.callParent(arguments);
        this.add(items);
    },
    onMymapMaprender: function(map, gmap, eOpts) {
        
        directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
        var mymap= map.getMap();
        var mapData = this.getData();
        var infoWindowData='<div class="mapInfo">';
        infoWindowData+='<div style="float:left">';
        infoWindowData+='<img class="mapImg" src="images/emp_50.png" alt="image" /></div>';
        if(mapData.Designation)
        infoWindowData+='<div class="mapText"><font class="nameSpan">'+mapData.Name+'</font><br /><p class="desSpan">'+mapData.Designation+'</p></div></div>';
        else
        infoWindowData+='<div class="mapText"><font class="nameSpan">'+mapData.Name+'</font><br /><p class="desSpan">'+mapData.Address1Line1+'</p></div></div>';
        
        var locations=  new Array(2);
        for (i=0; i <2; i++)
        locations[i]=new Array(3)
        locations[0][0]=currLatitude;
        locations[0][1]=currLongitude;
        locations[0][2]="My Location";
        locations[1][0]=mapData.Address1Latitude;
        locations[1][1]=mapData.Address1Longitude;
        locations[1][2]=infoWindowData;
        
        
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i = 0; i < locations.length; i++)
        {  
            
            if(locations[i][0] && locations[i][1])
            {
                if(locations[i][2]=="My Location")
                var iconUrl='http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                else
                var iconUrl='http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][0], locations[i][1]),
                    icon: iconUrl,
                    map: mymap,
                    data:locations[i][2]
                });
                google.maps.event.addListener(marker, 'click', (function(marker){
                    return function() {
                        infowindow.setContent(marker.data);
                        infowindow.open(mymap, marker);
                    }
                })(marker));    
            }
        }
        marker.setMap(mymap);
        
        if(currLatitude && currLongitude)
        {
            var listener = google.maps.event.addListener(map, "idle", function () {
                    map.setZoom(17);
                    google.maps.event.removeListener(listener);
            });
            directionsDisplay.setMap(mymap);
        
            var start = currLatitude+","+currLongitude;
            var end = locations[1][0]+","+locations[1][1];
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }else{
                   Ext.Msg.alert(appName, "Driving directions not found!");
                }
            });    
        }
        
        
        
        
        
        
        
        
    }
});