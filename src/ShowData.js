// // import React, { Component } from 'react';                                                                                                  
                                                                                                  
// // class App extends Component {                                                                                                  
// //   constructor(props) {                                                                                                  
// //     super(props);                                                                                                  
// //     this.state = {                                                                                                  
// //       file: null,                                                                                                  
// //     };                                                                                                  
// //   }                                                                                                  
                                                                                                  
// //   handleFileUpload = (event) => {                                                                                                  
// //     this.setState({ file: event.target.files[0] });                                                                                                  
// //   };                                                                                                  
                                                                                                  
// //   uploadFile = () => {                                                                                                  
// //     const formData = new FormData();                                                                                                  
// //     formData.append('file', this.state.file);                                                                                                  
                                                                                                  
// //     fetch('http://10.110.21.216:5000/upload', {                                                                                                  
// //       method: 'POST',                                                                                                  
// //       body: formData,                                                                                                  
// //     })                                                                                                  
// //       .then((response) => response.text())                                                                                                  
// //       .then((message) => {                                                                                                  
// //         console.log(message);                                                                                                  
// //       })                                                                                                  
// //       .catch((error) => {                                                                                                  
// //         console.error(error);                                                                                                  
// //       });                                                                                                  
// //   };                                                                                                  
                                                                                                  
// //   render() {                                                                                                  
// //     return (                                                                                                  
// //       <div>                                                                                                  
// //         <input type="file" onChange={this.handleFileUpload} />                                                                                                  
// //         <button onClick={this.uploadFile}>Upload</button>                                                                                                  
// //       </div>                                                                                                  
// //     );                                                                                                  
// //   }                                                                                                  
// // }                                                                                                  
                                                                                                  
// // export default App;                                                                                                  
// // import React, { useState, useEffect } from 'react';                                                                                                  
                                                                                                  
// // function App() {                                                                                                  
// //   const [file, setFile] = useState(null);                                                                                                  
// //   const [uploadedFiles, setUploadedFiles] = useState([]);                                                                                                  
// //   const [tableNames, setTableNames] = useState([]);                                                                                                  
                                                                                                  
// //   useEffect(() => {                                                                                                  
// //     // Fetch the list of uploaded files and table names when the component mounts                                                                                                  
                                                                                                      
// //     fetchTableNames();                                                                                                  
// //   }, []);                                                                                                  
                                                                                                  
// //   const handleFileUpload = (event) => {                                                                                                  
// //     setFile(event.target.files[0]);                                                                                                  
// //   };                                                                                                  
                                                                                                  
// //   const uploadFile = () => {                                                                                                  
// //     const formData = new FormData();                                                                                                  
// //     formData.append('file', file);                                                                                                  
                                                                                                  
// //     fetch('http://10.110.21.216:5000/upload', {                                                                                                  
// //       method: 'POST',                                                                                                  
// //       body: formData,                                                                                                  
// //     })                                                                                                  
// //       .then((response) => response.text())                                                                                                  
// //       .then((message) => {                                                                                                  
// //         console.log(message);                                                                                                  
// //         // After uploading, fetch the list of uploaded files again                                                                                                  
// //         fetchUploadedFiles();                                                                                                  
// //       })                                                                                                  
// //       .catch((error) => {                                                                                                  
// //         console.error(error);                                                                                                  
// //       });                                                                                                  
// //   };                                                                                                  
                                                                                                  
// //   const fetchUploadedFiles = () => {                                                                                                  
// //     fetch('http://10.110.21.216:5000/files')                                                                                                  
// //       .then((response) => response.json())                                                                                                  
// //       .then((data) => {                                                                                                  
// //         setUploadedFiles(data);                                                                                                  
// //       })                                                                                                  
// //       .catch((error) => {                                                                                                  
// //         console.error(error);                                                                                                  
// //       });                                                                                                  
// //   };                                                                                                  
                                                                                                  
