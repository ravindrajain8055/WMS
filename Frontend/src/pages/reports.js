import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const REPORT = "http://localhost:3000/Report.xlsx";

  const downloadReport = () => {
    const link = document.createElement("a");
    link.href = REPORT;
    link.setAttribute("download", `Report.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <Typography sx={{ m: 1, pl: 2 }} variant="h5" component="h5">
        Reports have sheets for Stock Summary, Inward, Outward, Pallet Occupancy, PP & Metric tonnes
        detail & Torn details
      </Typography>
      <hr></hr>

      <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 3, ml: 2 }}>
        <Stack sx={{ display: "flex", alignItems: "center", pr: 2 }} direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              downloadReport();
            }}
          >
            Download
          </Button>
        </Stack>
        <Typography sx={{ m: 1, pl: 2 }} variant="h5" component="h5">
          Download Unloading Report for current month
        </Typography>
      </Stack>
      <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 3, ml: 2 }}>
        <Stack sx={{ display: "flex", alignItems: "center", pr: 2 }} direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              downloadReport();
            }}
          >
            Download
          </Button>
        </Stack>
        <Typography sx={{ m: 1, pl: 2 }} variant="h5" component="h5">
          Download loading Report for current month
        </Typography>
      </Stack>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
