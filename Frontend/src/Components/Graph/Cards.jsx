import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from '@mui/material/CardActionArea';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const chartData = ({ data }) => {
  const labels = data.map(item => item.x);
  const datasets = [];

  // Extract all y values (y1, y2, y3, etc.)
  Object.keys(data[0]).forEach(key => {
    if (key.startsWith('y')) {
      datasets.push({
        label: key,
        data: data.map(item => item[key]),
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        borderinlineSize: 1
      });
    }
  });

  return { labels, datasets };
};

export default function ActionAreaCard(props) {
  const { data } = props; // assuming data is an array of objects with x and y values

  return (
    <Card sx={{ maxinlineSize: 345, margin: "auto", margininsetBlockStart: 20 }}>
      <CardActionArea>
        <CardContent>
          <Bar data={chartData({ data })}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}



// use 

// import "./App.css";
// import ActionAreaCard from "./Components/Cards";

// function App() {
//   const data = [
//     { x: "Category 1", y1: 1023, y2: 1550, y3: 1310, name: "Vishal" },
//     { x: "Category 2", y1: 120, y2: 130, y3: 140, name: "Vishal" },
//     { x: "Category 3", y1: 102, y2: 120, y3: 130, name: "Vishal" },
//     { x: "Category 4", y1: 120, y2: 105, y3: 20, name: "Vishal" },
//     // ...
//   ];

//   return (
//     <div>
//       {data.map((item, index) => (
//         <ActionAreaCard key={index} data={[item]} name={item.name} />
//       ))}
//     </div>
//   );
// }

// export default App;