import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import ExampleWithLocalizationProvider from '../sections/materials/materialMaster'


const Page = () => {

  return (
    <div>
      <Head>
        <title>
          Material Master 
        </title>
      </Head>
      <Typography sx={{ m: 1 }} variant="h5" component="h5">
          Material Details
      </Typography>

      {/* Previous code here  */}
      <ExampleWithLocalizationProvider />
    </div>
  );
};



Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
