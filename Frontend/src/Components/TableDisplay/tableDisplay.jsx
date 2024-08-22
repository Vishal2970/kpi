import React, { useEffect, useState } from "react";
import BasicTable from "../tables/test";
import { Grid, Container } from "@mui/material";
import axios from "axios"; // Ensure axios is imported

export default function TableDisplay() {
  const [dataList, setDataList] = useState([]);

  const URLS = [
    { url: "http://localhost:5000/api/check-table" },
    { url: "http://localhost:5000/api/check-table1" },
    { url: "http://localhost:5000/api/check-table2" },
    { url: "http://localhost:5000/api/check-table" },
    { url: "http://localhost:5000/api/check-table1" },
    { url: "http://localhost:5000/api/check-table2" },   
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      const results = await Promise.all(
        URLS.map(async (urlObj) => {
          try {
            const response = await axios.get(urlObj.url);
            const data = response.data;

            if (
              data &&
              data.data &&
              data.data.recordset &&
              data.data.recordset.length > 0
            ) {
              // Extract columns and rows for each URL response
              const columns = Object.keys(data.data.recordset[0]).map((key) => ({
                id: key,
                label: key,
              }));
              const rows = data.data.recordset.map((item) => ({
                ...item,
              }));

              return { columns, rows };
            }
          } catch (error) {
            console.error(`Error fetching data from ${urlObj.url}:`, error);
            return { columns: [], rows: [] };
          }
        })
      );

      setDataList(results);
    };

    fetchAllData();
  }, []);

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        {dataList.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BasicTable columns={data.columns} rows={data.rows} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
