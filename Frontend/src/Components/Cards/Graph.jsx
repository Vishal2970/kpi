import React from 'react';

const Graph = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <span>{item.label}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default Graph;