// //   const fetchTableNames = () => {                                                                                                  
// //     fetch('http://10.110.21.216:5000/tables')                                                                                                  
// //       .then((response) => response.json())                                                                                                  
// //       .then((data) => {                                                                                                  
// //         setTableNames(data);                                                                                                  
// //       })                                                                                                  
// //       .catch((error) => {                                                                                                  
// //         console.error(error);                                                                                                  
// //       });                                                                                                  
// //   };                                                                                                  
                                                                                                  
// //   return (                                                                                                  
// //     <div>                                                                                                  
// //       <input type="file" onChange={handleFileUpload} />                                                                                                  
// //       <button onClick={uploadFile}>Upload</button>                                                                                                  
                                                                                                  
// //       <h2>Uploaded Files:</h2>                                                                                                  
// //       <ul>                                                                                                  
// //         {uploadedFiles.map((file) => (                                                                                                  
// //           <li key={file.filename}>                                                                                                  
// //             {file.filename} - Uploaded at {new Date(file.uploadedAt).toLocaleString()}                                                                                                  
// //           </li>                                                                                                  
// //         ))}                                                                                                  
// //       </ul>                                                                                                  
                                                                                                  
// //       <h2>Table Names:</h2>                                                                                                  
// //       <ul>                                                                                                  
// //         {tableNames.map((tableName, index) => (                                                                                                  
// //           <li key={index}>{tableName}</li>                                                                                                  
// //         ))}                                                                                                  
// //       </ul>                                                                                                  
// //     </div>                                                                                                  
// //   );                                                                                                  
// // }                                                                                                  
                                                                                                  
// // export default App;                                                                                                  
// import { Link } from 'react-router-dom';                                                                                                  
// import React, { useState, useEffect } from 'react';                                                                                                  
// import './DataTable.css'; // Import the CSS file                                                                                                  
// import Button from '@mui/material/Button';                                                                                                  
// import ConfirmationDialog from './ConfirmationDialog';                                                                                                  
// import Navbar from './Navbar';                                                                                                  
// import IconButton from '@mui/material/IconButton';                                                                                                   
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';                                                                                                   
// import SaveIcon from '@mui/icons-material/Save';                                                                                                  
// function App() {                                                                                                  
//   const [file, setFile] = useState(null);                                                                                                  
//   const [uploadedFiles, setUploadedFiles] = useState([]);                                                                                                  
//   const [tableNames, setTableNames] = useState([]);                                                                                                  
//   const [selectedTable, setSelectedTable] = useState(null);                                                                                                  
//   const [tableData, setTableData] = useState([]);                                                                                                  
                                                                                                  
//   useEffect(() => {                                                                                                  
//     // Fetch the list of uploaded files and table names when the component mounts                                                                                                  
//     fetchUploadedFiles();                                                                                                  
//     fetchTableNames();                                                                                                  
//   }, []);                                                                                                  
                                                                                                  
//   const handleFileUpload = (event) => {                                                                                                  
//     setFile(event.target.files[0]);                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const uploadFile = () => {                                                                                                  
//     const formData = new FormData();                                                                                                  
//     formData.append('file', file);                                                                                                  
                                                                                                  
//     fetch('http://10.110.21.216:5000/upload', {                                                                                                  
//       method: 'POST',                                                                                                  
//       body: formData,                                                                                                  
//     })                                                                                                  
//       .then((response) => response.text())                                                                                                  
//       .then((message) => {                                                                                                  
//         console.log(message);                                                                                                  
//         // After uploading, fetch the list of uploaded files again                                                                                                  
//         fetchUploadedFiles();                                                                                                  
//         window.location.reload()                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchUploadedFiles = () => {                                                                                                  
//     fetch('http://10.110.21.216:5000/files')                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setUploadedFiles(data);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchTableNames = () => {                                                                                                  
//     fetch('http://10.110.21.216:5000/tables')                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setTableNames(data);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchTableData = (tableName) => {                                                                                                  
//     fetch(`http://10.110.21.216:5000/data/${tableName}`)                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setTableData(data);                                                                                                  
//         setSelectedTable(tableName);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
//   function formatDate(datePart) {                                                                                                  
//     const [day, month, year, hour, minute] = datePart.split('_');                                                                                                  
//     return `${day}-${month}-${year} ${hour}:${minute}`;                                                                                                  
//   }                                                                                                  
                                                                                                    
