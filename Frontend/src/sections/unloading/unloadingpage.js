import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Stack, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useRef, useState } from "react";
import Addnewunloadingmodal from "./addnewunloadingmodal";
import { useDispatch } from "react-redux";
import { addinventoryuldetails } from "src/redux/slice";
import { useRouter } from "next/router";
import { format } from "date-fns";

const columnHelper = createMRTColumnHelper();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

let fdata = [
  {
    sr_no: "1",
    consignor_name: "Godrej",
    invoice_number: "32156488",
    invoice_date: "2023-11-25 11:11:11",
    actionn: "start_unloading", //double nn in the end as action is a react
    name_of_supervisor: "Ganesh",
    received_from: "Godrej",
    unloading_time: "",
    inward_time: "10:11:12",
    truck_number: "",
    unloading_date: "2023-11-25 11:11:11",
  },
  {
    sr_no: "2",
    consignor_name: "Godrej",
    invoice_number: "32156489",
    invoice_date: "2023-11-25 10:10:10",
    actionn: "start_unloading", //double nn in the end as action is a react
    name_of_supervisor: "Ganesh",
    received_from: "Godrej",
    unloading_time: "",
    inward_time: "10:10:10",
    truck_number: "MH052486",
    unloading_date: "2023-11-25 10:10:10",
  },
];

const Unloadingpage = () => {
  const [data, setData] = useState(fdata);
  const [showModal, setShowModal] = useState(false);
  const unloadingRef = useRef("");

  const dispatch = useDispatch();
  const router = useRouter();

  const columns = [
    columnHelper.accessor("sr_no", {
      header: "Sr_no.",
      size: "20px",
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
    {
      id: "actionn",
      header: "action",
      accessorKey: "actionn",
      enableColumnOrdering: true,
      Cell: ({ renderedCellValue, row }) => {
        if (renderedCellValue == "start_unloading") {
          return (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#7AED53", color: "black", m: 0, pb: 0, pt: 0 }}
              onClick={handleUnloading(row._valuesCache)}
            >
              Start Unloading
            </Button>
          );
        } else {
          return (
            //check if materials are added or not
            <Button variant="contained" sx={{ backgroundColor: "#ED5953", m: 0, pb: 0, pt: 0 }}>
              Save Inward Processing
            </Button>
          );
        }
      },
    },
    {
      id: "material_details",
      header: "Material Details",
      columnDefType: "display", //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => (
        <Button
          variant="contained"
          sx={{ pb: 0, pt: 0, backgroundColor: "#ED5953" }}
          onClick={() => {
            dispatch(addinventoryuldetails(row._valuesCache));
            router.push("/addmaterials");
          }}
        >
          Add Materials
        </Button>
      ),
    },
    columnHelper.accessor("name_of_supervisor", {
      header: "Name of Supervisor",
    }),
    columnHelper.accessor("received_from", {
      header: "Received From",
    }),
    columnHelper.accessor("unloading_time", {
      header: "Unloading time",
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
      id: "delete",
      header: "delete",
      columnDefType: "display", //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => (
        <Button
          variant="contained"
          sx={{ pb: 0, pt: 0, backgroundColor: "#986A68" }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Delete Row
        </Button>
      ),
    },
  ];

  const getCurrentTime = () => {
    // Get current date and time
    const now = new Date();
    return format(now, "HH:mm:ss");
  };

  const handleUnloading = (rowval) => {
    // to updateeee
    const updatedActionn = { actionn: "Save Inward Processing", inward_time: getCurrentTime() };
    setData(
      data.map((item) => {
        if (item.invoice_number == rowval.invoice_number) {
          return { ...item, updatedActionn };
        } else {
          return item;
        }
      })
    );

    console.log(data);
  };

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
    <div>
      <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={2}>
        <Typography sx={{ m: 1, pl: 2 }} variant="h5" component="h5">
          Ongoing Inwards
        </Typography>
        <Stack sx={{ display: "flex", alignItems: "center", pr: 2 }} direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(true);
            }}
          >
            + Add New Unloading
          </Button>
        </Stack>
      </Stack>
      <MaterialReactTable table={table} />
      {showModal && (
        <Addnewunloadingmodal
          showModal={showModal}
          handleClose={handleClose}
          setData={setData}
          data={data}
        />
      )}
    </div>
  );
};

export default Unloadingpage;
