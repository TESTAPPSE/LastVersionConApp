// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import * as XLSX from 'xlsx';
// // // // // import Button from '@mui/material/Button';
// // // // // import Select from '@mui/material/Select';
// // // // // import MenuItem from '@mui/material/MenuItem';
// // // // // import FormControl from '@mui/material/FormControl';
// // // // // import InputLabel from '@mui/material/InputLabel';
// // // // // import TextField from '@mui/material/TextField';

// // // // // const navbarStyle = {
// // // // //   backgroundColor: '#1f4d7e',
// // // // //   padding: '10px 10px',
// // // // //   display: 'flex',
// // // // //   justifyContent: 'space-between',
// // // // //   alignItems: 'center',
// // // // //   position: 'fixed',
// // // // //   top: '0',
// // // // //   width: '98%',
// // // // //   zIndex: '1000',
// // // // //   borderRadius: '15px 15px 15px 15px',
// // // // //   marginTop: '5px',
// // // // // };

// // // // // const navbarTextStyle = {
// // // // //   color: '#fff',
// // // // //   fontSize: '26px',
// // // // //   fontWeight: 'bold',
// // // // // };

// // // // // function TableData() {
// // // // //   const { tableName } = useParams();
// // // // //   const [tableData, setTableData] = useState([]);
// // // // //   const [scannedData, setScannedData] = useState('');
// // // // //   const [manualVerificationData, setManualVerificationData] = useState('');
// // // // //   const [selectedColumn, setSelectedColumn] = useState('');
// // // // //   const [exportData, setExportData] = useState([]);
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     fetchTableData(tableName);
// // // // //   }, [tableName]);

// // // // //   useEffect(() => {
// // // // //     if (scannedData && selectedColumn) {
// // // // //       verifyData(scannedData);
// // // // //       setScannedData('');
// // // // //     }
// // // // //   }, [scannedData, selectedColumn, tableData]);

// // // // //   const fetchTableData = (tableName) => {
// // // // //     fetch(`http://10.110.24.148:5000/data/${tableName}`)
// // // // //       .then((response) => response.json())
// // // // //       .then((data) => {
// // // // //         setTableData(data);
// // // // //         if (data.length > 0) {
// // // // //           setSelectedColumn(Object.keys(data[0])[0]);
// // // // //         }
// // // // //       })
// // // // //       .catch((error) => {
// // // // //         console.error(error);
// // // // //       });
// // // // //   };

// // // // //   const verifyData = (dataToVerify) => {
// // // // //     const matchingRow = tableData.find((row) => {
// // // // //       if (selectedColumn === 'id') {
// // // // //         return row[selectedColumn] === dataToVerify;
// // // // //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// // // // //         return true;
// // // // //       }
// // // // //       return false;
// // // // //     });

// // // // //     if (matchingRow) {
// // // // //       const updatedTableData = tableData.map((row) =>
// // // // //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// // // // //       );
// // // // //       setTableData(updatedTableData);
// // // // //     }
// // // // //   };

// // // // //   const exportToExcel = (type) => {
// // // // //     const filteredData = tableData.filter((row) => {
// // // // //       if (type === 'verified') {
// // // // //         return row.Status === 'Verified';
// // // // //       } else if (type === 'notVerified') {
// // // // //         return row.Status !== 'Verified';
// // // // //       }
// // // // //       return true;
// // // // //     });
// // // // //     const currentDate = new Date();
// // // // //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// // // // //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// // // // //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// // // // //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// // // // //     const ws = XLSX.utils.json_to_sheet(filteredData);
// // // // //     const wb = XLSX.utils.book_new();
// // // // //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// // // // //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// // // // //     XLSX.writeFile(wb, filename);
// // // // //   };

// // // // //   const saveAndExit = async () => {
// // // // //     try {
// // // // //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// // // // //       const oldTableName = tableName;
// // // // //       let newTableName;

// // // // //       if (oldTableName.includes('_unfinished') && allVerified) {
// // // // //         newTableName = oldTableName.replace('_unfinished', '_verified');
// // // // //       } else if (oldTableName.includes('_verified') && !allVerified) {
// // // // //         newTableName = oldTableName.replace('_verified', '_unfinished');
// // // // //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// // // // //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// // // // //       } else {
// // // // //         newTableName = oldTableName;
// // // // //       }

// // // // //       await fetch(`http://10.110.24.148:5000/renameTable/${oldTableName}/${newTableName}`, {
// // // // //         method: 'POST',
// // // // //       });

// // // // //       await Promise.all(
// // // // //         tableData
// // // // //           .filter((row) => row.Status === 'Verified')
// // // // //           .map(async (row) => {
// // // // //             await fetch(`http://10.110.24.148:5000/updateStatus/${newTableName}/${row.id}`, {
// // // // //               method: 'POST',
// // // // //               headers: {
// // // // //                 'Content-Type': 'application/json',
// // // // //               },
// // // // //               body: JSON.stringify({ Status: 'Verified' }),
// // // // //             });
// // // // //           })
// // // // //       );
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //     }
// // // // //     navigate('/PA1');
// // // // //   };

// // // // //   // Check if the user is logged in
// // // // //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// // // // //   // Redirect to login if not logged in
// // // // //   useEffect(() => {
// // // // //     if (!isLoggedIn) {
// // // // //       navigate('/');
// // // // //     }
// // // // //   }, [isLoggedIn, navigate]);

// // // // //   return (
// // // // //     <div>
// // // // //       {isLoggedIn ? (
// // // // //         <div>
// // // // //           <div style={navbarStyle}>
// // // // //             <div style={navbarTextStyle}>SEBN,TN</div>
// // // // //             <div style={navbarTextStyle}>
// // // // //               <span
// // // // //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// // // // //                 onClick={() => navigate('/')}
// // // // //               >
// // // // //                 LogOut
// // // // //               </span>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="table-container" style={{ marginTop: '70px' }}>
// // // // //             <h2>File Data: {tableName}</h2>
// // // // //             <div className="table-scroll">
// // // // //               <table className='table'>
// // // // //                 <thead>
// // // // //                   <tr>
// // // // //                     <td>
// // // // //                       <div>
// // // // //                         <FormControl fullWidth variant="outlined">
// // // // //                           <InputLabel>Select Column</InputLabel>
// // // // //                           <Select
// // // // //                             value={selectedColumn}
// // // // //                             onChange={(e) => setSelectedColumn(e.target.value)}
// // // // //                             label="Select Column"
// // // // //                           >
// // // // //                             {tableData.length > 0 &&
// // // // //                               Object.keys(tableData[0]).map((key, index) => (
// // // // //                                 <MenuItem key={index} value={key}>
// // // // //                                   {key}
// // // // //                                 </MenuItem>
// // // // //                               ))}
// // // // //                           </Select>
// // // // //                         </FormControl>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td>
// // // // //                       <TextField
// // // // //                         fullWidth
// // // // //                         label="Scan Product Name or Number"
// // // // //                         variant="outlined"
// // // // //                         value={scannedData}
// // // // //                         onChange={(e) => setScannedData(e.target.value)}
// // // // //                       />
// // // // //                     </td>
// // // // //                     <td>
// // // // //                       <TextField
// // // // //                         fullWidth
// // // // //                         label="Manual Verification Data"
// // // // //                         variant="outlined"
// // // // //                         value={manualVerificationData}
// // // // //                         onChange={(e) => setManualVerificationData(e.target.value)}
// // // // //                         onKeyPress={(e) => {
// // // // //                           if (e.key === 'Enter') {
// // // // //                             verifyData(manualVerificationData);
// // // // //                             setManualVerificationData('');
// // // // //                           }
// // // // //                         }}
// // // // //                       />
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //               </table>
// // // // //               <div className="table-content">
// // // // //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// // // // //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// // // // //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// // // // //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// // // // //                 <table className="table">
// // // // //                   <thead>
// // // // //                     <tr>
// // // // //                       {tableData.length > 0 &&
// // // // //                         Object.keys(tableData[0]).map((key, index) => (
// // // // //                           <th key={index}>{key}</th>
// // // // //                         ))}
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody>
// // // // //                     {tableData.map((row, rowIndex) => (
// // // // //                       <tr
// // // // //                         key={rowIndex}
// // // // //                         style={{
// // // // //                           backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// // // // //                         }}
// // // // //                       >
// // // // //                         {Object.values(row).map((value, colIndex) => (
// // // // //                           <td key={colIndex}>{value}</td>
// // // // //                         ))}
// // // // //                       </tr>
// // // // //                     ))}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <p>User is not logged in</p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default TableData;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import * as XLSX from 'xlsx';
// // // // // import Button from '@mui/material/Button';
// // // // // import Select from '@mui/material/Select';
// // // // // import MenuItem from '@mui/material/MenuItem';
// // // // // import FormControl from '@mui/material/FormControl';
// // // // // import InputLabel from '@mui/material/InputLabel';
// // // // // import TextField from '@mui/material/TextField';

