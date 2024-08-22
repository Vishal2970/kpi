import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 'auto',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function Card({ Data, Columns }) {
//   console.log("Data passed to Card:", Data[0]);
//   console.log("Name passed to Card:", Columns[0]);
  return (
    <DemoPaper variant="elevation">
      <div>{Columns[0]}</div>
      <div>{Data[0][Columns[0]]}</div>
    </DemoPaper>
  );
}
