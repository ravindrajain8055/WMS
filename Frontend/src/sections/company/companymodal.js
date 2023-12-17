import React, { useEffect, useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";

const style = {
  position: "absolute",
  overflowY: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "25%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  border: 1,
  borderRadius: "16px",
  borderColor: "800080",
};

const states = [
  {
    value: "godrej",
    label: "Godrej",
  },
  {
    value: "wanhua",
    label: "Wanhua",
  },
];

const Companymodal = ({ handleClose, showModal, setData }) => {
  // const { sr_no, location_name, status } = row;
  const [values, setValues] = useState({
    type: "Godrej",
  });

  useEffect(() => {
    console.log("palletmodal2");
  }, []);

  const handleChange = useCallback((event) => {
    ////update array of objects
    // const newState = data.map((obj) => {
    //   if (obj.location_name === location_name) {
    //     return { ...obj, type: event.target.value };
    //   }
    //   return obj;
    // });
    let uppname = event.target.value;

    setData(uppname.toUpperCase());
    setValues(uppname.toUpperCase());

    //Axios call

    toast.success("Company changed succesfully");
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

          <Typography color="text.secondary" variant="h5" sx={{ pt: 1, pb: 0, mb: 0 }}>
            Company
          </Typography>
          <hr sx={{ mt: 0, pt: 0 }} />
          {/* <Typography
            sx={{
              fontSize: "25px",
              m: 1,
            }}
          >
            {location_name}
          </Typography> */}

          <TextField
            fullWidth
            label="Selection Location Type"
            name="type"
            onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            value={values.type}
          >
            {states.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Modal>
    </div>
  );
};

export default Companymodal;
