import React, { useEffect, useState } from "react";
import BasicTable from "../tables/test";
import { Grid, Container } from "@mui/material";
import axios from "axios";

export default function TableDisplay() {
  const [dataList, setDataList] = useState([]);

  const URLS = [
    { url: "http://localhost:5000/api/check-table1" },
    { url: "http://localhost:5000/api/check-table2" },
    { url: "http://localhost:5000/api/check-table3" },
    { url: "http://localhost:5000/api/check-table1" },
    { url: "http://localhost:5000/api/check-table2" },
    { url: "http://localhost:5000/api/check-table3" },
    { url: "http://localhost:5000/api/check-table1" },
    { url: "http://localhost:5000/api/check-table2" },
    { url: "http://localhost:5000/api/check-table3" },
    { url: "http://localhost:5000/api/check-table1" },
    { url: "http://localhost:5000/api/check-table2" },
    { url: "http://localhost:5000/api/check-table3" },
    { url: "http://localhost:5000/api/check-table1" },
    { url: "http://localhost:5000/api/check-table2" },
    { url: "http://localhost:5000/api/check-table3" },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const results = await Promise.all(
          URLS.map(async (urlObj) => {
            const response = await axios.get(urlObj.url);
            const data = response.data;

            if (
              data &&
              data.data &&
              data.data.recordsets &&
              data.data.recordsets.length > 0 &&
              data.data.recordsets[0].length > 0
            ) {
              const columns = Object.keys(data.data.recordsets[0][0]).map(
                (key) => ({
                  id: key,
                  label: key,
                })
              );
              const rows = data.data.recordsets[0];

              return { columns, rows };
            }
            return { columns: [], rows: [] };
          })
        );

        setDataList(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        {dataList.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BasicTable columns={data.columns} rows={data.rows} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
