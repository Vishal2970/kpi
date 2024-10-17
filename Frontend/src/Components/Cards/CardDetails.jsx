import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import Graph from "./Graph";
// import hourglass from "../../Images/hourglass.gif";
import hourglass from "../../Images/loading.gif";
import { useAuthContext } from "../../Context/authContext";

export default function CardDetails() {
  const params = useParams();
  const id = params.id;
  const { auth } = useAuthContext();
  const [detail, setDetail] = useState({
    graph: {
      caption: "",
      name: "",
      displayName: "",
      graphResponse: [],
    },
    widget: {
      items: {
        name: "",
        caption: "",
        parameter: "",
        widgetResponse: "",
      },
    },
  });
  const [viewDetails, setViewDetails] = useState({
    view: {
      name: "",
      parameter: "",
      columnName: [],
      viewResponse: [],
    },
  });

  useEffect(() => {
    fetchCardDetails();
    // eslint-disable-next-line
  }, []);

  const cards = [];
  if (
    detail.widget &&
    detail.widget.items &&
    Array.isArray(detail.widget.items)
  ) {
    detail.widget.items.forEach((it, index) => {
      cards.push({ id: index, title: it.caption, content: it.widgetResponse||"No Data Found" });
    });
  }

  const graphData = [];
  if (
    detail.graph &&
    detail.graph.graphResponse &&
    Array.isArray(detail.graph.graphResponse[0])
  ) {
    detail.graph.graphResponse[0].forEach((item) => {
      graphData.push(
        {
          label: item.Name || (
            <img
              src={hourglass}
              alt="Hourglass icon"
              style={{ inlineSize: "2em", blockSize: "2em" }}
            />
          ),
        },
        {
          label: item.Value || (
            <img
              src={hourglass}
              alt="Hourglass icon"
              style={{ inlineSize: "2em", blockSize: "2em" }}
            />
          ),
        }
      );
    });
  }

  if (detail.graph) {
    graphData.unshift(
      {
        label: detail.graph.caption || (
          <img
            src={hourglass}
            alt="Hourglass icon"
            style={{ inlineSize: "2em", blockSize: "2em" }}
          />
        ),
      },
      {
        label: detail.graph.displayName || (
          <img
            src={hourglass}
            alt="Hourglass icon"
            style={{ inlineSize: "2em", blockSize: "2em" }}
          />
        ),
      },
      {
        label: detail.graph.name || (
          <img
            src={hourglass}
            alt="Hourglass icon"
            style={{ inlineSize: "2em", blockSize: "2em" }}
          />
        ),
      }
    );
  }
  const tables = [];
  if (
    viewDetails.view &&
    viewDetails.view.item &&
    Array.isArray(viewDetails.view.item)
  ) {
    viewDetails.view.item.forEach((element, index) => {
      const rows = [];
      const columnNames = element.columnName;
      
      element.response.forEach((responseValue, rowIndex) => {
        console.log(element.response);
        
        rows.push({ id: rowIndex, name: "index", value: responseValue });
      });
      tables.push({
        id: index,
        name: element.name,
        columns: columnNames.map((columnName, columnIndex) => ({
          id: columnIndex,
          label: columnName,
        })),
        rows,
      });
    });
  } else {
    console.log("cardDetailResponse not found in detail object.");
  }
  const URL = "http://localhost:5000/api/check-cardDetails";
  const fetchCardDetails = async () => {
    try {
      const response = await axios.get(`${URL}?id=${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      console.log("Request URL:", `${URL}?id=${id}`);
      const allData = response.data.cardDetailResponse;

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

      const viewData = allData.viewDetails;

      setViewDetails((previous) => {
        const data = {
          item: viewData.map((element) => {
            return {
              name: element.name,
              parameter: element.parameter,
              columnName: element.viewResponse.colname? element.viewResponse.colname: null,
              response: element.viewResponse.value ? element.viewResponse.value[0]: null,
            };
          }),
        };
        return {
          ...previous,
          view: data,
        };
      });
      //widgetDetails set
      const widgetData = allData.widgetItem;
      setDetail((prevState) => {
        const updatedWidget = {
          items: widgetData.map((element) => {
            return {
              name: element.name,
              caption: element.caption,
              widgetItemParameter: element.widgetItemParameter,
              widgetResponse: element.response[0],
            };
          }),
        };
        return {
          ...prevState,
          widget: updatedWidget,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  function getColumnPropertyName(columnId) {
    switch (columnId) {
      case 0:
        return "id";
      case 1:
        return "name";
      case 2:
        return "value";
      case 3:
        return "someOtherProperty";
      default:
        return "";
    }
  }

  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
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
            <Paper elevation={3} className="table">
              <h2>{table.name}</h2>
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
                      {table.columns.map((column) => {
                        const propertyName = getColumnPropertyName(column.id);
                        return <td key={column.id}>{row[propertyName]}</td>;
                      })}
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
