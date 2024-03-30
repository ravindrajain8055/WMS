import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useState } from "react";
import { useSelector } from "react-redux";

const columnHelper = createMRTColumnHelper();

const fdata = [
  {
    Number: 1,
    LocationName: "A-1-102",
    MaterialCode: 55590536,
    BatchNumber: 2022080404,
    Description: "Uhardener 3 5.65KG 3H1",
    Quantity: 1,
  },
  {
    Number: 2,
    LocationName: "A-1-104",
    MaterialCode: 50389181,
    BatchNumber: "MK29123",
    Description: "MSeal M 755SPF PTB 250KG 1A1",
    Quantity: 4,
  },
  {
    Number: 3,
    LocationName: "A-1-106",
    MaterialCode: 50299045,
    BatchNumber: "DS30807117",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 4,
    LocationName: "A-1-107",
    MaterialCode: 58412666,
    BatchNumber: "SPK06123",
    Description: "ino_MFlow 160A 8X2.5KG 4G",
    Quantity: 192,
  },
  {
    Number: 5,
    LocationName: "A-1-108",
    MaterialCode: 50299045,
    BatchNumber: "DS30416287",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 3,
  },
  {
    Number: 6,
    LocationName: "A-1-108",
    MaterialCode: 50299045,
    BatchNumber: "DS30807117",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 7,
    LocationName: "A-1-109",
    MaterialCode: 50299045,
    BatchNumber: "DS30807117",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 8,
    LocationName: "A-1-110",
    MaterialCode: 50299045,
    BatchNumber: "DS30416287",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 9,
    LocationName: "A-1-110",
    MaterialCode: 50299045,
    BatchNumber: "DS30807117",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 10,
    LocationName: "A-1-111",
    MaterialCode: 55590461,
    BatchNumber: "SPE18823",
    Description: "MRoc TSG 800 260KG 1A2",
    Quantity: 1,
  },
  {
    Number: 11,
    LocationName: "A-1-112",
    MaterialCode: 50299045,
    BatchNumber: "DS30606126",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 12,
    LocationName: "A-1-112",
    MaterialCode: 58412666,
    BatchNumber: "SPK06123",
    Description: "ino_MFlow 160A 8X2.5KG 4G",
    Quantity: 192,
  },
  {
    Number: 13,
    LocationName: "A-1-113",
    MaterialCode: 50299045,
    BatchNumber: "DS30606126",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 14,
    LocationName: "A-1-113",
    MaterialCode: 58412666,
    BatchNumber: "SPK24723",
    Description: "ino_MFlow 160A 8X2.5KG 4G",
    Quantity: 192,
  },
  {
    Number: 15,
    LocationName: "A-1-114",
    MaterialCode: 50143061,
    BatchNumber: 1000817507,
    Description: "Ucrete PT1 PRG 0,56KG IP23",
    Quantity: 140,
  },
  {
    Number: 16,
    LocationName: "A-1-118",
    MaterialCode: 50299045,
    BatchNumber: "DS30416287",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 17,
    LocationName: "A-1-120",
    MaterialCode: 51742669,
    BatchNumber: "GG04323",
    Description: "MTOP SRA NO 3 25KG 5H1",
    Quantity: 30,
  },
  {
    Number: 18,
    LocationName: "A-1-130",
    MaterialCode: 50569341,
    BatchNumber: "MK13823",
    Description: "MTop BC 314 PTB 4x3,25KG 4G",
    Quantity: 96,
  },
  {
    Number: 19,
    LocationName: "A-1-131",
    MaterialCode: 50509581,
    BatchNumber: "SPI12623",
    Description: "MBrace ADH 2200 PTB 2,28KG 1H2",
    Quantity: 38,
  },
  {
    Number: 20,
    LocationName: "A-1-134",
    MaterialCode: 50509581,
    BatchNumber: "SPI12523",
    Description: "MBrace ADH 2200 PTB 2,28KG 1H2",
    Quantity: 62,
  },
  {
    Number: 21,
    LocationName: "A-1-134",
    MaterialCode: 58412666,
    BatchNumber: "SPK06223",
    Description: "ino_MFlow 160A 8X2.5KG 4G",
    Quantity: 192,
  },
  {
    Number: 22,
    LocationName: "A-1-138",
    MaterialCode: 50299045,
    BatchNumber: "DS30502003",
    Description: "MSeal M 800 PTA 200KG 1A1",
    Quantity: 4,
  },
  {
    Number: 23,
    LocationName: "A-1-138",
    MaterialCode: 58412666,
    BatchNumber: "SPK06223",
    Description: "ino_MFlow 160A 8X2.5KG 4G",
    Quantity: 192,
  },
  {
    Number: 24,
    LocationName: "A-1-139",
    MaterialCode: 50445231,
    BatchNumber: "MJ06023",
    Description: "MPel 777 20L 1H1",
    Quantity: 32,
  },
  {
    Number: 25,
    LocationName: "A-1-140",
    MaterialCode: 50471181,
    BatchNumber: "RI01223",
    Description: "tm_ MSeal 550 PTA 15KG 5H3",
    Quantity: 50,
  },
  {
    Number: 26,
    LocationName: "A-1-140",
    MaterialCode: 57851289,
    BatchNumber: 2000127097,
    Description: "SABO EST 2 (ANTISCHIUMA EST 2)",
    Quantity: 4,
  },
  {
    Number: 27,
    LocationName: "A-1-143",
    MaterialCode: 58412666,
    BatchNumber: "SPK24823",
    Description: "ino_MFlow 160A 8X2.5KG 4G",
    Quantity: 192,
  },
  {
    Number: 28,
    LocationName: "A-1-144",
    MaterialCode: 57851289,
    BatchNumber: 2000127002,
    Description: "SABO EST 2 (ANTISCHIUMA EST 2)",
    Quantity: 4,
  },
  {
    Number: 29,
    LocationName: "A-1-145",
    MaterialCode: 50640028,
    BatchNumber: "RK18623",
    Description: "MSeal 551 (IN) PTB 13KG 5H3",
    Quantity: 60,
  },
  {
    Number: 30,
    LocationName: "B-0-002",
    MaterialCode: 51359692,
    BatchNumber: "S.48015",
    Description: "CALCINED FLINT 1.6 - 2.5 MM",
    Quantity: 20,
  },
  {
    Number: 31,
    LocationName: "B-0-005",
    MaterialCode: 51359692,
    BatchNumber: "S.48015",
    Description: "CALCINED FLINT 1.6 - 2.5 MM",
    Quantity: 48,
  },
  {
    Number: 32,
    LocationName: "B-0-010",
    MaterialCode: 50640028,
    BatchNumber: "RD06023",
    Description: "MSeal 551 (IN) PTB 13KG 5H3",
    Quantity: 1,
  },
  {
    Number: 33,
    LocationName: "B-0-016",
    MaterialCode: 51646051,
    BatchNumber: "A220816H03",
    Description: "V 150 1060KG 31H1",
    Quantity: 1,
  },
  {
    Number: 34,
    LocationName: "B-0-017",
    MaterialCode: 55590536,
    BatchNumber: 2023051822,
    Description: "Uhardener 3 5.65KG 3H1",
    Quantity: 120,
  },
  {
    Number: 35,
    LocationName: "B-0-019",
    MaterialCode: 50569341,
    BatchNumber: "MK13723",
    Description: "MTop BC 314 PTB 4x3,25KG 4G",
    Quantity: 20,
  },
  {
    Number: 36,
    LocationName: "B-0-021",
    MaterialCode: 55590536,
    BatchNumber: 2023051822,
    Description: "Uhardener 3 5.65KG 3H1",
    Quantity: 105,
  },
  {
    Number: 37,
    LocationName: "B-0-022",
    MaterialCode: 55590536,
    BatchNumber: 2023051822,
    Description: "Uhardener 3 5.65KG 3H1",
    Quantity: 120,
  },
  {
    Number: 38,
    LocationName: "B-0-024",
    MaterialCode: 50611904,
    BatchNumber: 2023060504,
    Description: "MDI prepolymer 5,25KG 3H1",
    Quantity: 120,
  },
  {
    Number: 39,
    LocationName: "B-0-026",
    MaterialCode: 50513578,
    BatchNumber: "MK23823",
    Description: "MSeal 550 PTB 4x5KG 4G",
    Quantity: 16,
  },
  {
    Number: 40,
    LocationName: "B-0-030",
    MaterialCode: 59100075,
    BatchNumber: 230305127,
    Description: "MSeal HLM 5000R SL 25KG 1A2",
    Quantity: 36,
  },
  {
    Number: 41,
    LocationName: "B-0-031",
    MaterialCode: 59100075,
    BatchNumber: 230305127,
    Description: "MSeal HLM 5000R SL 25KG 1A2",
    Quantity: 36,
  },
  {
    Number: 42,
    LocationName: "B-0-033",
    MaterialCode: 50260825,
    BatchNumber: "S49061",
    Description: "Chelford 30 dry scr. sand",
    Quantity: 48,
  },
  {
    Number: 43,
    LocationName: "B-0-034",
    MaterialCode: 50567746,
    BatchNumber: "GJ13522",
    Description: "tm_ MTop F 10 PTC 11KG 5H3",
    Quantity: 1,
  },
  {
    Number: 44,
    LocationName: "B-0-035",
    MaterialCode: 51359692,
    BatchNumber: "S.48015",
    Description: "CALCINED FLINT 1.6 - 2.5 MM",
    Quantity: 48,
  },
  {
    Number: 45,
    LocationName: "B-0-036",
    MaterialCode: 59100075,
    BatchNumber: 20230914527,
    Description: "MSeal HLM 5000R SL 25KG 1A2",
    Quantity: 36,
  },
  {
    Number: 46,
    LocationName: "B-0-037",
    MaterialCode: 50143086,
    BatchNumber: 22073150,
    Description: "Ucrete PT1 MF/PIG BC 2,52KG 3H1",
    Quantity: 3,
  },
  {
    Number: 47,
    LocationName: "B-0-037",
    MaterialCode: 50001585,
    BatchNumber: "I313S",
    Description: "POLY-PAE 96 L/50% N.D. (HOM) 1130KG",
    Quantity: 1,
  },
  {
    Number: 48,
    LocationName: "B-0-038",
    MaterialCode: 51359692,
    BatchNumber: "S.48015",
    Description: "CALCINED FLINT 1.6 - 2.5 MM",
    Quantity: 48,
  },
  {
    Number: 49,
    LocationName: "B-0-039",
    MaterialCode: 50001585,
    BatchNumber: "I313S",
    Description: "POLY-PAE 96 L/50% N.D. (HOM) 1130KG",
    Quantity: 1,
  },
  {
    Number: 50,
    LocationName: "B-0-041",
    MaterialCode: 50001585,
    BatchNumber: "I313S",
    Description: "POLY-PAE 96 L/50% N.D. (HOM) 1130KG",
    Quantity: 1,
  },
  {
    Number: 51,
    LocationName: "B-0-042",
    MaterialCode: 59100075,
    BatchNumber: "0230407126",
    Description: "MSeal HLM 5000R SL 25KG 1A2",
    Quantity: 1,
  },
  {
    Number: 52,
    LocationName: "B-0-043",
    MaterialCode: 59100075,
    BatchNumber: "0230423127",
    Description: "MSeal HLM 5000R SL 25KG 1A2",
    Quantity: 32,
  },
  {
    Number: 53,
    LocationName: "B-0-043",
    MaterialCode: 59100075,
    BatchNumber: 230305127,
    Description: "MSeal HLM 5000R SL 25KG 1A2",
    Quantity: 36,
  },
  {
    Number: 54,
    LocationName: "B-0-045",
    MaterialCode: 51359692,
    BatchNumber: "S.48015",
    Description: "CALCINED FLINT 1.6 - 2.5 MM",
    Quantity: 48,
  },
  {
    Number: 55,
    LocationName: "B-0-046",
    MaterialCode: 51359692,
    BatchNumber: "S.48015",
    Description: "CALCINED FLINT 1.6 - 2.5 MM",
    Quantity: 48,
  },
  {
    Number: 56,
    LocationName: "B-0-048",
    MaterialCode: 55592584,
    BatchNumber: "GM40009968",
    Description: "MSeal M 862 PTA 10KG 1A2",
    Quantity: 75,
  },
];

const columns = [
  columnHelper.accessor("Number", {
    header: "No.",
    size: "20px",
  }),
  columnHelper.accessor("LocationName", {
    header: "Location Name",
    size: 50,
  }),
  columnHelper.accessor("MaterialCode", {
    header: "Material Code",
    size: 90,
  }),
  columnHelper.accessor("BatchNumber", {
    header: "Batch Number",
    size: 90,
  }),
  columnHelper.accessor("Description", {
    header: "Description",
    size: 300,
  }),
  columnHelper.accessor("Quantity", {
    header: "Quantity",
    size: 40,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Example = () => {
  const [data, setData] = useState(fdata);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  let companyname = useSelector((store) => store.op.company);
  console.log(companyname, "from warehouse lookup");

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

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

  return <MaterialReactTable table={table} />;
};

export default Example;
