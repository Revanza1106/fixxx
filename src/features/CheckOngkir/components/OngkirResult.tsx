import React from 'react';
import type { ShippingService } from '../../../types/pcpTransport';
import { FiTruck, FiClock, FiDollarSign, FiPackage, FiCheckCircle } from 'react-icons/fi';

interface OngkirResultProps {
  services: ShippingService[];
  loading?: boolean;
}

const OngkirResult: React.FC<OngkirResultProps> = ({ services, loading = false }) => {
  const formatCurrency = (amount: string) => {
    const num = parseInt(amount, 10);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00C300]"></div>
          <span className="text-gray-600">Calculating shipping rates...</span>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No shipping services available for this route</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-linear-to-r from-[#001F54] to-[#003d99] text-white p-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiTruck className="w-5 h-5" />
          <span>Available Shipping Services</span>
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {services.map((service, index) => (
          <div key={`${service.ServiceId}-${index}`} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-[#00C300]/10 p-2 rounded-lg">
                    <FiTruck className="w-5 h-5 text-[#00C300]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.ServiceName}</h3>
                    <p className="text-sm text-gray-600 font-mono">{service.ServiceCode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <FiDollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Rate</p>
                      <p className="text-lg font-semibold text-[#001F54]">{formatCurrency(service.Rate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Lead Time</p>
                      <p className="text-lg font-semibold text-gray-900">{service.LeadTime} days</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FiPackage className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Weight Range</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {service.MinKg} - {service.MaxKg} kg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FiCheckCircle className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Service Type</p>
                      <p className="text-sm font-semibold text-gray-900">{service.Result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngkirResult;