import React, { useEffect, useState, useContext } from "react";
import Table from "./Table";
import { Grid, Container } from "@mui/material";
import axios from "axios";
import { FilterContext } from "../../Context/filterProvider";

export default function TableDisplay() {
  const { selectedFilter } = useContext(FilterContext);
  const [widgetNames, setWidgetNames] = useState([]);
  const [rows, setRows] = useState([]);
  const [widgetFilter, setWidgetFilter] = useState(null);
  const [filterCondition, setFilterCondition] = useState(null);
  const [contentDisplay, setContentDisplay] = useState(true);
  const [filterGraph, setFilterGraph] = useState([]); // Initialize filterGraph as an empty array

  const URL = "http://localhost:5000/api/check-table";
  const URL_Filter = "http://localhost:5000/api/check-filter";

  // Function to fetch all data by default
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

  // Function to fetch filtered data based on widget name and filter condition
  console.log("Selected filter:");
  console.log(selectedFilter);

  const handleWidgetFilterUpdate = async (widgetName, filterCondition) => {
    try {
      const date = `codate=${selectedFilter.date}`;
      const shop = selectedFilter.shop ? `coshopno='${selectedFilter.shop}'` : null;
      const params = {
        widgetName,
        sharedOrder: [filterCondition, date, shop],
      };
      console.log(URL_Filter);
      const response = await axios.get(URL_Filter, { params });
      const data = response.data;
      const index = widgetNames.indexOf(widgetName);
      if (index !== -1) {
        console.log("Response");
        console.log(data[0].response);
        const newRows = [...rows];
        newRows[index] = data[0].response; // Update only the specific widget's data
        setRows(newRows);
        setWidgetNames(
          widgetNames.map((name, i) => (i === index ? widgetName : name))
        );
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  // Function to handle shared filter condition for all tables
  const handleFilterUpdate = async (filterCondition) => {
    let rows = [];
    let widgetNames = [];
    try {
      const params = {
        sharedCondition: `codate='${filterCondition.date}' and coshopno='${filterCondition.shop}'`,
      };
      console.log(URL);
      const response = await axios.get(URL, { params });
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

  // Fetch all data on initial load or when content display changes
  useEffect(() => {
    fetchAllData();
  }, [contentDisplay]);

  // Apply filters based on widget or shared filter
  useEffect(() => {
    if (widgetFilter !== null && filterCondition !== null) {
      handleWidgetFilterUpdate(widgetFilter, filterCondition);
    } else if (selectedFilter) {
      handleFilterUpdate(selectedFilter);
    }
  }, [widgetFilter, filterCondition, selectedFilter]);

  // Handle filter logic only without making an API call
  const handleFilter = (filterProps) => {
    if (Array.isArray(filterProps)) {
      setWidgetFilter(filterProps[0]);
      setFilterCondition(filterProps[1]);
      // Directly sort or filter the existing data based on filterProps
      const updatedRows = rows.map((row, index) => {
        if (widgetNames[index] === filterProps[0] && Array.isArray(row)) {
          return [...row].sort((a, b) =>
            filterProps[1] === "ASC" ? a.coDate - b.coDate : b.coDate - a.coDate
          );
        }
        return row;
      });
      setRows(updatedRows);
    }
  };

  const handleGraph = (filterGraph) => {
    setFilterGraph(filterGraph);
    filterGraph[1] === "GRAPH" ? setContentDisplay(false) : setContentDisplay(true);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {rows.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {filterGraph[0] ? (
              widgetNames[index] === filterGraph[0] && contentDisplay ? (
                <Table
                  rows={data}
                  widgetName={widgetNames[index]}
                  filterProps={handleFilter}
                  filterGraph={handleGraph}
                />
              ) : (
                <>Hello</>
              )
            ) : (
              <Table
                rows={data}
                widgetName={widgetNames[index]}
                filterProps={handleFilter}
                filterGraph={handleGraph}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
