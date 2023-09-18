// import React, { useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import axios from 'axios';

// const App = () => {
//   const [fileContent, setFileContent] = useState('');

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       const content = reader.result;
//       setFileContent(content);
//     };

//     reader.readAsText(selectedFile);
//   };

//   const parseFileContent = () => {
//     // Split the file content by line break
//     const lines = fileContent.split('\n');

//     // Extract column names from the first line
//     const columnNames = lines[0].split('\t');

//     // Parse the data into an array of objects using column names as keys
//     const data = lines.slice(1).map((line) => {
//       const values = line.split('\t');
//       const item = {};

//       columnNames.forEach((columnName, index) => {
//         item[columnName] = values[index];
//       });

//       return item;
//     });

//     return data;
//   };
//   const insertData = () => {
//     const data = parseFileContent();
//     console.log(data)
//     const url = `http://localhost:5005/insertData`
//     const Credentials = data
//     axios.post(url, Credentials)
//         .then(response => {
//             const result = response.data;
//             const { status, message, data } = result;
//             if ( response.status !== 200) {
//                 alert("failed")
//             }
//             else {
//                 alert("Succes")
//             }
//         })
//         .catch(err => {
//             console.log(err)
//         })
       
// }


//   return (
//     <div className='table-responsive'>
//       <input type="file" onChange={handleFileChange} />
//       {fileContent && <button onClick={insertData}>insert data into database</button>}
     
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

const navbarStyle = {
  backgroundColor: '#1f4d7e',
  padding: '10px 10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: '0',
  width: '98%',
  zIndex: '1000',
  borderRadius: '15px 15px 15px 15px',
  marginTop: '5px',
};

const navbarTextStyle = {
  color: '#fff',
  fontSize: '26px',
  fontWeight: 'bold',
};

function TableData() {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [scannedData, setScannedData] = useState('');
  const [manualVerificationData, setManualVerificationData] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [exportData, setExportData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [verificationCount, setVerificationCount] = useState({});

  useEffect(() => {
    fetchTableData(tableName);
  }, [tableName]);

  useEffect(() => {
    if (scannedData && selectedColumn) {
      verifyData(scannedData);
      setScannedData('');
    }
  }, [scannedData, selectedColumn, tableData]);

  const fetchTableData = (tableName) => {
    fetch(`http://ip:5000/data/${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        if (data.length > 0) {
          setSelectedColumn(Object.keys(data[0])[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verifyData = (dataToVerify) => {
    const matchingRow = tableData.find((row) => {
      if (selectedColumn === 'id') {
        return row[selectedColumn] === dataToVerify;
      } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
        return true;
      }
      return false;
    });

    if (matchingRow) {
      const currentCount = verificationCount[matchingRow.id] || 0;

      if (currentCount >= 1) {
        setError('Data is already verified once.');
      } else {
        const updatedTableData = tableData.map((row) =>
          row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
        );
        setTableData(updatedTableData);
        setVerificationCount({
          ...verificationCount,
          [matchingRow.id]: currentCount + 1,
        });
        setError('');
        saveAndExit(updatedTableData);
      }
    } else {
      setError('Data not found in the file.');
    }

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const exportToExcel = (type) => {
    const filteredData = tableData.filter((row) => {
      if (type === 'verified') {
        return row.Status === 'Verified';
      } else if (type === 'notVerified') {
        return row.Status !== 'Verified';
      }
      return true;
    });
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
      (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
      currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
      currentDate.getMinutes().toString().padStart(2, '0')}`;
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  const saveAndExit = async (updatedData) => {
    try {
      const allVerified = updatedData.every((row) => row.Status === 'Verified');
      const oldTableName = tableName;
      let newTableName;

      if (oldTableName.includes('_unfinished') && allVerified) {
        newTableName = oldTableName.replace('_unfinished', '_verified');
      } else if (oldTableName.includes('_verified') && !allVerified) {
        newTableName = oldTableName.replace('_verified', '_unfinished');
      } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
        newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
      } else {
        newTableName = oldTableName;
      }

      await fetch(`http://ip:5000/renameTable/${oldTableName}/${newTableName}`, {
        method: 'POST',
      });

      await Promise.all(
        updatedData
          .filter((row) => row.Status === 'Verified')
          .map(async (row) => {
            await fetch(`http://ip:5000/updateStatus/${newTableName}/${row.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ Status: 'Verified' }),
            });
          })
      );
    } catch (error) {
      console.error(error);
    }
    navigate('/PA1');
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div style={navbarStyle}>
            <div style={navbarTextStyle}>SEBN,TN</div>
            <div style={navbarTextStyle}>
              <span
                style={{ fontSize: '18px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                LogOut
              </span>
            </div>
          </div>
          <div className="table-container" style={{ marginTop: '70px' }}>
            <h2>File Data: {tableName}</h2>
            <div className="table-scroll">
              <table className='table'>
                <thead>
                  <tr>
                    <td>
                      <div>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Select Column</InputLabel>
                          <Select
                            value={selectedColumn}
                            onChange={(e) => setSelectedColumn(e.target.value)}
                            label="Select Column"
                          >
                            {tableData.length > 0 &&
                              Object.keys(tableData[0]).map((key, index) => (
                                <MenuItem key={index} value={key}>
                                  {key}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </td>
                    <td>
                      <TextField
                        fullWidth
                        label="Scan Product Name or Number"
                        variant="outlined"
                        value={scannedData}
                        onChange={(e) => setScannedData(e.target.value)}
                      />
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                    </td>
                    <td>
                      <TextField
                        fullWidth
                        label="Manual Verification Data"
                        variant="outlined"
                        value={manualVerificationData}
                        onChange={(e) => setManualVerificationData(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            verifyData(manualVerificationData);
                            setManualVerificationData('');
                          }
                        }}
                      />
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                    </td>
                  </tr>
                </thead>
              </table>
              <div className="table-content">
                <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
                <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
                <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
                <table className="table">
                  <thead>
                    <tr>
                      {tableData.length > 0 &&
                        Object.keys(tableData[0]).map((key, index) => (
                          <th key={index}>
                            {key}
                            <br />
                            {key === 'Status' ? (
                              <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                  value={statusFilter}
                                  onChange={(e) => setStatusFilter(e.target.value)}
                                  label="Status"
                                >
                                  <MenuItem value="">All</MenuItem>
                                  <MenuItem value="Verified">Verified</MenuItem>
                                  <MenuItem value="Not Verified">Not Verified</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                fullWidth
                                label={`Filter ${key}`}
                                variant="outlined"
                                value={columnFilters[key] || ''}
                                onChange={(e) =>
                                  setColumnFilters({ ...columnFilters, [key]: e.target.value })
                                }
                              />
                            )}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData
                      .filter((row) => {
                        return (
                          Object.keys(columnFilters).every((column) => {
                            const filterValue = columnFilters[column];
                            if (filterValue === '') return true;
                            return (
                              String(row[column])
                                .toLowerCase()
                                .includes(filterValue.toLowerCase()) &&
                              (statusFilter === '' || row['Status'] === statusFilter)
                            );
                          }) &&
                          (statusFilter === '' || row['Status'] === statusFilter)
                        );
                      })
                      .map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          style={{
                            backgroundColor:
                              verificationCount[row.id] && verificationCount[row.id] > 1
                                ? 'orange'
                                : row.Status === 'Verified'
                                ? '#90EE90'
                                : 'white',
                          }}
                        >
                          {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
}

export default TableData;
