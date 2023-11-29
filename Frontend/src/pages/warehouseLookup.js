import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
// import { subDays, subHours } from 'date-fns';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
// import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
// import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { CustomersTable } from 'src/sections/customer/customers-table';
// import { CustomersSearch } from 'src/sections/customer/customers-search';
// import { applyPagination } from 'src/utils/apply-pagination';

import Example from '../sections/companies/react-table'

//-Page of Warehouse Lookup

// const useCustomers = (page, rowsPerPage) => {
//   return useMemo(
//     () => {
//       return applyPagination(data, page, rowsPerPage);
//     },
//     [page, rowsPerPage]
//   );
// };

// const useCustomerIds = (customers) => {
//   return useMemo(
//     () => {
//       return customers.map((customer) => customer.id);
//     },
//     [customers]
//   );
// };

const Page = () => {

  return (
    <div>
      <Head>
        <title>
          Warehouse Lookup
        </title>
      </Head>
      <Typography sx={{ m: 1 }} variant="h5" component="h5">
          Warehouse Lookup
      </Typography>

      {/* Previous code here  */}
      <Example/>
    </div>
  );
};



Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
