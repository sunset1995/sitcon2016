require('../lib/dom.js');

var locationMap = Qid('location-map');
var mapOpenMiddle = function() {
	addClass(locationMap, 'middle');
}
var mapOpenFinal = function() {
	addClass(locationMap, 'open');
	setTimeout(loadingMap, 1500);
	setTimeout(function() {
		Q('#group-map>.location-address').style.opacity = '1';
	}, 2000);
}

var locationOpening = function() {
	removeEvent(Qid('link-location'), 'click',
					locationOpening);
	setTimeout(mapOpenMiddle, 1000);
	setTimeout(mapOpenFinal, 1500);
}

if( location.hash.slice(8) === 'location' ) {
	setTimeout(mapOpenMiddle, 1000);
	setTimeout(mapOpenFinal, 1500);
}
else
	addEvent(Qid('link-location'), 'click',
			locationOpening);

// Use OpenStreetMap via OpenLaye
var reloadMaxTime = 10;
function loadingMap() {
	if( locationMap.offsetWidth != locationMap.parentElement.offsetWidth ) {
		if( reloadMaxTime > 0 )
			setTimeout(loadingMap, 500);
		--reloadMaxTime;
		return;
	}

	var iconMain = mapMarkerLayer('main', 'image/stone-sm.png', [121.6116, 25.0410]);
	var iconBus = mapMarkerLayer('bus', 'image/bus.png', [121.6166, 25.0433]);

	var osmMap = new ol.Map({
		target: 'location-map',
		interactions: ol.interaction.defaults({mouseWheelZoom:false}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM(),
				opacity: 0.6
			}),
			iconMain,
			iconBus
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([121.6116, 25.0410]),
			zoom: 15
		})
	});
}

function mapMarkerLayer(name, imgSrc, pos) {
	var icon = new ol.Feature({
		geometry: new ol.geom.Point(
			ol.proj.fromLonLat(pos)
		),
		name: name
	});
	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon({
			scale: .5,
			anchor: [0.5, 1],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			src: imgSrc
		})
	});
	return new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [icon]
		}),
		style: iconStyle
	});
}
