
export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  stage: string;
  status: string;
  description: string;
  insights: string;
  investmentAmount: number;
  equity: number;
  valuation: number;
  growth: number;
  churn: number;
  revenue: {
    current: number;
    previous: number;
    trend: any[];
  };
  patents: number;
  products: string[];
  team: Array<{
    name: string;
    position: string;
    photo: string;
  }>;
}
