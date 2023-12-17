import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useRef, useState, useEffect } from "react";
import Companymodal from "./companymodal";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

const Company = () => {
  const [data, setData] = useState("Godrej");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    console.log("got the companies");
    // axios
    //   .get("https://api.jsonbin.io/v3/b/657099d354105e766fda7f0c")
    //   .then((response) => {
    //     setData(response.data.record);
    //     //toast.error('Users loading xsuccessful')
    //   })
    //   .catch((error) => {
    //     // console.error('An error occurred:', error);
    //     console.log("error");
    //   });
  }, []);

  return (
    <div>
      <Tooltip title="Select or Add company">
        <Box sx={{ display: "flex", alignItems: "center" }} variant="contained">
          <Typography sx={{ m: 1 }} variant="h6" component="h6">
            Company -
          </Typography>
          <Button
            sx={{
              fontSize: "18px",
              m: 0,
              pt: 0,
              pb: 0,
              backgroundColor: "#6366f1",
              color: "white",
            }}
            variant="contained"
            onClick={() => {
              setShowModal(true);
            }}
          >
            {data}
          </Button>
        </Box>
      </Tooltip>

      {showModal && (
        <Companymodal showModal={showModal} handleClose={handleClose} setData={setData} />
      )}
    </div>
  );
};

export default Company;
