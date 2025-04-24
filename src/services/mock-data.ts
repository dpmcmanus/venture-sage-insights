export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  stage: string;
  location: string;
  investmentDate: string;
  investmentAmount: number;
  valuation: number;
  equity: number;
  growth: number;
  churn: number;
  revenue: {
    current: number;
    previous: number;
    trend: number[];
  };
  status: 'Active' | 'Exited' | 'Acquired' | 'Bankrupt';
  team: {
    name: string;
    position: string;
    photo: string;
  }[];
  description: string;
  products: string[];
  insights: string;
  patents: number;
}

export interface Deal {
  id: string;
  companyName: string;
  industry: string;
  stage: string;
  askAmount: number;
  status: 'Prospect' | 'In Progress' | 'Term Sheet' | 'Closed' | 'Rejected';
  lastContact: string;
  contactPerson: string;
  description: string;
  tags: string[];
  interestLevel: 'Low' | 'Medium' | 'High';
}

// Mock portfolio companies
export const portfolioCompanies: Company[] = [
  {
    id: "c1",
    name: "NeuraTech AI",
    logo: "/placeholder.svg",
    industry: "Artificial Intelligence",
    stage: "Series B",
    location: "San Francisco, CA",
    investmentDate: "2023-06-15",
    investmentAmount: 5000000,
    valuation: 120000000,
    equity: 8.5,
    growth: 142,
    churn: 2.3,
    revenue: {
      current: 1200000,
      previous: 480000,
      trend: [180000, 220000, 350000, 480000, 650000, 780000, 950000, 1200000]
    },
    status: "Active",
    team: [
      { name: "Sarah Chen", position: "CEO", photo: "/placeholder.svg" },
      { name: "Raj Patel", position: "CTO", photo: "/placeholder.svg" }
    ],
    description: "NeuraTech AI develops cutting-edge machine learning models for predictive analytics in healthcare. Their flagship product, MedPredict, can forecast patient outcomes with 94% accuracy.",
    products: ["MedPredict", "NeuraScan", "HealthAI Suite"],
    insights: "Recent patents show expansion into drug discovery. Market potential could triple with FDA approval expected next quarter.",
    patents: 12
  },
  {
    id: "c2",
    name: "QuantumCloud",
    logo: "/placeholder.svg",
    industry: "Cloud Infrastructure",
    stage: "Series A",
    location: "Boston, MA",
    investmentDate: "2024-01-10",
    investmentAmount: 3000000,
    valuation: 45000000,
    equity: 11,
    growth: 87,
    churn: 4.1,
    revenue: {
      current: 750000,
      previous: 400000,
      trend: [120000, 180000, 250000, 400000, 520000, 650000, 750000]
    },
    status: "Active",
    team: [
      { name: "Michael Torres", position: "CEO", photo: "/placeholder.svg" },
      { name: "Emma West", position: "CTO", photo: "/placeholder.svg" }
    ],
    description: "QuantumCloud provides enterprise-grade quantum computing as a service, enabling companies to solve complex problems without maintaining quantum hardware.",
    products: ["QuantumOS", "SuperpositionDB", "EntangleAPI"],
    insights: "Recent patent filings indicate development of error correction algorithms that could leapfrog competition. Growing partnership with IBM Quantum shows industry validation.",
    patents: 7
  },
  {
    id: "c3",
    name: "GreenMile",
    logo: "/placeholder.svg",
    industry: "CleanTech",
    stage: "Series C",
    location: "Austin, TX",
    investmentDate: "2022-08-21",
    investmentAmount: 12000000,
    valuation: 300000000,
    equity: 6,
    growth: 62,
    churn: 1.8,
    revenue: {
      current: 4500000,
      previous: 2800000,
      trend: [900000, 1400000, 1800000, 2200000, 2800000, 3400000, 3900000, 4500000]
    },
    status: "Active",
    team: [
      { name: "David Rodriguez", position: "CEO", photo: "/placeholder.svg" },
      { name: "Lisa Huang", position: "COO", photo: "/placeholder.svg" }
    ],
    description: "GreenMile develops sustainable transportation solutions using hydrogen fuel cells and advanced battery technology for commercial vehicles.",
    products: ["EcoFleet", "HydrogenDrive", "EmissionTrack"],
    insights: "New partnership with Toyota could expand market reach. Recent patent for efficiency improvements positions them ahead of competitors.",
    patents: 18
  },
  {
    id: "c4",
    name: "BioGenome",
    logo: "/placeholder.svg",
    industry: "Biotechnology",
    stage: "Series B",
    location: "Cambridge, MA",
    investmentDate: "2023-03-04",
    investmentAmount: 7500000,
    valuation: 95000000,
    equity: 9.5,
    growth: 53,
    churn: 0.5,
    revenue: {
      current: 2200000,
      previous: 1400000,
      trend: [450000, 680000, 950000, 1400000, 1700000, 1900000, 2200000]
    },
    status: "Active",
    team: [
      { name: "Elena Rivera", position: "CEO", photo: "/placeholder.svg" },
      { name: "John Kim", position: "CSO", photo: "/placeholder.svg" }
    ],
    description: "BioGenome specializes in CRISPR gene therapy applications targeting rare genetic disorders with high unmet medical needs.",
    products: ["GeneEdit", "CRISPRscan", "TherapeuticVector"],
    insights: "Clinical trial results expected next month could be a major catalyst. Recent patent filings suggest expansion into oncology applications.",
    patents: 9
  },
  {
    id: "c5",
    name: "SecureBlock",
    logo: "/placeholder.svg",
    industry: "Cybersecurity",
    stage: "Series A",
    location: "Atlanta, GA",
    investmentDate: "2023-11-28",
    investmentAmount: 2500000,
    valuation: 28000000,
    equity: 12,
    growth: 110,
    churn: 3.2,
    revenue: {
      current: 920000,
      previous: 420000,
      trend: [150000, 240000, 320000, 420000, 580000, 750000, 920000]
    },
    status: "Active",
    team: [
      { name: "James Wilson", position: "CEO", photo: "/placeholder.svg" },
      { name: "Sophia Clark", position: "CTO", photo: "/placeholder.svg" }
    ],
    description: "SecureBlock provides zero-trust security architecture for blockchain applications, focusing on enterprise and government clients.",
    products: ["ZeroTrustChain", "BlockGuard", "CryptoShield"],
    insights: "New government contracts signal strong institutional demand. Recent patent for quantum-resistant encryption shows technical leadership.",
    patents: 5
  }
];

