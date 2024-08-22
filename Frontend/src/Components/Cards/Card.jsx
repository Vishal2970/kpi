import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// Styled Paper component with flexible width
const DemoPaper = styled(Paper)(({ theme }) => ({
  minWidth: 200, // Set minimum width to ensure cards have enough space
  maxWidth: 400, // Optional: Set maximum width to prevent excessive expansion
  height: 'auto', // Allow height to adjust automatically
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  whiteSpace: 'wrap', // Prevent text wrapping to keep it in one line nowrap
}));

export default function Variants() {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <DemoPaper variant="elevation">
        Default variant Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam consequuntur quos  quae error,laudantium voluptates esse.  Corruptinesciunt neque excepturi.
      </DemoPaper>
    </Stack>
  );
}
