import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { EquipmentTypeValue } from "@/types/equipment";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#8884D8", "#82CA9D", "#FFC658", "#FF7C43",
];

interface EquipmentTypeStats {
  type: EquipmentTypeValue;
  count: string;
}

interface EquipmentTypeChartProps {
  typeStats: EquipmentTypeStats[];
}

export const EquipmentTypeChart = ({ typeStats }: EquipmentTypeChartProps) => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={typeStats}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {typeStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};