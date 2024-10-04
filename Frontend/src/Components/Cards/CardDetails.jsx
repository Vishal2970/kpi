import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import Graph from "./Graph";
// import hourglass from "../../Images/hourglass.gif";
import hourglass from "../../Images/loading.gif";

export default function CardDetails() {
  const params = useParams();
  const id = params.id;
  const widgetName = params.widgetName;
  const [detail, setDetail] = useState({
    graph: {
      caption: "",
      name: "",
      displayName: "",
      graphResponse: [],
    },
    view: {
      name: "",
      parameter: "",
      viewResponse: [],
    },
    widget: {
      items: {
        name: "",
        caption: "",
        parameter: "",
        widgetResponse: [],
      },
    },
  });

  useEffect(() => {
    fetchCardDetails();
    // console.log(detail);
    // eslint-disable-next-line
  }, []);

// console.log("here",detail);

  const cards = [
    { id: 1, title: "Card 1", content: "This is card 1" },
    { id: 2, title: "Card 2", content: "This is card 2" },
    { id: 3, title: "Card 3", content: "This is card 3" },
    { id: 4, title: "Card 4", content: "This is card 4" },
    { id: 5, title: "Card 5", content: "This is card 5" },
    { id: 6, title: "Card 6", content: "This is card 6" },
  ];
  const graphData = [
    { label: (detail.graph && detail.graph.caption) || <img src={hourglass} alt="Hourglass icon" style={{ width: '2em', height: '2em' }} /> },
    { label: (detail.graph && detail.graph.displayName) || <img src={hourglass} alt="Hourglass icon" style={{ width: '2em', height: '2em' }} /> },
    { label: (detail.graph && detail.graph.name) || <img src={hourglass} alt="Hourglass icon" style={{ width: '2em', height: '2em' }} /> },
    { label: (detail.graph && detail.graph.graphResponse && detail.graph.graphResponse[0] && detail.graph.graphResponse[0][0].Name) || <img src={hourglass} alt="Hourglass icon" style={{ width: '2em', height: '2em' }} /> },
    { label: (detail.graph && detail.graph.graphResponse && detail.graph.graphResponse[0] && detail.graph.graphResponse[0][0].Value) || <img src={hourglass} alt="Hourglass icon" style={{ width: '2em', height: '2em' }} /> },
  ];
  const tables = [
    {
      id: 1,
      columns: [
        { id: "name", label: "Name" },
        { id: "age", label: "Age" },
      ],
      rows: [
        { id: 1, name: "John", age: 25 },
        { id: 2, name: "Jane", age: 30 },
        { id: 3, name: "Bob", age: 35 },
      ],
    },
    {
      id: 2,
      columns: [
        { id: "product", label: "Product" },
        { id: "price", label: "Price" },
      ],
      rows: [
        { id: 1, product: "Product 1", price: 10.99 },
        { id: 2, product: "Product 2", price: 20.99 },
        { id: 3, product: "Product 3", price: 30.99 },
      ],
    },
    {
      id: 3,
      columns: [
        { id: "product", label: "Product" },
        { id: "price", label: "Price" },
      ],
      rows: [
        { id: 1, product: "Product 1", price: 10.99 },
        { id: 2, product: "Product 2", price: 20.99 },
        { id: 3, product: "Product 3", price: 30.99 },
      ],
    },
    {
      id: 4,
      columns: [
        { id: "product", label: "Product" },
        { id: "price", label: "Price" },
      ],
      rows: [
        { id: 1, product: "Product 1", price: 10.99 },
        { id: 2, product: "Product 2", price: 20.99 },
        { id: 3, product: "Product 3", price: 30.99 },
      ],
    },
    {
      id: 1,
      columns: [
        { id: "name", label: "Name" },
        { id: "age", label: "Age" },
      ],
      rows: [
        { id: 1, name: "John", age: 25 },
        { id: 2, name: "Jane", age: 30 },
        { id: 3, name: "Bob", age: 35 },
      ],
    },
    {
      id: 2,
      columns: [
        { id: "product", label: "Product" },
        { id: "price", label: "Price" },
      ],
      rows: [
        { id: 1, product: "Product 1", price: 10.99 },
        { id: 2, product: "Product 2", price: 20.99 },
        { id: 3, product: "Product 3", price: 30.99 },
      ],
    },
    {
      id: 3,
      columns: [
        { id: "product", label: "Product" },
        { id: "price", label: "Price" },
      ],
      rows: [
        { id: 1, product: "Product 1", price: 10.99 },
        { id: 2, product: "Product 2", price: 20.99 },
        { id: 3, product: "Product 3", price: 30.99 },
      ],
    },
    {
      id: 4,
      columns: [
        { id: "product", label: "Product" },
        { id: "price", label: "Price" },
      ],
      rows: [
        { id: 1, product: "Product 1", price: 10.99 },
        { id: 2, product: "Product 2", price: 20.99 },
        { id: 3, product: "Product 3", price: 30.99 },
      ],
    },
  ];

  const URL = "http://localhost:5000/api/check-cardDetails";

  const fetchCardDetails = async () => {
    console.log("Enterd for details");
    
    try {
      console.log(`${URL}?id=${id}`);
      
      const response = await axios.get(`${URL}?id=${id}`);
      // console.log("Request URL:", `${URL}?id=${id}`);
      const allData = response.data.cardDetailResponse;
      
      console.log("All data",allData);
      

      //graph set
      const graphData = allData.graphDetail[0];
      setDetail((prevState) => ({
        ...prevState,
        graph: {
          caption: graphData.caption,
          name: graphData.name,
          displayName: graphData.displayName,
          graphResponse: [graphData.graphResponse],
        },
      }));

      //view set
      const viewData = allData.viewDetails;
      viewData.forEach((element) => {
        setDetail((prevState) => ({
          ...prevState,
          view: {
            name: element.name,
            parameter: element.parameter,
            viewResponse: [element.viewResponse],
          },
        }));
      });

      //widgetDetails set
      const widgetData = allData.widgetItem;
      widgetData.forEach((element) => {
        setDetail((prevState) => ({
          ...prevState,
          widget: {
            items: {
              name: element.name,
              caption: element.caption,
              widgetItemParameter: element.widgetItemParameter,
              widgetResponse: [element.response],
            },
          },
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
  {/* card */}
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item key={index} xs={6}>
            <Paper elevation={3} className="card">
              <h2>{card.title}</h2>
              <p>{card.content}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <Paper elevation={3} className="graph-section">
        <Graph data={graphData} />
      </Paper>
    </Grid>
  </Grid>

  {/* Graph */}
  
  {/* Table */}
  <Grid container spacing={2}>
    {tables.map((table, index) => (
      <Grid item key={index} xs={3}>
        {" "}
        {/* adjust the xs value to control the width of each table */}
        <Paper elevation={3} className="table">
          <h2>{widgetName}</h2>
          <table>
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th key={column.id}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.id}>
                  {table.columns.map((column) => (
                    <td key={column.id}>{row[column.id]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Grid>
  );
}

// import { Grid, Paper } from '@material-ui/core';

// const cards = [
//   { id: 1, title: 'Card 1', content: 'This is card 1' },
//   { id: 2, title: 'Card 2', content: 'This is card 2' },
//   { id: 3, title: 'Card 3', content: 'This is card 3' },
//   { id: 4, title: 'Card 4', content: 'This is card 4' },
//   { id: 5, title: 'Card 5', content: 'This is card 5' },
//   { id: 6, title: 'Card 6', content: 'This is card 6' },
// ];

// const graphData = [
//   { label: 'Jan', value: 10 },
//   { label: 'Feb', value: 20 },
//   { label: 'Mar', value: 30 },
//   { label: 'Apr', value: 40 },
//   { label: 'May', value: 50 },
// ];

// const tables = [
//   {
//     id: 1,
//     columns: [
//       { id: 'name', label: 'Name' },
//       { id: 'age', label: 'Age' },
//     ],
//     rows: [
//       { id: 1, name: 'John', age: 25 },
//       { id: 2, name: 'Jane', age: 30 },
//       { id: 3, name: 'Bob', age: 35 },
//     ],
//   },
//   {
//     id: 2,
//     columns: [
//       { id: 'product', label: 'Product' },
//       { id: 'price', label: 'Price' },
//     ],
//     rows: [
//       { id: 1, product: 'Product 1', price: 10.99 },
//       { id: 2, product: 'Product 2', price: 20.99 },
//       { id: 3, product: 'Product 3', price: 30.99 },
//     ],
//   },
// ];

// return (

// );