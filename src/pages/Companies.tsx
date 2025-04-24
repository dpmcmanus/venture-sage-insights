
import { CompanyCard } from "@/components/company-card";
import { portfolioCompanies } from "@/services/mock-data";

const Companies = () => {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-vc-sage-dark">Portfolio Companies</h1>
        <div className="flex gap-4">
          <select className="rounded-md border border-vc-sage-light/30 bg-white px-3 py-2 text-sm text-vc-sage-dark">
            <option>Sort by: Name</option>
            <option>Sort by: Investment</option>
            <option>Sort by: Valuation</option>
          </select>
          <select className="rounded-md border border-vc-sage-light/30 bg-white px-3 py-2 text-sm text-vc-sage-dark">
            <option>All Industries</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
          </select>
        </div>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {portfolioCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
