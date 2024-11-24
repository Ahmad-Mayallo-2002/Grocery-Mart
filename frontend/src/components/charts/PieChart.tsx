import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Meats", value: 400 },
  { name: "Chickens", value: 300 },
  { name: "Fruits", value: 300 },
  { name: "Vegetables", value: 200 },
];

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          label
          outerRadius={120}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
