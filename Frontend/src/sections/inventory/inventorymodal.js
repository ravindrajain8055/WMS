import React, { useEffect, useState } from "react";
import Inventorymodalcomponent from "./inventorymodalcomponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  overflowY: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "89%",
  height: "89%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  border: 1,
  borderRadius: "16px",
  borderColor: "800080",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "500",
}));

let fdata = {
  ldata: [
    {
      sr_no: 1,
      location: "SPG13423",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 2,
      location: "A-0-101",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 1,
      location: "SPG13423",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 2,
      location: "A-0-101",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 1,
      location: "SPG13423",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 2,
      location: "A-0-101",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
  ],
  hdata: [
    {
      sr_no: 1,
      location: "SPG13423",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 2,
      location: "A-0-101",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 1,
      location: "SPG13423",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 2,
      location: "A-0-101",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 1,
      location: "SPG13423",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
    {
      sr_no: 2,
      location: "A-0-101",
      invoice_number: 55590461,
      date: "1/1/2023",
      quantity: 4,
    },
  ],
};

const Inventorymodal = ({ handleClose, showModal, rowRef }) => {
  const { batch_number, material_code, material_description } = rowRef.current;
  const [data, setData] = useState(fdata);

  //useEffect with cancel
  // useEffect(() => {
  //   const source = Axios.CancelToken.source();

  //   axios
  //     .get("/api/data", {
  //       cancelToken: source.token,
  //     })
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       // Handle error
  //     });

  //   return () => {
  //     source.cancel();
  //   };
  // }, []);

  useEffect(() => {
    console.log("MODAL...................");
  }, []);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "20px",
            }}
            onClick={handleClose}
            variant="outlined"
            endIcon={<CloseIcon />}
          >
            Close
          </Button>
          <Box sx={{ flexGrow: 1, pb: 1 }}>
            <div sx={{ borderRadius: "16px", border: "1", borderColor: "secondary.main" }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={5}>
                  <Item>Batch Number</Item>
                  <Item style={{ backgroundColor: "#D3D3D3", color: "white" }}>{batch_number}</Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>Material Code</Item>
                  <Item style={{ backgroundColor: "#D3D3D3", color: "white" }}>
                    {material_code}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Material Description</Item>
                  <Item style={{ backgroundColor: "#D3D3D3", color: "white" }}>
                    {material_description}
                  </Item>
                </Grid>
              </Grid>
            </div>
          </Box>

          <Typography id="modal-modal-title" sx={{ m: 1 }} variant="h6" component="h6">
            Live Stock
          </Typography>

          <Inventorymodalcomponent data={fdata.ldata} />
          <Typography id="modal-modal-title" sx={{ m: 1 }} variant="h6" component="h6">
            History
          </Typography>
          <Inventorymodalcomponent data={fdata.hdata} />
        </Box>
      </Modal>
    </div>
  );
};

export default Inventorymodal;
