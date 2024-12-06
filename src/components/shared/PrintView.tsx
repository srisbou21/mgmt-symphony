import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface PrintViewProps {
  title: string;
  data: any[];
  columns: {
    header: string;
    accessor: string;
  }[];
}

export const PrintView = ({ title, data, columns }: PrintViewProps) => {
  // Créer une chaîne unique pour le QR code basée sur les données et la date
  const qrData = JSON.stringify({
    title,
    date: new Date().toISOString(),
    recordCount: data.length,
    documentId: Math.random().toString(36).substring(7),
    data: data.map(item => {
      const mainFields = {};
      columns.forEach(col => {
        mainFields[col.header] = item[col.accessor];
      });
      return mainFields;
    })
  });

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">Date d'impression: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col items-center">
          <QRCodeSVG value={qrData} size={100} />
          <p className="text-xs text-gray-500 mt-1">Scanner pour vérifier</p>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border p-2 bg-gray-50">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {row[column.accessor] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 text-right">
        <p className="text-sm text-gray-500">Document généré le {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export const handlePrint = (content: React.ReactNode) => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Impression</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          ${content}
          <script>
            window.onload = () => window.print();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};