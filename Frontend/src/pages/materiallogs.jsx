import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography, Grid, Card } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Materiallog from "../sections/addmaterials/materiallog";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#6366f1",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "500",
  margin: "0",
  padding: "0",
  color: "white",
}));

const Page = () => {
  let uli = useSelector((store) => store.op.inventoryuldetails);
  const {
    invoice_number,
    invoice_date,
    name_of_supervisor,
    truck_number,
    received_from,
    inward_time,
    unloading_date,
    consignor_name,
  } = uli;

  return (
    <div>
      <Head>
        <title>Unloading details</title>
      </Head>
      <Typography sx={{ m: 1 }} variant="h5" component="h5">
        Unloading details
      </Typography>
      <Card sx={{ border: "1px solid", ml: 1, mr: 1, pl: 1, pr: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <div sx={{ borderRadius: "16px", border: "1", borderColor: "secondary.main" }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={4}>
                <Item>Invoice Number</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>{invoice_number}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Invoice Date</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>{invoice_date}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Name of supervisor</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>
                  {name_of_supervisor}
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Received From</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>{received_from}</Item>
              </Grid>
            </Grid>
          </div>
        </Box>
        <hr></hr>
        <Box sx={{ flexGrow: 1 }}>
          <div sx={{ borderRadius: "16px", border: "1", borderColor: "secondary.main" }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={4}>
                <Item>Truck Number</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>{truck_number}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Inward Time</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>{inward_time}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Unloading Date</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>{unloading_date}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Consignor Name</Item>
                <Item style={{ backgroundColor: "#D3D3D3", color: "black" }}>{consignor_name}</Item>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Card>

      <Materiallog />
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
