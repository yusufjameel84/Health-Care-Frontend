import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const Home = () => {
  const containerStyle = {
    width: "1200px",
    height: "600px",
  };

  const center = {
    lat: 28.9629,
    lng: 77.5937,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDUih925OJBl-Tk7NDVZ-L4fFxAVUyf7Cw",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      <Layout
        title="Home page"
        description="Find your nearby Pharmacy"
        className="container col-md-8 offset-md-2"
      >
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
};

export default Home;
