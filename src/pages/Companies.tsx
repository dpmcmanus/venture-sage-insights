
import { CompanyCard } from "@/components/company-card";
import { portfolioCompanies } from "@/services/mock-data";
import { useState } from "react";

const Companies = () => {
  const [sortBy, setSortBy] = useState("name");
  const [industryFilter, setIndustryFilter] = useState("all");

  // Get unique industries for filter dropdown
  const industries = ["all", ...new Set(portfolioCompanies.map(company => company.industry))];

  // Sort and filter companies
  const filteredCompanies = portfolioCompanies
    .filter(company => industryFilter === "all" || company.industry === industryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "investment":
          return b.investmentAmount - a.investmentAmount;
        case "valuation":
          return b.valuation - a.valuation;
        default: // name
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-vc-sage-dark">Portfolio Companies</h1>
        <div className="flex gap-4">
          <select 
            className="rounded-md border border-vc-sage-light/30 bg-white px-3 py-2 text-sm text-vc-sage-dark"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by: Name</option>
            <option value="investment">Sort by: Investment</option>
            <option value="valuation">Sort by: Valuation</option>
          </select>
          <select 
            className="rounded-md border border-vc-sage-light/30 bg-white px-3 py-2 text-sm text-vc-sage-dark"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <option value="all">All Industries</option>
            {industries
              .filter(industry => industry !== "all")
              .map(industry => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))
            }
          </select>
        </div>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