//   const deleteTable = (tableName) => {                                                                                                  
//     // Add a confirmation dialog if needed                                                                                                  
//     fetch(`http://10.110.21.216:5000/delete/${tableName}`, {                                                                                                  
//       method: 'DELETE',                                                                                                  
//     })                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then(() => {                                                                                                  
//         // Table deleted, refresh the list of tables                                                                                                  
//         fetchTableNames();                                                                                                  
//         setSelectedTable(null);                                                                                                  
//         setTableData([]);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   return (                                                                                                  
//     <div>                                                                                                   
//     <div className="table-container">                                                                                                  
                                                                                                       
//     <input                                                                                                  
//           type="file"                                                                                                  
//           accept=".xlsx"                                                                                                  
//           style={{ display: 'none' }}                                                                                                  
//           id="file-upload"                                                                                                  
//           onChange={handleFileUpload}                                                                                                  
//         />                                                                                                  
//         <label htmlFor="file-upload">                                                                                                  
//           <IconButton                                                                                                  
//             color="primary"                                                                                                  
//             aria-label="upload file"                                                                                                  
//             component="span"                                                                                                  
//           >                                                                                                  
//             <SaveIcon />                                                                                                  
//           </IconButton>                                                                                                  
//           Upload File                                                                                                  
//         </label>                                                                                                  
//       <Button onClick={uploadFile}>Upload</Button>                                                                                                  
                                                                                                  
//       <h2 style={{marginTop:"50px"}}>Uploaded Files :</h2>                                                                                                  
                                                                                                       
// <table className="table">                                                                                                  
//   <thead>                                                                                                  
//     <tr>                                                                                                  
//       <th>Table Name</th>                                                                                                  
//       <th>Added Date</th>                                                                                                  
//       <th>Status</th>                                                                                                  
//       <th>Action</th>                                                                                                  
//     </tr>                                                                                                  
//   </thead>                                                                                                  
//   <tbody>                                                                                                  
//   {tableNames.map((tableName, index) => {                                                                                                  
//   const parts = tableName.split('_');                                                                                                  
//   const name = parts[0] || 'N/A';                                                                                                  
//   const datePart = parts.slice(1).join('_');                                                                                                  
//   const date = datePart ? formatDate(datePart) : 'N/A';                                                                                                  
//   return (                                                                                                  
//     <tr key={index}>                                                                                                  
//       <td>{name}</td>                                                                                                  
//       <td>{date}</td>                                                                                                  
//       <td>Active</td>                                                                                                  
//       <td>                                                                                                  
//         <Link to={`/table/${tableName || ''}`}>Show Data</Link>                                                                                                  
//         <Button onClick={() => deleteTable(tableName)}>Delete</Button>                                                                                                  
//       </td>                                                                                                  
//     </tr>                                                                                                  
//   );                                                                                                  
// })}                                                                                                  
                                                                                                  
//   </tbody>                                                                                                  
// </table>                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
//       {selectedTable && (                                                                                                  
//         <div className="table-container">                                                                                                  
//           <h2>Table Data: {selectedTable}</h2>                                                                                                  
//           <table  className="table">                                                                                                  
//             <thead>                                                                                                  
//               <tr>                                                                                                  
//                 {Object.keys(tableData[0]).map((key, index) => (                                                                                                  
//                   <th key={index}>{key}</th>                                                                                                  
//                 ))}                                                                                                  
//               </tr>                                                                                                  
//             </thead>                                                                                                  
//             <tbody>                                                                                                  
//               {tableData.map((row, rowIndex) => (                                                                                                  
//                 <tr key={rowIndex}>                                                                                                  
//                   {Object.values(row).map((value, colIndex) => (                                                                                                  
//                     <td key={colIndex}>{value}</td>                                                                                                  
//                   ))}                                                                                                  
//                 </tr>                                                                                                  
//               ))}                                                                                                  
//             </tbody>                                                                                                  
//           </table>                                                                                                  
//         </div>                                                                                                  
                                                                                                          
//       )}                                                                                                  
//     </div>                                                                                                  
//     </div>                                                                                                  
//   );                                                                                                  
// }                                                                                                  
                                                                                                  
// export default App;                                                                                                  
// import { Link } from 'react-router-dom';                                                                                                  
// import React, { useState, useEffect } from 'react';                                                                                                  
// import './DataTable.css'; // Import the CSS file                                                                                                  
// import Button from '@mui/material/Button';                                                                                                  
// import IconButton from '@mui/material/IconButton';                                                                                                  
// import SaveIcon from '@mui/icons-material/Save';                                                                                                  
                                                                                                  
// function App() {                                                                                                  
//   const [file, setFile] = useState(null);                                                                                                  
//   const [uploadedFiles, setUploadedFiles] = useState([]);                                                                                                  
//   const [tableNames, setTableNames] = useState([]);                                                                                                  
//   const [selectedTable, setSelectedTable] = useState(null);                                                                                                  
//   const [tableData, setTableData] = useState([]);                                                                                                  
                                                                                                  
//   useEffect(() => {                                                                                                  
//     // Fetch the list of uploaded files and table names when the component mounts                                                                                                  
//     fetchUploadedFiles();                                                                                                  
//     fetchTableNames();                                                                                                  
//   }, []);                                                                                                  
                                                                                                  
//   const handleFileUpload = (event) => {                                                                                                  
//     setFile(event.target.files[0]);                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const uploadFile = () => {                                                                                                  
//     const formData = new FormData();                                                                                                  
//     formData.append('file', file);                                                                                                  
                                                                                                  
//     fetch('http://10.110.21.216:5000/upload', {                                                                                                  
//       method: 'POST',                                                                                                  
//       body: formData,                                                                                                  
//     })                                                                                                  
//       .then((response) => response.text())                                                                                                  
//       .then((message) => {                                                                                                  
//         console.log(message);                                                                                                  
//         // After uploading, fetch the list of uploaded files again                                                                                                  
//         fetchUploadedFiles();                                                                                                  
//         window.location.reload();                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const getStatusFromTableName = (tableName) => {                                                                                                  
//     const parts = tableName.split('_');                                                                                                  
//     if (parts.length > 1) {                                                                                                  
//       const status = parts[1].toLowerCase();                                                                                                  
//       if (status === 'unfinished') {                                                                                                  
//         return 'Unfinished';                                                                                                  
//       } else if (status === 'verified') {                                                                                                  
//         return 'Verified';                                                                                                  
//       }                                                                                                  
//     }                                                                                                  
//     return 'Not Started';                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchUploadedFiles = () => {                                                                                                  
//     fetch('http://10.110.21.216:5000/files')                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setUploadedFiles(data);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchTableNames = () => {                                                                                                  
//     fetch('http://10.110.21.216:5000/tables')                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setTableNames(data);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//      const fetchTableData = (tableName) => {                                                                                                  
// fetch(`http://10.110.21.216:5000/data/${tableName}`)                                                                                                  
//        .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setTableData(data);                                                                                                        
//           setSelectedTable(tableName);                                                                                                  
//        })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//        });                                                                                                  
//    };                                                                                                  
//   function formatDate(datePart) {                                                                                                  
//     const [day, month, year, hour, minute] = datePart.split('_');                                                                                                  
//   return `${day}-${month}-${year} ${hour}:${minute}`;                                                                                                  
//   }                                                                                                  
                                                                                                    
//  const deleteTable = (tableName) => {                                                                                                  
//     // Add a confirmation dialog if needed                                                                                                  
//     fetch(`http://10.110.21.216:5000/delete/${tableName}`, {                                                                                                  
//      method: 'DELETE',                                                                                                  
//      })                                                                                                  
//             .then((response) => response.json())                                                                                                  
//        .then(() => {                                                                                                  
//         // Table deleted, refresh the list of tables                                                                                                  
//         fetchTableNames();                                                                                                  
//         setSelectedTable(null);                                                                                                  
//                  setTableData([]);                                                                                                  
//        })                                                                                                  
//               .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//        });                                                                                                  
//    };                                                                                                  
                                                                                                  
//   return (                                                                                                  
//     <div>                                                                                                  
//       <div className="table-container">                                                                                                  
//         <input                                                                                                  
//           type="file"                                                                                                  
//           accept=".xlsx"                                                                                                  
//           style={{ display: 'none' }}                                                                                                  
//           id="file-upload"                                                                                                  
//           onChange={handleFileUpload}                                                                                                  
//         />                                                                                                  
//         <label htmlFor="file-upload">                                                                                                  
//           <IconButton                                                                                                  
//             color="primary"                                                                                                  
//             aria-label="upload file"                                                                                                  
//             component="span"                                                                                                  
//           >                                                                                                  
//             <SaveIcon />                                                                                                  
//           </IconButton>                                                                                                  
//           Upload File                                                                                                  
//         </label>                                                                                                  
//         <Button onClick={uploadFile}>Upload</Button>                                                                                                  
                                                                                                  
//         <h2 style={{ marginTop: "50px" }}>Uploaded Files :</h2>                                                                                                  
                                                                                                  
//         <table className="table">                                                                                                  
//           <thead>                                                                                                  
//             <tr>                                                                                                  
//               <th>Table Name</th>                                                                                                  
//               <th>Added Date</th>                                                                                                  
//               <th>Status</th>                                                                                                  
//               <th>Action</th>                                                                                                  
//             </tr>                                                                                                  
//           </thead>                                                                                                  
//           <tbody>                                                                                                  
//             {tableNames.map((tableName, index) => {                                                                                                  
//               const name = tableName.split('_')[0] || 'N/A';                                                                                                  
//               const datePart = tableName.split('_').slice(1).join('_');                                                                                                  
//               const date = datePart ? formatDate(datePart) : 'N/A';                                                                                                  
//               const status = getStatusFromTableName(tableName);                                                                                                  
                                                                                                  
//               return (                                                                                                  
//                 <tr key={index}>                                                                                                  
//                   <td>{name}</td>                                                                                                  
//                   <td>{date}</td>                                                                                                  
//                   <td>{status}</td>                                                                                                  
//                   <td>                                                                                                  
//                     <Link to={`/table/${tableName || ''}`}>Show Data</Link>                                                                                                  
//                     <Button onClick={() => deleteTable(tableName)}>Delete</Button>                                                                                                  
//                   </td>                                                                                                  
//                 </tr>                                                                                                  
//               );                                                                                                  
//             })}                                                                                                  
//           </tbody>                                                                                                  
//         </table>                                                                                                  
                                                                                                  
//         {selectedTable && (                                                                                                  
//           <div className="table-container">                                                                                                  
//             <h2>Table Data: {selectedTable}</h2>                                                                                                  
//             <table className="table">                                                                                                  
//               <thead>                                                                                                  
//                 <tr>                                                                                                  
//                   {Object.keys(tableData[0]).map((key, index) => (                                                                                                  
//                     <th key={index}>{key}</th>                                                                                                  
//                   ))}                                                                                                  
//                 </tr>                                                                                                  
//               </thead>                                                                                                  
//               <tbody>                                                                                                  
//                 {tableData.map((row, rowIndex) => (                                                                                                  
//                   <tr key={rowIndex}>                                                                                                  
//                     {Object.values(row).map((value, colIndex) => (                                                                                                  
//                       <td key={colIndex}>{value}</td>                                                                                                  
//                     ))}                                                                                                  
//                   </tr>                                                                                                  
//                 ))}                                                                                                  
//               </tbody>                                                                                                  
//             </table>                                                                                                  
//           </div>                                                                                                  
//         )}                                                                                                  
//       </div>                                                                                                  
//     </div>                                                                                                  
//   );                                                                                                  
// }                                                                                                  
                                                                                                  
// export default App;                                                                                                  
                                                                                                  
// import { Link } from 'react-router-dom';                                                                                                  
// import React, { useState, useEffect } from 'react';                                                                                                  
// import './DataTable.css'; // Import the CSS file                                                                                                  
// import Button from '@mui/material/Button';                                                                                                  
// import IconButton from '@mui/material/IconButton';                                                                                                  
// import SaveIcon from '@mui/icons-material/Save';                                                                                                  
// import ConfirmationDialog from './ConfirmationDialog';   
// import UploadFileIcon from '@mui/icons-material/UploadFile';                                                                                               
// import { useNavigate } from 'react-router-dom';
                                  
// function App() {                                                                                                  
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);                                                                                                  
//   const navigate = useNavigate();
                                                    
//   const [file, setFile] = useState(null);                                                                                                  
//   const [uploadedFiles, setUploadedFiles] = useState([]);                                                                                                  
//   const [tableNames, setTableNames] = useState([]);                                                                                                  
//   const [selectedTable, setSelectedTable] = useState(null);                                                                                                  
//   const [tableData, setTableData] = useState([]);                                                                                                  
//   const [tableToDelete, setTableToDelete] = useState(null);                                                                                                  
//                  // CSS for the inline navbar
// const navbarStyle = {
//   backgroundColor: '#1f4d7e', // Blue background color
//   padding: '10px 10px', // Adjust padding as needed
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   position: 'fixed', // Make the navbar fixed
//   top: '0', // Set the top position to 0 to fix it at the top
//   width: '98%', // Make the navbar full width
//   zIndex: '1000',
//   borderRadius: '15px 15px 15px 15px'
// };

// const navbarTextStyle = {
//   color: '#fff', // White text color
//   fontSize: '26px', // Adjust font size as needed
//   fontWeight: 'bold',
// };                                                                                 
//   useEffect(() => {                                                                                                  
//     // Fetch the list of uploaded files and table names when the component mounts                                                                                                  
//     fetchUploadedFiles();                                                                                                  
//     fetchTableNames();                                                                                                  
//   }, []);                                                                                                  
                                                                                                  
//   const handleFileUpload = (event) => {                                                                                                  
//     setFile(event.target.files[0]);                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const uploadFile = () => {                                                                                                  
//     const formData = new FormData();                                                                                                  
//     formData.append('file', file);                                                                                                  
                                                                                                  
//     fetch('http://10.110.21.216:5000/upload', {                                                                                                  
//       method: 'POST',                                                                                                  
//       body: formData,                                                                                                  
//     })                                                                                                  
//       .then((response) => response.text())                                                                                                  
//       .then((message) => {                                                                                                  
//         console.log(message);                                                                                                  
//         // After uploading, fetch the list of uploaded files again                                                                                                  
//         fetchUploadedFiles();                                                                                                  
//         window.location.reload();                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const getStatusFromTableName = (tableName) => {                                                                                                  
//     if (tableName.includes('verified') && !tableName.endsWith('unfinished')) {                                                                                                  
//       return 'Verified';                                                                                                  
//     } else if (tableName.includes('unfinished')) {                                                                                                  
//       return 'Unfinished';                                                                                                  
//     } else {                                                                                                  
//       return 'Not Started';                                                                                                  
//     }                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchUploadedFiles = () => {                                                                                                  
//     fetch('http://10.110.21.216:5000/files')                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setUploadedFiles(data);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchTableNames = () => {                                                                                                  
//     fetch('http://10.110.21.216:5000/tables')                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setTableNames(data);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const fetchTableData = (tableName) => {                                                                                                  
//     fetch(`http://10.110.21.216:5000/data/${tableName}`)                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then((data) => {                                                                                                  
//         setTableData(data);                                                                                                  
//         setSelectedTable(tableName);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };                                                                                                  
                                                                                                  
//   function formatDate(datePart) {                                                                                                  
//     const [day, month, year, hour, minute] = datePart.split('_');                                                                                                  
//     return `${day}-${month}-${year} ${hour}:${minute}`;                                                                                                  
//   }                                                                                                  
                                                                                                  
//   const openDeleteConfirmation = (tableName) => {                                                                                                  
//     setTableToDelete(tableName);                                                                                                  
//     setDeleteConfirmationOpen(true);                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const closeDeleteConfirmation = () => {                                                                                                  
//     setTableToDelete(null);                                                                                                  
//     setDeleteConfirmationOpen(false);                                                                                                  
//   };                                                                                                  
                                                                                                  
//   const confirmDelete = () => {                                                                                                  
//     // Close the confirmation dialog                                                                                                  
//     setDeleteConfirmationOpen(false);                                                                                                  
                                                                                                  
//     // Delete the table                                                                                                  
//     fetch(`http://10.110.21.216:5000/delete/${tableToDelete}`, {                                                                                                  
//       method: 'DELETE',                                                                                                  
//     })                                                                                                  
//       .then((response) => response.json())                                                                                                  
//       .then(() => {                                                                                                  
//         // Table deleted, refresh the list of tables                                                                                                  
//         fetchTableNames();                                                                                                  
//         setSelectedTable(null);                                                                                                  
//         setTableData([]);                                                                                                  
//       })                                                                                                  
//       .catch((error) => {                                                                                                  
//         console.error(error);                                                                                                  
//       });                                                                                                  
//   };       
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
//             <input
//               type="file"
//               accept=".xlsx"
//               style={{ display: 'none' }}
//               id="file-upload"
//               onChange={handleFileUpload}
//             />
//             <label htmlFor="file-upload">
//               <IconButton
//                 color="warning"
//                 aria-label="upload file here"
//                 component="span"
//               >
//                 <UploadFileIcon />
//                 <span style={{ marginLeft: '10px', fontSize: '17px' }}>
//                   Select File here
//                 </span>
//               </IconButton>
//             </label>
//             <Button onClick={uploadFile} style={{ marginLeft: '50px' }}>
//               Upload
//             </Button>
//             <h2 style={{ marginTop: '50px' }}>Uploaded Files:</h2>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>File Name</th>
//                   <th>Added Date</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableNames.map((tableName, index) => {
//                   const name = tableName.split('_')[0] || 'N/A';
//                   const datePart = tableName.split('_').slice(1).join('_');
//                   const date = datePart ? formatDate(datePart) : 'N/A';
//                   const status = getStatusFromTableName(tableName);

//                   return (
//                     <tr
//                       key={index}
//                       style={{
//                         backgroundColor:
//                           status === 'Verified' ? '#90EE90' : 'white',
//                       }}
//                     >
//                       <td>{name}</td>
//                       <td>{date}</td>
//                       <td>{status}</td>
//                       <td>
//                         <Link to={`/table/${tableName || ''}`}>Show Data</Link>
//                         <Button
//                           onClick={() => openDeleteConfirmation(tableName)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             {selectedTable && (
//               <div className="table-container">
//                 <h2>Table Data: {selectedTable}</h2>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       {Object.keys(tableData[0]).map((key, index) => (
//                         <th key={index}>{key}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableData.map((row, rowIndex) => (
//                       <tr key={rowIndex}>
//                         {Object.values(row).map((value, colIndex) => (
//                           <td key={colIndex}>{value}</td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//           {/* Confirmation Dialog */}
//           <ConfirmationDialog
//             open={deleteConfirmationOpen}
//             message={`Are you sure you want to delete the table: ${tableToDelete}?`}
//             onConfirm={confirmDelete}
//             onCancel={closeDeleteConfirmation}
//           />
//         </div>
//       ) : (
//         <p>User is not logged in</p>
//       )}
//     </div>
//   );
// }                                                                                           
                                                                                                  
