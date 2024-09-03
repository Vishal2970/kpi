import React, { useEffect, useState, useMemo, useContext } from "react";
import Table from "./Table";
import { Grid, Container } from "@mui/material";
import axios from "axios";
import { FilterContext } from "../../Context/filterProvider";

export default function TableDisplay() {
  const { selectedFilter, setSelectedFilter } = useContext(FilterContext);
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
      // console.log(`Widget Name: ${filterProps[0]}`);
      // console.log(`Filter Type: ${filterProps[1]}`);
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
                    rows.push(item.response);
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

  const handleWidgetFilterUpdate = async (widgetName, filterCondition) => {
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

  const handleFilterUpdate = async (filterCondition) => {
    try {
      console.log(filterCondition);
      
      let rows = [];
      let widgetNames = [];

      await Promise.all(
        URLS.map(async (urlObj) => {
          try {
            const params = {
              sharedCondition: `codate='${filterCondition.date}' and coshop='${filterCondition.shop}'`,
            };

            console.log(params);
            
            const response = await axios.get(urlObj.url,{params});
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

  useEffect(() => {
    if (widgetFilter !== null && filterCondition !== null) {
      handleWidgetFilterUpdate(widgetFilter, filterCondition);
    }
    if (selectedFilter) {
      handleFilterUpdate(selectedFilter);
    }
  }, [widgetFilter, filterCondition, selectedFilter]);

  return (
    <Container>
      <Grid container spacing={2}>
        {Rows.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Table
              rows={data}
              widgetName={WidgetNames[index]}
              filterProps={handleFilter}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
