import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Stack, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Addmaterialmodalf from "./addmaterialmodalf";

const columnHelper = createMRTColumnHelper();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

let fdata = [
  {
    sr_no: "1",
    material_code: "45169669",
    description: "MasterSeal 910 20MMx10MM 30M",
    batch_number: "1000927283",
    manufacturing_date: "2023-10-10	11:11:11",
    expiry_date: "2024-10-10 11:11:11",
    quantity: "15",
    total_weight: "85",
    putaway_location: "A-0-001",
  },
];

const Addmaterialtable = () => {
  const [data, setData] = useState(fdata);
  const [showModal, setShowModal] = useState(false);
  const rowRef = useRef("");

  const dispatch = useDispatch();

  const columns = [
    columnHelper.accessor("sr_no", {
      header: "Sr_no.",
      size: "20px",
    }),
    columnHelper.accessor("material_code", {
      header: "Material Code",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("batch_number", {
      header: "batch Number",
    }),
    columnHelper.accessor("manufacturing_date", {
      header: "manufacturing date",
    }),
    columnHelper.accessor("expiry_date", {
      header: "expiry date",
    }),
    columnHelper.accessor("quantity", {
      header: "quantity",
    }),
    columnHelper.accessor("total_weight", {
      header: "total weight",
    }),
    columnHelper.accessor("putaway_location", {
      header: "putaway location",
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
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Typography sx={{ m: 1, pl: 2 }} variant="h5" component="h5">
          Unloading Materials
        </Typography>
        <Stack sx={{ display: "flex", alignItems: "center", pr: 2 }} direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(true);
            }}
          >
            + Add New Material
          </Button>
        </Stack>
      </Stack>
      <MaterialReactTable table={table} />
      {showModal && (
        <Addmaterialmodalf
          showModal={showModal}
          handleClose={handleClose}
          setData={setData}
          data={data}
        />
      )}
    </div>
  );
};

export default Addmaterialtable;
