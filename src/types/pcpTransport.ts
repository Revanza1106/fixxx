// PCP Transport API Response Types

export interface OfficeSite {
  OfficeSiteId: string;
  OfficeName: string;
  Address1: string;
  Address2: string;
  Address3: string;
  Latitude: string;
  Longitude: string;
}

export interface Branch {
  BranchId: string;
  BranchName: string;
  OfficeSites: OfficeSite[];
}

export interface Province {
  ProvinceId: string;
  ProvinceName: string;
  Branches: Branch[];
}

export interface BranchOfficeApiResponse {
  status: boolean;
  msg: string;
  data: Province[];
}

// Simplified types for easier consumption
export interface BranchOffice {
  id: string;
  name: string;
  branchId: string;
  branchName: string;
  provinceId: string;
  provinceName: string;
  address1: string;
  address2: string;
  address3: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// API Request Types
export interface GetBranchOfficesRequest {
  region?: string;
}

// API Service Interface
export interface PCPTransportService {
  getBranchOffices(region?: string): Promise<BranchOfficeApiResponse>;
  getTrackingInfo(awbNo: string): Promise<any>;
}