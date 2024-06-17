/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useEffect, useState } from "react";
import axios from "axios";

export default function data() {

  // const [rowData, setRowData] = useState([
  //   { ID: appState, Name: "Toys", LastUpdate: "31.05.2024", ItemLimit: "5/7" },
  // ]);
  const [colDefs, setColDefs] = useState([
    { headerName: "ID", field: "id", flex: 1 },
    { headerName: "Name", field: "showcase_name", flex: 4 },
    { headerName: "LastUpdate", field: "updated_at", flex: 4 },
    { headerName: "ItemsLimit", field: "items_limit", flex: 4 },
  ]);
  return {
    columns: colDefs,
  };
}