// // // // // const navbarStyle = {
// // // // //   backgroundColor: '#1f4d7e',
// // // // //   padding: '10px 10px',
// // // // //   display: 'flex',
// // // // //   justifyContent: 'space-between',
// // // // //   alignItems: 'center',
// // // // //   position: 'fixed',
// // // // //   top: '0',
// // // // //   width: '98%',
// // // // //   zIndex: '1000',
// // // // //   borderRadius: '15px 15px 15px 15px',
// // // // //   marginTop: '5px',
// // // // // };

// // // // // const navbarTextStyle = {
// // // // //   color: '#fff',
// // // // //   fontSize: '26px',
// // // // //   fontWeight: 'bold',
// // // // // };

// // // // // function TableData() {
// // // // //   const { tableName } = useParams();
// // // // //   const [tableData, setTableData] = useState([]);
// // // // //   const [scannedData, setScannedData] = useState('');
// // // // //   const [manualVerificationData, setManualVerificationData] = useState('');
// // // // //   const [selectedColumn, setSelectedColumn] = useState('');
// // // // //   const [exportData, setExportData] = useState([]);
// // // // //   const [columnFilters, setColumnFilters] = useState({});
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     fetchTableData(tableName);
// // // // //   }, [tableName]);

// // // // //   useEffect(() => {
// // // // //     if (scannedData && selectedColumn) {
// // // // //       verifyData(scannedData);
// // // // //       setScannedData('');
// // // // //     }
// // // // //   }, [scannedData, selectedColumn, tableData]);

// // // // //   const fetchTableData = (tableName) => {
// // // // //     fetch(`http://10.110.24.148:5000/data/${tableName}`)
// // // // //       .then((response) => response.json())
// // // // //       .then((data) => {
// // // // //         setTableData(data);
// // // // //         if (data.length > 0) {
// // // // //           setSelectedColumn(Object.keys(data[0])[0]);
// // // // //         }
// // // // //       })
// // // // //       .catch((error) => {
// // // // //         console.error(error);
// // // // //       });
// // // // //   };

// // // // //   const verifyData = (dataToVerify) => {
// // // // //     const matchingRow = tableData.find((row) => {
// // // // //       if (selectedColumn === 'id') {
// // // // //         return row[selectedColumn] === dataToVerify;
// // // // //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// // // // //         return true;
// // // // //       }
// // // // //       return false;
// // // // //     });

// // // // //     if (matchingRow) {
// // // // //       const updatedTableData = tableData.map((row) =>
// // // // //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// // // // //       );
// // // // //       setTableData(updatedTableData);
// // // // //     }
// // // // //   };

// // // // //   const exportToExcel = (type) => {
// // // // //     const filteredData = tableData.filter((row) => {
// // // // //       if (type === 'verified') {
// // // // //         return row.Status === 'Verified';
// // // // //       } else if (type === 'notVerified') {
// // // // //         return row.Status !== 'Verified';
// // // // //       }
// // // // //       return true;
// // // // //     });
// // // // //     const currentDate = new Date();
// // // // //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// // // // //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// // // // //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// // // // //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// // // // //     const ws = XLSX.utils.json_to_sheet(filteredData);
// // // // //     const wb = XLSX.utils.book_new();
// // // // //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// // // // //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// // // // //     XLSX.writeFile(wb, filename);
// // // // //   };

// // // // //   const saveAndExit = async () => {
// // // // //     try {
// // // // //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// // // // //       const oldTableName = tableName;
// // // // //       let newTableName;

// // // // //       if (oldTableName.includes('_unfinished') && allVerified) {
// // // // //         newTableName = oldTableName.replace('_unfinished', '_verified');
// // // // //       } else if (oldTableName.includes('_verified') && !allVerified) {
// // // // //         newTableName = oldTableName.replace('_verified', '_unfinished');
// // // // //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// // // // //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// // // // //       } else {
// // // // //         newTableName = oldTableName;
// // // // //       }

// // // // //       await fetch(`http://10.110.24.148:5000/renameTable/${oldTableName}/${newTableName}`, {
// // // // //         method: 'POST',
// // // // //       });

// // // // //       await Promise.all(
// // // // //         tableData
// // // // //           .filter((row) => row.Status === 'Verified')
// // // // //           .map(async (row) => {
// // // // //             await fetch(`http://10.110.24.148:5000/updateStatus/${newTableName}/${row.id}`, {
// // // // //               method: 'POST',
// // // // //               headers: {
// // // // //                 'Content-Type': 'application/json',
// // // // //               },
// // // // //               body: JSON.stringify({ Status: 'Verified' }),
// // // // //             });
// // // // //           })
// // // // //       );
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //     }
// // // // //     navigate('/PA1');
// // // // //   };

// // // // //   // Check if the user is logged in
// // // // //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// // // // //   // Redirect to login if not logged in
// // // // //   useEffect(() => {
// // // // //     if (!isLoggedIn) {
// // // // //       navigate('/');
// // // // //     }
// // // // //   }, [isLoggedIn, navigate]);

