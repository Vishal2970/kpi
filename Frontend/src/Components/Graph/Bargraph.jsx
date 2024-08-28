import { BarChart } from "@mui/icons-material";
import React from "react";

export default function Bargraph() {
  return (
    <div>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group C", "group B"] }]}
        series={[{ data: [4, 6, 5] }, { data: [1, 2, 3] }, { data: [2, 9, 6] }]}
        width={500}
        height={300}
      />
    </div>
  );
}
