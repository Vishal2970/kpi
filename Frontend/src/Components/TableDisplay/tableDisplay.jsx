import React, { useEffect, useState, useMemo } from "react";
import BasicTable from "../tables/BasicTable";
import { Grid, Container } from "@mui/material";
import axios from "axios";

export default function TableDisplay() {
  const [WidgetNames, setWidgetNames] = useState([]);
  const [Rows, setRows] = useState([]);
  const [widgetFilter, setWidgetFilter] = useState(null);
  const [filterCondition, setFilterCondition] = useState(null);

  const URLS = useMemo(
    () => [{ url: "http://localhost:5000/api/check-table" }],
    []
  );

  const handleFilter = (filterProps) => {
    if (Array.isArray(filterProps)) {
      setWidgetFilter(filterProps[0]);
      setFilterCondition(filterProps[1]);
      console.log(`Widget Name: ${filterProps[0]}`);
      console.log(`Filter Type: ${filterProps[1]}`);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        let rows = [];
        let widgetNames = [];

        await Promise.all(
          URLS.map(async (urlObj) => {
            try {
              
              const response = await axios.get(urlObj.url);
              const data = response.data;

              if (data) {
                data.forEach((item) => {
                  if (Array.isArray(item.response)) {
                    rows.push(item.response); // Assuming item.response is an array of arrays
                  } else {
                    console.error("Invalid data format for rows");
                  }
                });
                data.forEach((item) => widgetNames.push(item.widgetName));
              }
            } catch (error) {
              console.error(`Error fetching data from ${urlObj.url}:`, error);
            }
          })
        );

        setRows(rows);
        setWidgetNames(widgetNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  const handleFilterUpdate = async (widgetName, filterCondition) => {
    try {
      const params = {
        widgetName,
        sharedOrder: filterCondition,
      };
      const response = await axios.get(URLS[0].url, { params });
      const data = response.data;
      const index = WidgetNames.indexOf(widgetName);
      if (index !== -1) {
        const newRows = [...Rows];
        newRows[index] = data[0].response;
        setRows(newRows);
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  useEffect(() => {
    if (widgetFilter !== null && filterCondition !== null) {
      handleFilterUpdate(widgetFilter, filterCondition);
    }
  }, [widgetFilter, filterCondition]);

  return (
    <Container>
      <Grid container spacing={2}>
        {Rows.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BasicTable rows={data} widgetName={WidgetNames[index]} filterProps={handleFilter} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}