// // // // //   return (
// // // // //     <div>
// // // // //       {isLoggedIn ? (
// // // // //         <div>
// // // // //           <div style={navbarStyle}>
// // // // //             <div style={navbarTextStyle}>SEBN,TN</div>
// // // // //             <div style={navbarTextStyle}>
// // // // //               <span
// // // // //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// // // // //                 onClick={() => navigate('/')}
// // // // //               >
// // // // //                 LogOut
// // // // //               </span>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="table-container" style={{ marginTop: '70px' }}>
// // // // //             <h2>File Data: {tableName}</h2>
// // // // //             <div className="table-scroll">
// // // // //               <table className='table'>
// // // // //                 <thead>
// // // // //                   <tr>
// // // // //                     <td>
// // // // //                       <div>
// // // // //                         <FormControl fullWidth variant="outlined">
// // // // //                           <InputLabel>Select Column</InputLabel>
// // // // //                           <Select
// // // // //                             value={selectedColumn}
// // // // //                             onChange={(e) => setSelectedColumn(e.target.value)}
// // // // //                             label="Select Column"
// // // // //                           >
// // // // //                             {tableData.length > 0 &&
// // // // //                               Object.keys(tableData[0]).map((key, index) => (
// // // // //                                 <MenuItem key={index} value={key}>
// // // // //                                   {key}
// // // // //                                 </MenuItem>
// // // // //                               ))}
// // // // //                           </Select>
// // // // //                         </FormControl>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td>
// // // // //                       <TextField
// // // // //                         fullWidth
// // // // //                         label="Scan Product Name or Number"
// // // // //                         variant="outlined"
// // // // //                         value={scannedData}
// // // // //                         onChange={(e) => setScannedData(e.target.value)}
// // // // //                       />
// // // // //                     </td>
// // // // //                     <td>
// // // // //                       <TextField
// // // // //                         fullWidth
// // // // //                         label="Manual Verification Data"
// // // // //                         variant="outlined"
// // // // //                         value={manualVerificationData}
// // // // //                         onChange={(e) => setManualVerificationData(e.target.value)}
// // // // //                         onKeyPress={(e) => {
// // // // //                           if (e.key === 'Enter') {
// // // // //                             verifyData(manualVerificationData);
// // // // //                             setManualVerificationData('');
// // // // //                           }
// // // // //                         }}
// // // // //                       />
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //               </table>
// // // // //               <div className="table-content">
// // // // //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// // // // //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// // // // //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// // // // //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// // // // //                 <table className="table">
// // // // //                   <thead>
// // // // //                     <tr>
// // // // //                       {tableData.length > 0 &&
// // // // //                         Object.keys(tableData[0]).map((key, index) => (
// // // // //                           <th key={index}>
// // // // //                             {key}
// // // // //                             <br />
// // // // //                             <TextField
// // // // //                               fullWidth
// // // // //                               label={`Filter ${key}`}
// // // // //                               variant="outlined"
// // // // //                               value={columnFilters[key] || ''}
// // // // //                               onChange={(e) =>
// // // // //                                 setColumnFilters({ ...columnFilters, [key]: e.target.value })
// // // // //                               }
// // // // //                             />
// // // // //                           </th>
// // // // //                         ))}
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                     {tableData
// // // // //                       .filter((row) => {
// // // // //                         return Object.keys(columnFilters).every((column) => {
// // // // //                           const filterValue = columnFilters[column];
// // // // //                           if (filterValue === '') return true;
// // // // //                           return String(row[column])
// // // // //                             .toLowerCase()
// // // // //                             .includes(filterValue.toLowerCase());
// // // // //                         });
// // // // //                       })
// // // // //                       .map((row, rowIndex) => (
// // // // //                         <tr
// // // // //                           key={rowIndex}
// // // // //                           style={{
// // // // //                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// // // // //                           }}
// // // // //                         >
// // // // //                           {Object.values(row).map((value, colIndex) => (
// // // // //                             <td key={colIndex}>{value}</td>
// // // // //                           ))}
// // // // //                         </tr>
// // // // //                       ))}
// // // // //                 </table>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <p>User is not logged in</p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default TableData;
// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useParams } from 'react-router-dom';
// // // // import * as XLSX from 'xlsx';
// // // // import Button from '@mui/material/Button';
// // // // import Select from '@mui/material/Select';
// // // // import MenuItem from '@mui/material/MenuItem';
// // // // import FormControl from '@mui/material/FormControl';
// // // // import InputLabel from '@mui/material/InputLabel';
// // // // import TextField from '@mui/material/TextField';

// // // // const navbarStyle = {
// // // //   backgroundColor: '#1f4d7e',
// // // //   padding: '10px 10px',
// // // //   display: 'flex',
// // // //   justifyContent: 'space-between',
// // // //   alignItems: 'center',
// // // //   position: 'fixed',
// // // //   top: '0',
// // // //   width: '98%',
// // // //   zIndex: '1000',
// // // //   borderRadius: '15px 15px 15px 15px',
// // // //   marginTop: '5px',
// // // // };

// // // // const navbarTextStyle = {
// // // //   color: '#fff',
// // // //   fontSize: '26px',
// // // //   fontWeight: 'bold',
// // // // };

// // // // function TableData() {
// // // //   const { tableName } = useParams();
// // // //   const [tableData, setTableData] = useState([]);
// // // //   const [scannedData, setScannedData] = useState('');
// // // //   const [manualVerificationData, setManualVerificationData] = useState('');
// // // //   const [selectedColumn, setSelectedColumn] = useState('');
// // // //   const [exportData, setExportData] = useState([]);
// // // //   const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
// // // //   const [columnFilters, setColumnFilters] = useState({});
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchTableData(tableName);
// // // //   }, [tableName]);

// // // //   useEffect(() => {
// // // //     if (scannedData && selectedColumn) {
// // // //       verifyData(scannedData);
// // // //       setScannedData('');
// // // //     }
// // // //   }, [scannedData, selectedColumn, tableData]);

// // // //   const fetchTableData = (tableName) => {
// // // //     fetch(`http://10.110.24.148:5000/data/${tableName}`)
// // // //       .then((response) => response.json())
// // // //       .then((data) => {
// // // //         setTableData(data);
// // // //         if (data.length > 0) {
// // // //           setSelectedColumn(Object.keys(data[0])[0]);
// // // //         }
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error(error);
// // // //       });
// // // //   };

// // // //   const verifyData = (dataToVerify) => {
// // // //     const matchingRow = tableData.find((row) => {
// // // //       if (selectedColumn === 'id') {
// // // //         return row[selectedColumn] === dataToVerify;
// // // //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// // // //         return true;
// // // //       }
// // // //       return false;
// // // //     });

// // // //     if (matchingRow) {
// // // //       const updatedTableData = tableData.map((row) =>
// // // //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// // // //       );
// // // //       setTableData(updatedTableData);
// // // //     }
// // // //   };

// // // //   const exportToExcel = (type) => {
// // // //     const filteredData = tableData.filter((row) => {
// // // //       if (type === 'verified') {
// // // //         return row.Status === 'Verified';
// // // //       } else if (type === 'notVerified') {
// // // //         return row.Status !== 'Verified';
// // // //       }
// // // //       return true;
// // // //     });
// // // //     const currentDate = new Date();
// // // //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// // // //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// // // //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// // // //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// // // //     const ws = XLSX.utils.json_to_sheet(filteredData);
// // // //     const wb = XLSX.utils.book_new();
// // // //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// // // //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// // // //     XLSX.writeFile(wb, filename);
// // // //   };

// // // //   const saveAndExit = async () => {
// // // //     try {
// // // //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// // // //       const oldTableName = tableName;
// // // //       let newTableName;

// // // //       if (oldTableName.includes('_unfinished') && allVerified) {
// // // //         newTableName = oldTableName.replace('_unfinished', '_verified');
// // // //       } else if (oldTableName.includes('_verified') && !allVerified) {
// // // //         newTableName = oldTableName.replace('_verified', '_unfinished');
// // // //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// // // //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// // // //       } else {
// // // //         newTableName = oldTableName;
// // // //       }

// // // //       await fetch(`http://10.110.24.148:5000/renameTable/${oldTableName}/${newTableName}`, {
// // // //         method: 'POST',
// // // //       });

// // // //       await Promise.all(
// // // //         tableData
// // // //           .filter((row) => row.Status === 'Verified')
// // // //           .map(async (row) => {
// // // //             await fetch(`http://10.110.24.148:5000/updateStatus/${newTableName}/${row.id}`, {
// // // //               method: 'POST',
// // // //               headers: {
// // // //                 'Content-Type': 'application/json',
// // // //               },
// // // //               body: JSON.stringify({ Status: 'Verified' }),
// // // //             });
// // // //           })
// // // //       );
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     }
// // // //     navigate('/PA1');
// // // //   };

// // // //   // Check if the user is logged in
// // // //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// // // //   // Redirect to login if not logged in
// // // //   useEffect(() => {
// // // //     if (!isLoggedIn) {
// // // //       navigate('/');
// // // //     }
// // // //   }, [isLoggedIn, navigate]);

// // // //   return (
// // // //     <div>
// // // //       {isLoggedIn ? (
// // // //         <div>
// // // //           <div style={navbarStyle}>
// // // //             <div style={navbarTextStyle}>SEBN,TN</div>
// // // //             <div style={navbarTextStyle}>
// // // //               <span
// // // //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// // // //                 onClick={() => navigate('/')}
// // // //               >
// // // //                 LogOut
// // // //               </span>
// // // //             </div>
// // // //           </div>
// // // //           <div className="table-container" style={{ marginTop: '70px' }}>
// // // //             <h2>File Data: {tableName}</h2>
// // // //             <div className="table-scroll">
// // // //               <table className='table'>
// // // //                 <thead>
// // // //                   <tr>
// // // //                     <td>
// // // //                       <div>
// // // //                         <FormControl fullWidth variant="outlined">
// // // //                           <InputLabel>Select Column</InputLabel>
// // // //                           <Select
// // // //                             value={selectedColumn}
// // // //                             onChange={(e) => setSelectedColumn(e.target.value)}
// // // //                             label="Select Column"
// // // //                           >
// // // //                             {tableData.length > 0 &&
// // // //                               Object.keys(tableData[0]).map((key, index) => (
// // // //                                 <MenuItem key={index} value={key}>
// // // //                                   {key}
// // // //                                 </MenuItem>
// // // //                               ))}
// // // //                           </Select>
// // // //                         </FormControl>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         label="Scan Product Name or Number"
// // // //                         variant="outlined"
// // // //                         value={scannedData}
// // // //                         onChange={(e) => setScannedData(e.target.value)}
// // // //                       />
// // // //                     </td>
// // // //                     <td>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         label="Manual Verification Data"
// // // //                         variant="outlined"
// // // //                         value={manualVerificationData}
// // // //                         onChange={(e) => setManualVerificationData(e.target.value)}
// // // //                         onKeyPress={(e) => {
// // // //                           if (e.key === 'Enter') {
// // // //                             verifyData(manualVerificationData);
// // // //                             setManualVerificationData('');
// // // //                           }
// // // //                         }}
// // // //                       />
// // // //                     </td>
// // // //                     {/* Add Status filter */}
                    
// // // //                   </tr>
// // // //                 </thead>
// // // //               </table>
// // // //               <div className="table-content">
// // // //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// // // //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// // // //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// // // //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// // // //                 <table className="table">
// // // //                   <thead>
// // // //                     <tr>
// // // //                       {tableData.length > 0 &&
// // // //                         Object.keys(tableData[0]).map((key, index) => (
// // // //                           <th key={index}>
// // // //                             {key}
// // // //                             <br />
// // // //                             <TextField
// // // //                               fullWidth
// // // //                               label={`Filter ${key}`}
// // // //                               variant="outlined"
// // // //                               value={columnFilters[key] || ''}
// // // //                               onChange={(e) =>
// // // //                                 setColumnFilters({ ...columnFilters, [key]: e.target.value })
// // // //                               }
// // // //                             />
// // // //                           </th>
// // // //                         ))}
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     {tableData
// // // //                       .filter((row) => {
// // // //                         return (
// // // //                           Object.keys(columnFilters).every((column) => {
// // // //                             const filterValue = columnFilters[column];
// // // //                             if (filterValue === '') return true;
// // // //                             return (
// // // //                               String(row[column])
// // // //                                 .toLowerCase()
// // // //                                 .includes(filterValue.toLowerCase()) &&
// // // //                               (statusFilter === '' || row['Status'] === statusFilter)
// // // //                             );
// // // //                           }) &&
// // // //                           (statusFilter === '' || row['Status'] === statusFilter)
// // // //                         );
// // // //                       })
// // // //                       .map((row, rowIndex) => (
// // // //                         <tr
// // // //                           key={rowIndex}
// // // //                           style={{
// // // //                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// // // //                           }}
// // // //                         >
// // // //                           {Object.values(row).map((value, colIndex) => (
// // // //                             <td key={colIndex}>{value}</td>
// // // //                           ))}
// // // //                         </tr>
// // // //                       ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         <p>User is not logged in</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default TableData;
// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useParams } from 'react-router-dom';
// // // import * as XLSX from 'xlsx';
// // // import Button from '@mui/material/Button';
// // // import Select from '@mui/material/Select';
// // // import MenuItem from '@mui/material/MenuItem';
// // // import FormControl from '@mui/material/FormControl';
// // // import InputLabel from '@mui/material/InputLabel';
// // // import TextField from '@mui/material/TextField';

// // // const navbarStyle = {
// // //   backgroundColor: '#1f4d7e',
// // //   padding: '10px 10px',
// // //   display: 'flex',
// // //   justifyContent: 'space-between',
// // //   alignItems: 'center',
// // //   position: 'fixed',
// // //   top: '0',
// // //   width: '98%',
// // //   zIndex: '1000',
// // //   borderRadius: '15px 15px 15px 15px',
// // //   marginTop: '5px',
// // // };

// // // const navbarTextStyle = {
// // //   color: '#fff',
// // //   fontSize: '26px',
// // //   fontWeight: 'bold',
// // // };

// // // function TableData() {
// // //   const { tableName } = useParams();
// // //   const [tableData, setTableData] = useState([]);
// // //   const [scannedData, setScannedData] = useState('');
// // //   const [manualVerificationData, setManualVerificationData] = useState('');
// // //   const [selectedColumn, setSelectedColumn] = useState('');
// // //   const [exportData, setExportData] = useState([]);
// // //   const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
// // //   const [columnFilters, setColumnFilters] = useState({});
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchTableData(tableName);
// // //   }, [tableName]);

// // //   useEffect(() => {
// // //     if (scannedData && selectedColumn) {
// // //       verifyData(scannedData);
// // //       setScannedData('');
// // //     }
// // //   }, [scannedData, selectedColumn, tableData]);

// // //   const fetchTableData = (tableName) => {
// // //     fetch(`http://10.110.24.148:5000/data/${tableName}`)
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         setTableData(data);
// // //         if (data.length > 0) {
// // //           setSelectedColumn(Object.keys(data[0])[0]);
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         console.error(error);
// // //       });
// // //   };

// // //   const verifyData = (dataToVerify) => {
// // //     const matchingRow = tableData.find((row) => {
// // //       if (selectedColumn === 'id') {
// // //         return row[selectedColumn] === dataToVerify;
// // //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// // //         return true;
// // //       }
// // //       return false;
// // //     });

// // //     if (matchingRow) {
// // //       const updatedTableData = tableData.map((row) =>
// // //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// // //       );
// // //       setTableData(updatedTableData);
// // //     }
// // //   };

// // //   const exportToExcel = (type) => {
// // //     const filteredData = tableData.filter((row) => {
// // //       if (type === 'verified') {
// // //         return row.Status === 'Verified';
// // //       } else if (type === 'notVerified') {
// // //         return row.Status !== 'Verified';
// // //       }
// // //       return true;
// // //     });
// // //     const currentDate = new Date();
// // //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// // //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// // //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// // //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// // //     const ws = XLSX.utils.json_to_sheet(filteredData);
// // //     const wb = XLSX.utils.book_new();
// // //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// // //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// // //     XLSX.writeFile(wb, filename);
// // //   };

// // //   const saveAndExit = async () => {
// // //     try {
// // //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// // //       const oldTableName = tableName;
// // //       let newTableName;

// // //       if (oldTableName.includes('_unfinished') && allVerified) {
// // //         newTableName = oldTableName.replace('_unfinished', '_verified');
// // //       } else if (oldTableName.includes('_verified') && !allVerified) {
// // //         newTableName = oldTableName.replace('_verified', '_unfinished');
// // //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// // //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// // //       } else {
// // //         newTableName = oldTableName;
// // //       }

// // //       await fetch(`http://10.110.24.148:5000/renameTable/${oldTableName}/${newTableName}`, {
// // //         method: 'POST',
// // //       });

// // //       await Promise.all(
// // //         tableData
// // //           .filter((row) => row.Status === 'Verified')
// // //           .map(async (row) => {
// // //             await fetch(`http://10.110.24.148:5000/updateStatus/${newTableName}/${row.id}`, {
// // //               method: 'POST',
// // //               headers: {
// // //                 'Content-Type': 'application/json',
// // //               },
// // //               body: JSON.stringify({ Status: 'Verified' }),
// // //             });
// // //           })
// // //       );
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //     navigate('/PA1');
// // //   };

// // //   // Check if the user is logged in
// // //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// // //   // Redirect to login if not logged in
// // //   useEffect(() => {
// // //     if (!isLoggedIn) {
// // //       navigate('/');
// // //     }
// // //   }, [isLoggedIn, navigate]);

// // //   return (
// // //     <div>
// // //       {isLoggedIn ? (
// // //         <div>
// // //           <div style={navbarStyle}>
// // //             <div style={navbarTextStyle}>SEBN,TN</div>
// // //             <div style={navbarTextStyle}>
// // //               <span
// // //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// // //                 onClick={() => navigate('/')}
// // //               >
// // //                 LogOut
// // //               </span>
// // //             </div>
// // //           </div>
// // //           <div className="table-container" style={{ marginTop: '70px' }}>
// // //             <h2>File Data: {tableName}</h2>
// // //             <div className="table-scroll">
// // //               <table className='table'>
// // //                 <thead>
// // //                   <tr>
// // //                     <td>
// // //                       <div>
// // //                         <FormControl fullWidth variant="outlined">
// // //                           <InputLabel>Select Column</InputLabel>
// // //                           <Select
// // //                             value={selectedColumn}
// // //                             onChange={(e) => setSelectedColumn(e.target.value)}
// // //                             label="Select Column"
// // //                           >
// // //                             {tableData.length > 0 &&
// // //                               Object.keys(tableData[0]).map((key, index) => (
// // //                                 <MenuItem key={index} value={key}>
// // //                                   {key}
// // //                                 </MenuItem>
// // //                               ))}
// // //                           </Select>
// // //                         </FormControl>
// // //                       </div>
// // //                     </td>
// // //                     <td>
// // //                       <TextField
// // //                         fullWidth
// // //                         label="Scan Product Name or Number"
// // //                         variant="outlined"
// // //                         value={scannedData}
// // //                         onChange={(e) => setScannedData(e.target.value)}
// // //                       />
// // //                     </td>
// // //                     <td>
// // //                       <TextField
// // //                         fullWidth
// // //                         label="Manual Verification Data"
// // //                         variant="outlined"
// // //                         value={manualVerificationData}
// // //                         onChange={(e) => setManualVerificationData(e.target.value)}
// // //                         onKeyPress={(e) => {
// // //                           if (e.key === 'Enter') {
// // //                             verifyData(manualVerificationData);
// // //                             setManualVerificationData('');
// // //                           }
// // //                         }}
// // //                       />
// // //                     </td>
// // //                   </tr>
// // //                 </thead>
// // //               </table>
// // //               <div className="table-content">
// // //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// // //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// // //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// // //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// // //                 <table className="table">
// // //                   <thead>
// // //                     <tr>
// // //                       {tableData.length > 0 &&
// // //                         Object.keys(tableData[0]).map((key, index) => (
// // //                           <th key={index}>
// // //                             {key}
// // //                             <br />
// // //                             {key === 'Status' ? ( // Check if the column is 'Status'
// // //                               <FormControl fullWidth variant="outlined">
// // //                                 <InputLabel>Status</InputLabel>
// // //                                 <Select
// // //                                   value={statusFilter}
// // //                                   onChange={(e) => setStatusFilter(e.target.value)}
// // //                                   label="Status"
// // //                                 >
// // //                                   <MenuItem value="">All</MenuItem>
// // //                                   <MenuItem value="Verified">Verified</MenuItem>
// // //                                   <MenuItem value="Not Verified">Not Verified</MenuItem>
// // //                                 </Select>
// // //                               </FormControl>
// // //                             ) : (
// // //                               <TextField
// // //                                 fullWidth
// // //                                 label={`Filter ${key}`}
// // //                                 variant="outlined"
// // //                                 value={columnFilters[key] || ''}
// // //                                 onChange={(e) =>
// // //                                   setColumnFilters({ ...columnFilters, [key]: e.target.value })
// // //                                 }
// // //                               />
// // //                             )}
// // //                           </th>
// // //                         ))}
// // //                     </tr>
// // //                   </thead>
                
// // //                     {tableData
// // //                       .filter((row) => {
// // //                         return (
// // //                           Object.keys(columnFilters).every((column) => {
// // //                             const filterValue = columnFilters[column];
// // //                             if (filterValue === '') return true;
// // //                             return (
// // //                               String(row[column])
// // //                                 .toLowerCase()
// // //                                 .includes(filterValue.toLowerCase()) &&
// // //                               (statusFilter === '' || row['Status'] === statusFilter)
// // //                             );
// // //                           }) &&
// // //                           (statusFilter === '' || row['Status'] === statusFilter)
// // //                         );
// // //                       })
// // //                       .map((row, rowIndex) => (
// // //                         <tr
// // //                           key={rowIndex}
// // //                           style={{
// // //                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// // //                           }}
// // //                         >
// // //                           {Object.values(row).map((value, colIndex) => (
// // //                             <td key={colIndex}>{value}</td>
// // //                           ))}
// // //                         </tr>
// // //                       ))}
                 
// // //                 </table>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <p>User is not logged in</p>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default TableData;
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useParams } from 'react-router-dom';
// // import * as XLSX from 'xlsx';
// // import Button from '@mui/material/Button';
// // import Select from '@mui/material/Select';
// // import MenuItem from '@mui/material/MenuItem';
// // import FormControl from '@mui/material/FormControl';
// // import InputLabel from '@mui/material/InputLabel';
// // import TextField from '@mui/material/TextField';

