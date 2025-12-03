import React, { useState } from 'react';
import { useCheckOngkir } from '../../hooks/useCheckOngkir';
import type { CheckOngkirRequest } from '../../services/pcpTransport';
import OngkirResult from './components/OngkirResult';
import {
  FiMapPin,
  FiSearch,
  FiRefreshCw,
  FiAlertCircle,
  FiTrendingUp,
  FiActivity,
  FiSend
} from 'react-icons/fi';

const CheckOngkir: React.FC = () => {
  const [formData, setFormData] = useState<CheckOngkirRequest>({
    originId: '',
    destinationId: '',
    actualWeight: 1,
    lengthCm: 0,
    widthCm: 0,
    heightCm: 0,
  });

  const { shippingServices, loading, error, checkOngkir, clearResults } = useCheckOngkir();

  const handleInputChange = (field: keyof CheckOngkirRequest, value: string | number) => {
    setFormData((prev: CheckOngkirRequest) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.originId || !formData.destinationId) {
      alert('Please fill in both origin and destination');
      return;
    }

    if (formData.actualWeight <= 0) {
      alert('Weight must be greater than 0');
      return;
    }

    await checkOngkir(formData);
  };

  const handleReset = () => {
    setFormData({
      originId: '',
      destinationId: '',
      actualWeight: 1,
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
    });
    clearResults();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#001F54] to-[#003d99] text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Check Shipping Rates</h1>
            <p className="text-xl text-blue-100">
              Calculate your shipping costs instantly with PCP Transport
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#00C300]/10 p-3 rounded-lg">
                <FiSend className="w-6 h-6 text-[#00C300]" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Shipping Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Origin and Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMapPin className="inline w-4 h-4 mr-1" />
                    Origin Office ID
                  </label>
                  <input
                    type="text"
                    value={formData.originId}
                    onChange={(e) => handleInputChange('originId', e.target.value)}
                    placeholder="e.g., JKT1114500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C300] focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the origin office ID</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMapPin className="inline w-4 h-4 mr-1" />
                    Destination Office ID
                  </label>
                  <input
                    type="text"
                    value={formData.destinationId}
                    onChange={(e) => handleInputChange('destinationId', e.target.value)}
                    placeholder="e.g., BPN2001900"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C300] focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the destination office ID</p>
                </div>
              </div>

              {/* Package Dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiActivity className="inline w-4 h-4 mr-1" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.actualWeight}
                    onChange={(e) => handleInputChange('actualWeight', parseFloat(e.target.value) || 0)}
                    min="1"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C300] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiTrendingUp className="inline w-4 h-4 mr-1" />
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.lengthCm}
                    onChange={(e) => handleInputChange('lengthCm', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C300] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiTrendingUp className="inline w-4 h-4 mr-1" />
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.widthCm}
                    onChange={(e) => handleInputChange('widthCm', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C300] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiTrendingUp className="inline w-4 h-4 mr-1" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => handleInputChange('heightCm', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C300] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center space-x-2"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  <span>Reset</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#001F54] text-white px-8 py-3 rounded-lg hover:bg-[#003d99] transition-colors inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <FiSearch className="w-4 h-4" />
                      <span>Check Rates</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <FiAlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          {shippingServices.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Shipping Rates Available</h2>
                <p className="text-gray-600">
                  Found {shippingServices.length} shipping service{shippingServices.length > 1 ? 's' : ''} for your route
                </p>
              </div>
              <OngkirResult services={shippingServices} />
            </div>
          )}

          {/* Quick Examples */}
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Quick Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-blue-800">Jakarta to Balikpapan:</p>
                <p className="text-blue-700">Origin: JKT1114500, Destination: BPN2001900</p>
              </div>
              <div>
                <p className="font-medium text-blue-800">Surabaya to Medan:</p>
                <p className="text-blue-700">Origin: SUB1700900, Destination: MDN1335000</p>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-3">
              Note: Use office IDs from the Branch Offices page for accurate rates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOngkir;