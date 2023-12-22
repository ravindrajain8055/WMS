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
    invoice_date: "2023-11-25",
    action: "start_unloading",
    name_of_supervisor: "Ganesh",
    received_from: "Godrej",
    unloading_time: "7:33 PM",
    inward_time: "7:33 PM",
    truck_number: "",
    unloading_date: "2023-11-25",
  },
];

const Unloadingpage = () => {
  const [data, setData] = useState(fdata);
  const [showModal, setShowModal] = useState(false);
  const rowRef = useRef("");

  const dispatch = useDispatch();

  const columns = [
    columnHelper.accessor("sr_no", {
      header: "Sr_no.",
      size: "20px",
    }),
    columnHelper.accessor("consignor_name", {
      header: "Consignor Name",
      size: 50,
    }),
    columnHelper.accessor("invoice_number", {
      header: "Invoice Number",
      size: 90,
    }),
    columnHelper.accessor("invoice_date", {
      header: "Invoice Date",
      size: 230,
    }),
    {
      id: "action",
      header: "action",
      Cell: ({ renderedCellValue, row }) => {
        console.log(renderedCellValue, row._valuesCache);
        if (renderedCellValue == "start_unloading") {
          return (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#7AED53", color: "black", m: 0, pb: 0, pt: 0 }}
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
            // rowRef.current = {
            //   material_code: row._valuesCache.material_code,
            //   batch_number: row._valuesCache.batch_number,
            //   material_description: row._valuesCache.material_description,
            // };
            setShowModal(true);
          }}
        >
          Add Materials
        </Button>
      ),
    },
    columnHelper.accessor("name_of_supervisor", {
      header: "Name of Supervisor",
      size: 40,
    }),
    columnHelper.accessor("received_from", {
      header: "Received From",
      size: 40,
    }),
    columnHelper.accessor("unloading_time", {
      header: "Unloading time",
      size: 40,
    }),
    columnHelper.accessor("inward_time", {
      header: "Inward time",
      size: 40,
    }),
    columnHelper.accessor("truck_number", {
      header: "Truck Number",
      size: 40,
    }),
    columnHelper.accessor("unloading_date", {
      header: "Unloading Date",
      size: 40,
    }),
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
          <Button variant="contained">+ New Adjustment</Button>
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
