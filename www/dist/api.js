MAX_ZOOM = 18;

var fromProjection = new OpenLayers.Projection("EPSG:4326"); // transform from WGS 1984
var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

/**
 * Cette fonction permet de créer une carte openstreetmap pour l'incorporer dans un balise html
**/
function creerCarte(idBaliseHtml){
	//var extent = new OpenLayers.Bounds(-1.32,51.71,-1.18,51.80).transform(fromProjection,toProjection);

	var options = {
      //restrictedExtent : extent,
      controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.Attribution()
      ]
    };


	var map = new OpenLayers.Map(idBaliseHtml, options);
	/*var map = new OpenLayers.Map({
			    //projection: "EPSG:3857",
			    maxExtent: new OpenLayers.Bounds(-200000, -200000, 200000, 200000)
			});*/
	// couche de base avec openstreetmap
	var osmLayer = new OpenLayers.Layer.OSM();
	map.addLayer(osmLayer);
	// couche des marqueurs
	var couche_marqueurs = new OpenLayers.Layer.Markers("Marqueurs");
    map.addLayer(couche_marqueurs);
    // couche pour les polygones
    var couche_polygones = new OpenLayers.Layer.Vector("Polygones");
    map.addLayer(couche_polygones);	
	// couche des itineraires
	var styleMap = new OpenLayers.StyleMap({'default':new OpenLayers.Style({strokeWidth:3, strokeColor:'black'})});
    var couche_itineraires = new OpenLayers.Layer.Vector('Itineraire', {styleMap:styleMap});
	map.addLayer(couche_itineraires);
	// couche pour les popups des marqueurs
	var couche_popups = new OpenLayers.Layer.Vector("PopupMarqueurs");
    map.addLayer(couche_popups);

	toProjection = map.getProjectionObject();
	// console.log(toProjection);
	var position = new OpenLayers.LonLat(11.52, 3.83).transform(fromProjection,toProjection);
	var zoom = 1;
	map.setCenter(position, zoom );
	map.div.hidden = true;
	return map;
}

/**
 * Cette fonction permet d'afficher une carte qui a été créée
**/
function afficherCarte(map, centre, zoom){
  if(zoom === undefined || zoom == null){
    zoom = 1;
    map.zoomTo(zoom) ;
  }
  if(centre === undefined || centre == null){
  	if(zoom > MAX_ZOOM) 
    	zoom = MAX_ZOOM;
     map.zoomToMaxExtent();
     map.setCenter(new OpenLayers.LonLat(13.52, 3.83).transform(fromProjection, toProjection), zoom);
     map.zoomTo(zoom) ;
     
  }else{ 
    var lonLat = new OpenLayers.LonLat( centre.lon ,centre.lat )
            .transform(
              new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
              map.getProjectionObject() // to Spherical Mercator Projection
            ); 
    if(zoom > MAX_ZOOM) 
    	zoom = MAX_ZOOM;     
    map.setCenter (lonLat, zoom);
    map.zoomTo(zoom) ;
    
  }
  map.div.hidden = false;
  return map;
}


/**
 * Cette fonction permet d'afficher une carte qui a été créée
**/

function masquerCarte(map){
	if(map!=undefined || map != null)
		map.div.hidden = true;
	return map;
}

/**
 * Cette fonction permet d'ajouter des points sur une carte donnée
**/
function ajouterPoints(map, listePoints){
	toProjection = map.getProjectionObject();

	var markers = map.getLayersByName("Marqueurs")[0];

	var couche_popups = map.getLayersByName("PopupMarqueurs")[0];

    var position = new OpenLayers.LonLat(11.52, 3.83).transform(fromProjection, toProjection);
	var size = new OpenLayers.Size(0, 0);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	//var icon = new OpenLayers.Icon('http://www.openstreetmap.org/openlayers/img/marker.png',size,offset);
	var icon = new OpenLayers.Icon('icon.png',size, offset);
	
    for (var i = 0; i < listePoints.length; i++) {
    	point = listePoints[i];
    	icon = new OpenLayers.Icon('',size, offset);	
    	pointGeo = new OpenLayers.LonLat(point.lon, point.lat).transform(fromProjection, toProjection);
    	marqueur = new OpenLayers.Marker(pointGeo, icon);
    	marqueur.point = point;
    	markers.addMarker(marqueur);
    	//console.log(marqueur);

    	//gestion des popups
    	var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( point.lon, point.lat ).transform(fromProjection, toProjection),
            {point:point},
            {externalGraphic: point.icone, graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
        );
        couche_popups.addFeatures(feature);
    }

    //Suite de gestion des popups
    var controls = {
      selector: new OpenLayers.Control.SelectFeature(couche_popups, { onSelect: createPopup, onUnselect: destroyPopup })
    };

    function createPopup(feature) {
      feature.popup = new OpenLayers.Popup.FramedCloud("pop",
          feature.geometry.getBounds().getCenterLonLat(),
          null,
          '<div class="markerContent">'+feature.attributes.point.description+'</div>',
          null,	
          true,
          function() { controls['selector'].unselectAll(); }
      );
      //feature.popup.closeOnMove = true;
      map.addPopup(feature.popup);
    }

    function destroyPopup(feature) {
      feature.popup.destroy();
      feature.popup = null;
    }
    
    map.addControl(controls['selector']);
    controls['selector'].activate();
	return map;
}


