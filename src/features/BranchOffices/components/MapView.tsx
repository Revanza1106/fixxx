import React, { useState } from 'react';
import type { BranchOffice } from '../../../services/pcpTransport';
import { FiMapPin, FiZoomIn, FiZoomOut, FiMaximize } from 'react-icons/fi';

interface MapViewProps {
  branchOffices: BranchOffice[];
  selectedOffice?: BranchOffice | null;
  onOfficeSelect?: (office: BranchOffice) => void;
}

const MapView: React.FC<MapViewProps> = ({
  branchOffices,
  selectedOffice,
  onOfficeSelect
}) => {
  const [zoom, setZoom] = useState(1);

  // Filter offices that have valid coordinates
  const officesWithCoordinates = branchOffices.filter(
    office => office.latitude !== 0 && office.longitude !== 0
  );

  if (officesWithCoordinates.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No location data available for these offices</p>
        </div>
      </div>
    );
  }

  const handleOpenGoogleMaps = () => {
    // Create a URL to show multiple locations on Google Maps
    const markers = officesWithCoordinates.map(office =>
      `${office.latitude},${office.longitude}`
    ).join('|');

    const mapsUrl = `https://www.google.com/maps/dir/${markers}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-linear-to-r from-[#001F54] to-[#003d99] text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Office Locations</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {officesWithCoordinates.length} offices with location data
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-linear-to-br from-blue-50 to-green-50 rounded-lg h-96 relative overflow-hidden">
          {/* Simple visual representation of map */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `scale(${zoom})` }}
          >
            <div className="relative w-full h-full max-w-2xl max-h-96">
              {officesWithCoordinates.map((office) => {
                // Create a pseudo-random position based on coordinates
                const latNorm = (office.latitude + 10) / 20; // Normalize lat to 0-1
                const lngNorm = (office.longitude + 100) / 50; // Normalize lng to 0-1

                const left = `${Math.max(5, Math.min(95, lngNorm * 100))}%`;
                const top = `${Math.max(5, Math.min(95, latNorm * 100))}%`;

                return (
                  <div
                    key={office.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left, top }}
                    onClick={() => onOfficeSelect?.(office)}
                    title={office.name}
                  >
                    <div className="relative">
                      <FiMapPin
                        className={`w-6 h-6 ${
                          selectedOffice?.id === office.id
                            ? 'text-red-600'
                            : 'text-[#00C300] hover:text-[#00A300]'
                        } transition-colors drop-shadow-md`}
                      />
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-10 max-w-32 text-center">
                        <div className="font-semibold text-gray-900">{office.name}</div>
                        <div className="text-gray-600">{office.provinceName}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-1 space-y-1">
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.2))}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom in"
            >
              <FiZoomIn className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom out"
            >
              <FiZoomOut className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Reset zoom"
            >
              <FiMaximize className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Open in Google Maps button */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleOpenGoogleMaps}
              className="bg-[#001F54] text-white px-4 py-2 rounded-lg hover:bg-[#003d99] transition-colors text-sm font-medium shadow-lg"
            >
              Open in Google Maps
            </button>
          </div>
        </div>

        {selectedOffice && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">{selectedOffice.name}</h4>
                <p className="text-sm text-blue-700 mb-2">{selectedOffice.address1}</p>
                <p className="text-xs text-blue-600">
                  {selectedOffice.branchName} • {selectedOffice.provinceName}
                </p>
              </div>
              <button
                onClick={() => {
                  const mapsUrl = `https://www.google.com/maps?q=${selectedOffice.latitude},${selectedOffice.longitude}`;
                  window.open(mapsUrl, '_blank');
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;