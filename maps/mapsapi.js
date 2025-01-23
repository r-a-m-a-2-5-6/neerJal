const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // map style
    center: [0, 0], // starting position [lng, lat]
    zoom: 13, // starting zoom
  });

  // Add controls to the map
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true
  }));

  // Function to get location name using Mapbox Geocoding API
  function getLocationName(lng, lat) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const placeName = data.features[0]?.place_name || "Location not found";
      //   document.getElementById('location').innerText = `Location: ${placeName}`;
      console.log(placeName)
      })
      .catch(error => {
        console.error('Error fetching location name:', error);
      //   document.getElementById('location').innerText = 'Unable to fetch location name.';
      });
  }

  // Get current position and display location name
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        // Center the map on the user's location
        map.setCenter([longitude, latitude]);

        // Add a marker at the user's location
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

        // Get and display the location name
        getLocationName(longitude, latitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    document.getElementById('location').innerText = 'Geolocation is not supported by this browser.';
  }