// // const navbarStyle = {
// //   backgroundColor: '#1f4d7e',
// //   padding: '10px 10px',
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   position: 'fixed',
// //   top: '0',
// //   width: '98%',
// //   zIndex: '1000',
// //   borderRadius: '15px 15px 15px 15px',
// //   marginTop: '5px',
// // };

// // const navbarTextStyle = {
// //   color: '#fff',
// //   fontSize: '26px',
// //   fontWeight: 'bold',
// // };

// // function TableData() {
// //   const { tableName } = useParams();
// //   const [tableData, setTableData] = useState([]);
// //   const [scannedData, setScannedData] = useState('');
// //   const [manualVerificationData, setManualVerificationData] = useState('');
// //   const [selectedColumn, setSelectedColumn] = useState('');
// //   const [exportData, setExportData] = useState([]);
// //   const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
// //   const [columnFilters, setColumnFilters] = useState({});
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchTableData(tableName);
// //   }, [tableName]);

// //   useEffect(() => {
// //     if (scannedData && selectedColumn) {
// //       verifyData(scannedData);
// //       setScannedData('');
// //     }
// //   }, [scannedData, selectedColumn, tableData]);

// //   const fetchTableData = (tableName) => {
// //     fetch(`http://10.110.24.148:5000/data/${tableName}`)
// //       .then((response) => response.json())
// //       .then((data) => {
// //         setTableData(data);
// //         if (data.length > 0) {
// //           setSelectedColumn(Object.keys(data[0])[0]);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   };

// //   const verifyData = (dataToVerify) => {
// //     const matchingRow = tableData.find((row) => {
// //       if (selectedColumn === 'id') {
// //         return row[selectedColumn] === dataToVerify;
// //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// //         return true;
// //       }
// //       return false;
// //     });

// //     if (matchingRow) {
// //       const updatedTableData = tableData.map((row) =>
// //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// //       );
// //       setTableData(updatedTableData);
// //     } else {
// //       setError('Data not found in the table.');
// //     }
// //   };

// //   const exportToExcel = (type) => {
// //     const filteredData = tableData.filter((row) => {
// //       if (type === 'verified') {
// //         return row.Status === 'Verified';
// //       } else if (type === 'notVerified') {
// //         return row.Status !== 'Verified';
// //       }
// //       return true;
// //     });
// //     const currentDate = new Date();
// //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// //     const ws = XLSX.utils.json_to_sheet(filteredData);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// //     XLSX.writeFile(wb, filename);
// //   };

// //   const saveAndExit = async () => {
// //     try {
// //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// //       const oldTableName = tableName;
// //       let newTableName;

