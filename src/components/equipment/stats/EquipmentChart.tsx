import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/card";

interface ChartData {
  name: string;
  count: number;
  type: string;
}

interface EquipmentChartProps {
  data: ChartData[];
  searchTerm: string;
}

export function EquipmentChart({ data, searchTerm }: EquipmentChartProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Répartition {searchTerm ? "des équipements" : "par type"}
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 rounded-lg shadow border">
                      <p className="font-bold">{data.name}</p>
                      <p className="text-sm text-gray-600">Quantité: {data.count}</p>
                      <p className="text-sm text-gray-600">Type: {data.type}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Quantité" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}