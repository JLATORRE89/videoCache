import React, { useState } from 'react';

const AuditTrail = ({ auditTrail }) => {
  const generateComplianceReport = () => {
    const reportContent = auditTrail.join('\n');
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compliance_report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Audit Trail</h3>
      <ul className="max-h-64 overflow-y-auto">
        {auditTrail.map((entry, index) => (
          <li key={index} className="text-sm border-b py-1">
            {entry}
          </li>
        ))}
      </ul>
      <button
        onClick={generateComplianceReport}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Download Compliance Report
      </button>
    </div>
  );
};

export default AuditTrail;