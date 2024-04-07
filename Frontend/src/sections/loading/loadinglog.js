import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useRef, useState } from "react";
import { addinventoryuldetails } from "src/redux/slice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const columnHelper = createMRTColumnHelper();

let fdata = [
  {
    sr_no: "1",
    consignee_name: "FCL",
    shipment_number: "5101235249",
    shipment_date: "2023-11-25",
    transporter: "poornima",
    actionn: "start_pickup", //double nn in the end as action is a react
    name_of_supervisor: "Ganesh",
    loading_start_time: "",
    outward_time: "10:11:12",
    truck_number: "",
    loading_date: "2023-11-25",
    loading_end_time: "",
    driver_mobile: "8989898989",
  },
  {
    sr_no: "2",
    consignee_name: "Berger Paints",
    shipment_number: "6101225349",
    shipment_date: "2023-11-25",
    transporter: "adveth",
    actionn: "start_pickup", //double nn in the end as action is a react
    name_of_supervisor: "Ganesh",
    loading_start_time: "",
    outward_time: "10:11:12",
    truck_number: "",
    loading_date: "2023-11-25",
    loading_end_time: "",
    driver_mobile: "8989898989",
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Loadinglog = () => {
  const [data, setData] = useState(fdata);
  const [showModal, setShowModal] = useState(false);
  const rowRef = useRef("");

  const dispatch = useDispatch();
  const router = useRouter();

  const columns = [
    columnHelper.accessor("sr_no", {
      header: "Sr_no.",
      size: "20px",
    }),
    columnHelper.accessor("consignee_name", {
      header: "Consignee Name",
    }),
    columnHelper.accessor("shipment_number", {
      header: "shipment Number",
    }),
    columnHelper.accessor("shipment_date", {
      header: "shipment date",
    }),
    columnHelper.accessor("transporter", {
      header: "transporter",
    }),

    columnHelper.accessor("name_of_supervisor", {
      header: "Name of Supervisor",
    }),
    columnHelper.accessor("loading_start_time", {
      header: "loading start time",
    }),
    columnHelper.accessor("loading_end_time", {
      header: "loading end time",
    }),
    columnHelper.accessor("loading_date", {
      header: "loading Date",
    }),
    columnHelper.accessor("outward_time", {
      header: "outward time",
    }),
    columnHelper.accessor("truck_number", {
      header: "Truck Number",
    }),
    columnHelper.accessor("driver_mobile", {
      header: "driver number",
    }),

    {
      id: "material_details",
      header: "Material Details",
      columnDefType: "display", //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => (
        <Button
          variant="contained"
          sx={{ pb: 0, pt: 0, backgroundColor: "#6366f1" }}
          onClick={() => {
            dispatch(addinventoryuldetails(row._valuesCache));
            router.push("/addmaterials");
          }}
        >
          Material Details
        </Button>
      ),
    },
  ];

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleClose = () => setShowModal(false);

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    initialState: { density: "compact" },
    muiTableBodyProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Download All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Download Filtered Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Download Page Rows
        </Button>
        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Download Selected Rows
        </Button>
      </Box>
    ),
  });

  console.log(rowRef.current);

  return (
    <>
      <MaterialReactTable table={table} />
      {/* {showModal && (
          <Inventorymodal showModal={showModal} handleClose={handleClose} rowRef={rowRef} />
        )} */}
    </>
  );
};

export default Loadinglog;
