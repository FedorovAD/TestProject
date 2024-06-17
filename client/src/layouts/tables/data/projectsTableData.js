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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";

export default function data() {
  // const [rowData, setRowData] = useState([
  // ]);
  const [colDefs, setColDefs] = useState([
    { headerName: "ID", field: "id", flex: 1 },
    { headerName: "ShowcaseID", field: "showcase_id", flex: 2 },
    { headerName: "ItemName", field: "item_name", flex: 3 },
    { headerName: "Created", field: "created_at", flex: 3 },
    { headerName: "LastUpdate", field: "updated_at", flex: 3 },
    { headerName: "Price", field: "price", flex: 3 },
    { headerName: "Amount", field: "amount", flex: 3 },
  ]);
  return {
    columns: colDefs,
  };
}
