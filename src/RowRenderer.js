import React from 'react';

const RowRenderer = ({ index, style, data, onRowClick }) => {
  const row = data[index];

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        borderBottom: '1px solid #ccc',
        backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
        cursor: 'pointer',
      }}
      onClick={() => onRowClick(row.id)}
    >
      {Object.values(row).map((value, colIndex) => (
        <div key={colIndex} style={{ flex: 1 }}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default RowRenderer;
