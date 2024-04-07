import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addinventoryuldetails } from "src/redux/slice";
import { useRouter } from "next/router";

const columnHelper = createMRTColumnHelper();

let fdata = [
  {
    sr_no: "1",
    consignor_name: "Godrej",
    invoice_number: "32156488",
    invoice_date: "2023-11-25 11:11:11",
    actionn: "start_unloading", //double nn in the end as action is a react
    name_of_supervisor: "Ganesh",
    received_from: "Godrej",
    unloading_time: "11:11:12",
    inward_time: "10:11:12",
    truck_number: "",
    unloading_date: "2023-11-25 11:11:11",
    unloading_end_time: "12:11:12",
  },
];

const detailsM = {
  sr_no: "1",
  consignor_name: "Godrej",
  invoice_number: "32156488",
  invoice_date: "2023-11-25 11:11:11",
  actionn: "start_unloading", //double nn in the end as action is a react
  name_of_supervisor: "Ganesh",
  received_from: "Godrej",
  unloading_time: "11:11:12",
  inward_time: "10:11:12",
  truck_number: "",
  unloading_date: "2023-11-25 11:11:11",
  unloading_end_time: "12:11:12",
};

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Unloadinglog = () => {
  const [data, setData] = useState(fdata);
  const router = useRouter();
  let unloadinglogdata = useSelector((state) => state.op.unloadinglog);

  useEffect(() => {
    if (unloadinglogdata.length > 0) {
      setData(unloadinglogdata);
      console.log(data, "........fdata.....");
    }
  }, [unloadinglogdata]);

  const [showModal, setShowModal] = useState(false);
  const rowRef = useRef("");
  const dispatch = useDispatch();

  const columns = [
    columnHelper.accessor("sr_no", {
      header: "Sr_no.",
    }),
    columnHelper.accessor("consignor_name", {
      header: "Consignor Name",
    }),
    columnHelper.accessor("invoice_number", {
      header: "Invoice Number",
    }),
    columnHelper.accessor("invoice_date", {
      header: "Invoice Date",
    }),
    columnHelper.accessor("name_of_supervisor", {
      header: "Name of Supervisor",
    }),
    columnHelper.accessor("received_from", {
      header: "Received From",
    }),
    columnHelper.accessor("unloading_time", {
      header: "Unloading start time",
    }),
    columnHelper.accessor("unloading_end_time", {
      header: "Unloading end time",
    }),
    columnHelper.accessor("inward_time", {
      header: "Inward time",
    }),
    columnHelper.accessor("truck_number", {
      header: "Truck Number",
    }),
    columnHelper.accessor("unloading_date", {
      header: "Unloading Date",
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
            dispatch(addinventoryuldetails(detailsM));
            router.push("/materiallogs");
          }}
        >
          Details
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

  return (
    <>
      <MaterialReactTable table={table} />
      {/* {showModal && (
        <Inventorymodal showModal={showModal} handleClose={handleClose} rowRef={rowRef} />
      )} */}
    </>
  );
};

export default Unloadinglog;