// Mock deal pipeline data
export const dealPipeline: Deal[] = [
  {
    id: "d1",
    companyName: "DataMesh",
    industry: "Data Infrastructure",
    stage: "Seed",
    askAmount: 1500000,
    status: "Prospect",
    lastContact: "2024-04-15",
    contactPerson: "Alex Johnson",
    description: "Next-generation data fabric technology that unifies disparate data sources without ETL.",
    tags: ["data", "infrastructure", "AI"],
    interestLevel: "High"
  },
  {
    id: "d2",
    companyName: "RoboLogistics",
    industry: "Robotics",
    stage: "Series A",
    askAmount: 5000000,
    status: "In Progress",
    lastContact: "2024-04-18",
    contactPerson: "Maria Rodriguez",
    description: "Autonomous robots for warehouse logistics with proprietary navigation system.",
    tags: ["robotics", "logistics", "automation"],
    interestLevel: "Medium"
  },
  {
    id: "d3",
    companyName: "FinanceAI",
    industry: "Fintech",
    stage: "Series B",
    askAmount: 12000000,
    status: "Term Sheet",
    lastContact: "2024-04-22",
    contactPerson: "Tyler Wang",
    description: "AI-powered financial planning platform for small businesses.",
    tags: ["fintech", "AI", "SaaS"],
    interestLevel: "High"
  },
  {
    id: "d4",
    companyName: "NeuralSecurity",
    industry: "Cybersecurity",
    stage: "Seed",
    askAmount: 2000000,
    status: "Rejected",
    lastContact: "2024-03-30",
    contactPerson: "Sonia Patel",
    description: "AI-based threat detection for enterprise networks.",
    tags: ["security", "AI", "enterprise"],
    interestLevel: "Low"
  },
  {
    id: "d5",
    companyName: "GreenEnergy",
    industry: "CleanTech",
    stage: "Series A",
    askAmount: 4000000,
    status: "In Progress",
    lastContact: "2024-04-19",
    contactPerson: "Chris Taylor",
    description: "Novel battery technology with 3x energy density of current lithium-ion.",
    tags: ["cleantech", "hardware", "energy"],
    interestLevel: "High"
  },
  {
    id: "d6",
    companyName: "MedTech Solutions",
    industry: "HealthTech",
    stage: "Series A",
    askAmount: 3500000,
    status: "Closed",
    lastContact: "2024-03-15",
    contactPerson: "Lisa Montgomery",
    description: "Remote patient monitoring platform with FDA-cleared devices.",
    tags: ["healthtech", "IoT", "FDA"],
    interestLevel: "Medium"
  },
  {
    id: "d7",
    companyName: "SpaceNav",
    industry: "Aerospace",
    stage: "Seed",
    askAmount: 2500000,
    status: "Prospect",
    lastContact: "2024-04-10",
    contactPerson: "James Liu",
    description: "Orbital debris tracking and avoidance software for satellite operators.",
    tags: ["space", "software", "saas"],
    interestLevel: "Medium"
  },
  {
    id: "d8",
    companyName: "RetailAI",
    industry: "Retail Tech",
    stage: "Series B",
    askAmount: 8000000,
    status: "Rejected",
    lastContact: "2024-02-28",
    contactPerson: "Emma Johnson",
    description: "Computer vision platform for retail inventory management.",
    tags: ["retail", "AI", "computer vision"],
    interestLevel: "Low"
  }
];

export const getCompanyById = (id: string): Company | undefined => {
  return portfolioCompanies.find(company => company.id === id);
};

export const getDealById = (id: string): Deal | undefined => {
  return dealPipeline.find(deal => deal.id === id);
};

export const getDealsGroupedByStatus = (): Record<string, Deal[]> => {
  return dealPipeline.reduce((acc, deal) => {
    if (!acc[deal.status]) {
      acc[deal.status] = [];
    }
    acc[deal.status].push(deal);
    return acc;
  }, {} as Record<string, Deal[]>);
};
