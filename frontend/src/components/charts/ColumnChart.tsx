import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IRootState } from "../../redux/store";

const data = [
  { name: "January", sales: 12000 },
  { name: "February", sales: 15000 },
  { name: "March", sales: 13000 },
  { name: "April", sales: 14000 },
  { name: "May", sales: 18000 },
  { name: "June", sales: 20000 },
];

export default function ColumnChartComponent() {
  const dark = useSelector((state: IRootState) => state.firstSlice.dark);
  return (
    <>
      <ResponsiveContainer width="100%" height={400} className="text-black">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="6 6"
            stroke={dark ? "white" : "black"}
          />
          <XAxis dataKey="name" stroke={dark ? "white" : "black"} />
          <YAxis
            stroke={dark ? "white" : "black"}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="sales" fill="#f0f" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
