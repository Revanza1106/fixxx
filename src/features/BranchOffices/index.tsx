import React, { useState } from 'react';
import { useBranchOffices } from '../../hooks/useBranchOffices';
import BranchOfficeCard from './components/BranchOfficeCard';
import { FiSearch, FiFilter, FiLoader, FiAlertCircle, FiRefreshCw, FiGrid } from 'react-icons/fi';

const BranchOffices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  
  const {
    data: branchOffices,
    provinces,
    branches,
    loading,
    error,
    refetch,
    fetchByRegion
  } = useBranchOffices();

  // Filter offices based on search and filters
  const filteredOffices = branchOffices.filter(office => {
    const matchesSearch =
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.provinceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince = !selectedProvince || office.provinceName === selectedProvince;
    const matchesBranch = !selectedBranch || office.branchName === selectedBranch;

    return matchesSearch && matchesProvince && matchesBranch;
  });

  const handleRegionFilter = (region: string) => {
    if (region) {
      fetchByRegion(region);
    } else {
      refetch();
    }
    setSelectedProvince('');
    setSelectedBranch('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProvince('');
    setSelectedBranch('');
    refetch();
  };

  if (loading && branchOffices.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-[#001F54] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading branch offices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-[#001F54] text-white px-6 py-2 rounded-lg hover:bg-[#003d99] transition-colors inline-flex items-center space-x-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001F54] via-[#003d99] to-[#001F54] text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Our Branch Network
              <span className="block text-2xl font-normal text-blue-100 mt-2">
                Connecting Indonesia Through Excellence
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Find PCP Transport offices near you across Indonesia. With branches in major cities and regions,
              we're always close to serve your logistics needs with professional and reliable service.
            </p>

            {/* Enhanced Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-white/20 rounded-xl p-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{branchOffices.length}</div>
                <div className="text-blue-100 text-sm">Total Offices</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-white/20 rounded-xl p-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{provinces.length}</div>
                <div className="text-blue-100 text-sm">Provinces</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-white/20 rounded-xl p-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{branches.length}</div>
                <div className="text-blue-100 text-sm">Branches</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Nearest Branch</h2>
            <p className="text-gray-600">Search and filter through our extensive network of offices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-[#00C300]">
                <FiSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search offices, address, branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00C300] focus:border-[#00C300] transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Province Filter */}
            <div className="relative">
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00C300] focus:border-[#00C300] transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">📍 All Provinces</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            {/* Branch Filter */}
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00C300] focus:border-[#00C300] transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">🏢 All Branches</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 inline-flex items-center justify-center space-x-2 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
            >
              <FiFilter className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>

          {/* Region Quick Filters */}
          <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700">Quick filter by region:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {['JAWA', 'SUMATERA', 'KALIMANTAN', 'SULAWESI'].map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionFilter(region)}
                  className="text-sm bg-white text-gray-700 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 border-2 border-transparent hover:border-blue-600 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  {region}
                </button>
              ))}
              <button
                onClick={() => handleRegionFilter('')}
                className="text-sm bg-white text-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200 border-2 border-transparent hover:border-gray-600 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
              >
                🇮🇩 All Indonesia
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="bg-[#00C300] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {filteredOffices.length}
                </div>
                <span className="text-gray-700">
                  of <span className="font-bold text-gray-900">{branchOffices.length}</span> offices found
                </span>
              </div>
              {loading && (
                <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <FiLoader className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              )}
              {filteredOffices.length > 0 && (
                <div className="text-sm text-gray-600">
                  📍 {provinces.length} provinces • 🏢 {branches.length} branches
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <FiGrid className="w-4 h-4" />
              <span className="text-sm font-medium">Grid View</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((office) => (
            <BranchOfficeCard
              key={office.id}
              office={office}
            />
          ))}
        </div>

        {filteredOffices.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No offices found</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              We couldn't find any offices matching your criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearFilters}
                className="bg-[#001F54] text-white px-6 py-3 rounded-xl hover:bg-[#003d99] transition-colors inline-flex items-center justify-center space-x-2 font-medium transform hover:scale-105"
              >
                <FiFilter className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
              <button
                onClick={() => handleRegionFilter('')}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center justify-center space-x-2 font-medium transform hover:scale-105"
              >
                <span>🇮🇩</span>
                <span>Show All Indonesia</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchOffices;