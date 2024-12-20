// src/components/Map.tsx
import { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface MyMapProps {
  position: [number, number]; // Position from parent
  address: string;
  onPositionChange: (newPosition: [number, number], newAddress: string) => void; // Function to update position in parent
}
export default function MyMap({
  position,
  address,
  onPositionChange,
}: MyMapProps) {
  // Initial position set to Jakarta's latitude and longitude
  //   const initialPosition: [number, number] = [-6.2088, 106.8456];
  //   const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [userLocationPermission, setUserLocationPermission] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const handleSearch = async () => {
    if (search) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`,
        );
        const results = await response.json();
        if (results.length > 0) {
          const { lat, lon, display_name } = results[0];
          console.log(display_name, 'disss');
          console.log(search, 'disss');
          const newPosition: [number, number] = [
            parseFloat(lat),
            parseFloat(lon),
          ];
          const newAddress: string = display_name;
          console.log(newAddress, 'NEWADRES');

          onPositionChange(newPosition, newAddress); // Update parent position
        } else {
          alert('Location not found!');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    }
  };

  // Request the user's location if permission is granted
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            onPositionChange([latitude, longitude], '');
            setUserLocationPermission(true); // Set permission to true when location is fetched
          },
          (error) => {
            console.error('Error getting location:', error);
            setUserLocationPermission(false); // Handle failure to get location
          },
        );
      }
    };
    getUserLocation();
  }, []);

  // Focus the map on the updated position
  const MapFocus = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo(position, 16); // Fly to the new position with zoom level 16 (closer zoom)
    }, [position, map]);

    return null;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Search Input Form */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000, // Ensure the input appears above the map
          backgroundColor: 'white', // Ensure it's visible
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter address"
          style={{ padding: '0.5em', width: '300px', background: 'white' }}
        />
        <button
          onClick={handleSearch}
          style={{ marginLeft: '0.5em', padding: '0.5em' }}
        >
          Search
        </button>
      </div>

      {/* Map Container */}
      <MapContainer
        center={position}
        zoom={25} // Set initial zoom to a closer level
        scrollWheelZoom={true}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFocus position={position} />
        <Marker position={position}>
          <Popup>
            Found Location! <br /> {address || 'Jakarta'}
          </Popup>
        </Marker>
      </MapContainer>

      {/* Informing user about location permission */}
      {!userLocationPermission && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ margin: 0 }}>
            Please allow location access to center the map on your position.
          </p>
        </div>
      )}
    </div>
  );
}
