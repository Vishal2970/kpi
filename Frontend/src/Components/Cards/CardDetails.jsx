import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CardDetails() {
  const params = useParams();
  const id = params.id;
  const widgetName=params.widgetName;
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

  const URL = "http://localhost:5000/api/check-cardDetails";

  const fetchCardDetails = async () => {
    try {
      const response = await axios.get(`${URL}?id=${id}`);
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

  useEffect(() => {
    fetchCardDetails();
    console.log(detail);
    
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Hello {widgetName} and {id}</h1>
    </div>
  );
}