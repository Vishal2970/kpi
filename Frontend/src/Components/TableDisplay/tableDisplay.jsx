
import React, { useEffect, useState, useMemo } from "react";
import BasicTable from "../tables/test";
import { Grid, Container } from "@mui/material";
import axios from "axios";

export default function TableDisplay() {
  const [filter, setFilter] = useState(null);
  const [WidgetNames, setWidgetNames] = useState([]);
  const [Rows, setRows] = useState([]);

  const URLS = useMemo(
    () => [{ url: "http://localhost:5000/api/check-table" }],
    []
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        let rows = [];
        let widgetNames = [];

        const results = await Promise.all(
          URLS.map(async (urlObj) => {
            try {
              const params = {};
              if (filter !== null) {
                params.filter = filter;
              }
              const response = await axios.get(urlObj.url, { params });
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

        console.log("rows", rows);
        console.log("widgetNames", widgetNames);

        setRows(rows);
        setWidgetNames(widgetNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [URLS, filter]);

  return (
    <Container>
      <Grid container spacing={2}>
        {Rows.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BasicTable rows={data} widgetName={WidgetNames[index]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


