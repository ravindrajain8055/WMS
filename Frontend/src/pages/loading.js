import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Loadingpage from "src/sections/loading/loadingpage";
import Loadinglog from "src/sections/loading/loadinglog";

const Page = () => {
  return (
    <div>
      <Head>
        <title>loading</title>
      </Head>

      <Loadingpage />
      <Typography sx={{ m: 1, pl: 2 }} variant="h5" component="h5">
        loading log
      </Typography>
      <Loadinglog />
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
