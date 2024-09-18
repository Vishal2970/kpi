import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CardDetails() {

  const params  = useParams();
  const widgetName = params.widgetName;
  const id = params.id; 

  console.log(id);
    
  const URL="http://localhost:5000/api/check-cardDetails";

  const fetchCardDetails=async()=>{
    try {
      const response = await axios.get(`${URL}?id=${id}`);
      console.log('Request URL:', `${URL}?id=${id}`);
      console.log(response);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    fetchCardDetails();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Hello {widgetName} and {id}</h1>
    </div>
  );
}




//, { useEffect, useState }


  // const [Row, setRows] = useState();
  // const [Column, setColumn] = useState();
  // const [CardDetails, setCardDetails] = useState();
  // const [WidgetNames, setWidgetNames] = useState();




  // const fetchAllData = async () => {
  //   let rows = [];
  //   let widgetNames = [];
  //   try {
  //     console.log(URL);
  //     const response = await axios.get(URL);
  //     const data = response.data;
  //     if (data) {
  //       data.forEach((item) => {
  //         if (Array.isArray(item.response)) {
  //           rows.push(item.response);
  //         } else {
  //           console.error("Invalid data format for rows");
  //         }
  //       });
  //       data.forEach((item) => widgetNames.push(item.widgetName));
  //     }
  //   } catch (error) {
  //     console.error(`Error fetching data from ${URL}:`, error);
  //   }
  //   setRows(rows);
  //   setWidgetNames(widgetNames);
  // };