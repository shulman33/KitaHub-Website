export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
}

export interface UniversityResult {
  name: string;
  country: string;
  alphaTwoCode: string;
  stateProvince: string | null;
}
