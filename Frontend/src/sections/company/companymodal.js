import React, { useEffect, useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { addCompany } from "src/redux/slice";
import { useDispatch } from "react-redux";

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

const Companymodal = ({ handleClose, showModal, companyname, data }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(companyname);

  useEffect(() => {
    console.log("palletmodal2");
  }, []);

  const handleChange = useCallback((event) => {
    let uppname = event.target.value;
    setValues(uppname.toUpperCase());

    dispatch(addCompany(uppname));

    toast.success(`Changed company to ${uppname.toUpperCase()} `);
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
            value={values}
          >
            {data.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Box>
      </Modal>
    </div>
  );
};

export default Companymodal;
