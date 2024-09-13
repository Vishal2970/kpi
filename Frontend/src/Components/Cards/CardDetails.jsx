import React from 'react';
import { useParams } from 'react-router-dom';

export default function CardDetails() {
  const { widgetName } = useParams();

  return (
    <div>
      <h1>Hello {widgetName}</h1>
    </div>
  );
}