// //       if (oldTableName.includes('_unfinished') && allVerified) {
// //         newTableName = oldTableName.replace('_unfinished', '_verified');
// //       } else if (oldTableName.includes('_verified') && !allVerified) {
// //         newTableName = oldTableName.replace('_verified', '_unfinished');
// //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// //       } else {
// //         newTableName = oldTableName;
// //       }

// //       await fetch(`http://10.110.24.148:5000/renameTable/${oldTableName}/${newTableName}`, {
// //         method: 'POST',
// //       });

// //       await Promise.all(
// //         tableData
// //           .filter((row) => row.Status === 'Verified')
// //           .map(async (row) => {
// //             await fetch(`http://10.110.24.148:5000/updateStatus/${newTableName}/${row.id}`, {
// //               method: 'POST',
// //               headers: {
// //                 'Content-Type': 'application/json',
// //               },
// //               body: JSON.stringify({ Status: 'Verified' }),
// //             });
// //           })
// //       );
// //     } catch (error) {
// //       console.error(error);
// //     }
// //     navigate('/PA1');
// //   };

// //   // Check if the user is logged in
// //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// //   // Redirect to login if not logged in
// //   useEffect(() => {
// //     if (!isLoggedIn) {
// //       navigate('/');
// //     }
// //   }, [isLoggedIn, navigate]);

// //   return (
// //     <div>
// //       {isLoggedIn ? (
// //         <div>
// //           <div style={navbarStyle}>
// //             <div style={navbarTextStyle}>SEBN,TN</div>
// //             <div style={navbarTextStyle}>
// //               <span
// //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// //                 onClick={() => navigate('/')}
// //               >
// //                 LogOut
// //               </span>
// //             </div>
// //           </div>
// //           <div className="table-container" style={{ marginTop: '70px' }}>
// //             <h2>File Data: {tableName}</h2>
// //             <div className="table-scroll">
// //               <table className='table'>
// //                 <thead>
// //                   <tr>
// //                     <td>
// //                       <div>
// //                         <FormControl fullWidth variant="outlined">
// //                           <InputLabel>Select Column</InputLabel>
// //                           <Select
// //                             value={selectedColumn}
// //                             onChange={(e) => setSelectedColumn(e.target.value)}
// //                             label="Select Column"
// //                           >
// //                             {tableData.length > 0 &&
// //                               Object.keys(tableData[0]).map((key, index) => (
// //                                 <MenuItem key={index} value={key}>
// //                                   {key}
// //                                 </MenuItem>
// //                               ))}
// //                           </Select>
// //                         </FormControl>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <TextField
// //                         fullWidth
// //                         label="Scan Product Name or Number"
// //                         variant="outlined"
// //                         value={scannedData}
// //                         onChange={(e) => setScannedData(e.target.value)}
// //                       />
// //                       {error && <p style={{ color: 'red' }}>{error}</p>}
// //                     </td>
// //                     <td>
// //                       <TextField
// //                         fullWidth
// //                         label="Manual Verification Data"
// //                         variant="outlined"
// //                         value={manualVerificationData}
// //                         onChange={(e) => setManualVerificationData(e.target.value)}
// //                         onKeyPress={(e) => {
// //                           if (e.key === 'Enter') {
// //                             verifyData(manualVerificationData);
// //                             setManualVerificationData('');
// //                           }
// //                         }}
// //                       />
// //                       {error && <p style={{ color: 'red' }}>{error}</p>}
// //                     </td>
// //                   </tr>
// //                 </thead>
// //               </table>
// //               <div className="table-content">
// //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// //                 <table className="table">
// //                   <thead>
// //                     <tr>
// //                       {tableData.length > 0 &&
// //                         Object.keys(tableData[0]).map((key, index) => (
// //                           <th key={index}>
// //                             {key}
// //                             <br />
// //                             {key === 'Status' ? ( // Check if the column is 'Status'
// //                               <FormControl fullWidth variant="outlined">
// //                                 <InputLabel>Status</InputLabel>
// //                                 <Select
// //                                   value={statusFilter}
// //                                   onChange={(e) => setStatusFilter(e.target.value)}
// //                                   label="Status"
// //                                 >
// //                                   <MenuItem value="">All</MenuItem>
// //                                   <MenuItem value="Verified">Verified</MenuItem>
// //                                   <MenuItem value="Not Verified">Not Verified</MenuItem>
// //                                 </Select>
// //                               </FormControl>
// //                             ) : (
// //                               <TextField
// //                                 fullWidth
// //                                 label={`Filter ${key}`}
// //                                 variant="outlined"
// //                                 value={columnFilters[key] || ''}
// //                                 onChange={(e) =>
// //                                   setColumnFilters({ ...columnFilters, [key]: e.target.value })
// //                                 }
// //                               />
// //                             )}
// //                           </th>
// //                         ))}
// //                     </tr>
// //                   </thead>
// //                     {tableData
// //                       .filter((row) => {
// //                         return (
// //                           Object.keys(columnFilters).every((column) => {
// //                             const filterValue = columnFilters[column];
// //                             if (filterValue === '') return true;
// //                             return (
// //                               String(row[column])
// //                                 .toLowerCase()
// //                                 .includes(filterValue.toLowerCase()) &&
// //                               (statusFilter === '' || row['Status'] === statusFilter)
// //                             );
// //                           }) &&
// //                           (statusFilter === '' || row['Status'] === statusFilter)
// //                         );
// //                       })
// //                       .map((row, rowIndex) => (
// //                         <tr
// //                           key={rowIndex}
// //                           style={{
// //                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// //                           }}
// //                         >
// //                           {Object.values(row).map((value, colIndex) => (
// //                             <td key={colIndex}>{value}</td>
// //                           ))}
// //                         </tr>
// //                       ))}
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <p>User is not logged in</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default TableData;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';

// const navbarStyle = {
//   backgroundColor: '#1f4d7e',
//   padding: '10px 10px',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   position: 'fixed',
//   top: '0',
//   width: '98%',
//   zIndex: '1000',
//   borderRadius: '15px 15px 15px 15px',
//   marginTop: '5px',
// };

// const navbarTextStyle = {
//   color: '#fff',
//   fontSize: '26px',
//   fontWeight: 'bold',
// };

// function TableData() {
//   const { tableName } = useParams();
//   const [tableData, setTableData] = useState([]);
//   const [scannedData, setScannedData] = useState('');
//   const [manualVerificationData, setManualVerificationData] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [exportData, setExportData] = useState([]);
//   const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
//   const [columnFilters, setColumnFilters] = useState({});
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTableData(tableName);
//   }, [tableName]);

//   useEffect(() => {
//     if (scannedData && selectedColumn) {
//       verifyData(scannedData);
//       setScannedData('');
//     }
//   }, [scannedData, selectedColumn, tableData]);

//   const fetchTableData = (tableName) => {
//     fetch(`http://10.110.24.148:5000/data/${tableName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setTableData(data);
//         if (data.length > 0) {
//           setSelectedColumn(Object.keys(data[0])[0]);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const verifyData = (dataToVerify) => {
//     const matchingRow = tableData.find((row) => {
//       if (selectedColumn === 'id') {
//         return row[selectedColumn] === dataToVerify;
//       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
//         return true;
//       }
//       return false;
//     });

//     if (matchingRow) {
//       const updatedTableData = tableData.map((row) =>
//         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
//       );
//       setTableData(updatedTableData);
//     } else {
//       setError('Data not found in the file.');
//       // Remove the error message after 3 seconds (3000 milliseconds)
//       setTimeout(() => {
//         setError('');
//       }, 3000);
//     }
//   };

//   const exportToExcel = (type) => {
//     const filteredData = tableData.filter((row) => {
//       if (type === 'verified') {
//         return row.Status === 'Verified';
//       } else if (type === 'notVerified') {
//         return row.Status !== 'Verified';
//       }
//       return true;
//     });
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
//       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
//       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
//       currentDate.getMinutes().toString().padStart(2, '0')}`;
//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

