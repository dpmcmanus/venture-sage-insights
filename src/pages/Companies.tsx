
import { CompanyCard } from "@/components/company-card";
import { portfolioCompanies } from "@/services/mock-data";
import { Card } from "@/components/ui/card";

const Companies = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#F2FCE2] p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-[#36B37E]">Portfolio Companies</h1>
        <p className="text-sm text-[#6B778C] mt-2">
          Overview of our current portfolio and investment landscape
        </p>
      </div>
      <div className="space-y-4">
        {portfolioCompanies.map((company) => (
          <Card key={company.id} className="hover:bg-[#F2FCE2]/50 transition-colors">
            <CompanyCard company={company} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Companies;
