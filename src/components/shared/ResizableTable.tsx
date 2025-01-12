import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Resizable } from "react-resizable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { exportToExcel } from "@/utils/excelExport";

interface Column {
  key: string;
  header: string;
  width: number;
  render?: (row: any) => React.ReactNode;
}

interface ResizableTableProps {
  columns: Column[];
  data: any[];
  fileName: string;
}

export const ResizableTable = ({ columns: initialColumns, data, fileName }: ResizableTableProps) => {
  const [columns, setColumns] = useState(initialColumns);

  const handleResize = (index: number) => (e: any, { size }: { size: { width: number } }) => {
    const newColumns = [...columns];
    newColumns[index] = {
      ...newColumns[index],
      width: size.width,
    };
    setColumns(newColumns);
  };

  const handleExportExcel = () => {
    exportToExcel(data, fileName);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportExcel}
          className="gap-2"
        >
          <FileDown className="h-4 w-4" />
          Exporter Excel
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <Resizable
                  key={column.key}
                  width={column.width}
                  height={40}
                  onResize={handleResize(index)}
                  draggableOpts={{ enableUserSelectHack: false }}
                >
                  <TableHead style={{ width: column.width }}>
                    {column.header}
                  </TableHead>
                </Resizable>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell 
                    key={column.key}
                    style={{ width: column.width }}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};