/**
 * Cette fonction permet de supprimer des points sur une carte donnée
**/
function supprimerPoints(map, listePoints){
	var marqueurs = map.getLayersByName("Marqueurs")[0].markers;
	var couche_popups = map.getLayersByName("PopupMarqueurs")[0];
	popups = couche_popups.features;
	var point = listePoints[0];
	var pointGeo;
	for (var j = 0;  j< listePoints.length; j++) {
		point = listePoints[j];	
		//pointGeo = new OpenLayers.LonLat(point.lon, point.lat).transform(fromProjection, toProjection);
		//console.log(pointGeo);
		for (var i = marqueurs.length - 1; i >= 0; i--) {
			var marqueur = marqueurs[i].point;
			if(marqueur.lon == point.lon && marqueur.lat == point.lat)
			{
				//marqueurs.splice(i, 1);
				map.getLayersByName("Marqueurs")[0].removeMarker(marqueurs[i]);
			}
		}

		for (var i = popups.length - 1; i >= 0; i--) {
			var popup = popups[i].attributes.point;
			if(popup.lon == point.lon && popup.lat == point.lat)
			{
				couche_popups.removeFeatures(popups[i]);
			}
		}	
	}
	return map;
}

/**
 * Cette fonction permet de trace une route qui pourrait exister entre un depart et un arrive
**/
function localiserPoints(map, listedepoints, zoom){
	map.setCenter(new OpenLayers.LonLat(listedepoints[0].lon, listedepoints[0].lat).transform(fromProjection, toProjection), zoom);
	
	return map;
}

/**
 * Cette fonction permet de trace une route qui pourrait exister entre un depart et un arrive
**/
function traceroute(couche_itineraires, depart, arrive){
	// Adresses
	var origin = depart;
	var destination = arrive;
	var encoded_polyline; 
	var decoded_polyline;
	// Itinéraire
	var directionsService = new google.maps.DirectionsService();
	directionsService.route({origin:origin, destination:destination, travelMode:google.maps.TravelMode.DRIVING}, function(result, status){
	    if(status == google.maps.DirectionsStatus.OK)
	    {
			
			// Parcours des points de l'itinéraire
			encoded_polyline = result['routes'][0]['overview_polyline'];
			//console.log(result);
			//console.log(encoded_polyline);
			decoded_polyline = google.maps.geometry.encoding.decodePath(encoded_polyline);
			//console.log(decoded_polyline);
			var points = new Array();
			for(var i in decoded_polyline)
			{
			    var lonlat = new OpenLayers.LonLat(decoded_polyline[i].lng(), decoded_polyline[i].lat()).transform(fromProjection, toProjection);
				var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
				points.push(point);
			}
			// Ajout de l'itinéraire à la couche
			feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(points));
			feature.attributes = {begin:origin , end:destination };
			couche_itineraires.addFeatures([feature]);
			
			// Centrage de la carte sur l'emprise de la couche
			//cartographie.zoomToExtent(couche_itineraires.getDataExtent());
	    }else{
	    	//console.log(result);
	    	console.log(status);/*
	    	console.log(depart);
	    	console.log(arrive);*/
	    }
	});

	return couche_itineraires;
}

/**
 * Cette fonction permet de relier des points par des chemins
**/
function relierPoints(map, tableau_liens){
	var carte = map;
	var lien=[];
	var depart, arrive;
	couche_itineraires = carte.getLayersByName("Itineraire")[0];
	console.log(couche_itineraires);
	for (var i = 0; i < tableau_liens.length; i++) {
		lien= tableau_liens[i];
		depart = {lat:lien[0].lat, lng:lien[0].lon};
		arrive = {lat:lien[1].lat, lng:lien[1].lon};
		
		couche_itineraires = traceroute(couche_itineraires, depart, arrive);
		//console.log(couche_itineraires);
	}
	//carte.zoomToExtent(couche_itineraires.getDataExtent());
	return carte;
}

/**
 * Cette fonction permet de relier des points par des chemins
**/
function supprimerLiens(map, tableau_liens){
	var couche_itineraires = map.getLayersByName("Itineraire")[0];
	var listeLiens = couche_itineraires.features;
	var lien, deb, fin;

	for (var j = 0; j < tableau_liens.length; j++) {
		lienASup = tableau_liens[j];
		// debSup = new OpenLayers.LonLat(lienASup[0].lon, lienASup[0].lat).transform(fromProjection, toProjection);
		// finSup = new OpenLayers.LonLat(lienASup[1].lon, lienASup[1].lat).transform(fromProjection, toProjection);
		debSup = lienASup[0]; finSup = lienASup[1];

		for (var i = 0; i < listeLiens.length; i++) {
			lien = listeLiens[i].attributes;
			deb = lien.begin;
			fin = lien.end;
			if(deb.lng == debSup.lon && deb.lat == 	debSup.lat && fin.lat == finSup.lat && fin.lng == finSup.lon){
				couche_itineraires.removeFeatures(listeLiens[i]);
				//listeLiens = couche_itineraires.features;
				console.log("une suppression");
				//break;
			}
		}
	}
	return map;
}

/**
 * Cette fonction permet de representer un polygone sur un ensemble de points
**/
function representerPolygone(map, points){   

  if(map !== undefined ){
    var newPoint;
    var pointList = [];	
    for(var i=0; i<points.length; i++){
      newPoint = new OpenLayers.Geometry.Point(points[i].lon ,points[i].lat).transform(fromProjection, toProjection);;
      pointList.push(newPoint);
    }
    couche_polygones = map.getLayersByName("Polygones")[0];
    /*var layer_style = new OpenLayers.Style(); layer_style.layerName = ("Marqueurs"); layer_style.setDefaultStyle();
    var style_poly = OpenLayers.Util.extend({}, layer_style); 	
  	style_poly.strokeColor = "orange";
    style_poly.fillColor = "yellow";*/

    var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
    var polygonFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([linearRing]));
    map.addLayer(couche_polygones);
    console.log(couche_polygones);
    couche_polygones.addFeatures([polygonFeature]);
    //map.zoomToExtent(couche_polygones.getDataExtent());
  }
  return map;
}