// export default App;                                                                                                  
                                                                                                  
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './DataTable.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ConfirmationDialog from './ConfirmationDialog';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';

function App() {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [tableNames, setTableNames] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableToDelete, setTableToDelete] = useState(null);

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
    borderRadius: '15px 15px 15px 15px'
  };

  const navbarTextStyle = {
    color: '#fff',
    fontSize: '26px',
    fontWeight: 'bold',
  };

  useEffect(() => {
    fetchUploadedFiles();
    fetchTableNames();
  }, []);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://10.110.21.216:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        fetchUploadedFiles();
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStatusFromTableName = (tableName) => {
    if (tableName.includes('verified') && !tableName.endsWith('unfinished')) {
      return 'Verified';
    } else if (tableName.includes('unfinished')) {
      return 'Unfinished';
    } else {
      return 'Not Started';
    }
  };

  const fetchUploadedFiles = () => {
    fetch('http://10.110.21.216:5000/files')
      .then((response) => response.json())
      .then((data) => {
        setUploadedFiles(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTableNames = () => {
    fetch('http://10.110.21.216:5000/tables')
      .then((response) => response.json())
      .then((data) => {
        setTableNames(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTableData = (tableName) => {
    fetch(`http://10.110.21.216:5000/data/${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        setSelectedTable(tableName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function formatDate(datePart) {
    const [day, month, year, hour, minute] = datePart.split('_');
    return `${day}-${month}-${year} ${hour}:${minute}`;
  }

  const openDeleteConfirmation = (tableName) => {
    setTableToDelete(tableName);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setTableToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = () => {
    setDeleteConfirmationOpen(false);

    fetch(`http://10.110.21.216:5000/delete/${tableToDelete}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        fetchTableNames();
        setSelectedTable(null);
        setTableData([]);
      })
      .catch((error) => {
        console.error(error);
      });
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
            <input
              type="file"
              accept=".xlsx"
              style={{ display: 'none' }}
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <IconButton
                color="warning"
                aria-label="upload file here"
                component="span"
              >
                <UploadFileIcon />
                <span style={{ marginLeft: '10px', fontSize: '17px' }}>
                  Select File here
                </span>
              </IconButton>
            </label>
            <Button onClick={uploadFile} style={{ marginLeft: '50px' }}>
              Upload
            </Button>
            <h2 style={{ marginTop: '50px' }}>Uploaded Files:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Added Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableNames.map((tableName, index) => {
                  const name = tableName.split('_')[0] || 'N/A';
                  const datePart = tableName.split('_').slice(1).join('_');
                  const date = datePart ? formatDate(datePart) : 'N/A';
                  const status = getStatusFromTableName(tableName);

                  return (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          status === 'Verified' ? '#90EE90' : 'white',
                      }}
                    >
                      <td>{name}</td>
                      <td>{date}</td>
                      <td>{status}</td>
                      <td>
                        <Link to={`/table/${tableName || ''}`}>Show Data</Link>
                        <Button
                          onClick={() => openDeleteConfirmation(tableName)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {selectedTable && (
              <div className="table-container">
                <h2>Table Data: {selectedTable}</h2>
                <table className="table">
                  <thead>
                    <tr>
                      {Object.keys(tableData[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                          <td key={colIndex}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <ConfirmationDialog
            open={deleteConfirmationOpen}
            message={`Are you sure you want to delete the table: ${tableToDelete}?`}
            onConfirm={confirmDelete}
            onCancel={closeDeleteConfirmation}
          />
        </div>
      ) : (
        <p>User is not logged in</p>
      )}

      {loading && (
        <div className="loading-spinner">
          Loading...
        </div>
      )}
    </div>
  );
}

export default App;
