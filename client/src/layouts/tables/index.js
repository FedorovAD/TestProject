/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, ButtonBase, Typography, Modal, TextField } from "@mui/material";
import * as React from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Tables() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isPending,setIsPending] = useState(false)

  const addClose = () =>{
    const data = {sid: parseInt(showcaseID), name: textField, price: parseInt(priceField), amount: parseInt(amountField)};
    setIsPending(true);
    console.log(JSON.stringify(data))
    fetch('http://localhost:8080/api/products',
      {
        method: 'POST',
        headers: {"Content-type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(data),
      }
    ).then((res) => {
      if (res.status === 500){
        res.json().then(json => alert('Bad request'))
      }
      if (res.status === 400){
        res.json().then(json => alert(json.message))
      }
    })
    setIsPending(false);
    handleClose();
  }

  const [openU, setOpenU] = React.useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);

  const updateClose = () =>{
    const data = {sid: parseInt(showcaseID), name: textField, price: parseInt(priceField), amount: parseInt(amountField), id: parseInt(idField)};
    setIsPending(true);
    console.log(JSON.stringify(data))
    fetch('http://localhost:8080/api/products',
      {
        method: 'PUT',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data),
      }
    ).then((res) => {
      if (res.status === 500){
        res.json().then(json => alert('Bad request'))
      }
      if (res.status === 400){
        res.json().then(json => alert(json.message))
      }
    })
    setIsPending(false);
    handleCloseU();
    
  }

  const [openD, setOpenD] = React.useState(false);
  const handleOpenD = () => setOpenD(true);
  const handleCloseD = () => setOpenD(false);

  const deleteClose = () =>{
    if (idField == ''){
      alert('Bad Request')
      handleCloseD();
      return
    }
    setIsPending(true);
    fetch(`http://localhost:8080/api/products/${idField}`,
      {
        method: 'DELETE',
      }
    ).then((res) => {
      if (res.status === 500){
        res.json().then(json => alert('Bad request'))
      }
      if (res.status === 404){
        res.json().then(json => alert(json.message))
      }
      if (res.status === 400){
        res.json().then(json => alert(json.message))
      }
    })
    setIsPending(false);
    handleCloseD();
    
  }

  const [textField, setTextField] = useState('');
  const changeName = event => {
    setTextField(event.target.value)
  }
  const [showcaseID, setShowcaseId] = useState('');
  const changeShowcaseId = event => {
    setShowcaseId(event.target.value)
  }
  const [priceField, setPriceField] = useState('');
  const changePrice = event => {
    setPriceField(event.target.value)
  }
  const [amountField, setAmountField] = useState('');
  const changeAmount = event => {
    setAmountField(event.target.value)
  }
  const [idField, setIdField] = useState('');
  const changeID = event => {
    setIdField(event.target.value)
  }

  const { columns} = authorsTableData();
  const { columns: pColumns} = projectsTableData();

  const onGridReady = useCallback((params) => {
    
    const dataSource = {
        rowCount: undefined,
        getRows: (params) => {
            console.log('asking for ' + params.startRow + ' to ' + params.endRow);
            fetch(`http://localhost:8080/api/showcase?limit=${params.endRow - params.startRow}&offset=${params.startRow}`,{
              query: {
                limit: params.endRow - params.startRow,
                offset: params.startRow,
              },
              header: {
                "Cache-control": "no-cache",
              },
            }).then(res  => res.json())
              .then(({items}) => {
                const lastRow = params.endRow - params.startRow > items.length ? params.endRow + items.length : undefined
                params.successCallback(items, lastRow)

            })
        },
    };
    params.api.setGridOption('datasource', dataSource);
}, []);
  const onGridReadyP = (params) =>{
    fetch("http://localhost:8080/api/products").then(res => res.json())
    .then(res => params.api.applyTransaction({add:res}))
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Showcases Table
                </MDTypography>
              </MDBox>
              <MDBox className="ag-theme-material" style={{height: 500}}>
              <AgGridReact 
                columnDefs={columns}
                rowBuffer={0}
                rowSelection={'multiple'}
                rowModelType={'infinite'}
                cacheBlockSize={2}
                cacheOverflowSize={2}
                maxConcurrentDatasourceRequests={1}
                infiniteInitialRowCount={1000}
                maxBlocksInCache={10}
                onGridReady={onGridReady}
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Products Table
                </MDTypography>
                <MDBox display="flex" gap="6px">
                <MDButton mx={6}onClick={handleOpen}>Add</MDButton>
                <MDButton mx={6}onClick={handleOpenU}>Update</MDButton>
                <MDButton mx={6}onClick={handleOpenD}>Delete</MDButton>
                </MDBox>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <TextField id="filled-basic" label="Enter name" variant="filled" onChange={changeName} value={textField}/>
                   <TextField
                      id="filled-number"
                      label="Enter ShowcaseID"
                      type="number"
                      onChange={changeShowcaseId} 
                      value={showcaseID}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-number"
                      label="Enter price"
                      type="number"
                      onChange={changePrice} 
                      value={priceField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-number"
                      label="Enter amount"
                      type="number"
                      onChange={changeAmount} 
                      value={amountField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    { !isPending && <MDButton color='success' onClick={addClose} mx={6}>Add</MDButton>}
                    { isPending && <MDButton color='success'  mx={6}>Loading...</MDButton>}
                  </Box>
                </Modal>
                <Modal
                  open={openU}
                  onClose={handleCloseU}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <TextField
                      id="filled-number"
                      label="Enter ID"
                      type="number"
                      onChange={changeID} 
                      value={idField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                  <TextField id="filled-basic" label="Enter name" variant="filled" onChange={changeName} value={textField}/>
                   <TextField
                      id="filled-number"
                      label="Enter ShowcaseID"
                      type="number"
                      onChange={changeShowcaseId} 
                      value={showcaseID}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-number"
                      label="Enter price"
                      type="number"
                      onChange={changePrice} 
                      value={priceField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-number"
                      label="Enter amount"
                      type="number"
                      onChange={changeAmount} 
                      value={amountField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    { !isPending && <MDButton color='success' onClick={updateClose} mx={6}>Update</MDButton>}
                    { isPending && <MDButton color='success' mx={6}>Update</MDButton>} 
                  </Box>
                </Modal>
                <Modal
                  open={openD}
                  onClose={handleCloseD}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                   <TextField
                      id="filled-number"
                      label="EnterID"
                      type="number"
                      onChange={changeID} 
                      value={idField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    { !isPending && <MDButton color='error' onClick={deleteClose} mx={6}>Delete</MDButton>}
                    {isPending && <MDButton color='error' mx={6}>Delete</MDButton>}
                  </Box>
                </Modal>
              </MDBox>
              <MDBox className="ag-theme-material" style={{height: 500}}>
                <AgGridReact  columnDefs={pColumns} onGridReady={onGridReadyP} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
