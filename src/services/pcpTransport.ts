import type {
  BranchOfficeApiResponse,
  PCPTransportService,
  GetBranchOfficesRequest,
  BranchOffice,
  Province,
  Branch,
  OfficeSite,
  CheckOngkirRequest,
  CheckOngkirResponse
} from '../types/pcpTransport';

class PCPTransportServiceImpl implements PCPTransportService {
  private baseUrl = 'https://api.pcptransport.com';
  private accessToken = 'YWRtaW4=';

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Token': this.accessToken,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Network response was not ok');
      }

      return data;
    } catch (error) {
      console.error('PCP Transport API Error:', error);
      throw error;
    }
  }

  async getBranchOffices(region?: string): Promise<BranchOfficeApiResponse> {
    const body: GetBranchOfficesRequest = region ? { region } : {};

    return this.request('/api/locations/office', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async getTrackingInfo(awbNo: string): Promise<any> {
    return this.request('/api/tracking/web', {
      method: 'POST',
      body: JSON.stringify({ awb_no: awbNo }),
    });
  }

  async checkOngkir(request: CheckOngkirRequest): Promise<CheckOngkirResponse> {
    const params = new URLSearchParams({
      originId: request.originId,
      destinationId: request.destinationId,
      actualWeight: request.actualWeight.toString(),
      lengthCm: (request.lengthCm || 0).toString(),
      widthCm: (request.widthCm || 0).toString(),
      heightCm: (request.heightCm || 0).toString(),
    });

    return this.request(`/api/check-ongkir?${params}`);
  }

  // Helper method to transform API response to simplified format
  transformToBranchOffices(response: BranchOfficeApiResponse): BranchOffice[] {
    if (!response.status || !response.data) {
      return [];
    }

    const offices: BranchOffice[] = [];

    response.data.forEach((province: Province) => {
      province.Branches.forEach((branch: Branch) => {
        branch.OfficeSites.forEach((office: OfficeSite) => {
          const addressParts = [
            office.Address1 || '',
            (office.Address2 && office.Address2 !== '-') ? office.Address2 : '',
            (office.Address3 && office.Address3 !== '-') ? office.Address3 : ''
          ].filter(part => part && part.trim() !== '');

          const branchOffice: BranchOffice = {
            id: office.OfficeSiteId || '',
            name: office.OfficeName || '',
            branchId: branch.BranchId || '',
            branchName: branch.BranchName || '',
            provinceId: province.ProvinceId || '',
            provinceName: province.ProvinceName || '',
            address1: office.Address1 || '',
            address2: office.Address2 || '',
            address3: office.Address3 || '',
            fullAddress: addressParts.join(', '),
            latitude: parseFloat(office.Latitude) || 0,
            longitude: parseFloat(office.Longitude) || 0,
            coordinates: {
              lat: parseFloat(office.Latitude) || 0,
              lng: parseFloat(office.Longitude) || 0,
            },
          };

          offices.push(branchOffice);
        });
      });
    });

    return offices;
  }
}

export const pcpTransportService = new PCPTransportServiceImpl();
export { PCPTransportServiceImpl };
  export type { BranchOfficeApiResponse, PCPTransportService, BranchOffice, CheckOngkirResponse, CheckOngkirRequest };