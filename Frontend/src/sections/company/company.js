import { useRef, useState, useEffect } from "react";
import Companymodal from "./companymodal";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "src/redux/slice";

let fdata = ["godrej", "wanhua"];

const Company = () => {
  const [data, setData] = useState(fdata);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const dispatch = useDispatch();
  let companyname = useSelector((store) => store.company);

  useEffect(() => {
    if (!companyname) {
      dispatch(addCompany(data[0]));
      companyname = data[0];
    }
    console.log("Add a axios call here to get the companies in the data");

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

  if (companyname) {
    console.log(companyname, "from store");
  }

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
            }}
            variant="outlined"
            onClick={() => {
              setShowModal(true);
            }}
          >
            {companyname.toUpperCase()}
          </Button>
        </Box>
      </Tooltip>

      {showModal && (
        <Companymodal
          showModal={showModal}
          handleClose={handleClose}
          data={data}
          companyname={companyname}
        />
      )}
    </div>
  );
};

export default Company;
