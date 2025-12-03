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

// Ongkir/Shipping Cost Types
export interface ShippingService {
  ServiceId: string;
  ServiceCode: string;
  ServiceName: string;
  Rate: string;
  LeadTime: string;
  Result: string;
  Rate1St: string;
  Rate2St: string;
  MinKg: string;
  MaxKg: string;
}

export interface CheckOngkirRequest {
  originId: string;
  destinationId: string;
  actualWeight: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
}

export interface CheckOngkirResponse {
  status: boolean;
  list: ShippingService[];
}

// API Service Interface
export interface PCPTransportService {
  getBranchOffices(region?: string): Promise<BranchOfficeApiResponse>;
  getTrackingInfo(awbNo: string): Promise<any>;
  checkOngkir(request: CheckOngkirRequest): Promise<CheckOngkirResponse>;
}