import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useRef, useState } from "react";
import Inventorymodal from "./inventorymodal";

const columnHelper = createMRTColumnHelper();

let fdata = [
  {
    sr_no: 1,
    batch_number: "SPG13423",
    material_code: 55590461,
    material_description: "MRoc TSG 800 260KG 1A2",
    quantity: 4,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 2,
    batch_number: "MK29123",
    material_code: 50389181,
    material_description: "MSeal 755 SPF PTB 250KG 1A1",
    quantity: 15,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "07/12/2023, 21:21:00",
  },
  {
    sr_no: 3,
    batch_number: "SPK25023",
    material_code: 58412666,
    material_description: "MFlow 160A 8X2,5KG 4G",
    quantity: 408,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:23",
  },
  {
    sr_no: 4,
    batch_number: "SPG15723",
    material_code: 55590461,
    material_description: "MRoc TSG 800 260KG 1A2",
    quantity: 4,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 5,
    batch_number: "DS30804073",
    material_code: 55589739,
    material_description: "MSeal M 800/811/813 PTB 220KG 1A1",
    quantity: 12,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:14",
  },
  {
    sr_no: 6,
    batch_number: "GM40003470",
    material_code: 55592584,
    material_description: "MSeal M 862 PTA 10KG 1A2",
    quantity: 30,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 7,
    batch_number: "MF23522",
    material_code: 53064966,
    material_description: "MBrace 3500 PTB 1,7KG 4G",
    quantity: 2,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 8,
    batch_number: "SPG15023",
    material_code: 55590461,
    material_description: "MRoc TSG 800 260KG 1A2",
    quantity: 1,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 9,
    batch_number: "MK29923",
    material_code: 51743464,
    material_description: "MTOP 33 20L IP22",
    quantity: 50,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:39",
  },
  {
    sr_no: 10,
    batch_number: "MI19423",
    material_code: 54143888,
    material_description: "MSEAL 399 20KG IP22",
    quantity: 4,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 11,
    batch_number: "AK42223",
    material_code: 50458167,
    material_description: "MasterLife CI 220",
    quantity: 34,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:35",
  },
  {
    sr_no: 12,
    batch_number: 21083474,
    material_code: 50140998,
    material_description: "Ucrete PT1 IF/MT/TZ+AS/UD+SR 2,37KG 3H1",
    quantity: 290,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 13,
    batch_number: 20231015,
    material_code: 51544502,
    material_description: "Na gluconate (M1154)",
    quantity: 939,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:39",
  },
  {
    sr_no: 14,
    batch_number: 21083446,
    material_code: 50140998,
    material_description: "Ucrete PT1 IF/MT/TZ+AS/UD+SR 2,37KG 3H1",
    quantity: 116,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 15,
    batch_number: "-",
    material_code: 45229669,
    material_description: "MasterSeal 730 UVS",
    quantity: 101,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:38",
  },
  {
    sr_no: 16,
    batch_number: "MI00223",
    material_code: 50445231,
    material_description: "MPel 777 20L 1H1",
    quantity: 33,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:24",
  },
  {
    sr_no: 17,
    batch_number: 23052030,
    material_code: 50271663,
    material_description: "Ucrete PT4 yellow 0,5KG 5H4",
    quantity: 937,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 18,
    batch_number: "GM40004393",
    material_code: 55592584,
    material_description: "MSeal M 862 PTA 10KG 1A2",
    quantity: 400,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:39",
  },
  {
    sr_no: 19,
    batch_number: 23083508,
    material_code: 51361441,
    material_description: "Ucrete PT2 COMMON V2 2,86KG 3H1",
    quantity: 1255,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "07/12/2023, 16:45:24",
  },
  {
    sr_no: 20,
    batch_number: 23072873,
    material_code: 50271629,
    material_description: "Ucrete PT4 light grey 0,5KG 5H4",
    quantity: 1000,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 21,
    batch_number: 1000461344,
    material_code: 50410217,
    material_description: "WABOCRETE II AE PTC 20,85KG 5H1",
    quantity: 575,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:24",
  },
  {
    sr_no: 22,
    batch_number: 23083266,
    material_code: 50607136,
    material_description: "MTop BC 920 PTA 3,5KG IP22",
    quantity: 288,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:17",
  },
  {
    sr_no: 23,
    batch_number: "SPK25423",
    material_code: 58412666,
    material_description: "MFlow 160A 8X2,5KG 4G",
    quantity: 69,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:37",
  },
  {
    sr_no: 24,
    batch_number: "JM21100502",
    material_code: 45229669,
    material_description: "MasterSeal 730 UVS",
    quantity: 124,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:24",
  },
  {
    sr_no: 25,
    batch_number: "SPK25523",
    material_code: 58412666,
    material_description: "MFlow 160A 8X2,5KG 4G",
    quantity: 384,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:14",
  },
  {
    sr_no: 26,
    batch_number: "SAK05223",
    material_code: 55590498,
    material_description: "MSeal 555 IN PTA 20KG 1H1",
    quantity: 34,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "07/12/2023, 21:20:52",
  },
  {
    sr_no: 27,
    batch_number: "DS30417316",
    material_code: 55589739,
    material_description: "MSeal M 800/811/813 PTB 220KG 1A1",
    quantity: 23,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:36",
  },
  {
    sr_no: 28,
    batch_number: "DS30508138",
    material_code: 50299045,
    material_description: "MSeal M 800 PTA 200KG 1A1",
    quantity: 5,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:20",
  },
  {
    sr_no: 29,
    batch_number: "DS30416286",
    material_code: 50299045,
    material_description: "MSeal M 800 PTA 200KG 1A1",
    quantity: 4,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 30,
    batch_number: "O22X10E07",
    material_code: 51055154,
    material_description: "WABOCRETE II GREY PART A 2,1kg IP32",
    quantity: 79,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 31,
    batch_number: 43972,
    material_code: 50482046,
    material_description: "mc_ MFlow 936AN 12x0,385L 4G",
    quantity: 303,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 32,
    batch_number: 1000534637,
    material_code: 50543781,
    material_description: "MSeal M 790 red PTA 1,5KG IP32L",
    quantity: 78,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 33,
    batch_number: "DS30421384",
    material_code: 55589739,
    material_description: "MSeal M 800/811/813 PTB 220KG 1A1",
    quantity: 8,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:20",
  },
  {
    sr_no: 34,
    batch_number: "SPJ13523",
    material_code: 50509580,
    material_description: "MBrace ADH 2200 PTA 3,72KG 1H2",
    quantity: 196,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "07/12/2023, 21:21:10",
  },
  {
    sr_no: 35,
    batch_number: "SPK04323",
    material_code: 58412666,
    material_description: "MFlow 160A 8X2,5KG 4G",
    quantity: 80,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:18",
  },
  {
    sr_no: 36,
    batch_number: "MF11202327",
    material_code: 58413000,
    material_description: "MFlow 150IN 50X0.225KG 4G",
    quantity: 2600,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:37",
  },
  {
    sr_no: 37,
    batch_number: "JM21100387",
    material_code: 45229669,
    material_description: "MasterSeal 730 UVS",
    quantity: 75,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:24",
  },
  {
    sr_no: 38,
    batch_number: "MJ01023",
    material_code: 58408086,
    material_description: "MProtect 300 White V4 20 KG IP22",
    quantity: 3,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 39,
    batch_number: "RL17322",
    material_code: 55592511,
    material_description: "MTop BC 920 PTC 5KG 5H3",
    quantity: 39,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 40,
    batch_number: 23083295,
    material_code: 51361441,
    material_description: "Ucrete PT2 COMMON V2 2,86KG 3H1",
    quantity: 192,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 41,
    batch_number: "C2B1578007",
    material_code: 58408731,
    material_description: "MSeal M 790 (CN) PTB 3.5KG 1A2",
    quantity: 107,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:20",
  },
  {
    sr_no: 42,
    batch_number: "MK23823",
    material_code: 50513578,
    material_description: "MSeal 550 PTB 4x5KG 4G",
    quantity: 192,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 43,
    batch_number: "SPK16323",
    material_code: 50275809,
    material_description: "Ucrete MF Part 3 Neutral 14,4KG 5H3",
    quantity: 101,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 44,
    batch_number: 3723,
    material_code: 51508091,
    material_description: "NA LIGNOSULPH",
    quantity: 1,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 45,
    batch_number: "RG22923",
    material_code: 55585432,
    material_description: "tm_ MTop BC 920 PTC 6KG 5H3",
    quantity: 100,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 46,
    batch_number: "AK28023",
    material_code: 55589587,
    material_description: "sf_MFlow 718 AD PLUS 20Kg 5H3",
    quantity: 26,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "07/12/2023, 21:21:00",
  },
  {
    sr_no: 47,
    batch_number: "SPK25123",
    material_code: 58412666,
    material_description: "MFlow 160A 8X2,5KG 4G",
    quantity: 432,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:23",
  },
  {
    sr_no: 48,
    batch_number: "SAK00623",
    material_code: 51744047,
    material_description: "MEmaco 131 20KG 1H1",
    quantity: 44,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:23",
  },
  {
    sr_no: 49,
    batch_number: "MJ15123",
    material_code: 53062528,
    material_description: "MFlow 410 PTA 2,5KG 4G",
    quantity: 258,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:25",
  },
  {
    sr_no: 50,
    batch_number: "SPJ10923",
    material_code: 50460716,
    material_description: "MProtect 200 white 20KG IP22",
    quantity: 34,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:21",
  },
  {
    sr_no: 51,
    batch_number: 23094187,
    material_code: 50142998,
    material_description: "Ucrete PT1 RG/TZ COVE 0,71KG IP23",
    quantity: 176,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:39",
  },
  {
    sr_no: 52,
    batch_number: "SPK06623",
    material_code: 58408475,
    material_description: "MLife CH 500 15KG 5H3",
    quantity: 20,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:13",
  },
  {
    sr_no: 53,
    batch_number: "SAE00823",
    material_code: 55590751,
    material_description: "MEmaco SBR 3 10X1L 4G",
    quantity: 40,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:14",
  },
  {
    sr_no: 54,
    batch_number: "MK19723",
    material_code: 58407675,
    material_description: "MEmaco SBR 3 20L 1H1",
    quantity: 68,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:35",
  },
  {
    sr_no: 55,
    batch_number: "AK10023",
    material_code: 50640045,
    material_description: "sf_ EMACO S 88CT AD Plus 20KG 5H3",
    quantity: 15,
    manufacturing_date: "05/12/2023",
    expiry_date: "05/12/2023",
    last_updated: "05/12/2023, 22:12:14",
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
  const rowRef = useRef("");

  const columns = [
    columnHelper.accessor("sr_no", {
      header: "Sr_no.",
      size: "20px",
    }),
    columnHelper.accessor("batch_number", {
      header: "batch Number",
      size: 50,
    }),
    columnHelper.accessor("material_code", {
      header: "Material Code",
      size: 90,
    }),
    columnHelper.accessor("material_description", {
      header: "Material Description",
      size: 230,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      size: 30,
    }),
    columnHelper.accessor("manufacturing_date", {
      header: "Manufacturing Date",
      size: 40,
    }),
    columnHelper.accessor("expiry_date", {
      header: "Expiry Date",
      size: 40,
    }),
    columnHelper.accessor("last_updated", {
      header: "Last Updated",
      size: 40,
    }),
    {
      id: "live_stock_and_history",
      header: "View",
      columnDefType: "display", //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => (
        <Button
          onClick={() => {
            console.log(row._valuesCache, "check this");
            rowRef.current = {
              material_code: row._valuesCache.material_code,
              batch_number: row._valuesCache.batch_number,
              material_description: row._valuesCache.material_description,
            };
            setShowModal(true);
          }}
        >
          View Details
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
      {showModal && (
        <Inventorymodal showModal={showModal} handleClose={handleClose} rowRef={rowRef} />
      )}
    </>
  );
};

export default Example;
