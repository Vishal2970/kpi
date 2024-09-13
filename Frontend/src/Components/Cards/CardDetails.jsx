import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CardDetails() {
  const [Row, setRows] = useState();
  const [Column, setColumn] = useState();
  const [CardDetails, setCardDetails] = useState();
  const [WidgetNames, setWidgetNames] = useState();
  const { widgetName } = useParams();

  const fetchAllData = async () => {
    let rows = [];
    let widgetNames = [];
    try {
      console.log(URL);
      const response = await axios.get(URL);
      const data = response.data;
      if (data) {
        data.forEach((item) => {
          if (Array.isArray(item.response)) {
            rows.push(item.response);
          } else {
            console.error("Invalid data format for rows");
          }
        });
        data.forEach((item) => widgetNames.push(item.widgetName));
      }
    } catch (error) {
      console.error(`Error fetching data from ${URL}:`, error);
    }
    setRows(rows);
    setWidgetNames(widgetNames);
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div>
      <h1>Hello {widgetName}</h1>
    </div>
  );
}
