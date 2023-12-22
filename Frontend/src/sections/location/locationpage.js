import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useRef, useState } from "react";
import Locationmodal from "./locationmodal";
import Locationpalletmodal from "./locationpalletmodal";
import LinearProgress from "@mui/material/LinearProgress";

const columnHelper = createMRTColumnHelper();

let fdata = [
  {
    sr_no: 1,
    location_name: "A-0-001",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "001",
    status: "Available",
    capacity_utilization: 0,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 2,
    location_name: "A-0-002",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "002",
    status: "Available",
    capacity_utilization: 0,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 3,
    location_name: "A-0-003",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "003",
    status: "Occupied",
    capacity_utilization: 0.24,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 4,
    location_name: "A-0-004",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "004",
    status: "Occupied",
    capacity_utilization: 0.28,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 5,
    location_name: "A-0-005",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "005",
    status: "Occupied",
    capacity_utilization: 0.24,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 6,
    location_name: "A-0-006",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "006",
    status: "Occupied",
    capacity_utilization: 0.24,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 7,
    location_name: "A-0-007",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "007",
    status: "Available",
    capacity_utilization: 0,
    details: "VIEW",
    last_updated: "08/12/2023, 17:39:00",
  },
  {
    sr_no: 8,
    location_name: "A-0-008",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "008",
    status: "Occupied",
    capacity_utilization: 0.32,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 9,
    location_name: "A-0-009",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "009",
    status: "Occupied",
    capacity_utilization: 0.36,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 10,
    location_name: "A-0-010",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "010",
    status: "Occupied",
    capacity_utilization: 0.3,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 11,
    location_name: "A-0-011",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "011",
    status: "Occupied",
    capacity_utilization: 2.4,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 12,
    location_name: "A-0-012",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "012",
    status: "Occupied",
    capacity_utilization: 0.29,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 13,
    location_name: "A-0-013",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "013",
    status: "Occupied",
    capacity_utilization: 0.24,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 14,
    location_name: "A-0-014",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "014",
    status: "Occupied",
    capacity_utilization: 0.25,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 15,
    location_name: "A-0-015",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "015",
    status: "Occupied",
    capacity_utilization: 0.24,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 16,
    location_name: "A-0-016",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "016",
    status: "Occupied",
    capacity_utilization: 0.48,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
  {
    sr_no: 17,
    location_name: "A-0-017",
    type: "GENERAL",
    rack: "A",
    level: 0,
    pallet: "017",
    status: "Occupied",
    capacity_utilization: 0.01,
    details: "VIEW",
    last_updated: "08/12/2023, 11:34:19",
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Example = () => {
  const [data, setData] = useState(fdata);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const rowRef = useRef("");
  const rowRef2 = useRef("");

  const columns = [
    columnHelper.accessor("sr_no", {
      header: "Sr_no.",
      size: "20px",
    }),
    columnHelper.accessor("location_name", {
      header: "Location Name",
      size: 20,
    }),
    columnHelper.accessor("type", {
      header: "Type",
      size: 20,
    }),
    columnHelper.accessor("rack", {
      header: "Rack",
      size: 20,
    }),
    columnHelper.accessor("level", {
      header: "Level",
      size: 10,
    }),
    columnHelper.accessor("pallet", {
      header: "Pallet",
      size: 20,
    }),
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      Cell: ({ renderedCellValue }) => {
        if (renderedCellValue == "Available") {
          return (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#74FC87", color: "black", m: 0, pb: 0, pt: 0 }}
            >
              Available
            </Button>
          );
        } else {
          return (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FCBA74", color: "black", m: 0, pb: 0, pt: 0 }}
            >
              Occupied
            </Button>
          );
        }
      },
    },
    {
      id: "capacity_utilization",
      accessorKey: "capacity_utilization",
      header: "Capacity Utilization %",
      Cell: ({ renderedCellValue }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={renderedCellValue * 100} />
          </Box>
          {`${Math.round(renderedCellValue * 100)}%`}
        </Box>
      ),
    },
    {
      id: "details",
      header: "Details",
      columnDefType: "display", //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => (
        <Button
          variant="contained"
          sx={{ pt: 0, pb: 0 }}
          onClick={() => {
            rowRef.current = {
              row: row._valuesCache,
            };
            setShowModal(true);
          }}
        >
          View Details
        </Button>
      ),
    },
    {
      id: "change_location_type",
      header: "Change location type",
      columnDefType: "display", //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => (
        <Button
          onClick={() => {
            rowRef2.current = {
              row: row._valuesCache,
            };
            setShowModal2(true);
          }}
        >
          Change Pallet Type
        </Button>
      ),
    },
    columnHelper.accessor("last_updated", {
      header: "Last Updated",
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
  const handleClose2 = () => setShowModal2(false);

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
      {showModal && (
        <Locationmodal showModal={showModal} handleClose={handleClose} rowRef={rowRef} />
      )}
      {showModal2 && (
        <Locationpalletmodal
          showModal2={showModal2}
          handleClose2={handleClose2}
          rowRef={rowRef2}
          setData={setData}
          data={data}
        />
      )}
    </>
  );
};

export default Example;