//     XLSX.writeFile(wb, filename);
//   };

//   const saveAndExit = async () => {
//     try {
//       const allVerified = tableData.every((row) => row.Status === 'Verified');
//       const oldTableName = tableName;
//       let newTableName;

//       if (oldTableName.includes('_unfinished') && allVerified) {
//         newTableName = oldTableName.replace('_unfinished', '_verified');
//       } else if (oldTableName.includes('_verified') && !allVerified) {
//         newTableName = oldTableName.replace('_verified', '_unfinished');
//       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
//         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
//       } else {
//         newTableName = oldTableName;
//       }

//       await fetch(`http://10.110.24.148:5000/renameTable/${oldTableName}/${newTableName}`, {
//         method: 'POST',
//       });

//       await Promise.all(
//         tableData
//           .filter((row) => row.Status === 'Verified')
//           .map(async (row) => {
//             await fetch(`http://10.110.24.148:5000/updateStatus/${newTableName}/${row.id}`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ Status: 'Verified' }),
//             });
//           })
//       );
//     } catch (error) {
//       console.error(error);
//     }
//     navigate('/PA1');
//   };

//   // Check if the user is logged in
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   // Redirect to login if not logged in
//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/');
//     }
//   }, [isLoggedIn, navigate]);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <div style={navbarStyle}>
//             <div style={navbarTextStyle}>SEBN,TN</div>
//             <div style={navbarTextStyle}>
//               <span
//                 style={{ fontSize: '18px', cursor: 'pointer' }}
//                 onClick={() => navigate('/')}
//               >
//                 LogOut
//               </span>
//             </div>
//           </div>
//           <div className="table-container" style={{ marginTop: '70px' }}>
//             <h2>File Data: {tableName}</h2>
//             <div className="table-scroll">
//               <table className='table'>
//                 <thead>
//                   <tr>
//                     <td>
//                       <div>
//                         <FormControl fullWidth variant="outlined">
//                           <InputLabel>Select Column</InputLabel>
//                           <Select
//                             value={selectedColumn}
//                             onChange={(e) => setSelectedColumn(e.target.value)}
//                             label="Select Column"
//                           >
//                             {tableData.length > 0 &&
//                               Object.keys(tableData[0]).map((key, index) => (
//                                 <MenuItem key={index} value={key}>
//                                   {key}
//                                 </MenuItem>
//                               ))}
//                           </Select>
//                         </FormControl>
//                       </div>
//                     </td>
//                     <td>
//                       <TextField
//                         fullWidth
//                         label="Scan Product Name or Number"
//                         variant="outlined"
//                         value={scannedData}
//                         onChange={(e) => setScannedData(e.target.value)}
//                       />
//                       {error && <p style={{ color: 'red' }}>{error}</p>}
//                     </td>
//                     <td>
//                       <TextField
//                         fullWidth
//                         label="Manual Verification Data"
//                         variant="outlined"
//                         value={manualVerificationData}
//                         onChange={(e) => setManualVerificationData(e.target.value)}
//                         onKeyPress={(e) => {
//                           if (e.key === 'Enter') {
//                             verifyData(manualVerificationData);
//                             setManualVerificationData('');
//                           }
//                         }}
//                       />
//                       {error && <p style={{ color: 'red' }}>{error}</p>}
//                     </td>
//                   </tr>
//                 </thead>
//               </table>
//               <div className="table-content">
//                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
//                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
//                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
//                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       {tableData.length > 0 &&
//                         Object.keys(tableData[0]).map((key, index) => (
//                           <th key={index}>
//                             {key}
//                             <br />
//                             {key === 'Status' ? ( // Check if the column is 'Status'
//                               <FormControl fullWidth variant="outlined">
//                                 <InputLabel>Status</InputLabel>
//                                 <Select
//                                   value={statusFilter}
//                                   onChange={(e) => setStatusFilter(e.target.value)}
//                                   label="Status"
//                                 >
//                                   <MenuItem value="">All</MenuItem>
//                                   <MenuItem value="Verified">Verified</MenuItem>
//                                   <MenuItem value="Not Verified">Not Verified</MenuItem>
//                                 </Select>
//                               </FormControl>
//                             ) : (
//                               <TextField
//                                 fullWidth
//                                 label={`Filter ${key}`}
//                                 variant="outlined"
//                                 value={columnFilters[key] || ''}
//                                 onChange={(e) =>
//                                   setColumnFilters({ ...columnFilters, [key]: e.target.value })
//                                 }
//                               />
//                             )}
//                           </th>
//                         ))}
//                     </tr>
//                   </thead>
                  
//                     {tableData
//                       .filter((row) => {
//                         return (
//                           Object.keys(columnFilters).every((column) => {
//                             const filterValue = columnFilters[column];
//                             if (filterValue === '') return true;
//                             return (
//                               String(row[column])
//                                 .toLowerCase()
//                                 .includes(filterValue.toLowerCase()) &&
//                               (statusFilter === '' || row['Status'] === statusFilter)
//                             );
//                           }) &&
//                           (statusFilter === '' || row['Status'] === statusFilter)
//                         );
//                       })
//                       .map((row, rowIndex) => (
//                         <tr
//                           key={rowIndex}
//                           style={{
//                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
//                           }}
//                         >
//                           {Object.values(row).map((value, colIndex) => (
//                             <td key={colIndex}>{value}</td>
//                           ))}
//                         </tr>
//                       ))}
                  
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>User is not logged in</p>
//       )}
//     </div>
//   );
// }

// export default TableData;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';

// const navbarStyle = {
//   backgroundColor: '#1f4d7e',
//   padding: '10px 10px',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   position: 'fixed',
//   top: '0',
//   width: '98%',
//   zIndex: '1000',
//   borderRadius: '15px 15px 15px 15px',
//   marginTop: '5px',
// };

// const navbarTextStyle = {
//   color: '#fff',
//   fontSize: '26px',
//   fontWeight: 'bold',
// };

// function TableData() {
//   const { tableName } = useParams();
//   const [tableData, setTableData] = useState([]);
//   const [scannedData, setScannedData] = useState('');
//   const [manualVerificationData, setManualVerificationData] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [exportData, setExportData] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [columnFilters, setColumnFilters] = useState({});
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [verificationCount, setVerificationCount] = useState({});
//   const [selectedArea, setSelectedArea] = useState(''); // New state for selected area

//   useEffect(() => {
//     fetchTableData(tableName);
//   }, [tableName]);

//   useEffect(() => {
//     if (scannedData && selectedColumn) {
//       verifyData(scannedData);
//       setScannedData('');
//     }
//   }, [scannedData, selectedColumn, tableData]);

//   const fetchTableData = (tableName) => {
//     fetch(`http://10.110.24.148:5000/data/${tableName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setTableData(data);
//         if (data.length > 0) {
//           setSelectedColumn(Object.keys(data[0])[0]);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const verifyData = (dataToVerify) => {
//     const matchingRow = tableData.find((row) => {
//       if (selectedColumn === 'id') {
//         return row[selectedColumn] === dataToVerify;
//       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
//         return true;
//       }
//       return false;
//     });

//     if (matchingRow) {
//       const currentCount = verificationCount[matchingRow.id] || 0;

//       if (currentCount >= 1) {
//         setError('Data is already verified once.');
//       } else {
//         const updatedTableData = tableData.map((row) =>
//           row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
//         );
//         setTableData(updatedTableData);
//         setVerificationCount({
//           ...verificationCount,
//           [matchingRow.id]: currentCount + 1,
//         });
//         setError('');
//         saveAndExit(updatedTableData);
//       }
//     } else {
//       setError('Data not found in the file.');
//     }

//     setTimeout(() => {
//       setError('');
//     }, 3000);
//   };

//   const exportToExcel = async (type) => {
//     const filteredData = tableData.filter((row) => {
//       if (type === 'verified') {
//         return row.Status === 'Verified';
//       } else if (type === 'notVerified') {
//         return row.Status !== 'Verified';
//       }
//       return true;
//     });

