import React from 'react';

interface PrintViewProps {
  title: string;
  data: any[];
  columns: {
    header: string;
    accessor: string;
  }[];
}

export const PrintView = ({ title, data, columns }: PrintViewProps) => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">Date d'impression: {new Date().toLocaleDateString()}</p>
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