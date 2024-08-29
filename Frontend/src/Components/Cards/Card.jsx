import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "auto",
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

export default function Card({ Data, Columns }) {
  console.log(Data);
  
  return (
    <>
      {Data.map((data, index) => (
        <DemoPaper key={index} variant="elevation">
          <div>
            {Columns.map((column, columnIndex) => (
              <span key={columnIndex}>{column}</span>
            ))}
          </div>
          <div>
            {Object.values(data).map((value, valueIndex) => (
              <span key={valueIndex}>{value}</span>
            ))}
          </div>
        </DemoPaper>
      ))}
    </>
  );
}


// Data=>
// 0: {CopkchildId: '11.5'}1: {CopkchildId: '11.3'}2: {CopkchildId: '11.2'}length: 3[[Prototype]]: Array(0)

// Columns=>
// TotalsalesRevenue
// GuestUserSaleswvat
// RegUserSaleswvat








  {/* {Columns.forEach((element) => {
        console.log(element);
        // console.log(element);
      })}
      {/* {Data.forEach((element) => {
        console.log(element[0]);
      // })} */} 