//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
//       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
//       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
//       currentDate.getMinutes().toString().padStart(2, '0')}`;

//     // Include selected area in the filename
//     const filename = `${selectedArea}_${tableName}_${type}_data_${formattedDate}.xlsx`;

//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     XLSX.writeFile(wb, filename);

//     // You can save the selected area to the database here
//     await saveAreaToDatabase(selectedArea);
//   };

//   // Function to save the selected area to the database
//   const saveAreaToDatabase = async (selectedArea) => {
//     try {
//       // You need to implement the code to save the selectedArea to your backend/database here
//       // You can use fetch or any other method to make an HTTP request to your server
//       // Example:
//       await fetch(`http://10.110.24.148:5000/saveArea`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ area: selectedArea }),
//       });
//       // Handle the response from the server if needed
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/');
//     }
//   }, [isLoggedIn, navigate]);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <div style={navbarStyle}>
//             <div style={navbarTextStyle}>SEBN,TN</div>
//             <div style={navbarTextStyle}>
//               <span
//                 style={{ fontSize: '18px', cursor: 'pointer' }}
//                 onClick={() => navigate('/')}
//               >
//                 LogOut
//               </span>
//             </div>
//           </div>
//           <div className="table-container" style={{ marginTop: '70px' }}>
//             <h2>File Data: {tableName}</h2>
//             <div className="table-scroll">
//               <table className='table'>
//                 <thead>
//                   <tr>
//                     <td>
//                       <div>
//                         <FormControl fullWidth variant="outlined">
//                           <InputLabel>Select Column</InputLabel>
//                           <Select
//                             value={selectedColumn}
//                             onChange={(e) => setSelectedColumn(e.target.value)}
//                             label="Select Column"
//                           >
//                             {tableData.length > 0 &&
//                               Object.keys(tableData[0]).map((key, index) => (
//                                 <MenuItem key={index} value={key}>
//                                   {key}
//                                 </MenuItem>
//                               ))}
//                           </Select>
//                         </FormControl>
//                       </div>
//                     </td>
//                     <td>
//                       <TextField
//                         fullWidth
//                         label="Scan Product Name or Number"
//                         variant="outlined"
//                         value={scannedData}
//                         onChange={(e) => setScannedData(e.target.value)}
//                       />
//                       {error && <p style={{ color: 'red' }}>{error}</p>}
//                     </td>
//                     <td>
//                       <TextField
//                         fullWidth
//                         label="Manual Verification Data"
//                         variant="outlined"
//                         value={manualVerificationData}
//                         onChange={(e) => setManualVerificationData(e.target.value)}
//                         onKeyPress={(e) => {
//                           if (e.key === 'Enter') {
//                             verifyData(manualVerificationData);
//                             setManualVerificationData('');
//                           }
//                         }}
//                       />
//                       {error && <p style={{ color: 'red' }}>{error}</p>}
//                     </td>
//                     <td>
//                       <div>
//                         <FormControl fullWidth variant="outlined">
//                           <InputLabel>Select Area</InputLabel>
//                           <Select
//                             value={selectedArea}
//                             onChange={(e) => setSelectedArea(e.target.value)}
//                             label="Select Area"
//                           >
//                             <MenuItem value="Cut">Cut</MenuItem>
//                             <MenuItem value="PreAssembly">Pre Assembly</MenuItem>
//                             <MenuItem value="Rework">Rework</MenuItem>
//                             {/* Add more areas as needed */}
//                           </Select>
//                         </FormControl>
//                       </div>
//                     </td>
//                   </tr>
//                 </thead>
//               </table>
//               <div className="table-content">
//                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
//                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
//                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
//                 <table className="table">
//                   {/* ... (previous code) */}
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>User is not logged in</p>
//       )}
//     </div>
//   );
// }

// export default TableData;
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
import { FixedSizeList as List } from 'react-window'; // Import react-window
import { VariableSizeList } from 'react-window';
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

  // New state for selected area
  const [selectedArea, setSelectedArea] = useState('');

  // Track verification count for each row
  const [verificationCount, setVerificationCount] = useState({});

  useEffect(() => {
    fetchTableData(tableName);
  }, [tableName]);
  useEffect(() => {
    // Set the default selected column to the first column (after 'id')
    if (tableData.length > 0) {
      const columns = Object.keys(tableData[0]);
      const nonIdColumns = columns.filter((column) => column !== 'id');
      if (nonIdColumns.length > 0) {
        setSelectedColumn(nonIdColumns[0]);
      }
    }
  }, [tableData]);
  useEffect(() => {
    if (scannedData && selectedColumn) {
      verifyData(scannedData);
      setScannedData('');
    }
  }, [scannedData, selectedColumn, tableData]);

  const fetchTableData = (tableName) => {
    fetch(`http://10.110.24.148:5000/data/${tableName}`)
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

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
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

    // Remove the error message after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const exportToExcel = (type) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
      (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
      currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
      currentDate.getMinutes().toString().padStart(2, '0')}`;
      
    // Include selected area in the file name
    const areaSuffix = selectedArea ? `_${selectedArea}` : '';
    const filename = `${tableName}${areaSuffix}_${type}_data_${formattedDate}.xlsx`;

    const filteredData = tableData.filter((row) => {
      if (type === 'verified') {
        return row.Status === 'Verified';
      } else if (type === 'notVerified') {
        return row.Status !== 'Verified';
      }
      return true;
    });

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

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

      await fetch(`http://10.110.24.148:5000/renameTable/${oldTableName}/${newTableName}`, {
        method: 'POST',
      });

      await Promise.all(
        updatedData
          .filter((row) => row.Status === 'Verified')
          .map(async (row) => {
            await fetch(`http://10.110.24.148:5000/updateStatus/${newTableName}/${row.id}`, {
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
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Redirect to login if not logged in
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
      key !== 'id' && // Check if the key is not 'id'
      <MenuItem key={index} value={key}>
        {key}
      </MenuItem>
    ))}
</Select>

                        </FormControl>
                      </div>
                    </td>
                    <td>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Select Area</InputLabel>
                        <Select
                          value={selectedArea}
                          onChange={handleAreaChange}
                          label="Select Area"
                        >
                          <MenuItem value="cut">Cut</MenuItem>
                          <MenuItem value="preAssembly">Pre Assembly</MenuItem>
                          <MenuItem value="rework">Rework</MenuItem>
                          {/* Add more options as needed */}
                        </Select>
                      </FormControl>
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
                {/* <Button onClick={() => saveAndExit()}>Save and Exit</Button> */}
                <List
      height={window.innerWidth > 768 ? 650 : 400} // Adjust the height based on screen width
      itemCount={tableData.length + 1} // Add 1 for the header row
      itemSize={50} // Adjust the row height as needed
      
    >
{({ index, style }) => {
    const isHeaderRow = index === 0;
    const rowData = isHeaderRow ? Object.keys(tableData[0] || {}) : Object.values(tableData[index - 1] || {});
    const rowBackgroundColor = isHeaderRow
      ? '' // Header row background color
      : verificationCount[tableData[index - 1]?.id] &&
        verificationCount[tableData[index - 1]?.id] > 1
      ? 'orange'
      : tableData[index - 1]?.Status === 'Verified'
      ? '#90EE90'
      : 'white';

    return (
      <div
        key={index}
        style={{
          ...style,
          display: 'flex', // Add display flex to arrange columns horizontally
          backgroundColor: rowBackgroundColor,
          padding: '8px', // Add padding for spacing
        }}
      >
        {rowData.map((value, colIndex) => (
          <div
            key={colIndex}
            style={{
              width: '200px',
              flex: '1', // Allow columns to grow and shrink equally
              padding: '4px', // Add padding for cell content spacing
              fontWeight: isHeaderRow ? 'bold' : 'normal',
            }}
          >
            {value}
          </div>
        ))}
      </div>
    );
  }}
</List>

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
