export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYm9uZ28tbWluIiwiYSI6ImNtY2Exa2Q1ejE5cDgya3Mza3NyY3BlbzcifQ.k2SujBcWxGCjfjK3na-fEA';
  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/bongo-min/cmca331jr00b101s61oyo0qe8',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add popup

    new mapboxgl.Popup()
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
      .addTo(map);

    // extend the map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
