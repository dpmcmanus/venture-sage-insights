
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "lucide-react";
import { Company } from "@/types/company";

interface CapTableProps {
  company: Company;
}

export const CapTable = ({ company }: CapTableProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Cap Table</CardTitle>
          <CardDescription>Equity distribution</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Table className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Investor</th>
                <th className="px-6 py-3">Shares</th>
                <th className="px-6 py-3">Percentage</th>
                <th className="px-6 py-3">Investment</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">Founders</td>
                <td className="px-6 py-4">650,000</td>
                <td className="px-6 py-4">{65 - company.equity}%</td>
                <td className="px-6 py-4">Initial</td>
                <td className="px-6 py-4">Jan 2021</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="px-6 py-4">Seed Round</td>
                <td className="px-6 py-4">200,000</td>
                <td className="px-6 py-4">20%</td>
                <td className="px-6 py-4">$2.5M</td>
                <td className="px-6 py-4">Mar 2022</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4">Series A (Your Firm)</td>
                <td className="px-6 py-4">{company.equity * 10000}</td>
                <td className="px-6 py-4">{company.equity}%</td>
                <td className="px-6 py-4">${(company.investmentAmount / 1000000).toFixed(1)}M</td>
                <td className="px-6 py-4">Jun 2024</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="px-6 py-4">ESOP Pool</td>
                <td className="px-6 py-4">100,000</td>
                <td className="px-6 py-4">10%</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
              </tr>
              <tr className="font-medium">
                <td className="px-6 py-4">Total</td>
                <td className="px-6 py-4">1,000,000</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">${((company.investmentAmount + 2500000) / 1000000).toFixed(1)}M</td>
                <td className="px-6 py-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
