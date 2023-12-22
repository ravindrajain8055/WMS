import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Unloadingpage from "src/sections/unloading/unloadingpage";
import Unloadinglog from "src/sections/unloading/unloadinglog";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Unloading</title>
      </Head>

      <Unloadingpage />
      <Typography sx={{ m: 1, pl: 2 }} variant="h5" component="h5">
        Unloading log
      </Typography>
      <Unloadinglog />
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
