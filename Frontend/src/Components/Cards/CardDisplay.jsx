import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardDisplay() {
  const [WidgetNames, setWidgetNames] = useState([]);
  const [Rows, setRows] = useState({
    row,
    widgetName
  });

  const URLS = [{ url: "http://localhost:5000/api/check-card" }];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        let rows = [];
        let widgetNames = [];

        await Promise.all(
          URLS.map(async (urlObj) => {
            const response = await axios.get(urlObj.url);
            const data = response.data;

            if (data) {
              data.forEach((item) => {
                rows.push(item.response[0]);
                widgetNames.push(item.widgetName);
              });
            }
            return null;
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderCards = () => {
    const cards = [];
    // for (let i = 0; i < Rows.length; i++) {
    Rows.map(()=>{
      
    })
      cards.push(
        <div key={i}>
          <Card Data={Rows} Columns={WidgetNames} />
        </div>
      );
    // }
    return cards;
  };

  return (
    <>
      <Container>
        {Rows.length > 4 ? (
          <Slider {...settings}>{renderCards()}</Slider>
        ) : (
          <Grid container direction="row" wrap="nowrap" spacing={2}>
            {renderCards()}
          </Grid>
        )}
      </Container>
    </>
    // <>
    //   <Container>
    //     {Rows.length > 4 ? (
    //       <Slider {...settings}>
    //         <div style={{ width: "100%", overflowX: "auto" }}>
    //           <Grid container direction="row" wrap="wrap" spacing={2}>
    //             <Grid item>
    //               <Card Data={Rows} Columns={WidgetNames} />
    //             </Grid>
    //           </Grid>
    //         </div>
    //       </Slider>
    //     ) : (
    //       <div style={{ width: "100%", overflowX: "auto" }}>
    //         <Grid container direction="row" wrap="nowrap" spacing={2}>
    //           <Grid item>
    //             <Card Data={Rows} Columns={WidgetNames} />
    //           </Grid>
    //         </Grid>
    //       </div>
    //     )}
    //   </Container>
    // </>
  );
}
