
import { CompanyCard } from "@/components/company-card";
import { portfolioCompanies } from "@/services/mock-data";

const Companies = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-vc-blue-dark">Portfolio Companies</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
