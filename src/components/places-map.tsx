"use client";

import clsx from "clsx";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";

const libs: Library[] = ["core", "maps", "places", "marker"];

const buildMapInfoCardContent = (title: string, body: string) => {
  return `<div>
    <p>${title}</p>
    <p>${body}</p>
  </div>`;
};

const PlacesMap = ({
  name,
  icon,
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  name: any;
  value: any;
  label?: string;
  required: boolean;
  placeholder?: string;
  image?: React.ReactNode;
  className?: string;
  icon?: any;
  onChange: (e: any) => void;
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 17,
        mapId: "event-flow",
      };

      // MAP
      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );
      setMap(gMap);

      // AUTOCOMPLETE
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement
      );

      setAutoComplete(gAutoComplete);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        setSelectedPlace(place.formatted_address as string);

        const position = place.geometry?.location;

        if (position) {
          // place a marker
          setMarker(position, place.name!);
        }
      });
    }
  }, [autoComplete]);

  function setMarker(location: google.maps.LatLng, name: string) {
    if (!map) return;
    map.setCenter(location);
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "marker",
    });

    const infoCard = new google.maps.InfoWindow({
      position: location,
      content: buildMapInfoCardContent(name, name),
      maxWidth: 200,
    });

    infoCard.open({ map: map, anchor: marker });
  }

  return (
    <div key={label} className="relative w-full mb-3">
      <label
        htmlFor="input"
        className={`flex items-center mb-2 after:ml-1 text-sm text-white font-medium`}
      >
        {label}
      </label>

      <div className="relative min-h-[50px] xs:h-auto flex flex-row items-center">
        <input
          name={name}
          type={"text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={placeAutoCompleteRef}
          className={clsx(
            "text-[13px] xs:text-[15px] w-full py-4 pr-3 leading-tight font-normal text-black border border-[#0B0228] rounded-md pl-4 focus:outline-none focus:border-[#7C56FE] focus:shadow-outline no-spinner placeholder-gray-700",
            className
          )}
        />
        <div className="absolute right-4">{icon}</div>
      </div>

      <p>{selectedPlace}</p>

      {isLoaded ? (
        <div
          style={{
            height: "300px",
          }}
          ref={mapRef}
        />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default PlacesMap;
