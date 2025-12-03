import React from 'react';
import type { BranchOffice } from '../../../services/pcpTransport';
import { FiMapPin, FiExternalLink, FiNavigation, FiClock } from 'react-icons/fi';

interface BranchOfficeCardProps {
  office: BranchOffice;
}

const BranchOfficeCard: React.FC<BranchOfficeCardProps> = ({ office }) => {
  const hasCoordinates = office.latitude !== 0 && office.longitude !== 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00C300] overflow-hidden group transform hover:-translate-y-1">
      {/* Header with accent */}
      <div className="h-1 bg-gradient-to-r from-[#001F54] to-[#00C300]"></div>

      <div className="p-6">
        {/* Branch and Province Tags */}
        <div className="flex items-center mb-3 space-x-2">
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {office.branchName}
          </div>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            {office.provinceName}
          </div>
        </div>

        {/* Office Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#001F54] transition-colors">
          {office.name}
        </h3>

        {/* Address Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="bg-[#001F54] text-white p-2 rounded-lg flex-shrink-0">
              <FiMapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-700 leading-relaxed">
                <p className="font-medium text-gray-900 mb-1">{office.address1}</p>
                {office.address2 && office.address2 !== '-' && (
                  <p className="text-gray-600">{office.address2}</p>
                )}
                {office.address3 && office.address3 !== '-' && (
                  <p className="text-gray-600">{office.address3}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3">
          {/* Location Info */}
          {hasCoordinates && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                🌍 {office.latitude.toFixed(6)}, {office.longitude.toFixed(6)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps?q=${office.latitude},${office.longitude}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className="text-sm bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-lg flex items-center space-x-1 font-medium transition-colors shadow-sm"
                >
                  <FiExternalLink className="w-3 h-3" />
                  <span>Google Maps</span>
                </button>
              </div>
            </div>
          )}

          {/* Business Info (placeholder for future enhancement) */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center space-x-1">
              <FiClock className="w-3 h-3" />
              <span>Business Hours</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📞</span>
              <span>Contact Available</span>
            </div>
            {hasCoordinates && (
              <div className="flex items-center space-x-1 text-green-600">
                <FiNavigation className="w-3 h-3" />
                <span>Navigation</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchOfficeCard;