
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { saveAs } from 'file-saver';
import { Company } from "@/types/company";

export const generateFullReport = (company: Company) => {
  const pdfContent = document.createElement("div");
  pdfContent.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="width: 60px; height: 60px; overflow: hidden; margin-right: 15px;">
          <img src="${company.logo}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
          <h1 style="margin: 0; font-size: 24px;">${company.name}</h1>
          <p style="margin: 5px 0; color: #666;">${company.industry} • ${company.location}</p>
        </div>
      </div>
      
      <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Financial Overview</h2>
      <div style="margin-bottom: 20px;">
        <p><strong>Investment Amount:</strong> $${(company.investmentAmount / 1000000).toFixed(1)}M</p>
        <p><strong>Equity:</strong> ${company.equity}%</p>
        <p><strong>Current Valuation:</strong> $${(company.valuation / 1000000).toFixed(1)}M</p>
        <p><strong>Annual Growth:</strong> ${company.growth}%</p>
        <p><strong>Current Revenue:</strong> $${(company.revenue.current / 1000000).toFixed(1)}M</p>
      </div>
      
      <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Team Structure</h2>
      <div style="margin-bottom: 20px;">
        ${company.team.map(member => `
          <div style="margin-bottom: 10px;">
            <p style="margin: 0; font-weight: bold;">${member.name}</p>
            <p style="margin: 0; color: #666;">${member.position}</p>
          </div>
        `).join('')}
      </div>
      
      <div style="page-break-before: always;">
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Company Insights</h2>
        <p style="margin-bottom: 20px;">${company.description}</p>
        
        <h3>AI Analysis</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${company.insights}
        </div>
        
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Products</h2>
        <div>
          ${company.products.map((product, index) => `
            <div style="margin-bottom: 15px;">
              <p style="margin: 0; font-weight: bold;">${product}</p>
              <p style="margin: 0; color: #666;">
                ${index === 0 ? "Flagship Product - Primary revenue driver with established market presence." : 
                 index === 1 ? "Growth Product - Rapidly growing solution with strong customer adoption." :
                 "New Release - Recently launched product with early positive feedback."}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const opt = {
    margin: 10,
    filename: `${company.name}_Company_Report.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(pdfContent).save().then(() => {
    toast.success("Company report generated successfully");
  });
};

export const generateFinancialModel = (company: Company) => {
  const headers = ['Month', 'Revenue', 'Growth', 'Burn Rate', 'Cash Balance'];
  const csvData = [headers];
  
  const monthlyRevenue = company.revenue.current / 12;
  const monthlyGrowth = company.growth / 12;
  let currentRevenue = monthlyRevenue;
  let cashBalance = company.investmentAmount;
  const monthlyBurn = company.investmentAmount * 0.05;

  for (let i = 1; i <= 12; i++) {
    currentRevenue = currentRevenue * (1 + monthlyGrowth / 100);
    cashBalance = cashBalance - monthlyBurn + currentRevenue;
    
    csvData.push([
      `Month ${i}`,
      currentRevenue.toFixed(2),
      `${monthlyGrowth.toFixed(2)}%`,
      monthlyBurn.toFixed(2),
      cashBalance.toFixed(2)
    ]);
  }

  const csvContent = csvData.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${company.name}_Financial_Model.csv`);
  toast.success("Financial model exported successfully");
};
