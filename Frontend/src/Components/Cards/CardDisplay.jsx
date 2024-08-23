// import React, { useEffect, useState } from "react";
// import Card from "./Card";
// import { Container, Grid } from "@mui/material";
// import axios from "axios";

// export default function CardDisplay() {
//   const [dataList, setDataList] = useState([]);

//   const URLS = [
//     { url: "http://localhost:5000/api/check-table3" },
//     { url: "http://localhost:5000/api/check-table4" },
//     { url: "http://localhost:5000/api/check-table5" },
//     { url: "http://localhost:5000/api/check-table3" },
//     { url: "http://localhost:5000/api/check-table4" },
//     { url: "http://localhost:5000/api/check-table5" },
//   ];

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const results = await Promise.all(
//           URLS.map(async (urlObj) => {
//             const response = await axios.get(urlObj.url);
//             const data = response.data;

//             if (
//               data &&
//               data.data &&
//               data.data.recordsets &&
//               data.data.recordsets.length > 0 &&
//               data.data.recordsets[0].length > 0
//             ) {
//               const columns = Object.keys(data.data.recordsets[0][0]);
//               const rows = data.data.recordsets[0];

//               return { columns, rows };
//             }
//             return null;
//           })
//         );

//         setDataList(results.filter((result) => result !== null));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchAllData();
//   }, []);

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         {dataList.map((data, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card Data={data.rows} Columns={data.columns} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardDisplay() {
  const [dataList, setDataList] = useState([]);

  const URLS = [
    { url: "http://localhost:5000/api/check-table3" },
    { url: "http://localhost:5000/api/check-table4" },
    { url: "http://localhost:5000/api/check-table5" },
    { url: "http://localhost:5000/api/check-table3" },
    // { url: "http://localhost:5000/api/check-table4" },
    // { url: "http://localhost:5000/api/check-table5" },
    // { url: "http://localhost:5000/api/check-table3" },
    // { url: "http://localhost:5000/api/check-table4" },
    // { url: "http://localhost:5000/api/check-table5" },
    // { url: "http://localhost:5000/api/check-table3" },
    // { url: "http://localhost:5000/api/check-table4" },
    // { url: "http://localhost:5000/api/check-table5" },
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
              const columns = Object.keys(data.data.recordsets[0][0]);
              const rows = data.data.recordsets[0];

              return { columns, rows };
            }
            return null;
          })
        );

        setDataList(results.filter((result) => result !== null));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  // Settings for the slider
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

  return (
    <Container>
      {dataList.length > 3 ? (
        <Slider {...settings}>
          {dataList.map((data, index) => (
            <div key={index}>
              <Card Data={data.rows} Columns={data.columns} />
            </div>
          ))}
        </Slider>
      ) : (
        <Grid container spacing={2}>
          {dataList.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card Data={data.rows} Columns={data.columns} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
