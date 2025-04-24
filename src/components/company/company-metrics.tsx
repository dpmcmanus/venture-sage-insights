
import { StatsCard } from "@/components/stats-card";
import { BarChart2, DollarSign, TrendingUp, Users } from "lucide-react";
import { Company } from "@/types/company";

interface CompanyMetricsProps {
  company: Company;
}

export const CompanyMetrics = ({ company }: CompanyMetricsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Investment"
        value={`$${(company.investmentAmount / 1000000).toFixed(1)}M`}
        description={`${company.equity}% Equity`}
        icon={<DollarSign size={18} />}
      />
      <StatsCard
        title="Current Valuation"
        value={`$${(company.valuation / 1000000).toFixed(1)}M`}
        trend={15}
        icon={<TrendingUp size={18} />}
      />
      <StatsCard
        title="Growth (YoY)"
        value={`${company.growth}%`}
        icon={<BarChart2 size={18} />}
      />
      <StatsCard
        title="Churn Rate"
        value={`${company.churn}%`}
        trend={company.churn > 3 ? 2 : -1}
        icon={<Users size={18} />}
      />
    </div>
  );
};
