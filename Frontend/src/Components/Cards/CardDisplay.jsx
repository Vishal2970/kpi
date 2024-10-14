import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/authContext";

const Card = ({ data, widgetName, id }) => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();


  const onClick = () => {
    id && navigate(`/Card/${widgetName}/${id}`);
  };
  return (
    <div onClick={onClick}>
      <h2>{widgetName}</h2>
      <p>{data.response[0]}</p>
    </div>
  );
};

const CardDisplay = () => {
  const [dataSets, setDataSets] = useState([]);
  const [widgetNames, setWidgetNames] = useState([]);
  const [id, setId] = useState([]);
  const { auth } = useAuthContext();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/check-card", {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((response) => {
        const data = response.data;
        setDataSets(data);
        setWidgetNames(data.map((item) => item.widgetName));
        setId(data.map((item) => item.id));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleCardClick = () => {
    alert("Clicked");
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    dots: false,
    Swipe: false,
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

  return (
    <Container>
      {dataSets.length < 4 ? (
        <Grid container direction="row" wrap="wrap" spacing={2}>
          {dataSets.map((data, index) => (
            <Grid item xs={3} key={index}>
              <Card
                data={data}
                widgetName={widgetNames[index]}
                id={id[index]}
                onclick={handleCardClick}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Slider {...settings}>
          {dataSets.map((data, index) => (
            <Grid item xs={3} key={index}>
              <Card
                data={data}
                widgetName={widgetNames[index]}
                id={id[index]}
                onclick={handleCardClick}
              />
            </Grid>
          ))}
        </Slider>
      )}
    </Container>
  );
};
export default CardDisplay;
