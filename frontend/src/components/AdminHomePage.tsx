import ColumnChartComponent from "./charts/ColumnChart";
import LineChartComponents from "./charts/LineChart";
import PieChartComponent from "./charts/PieChart";

export default function AdminHomePage() {
  return (
    <>
      <h2 id="admin-heading">Dashboard</h2>
      <ColumnChartComponent />
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
        <PieChartComponent />
        <LineChartComponents />
      </div>
    </>
  );
}
