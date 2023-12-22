import React, { useEffect, useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";

const style = {
  position: "absolute",
  overflowY: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  border: 1,
  borderRadius: "16px",
  borderColor: "800080",
};

let now = dayjs();

const initialValues = {
  consignor_name: "",
  invoice_number: "",
  invoice_date: new Date(),
  name_of_supervisor: "",
  received_from: "",
  truck_number: "",
  unloading_date: new Date(),
};

const signUpSchema = Yup.object({
  consignor_name: Yup.string().min(2).max(25).required("Please enter consignor name"),
  invoice_number: Yup.string().min(2).max(25).required("Please enter your Invoice number"),
  invoice_date: Yup.date().required("Please enter Invoice Date"),
  name_of_supervisor: Yup.string().required("Please enter Supervisor name"),
  received_from: Yup.string().required("Please enter Invoice Date"),
  unloading_date: Yup.date().required("Please enter Invoice Date"),
});

const Addnewunloadingmodal = ({ handleClose, showModal, setData, data }) => {
  // const [values, setValues] = useState("");

  useEffect(() => {
    console.log("unloadingmodal");
  }, []);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
      //// to get rid of all the values after submitting the form
      action.resetForm();
    },
  });

  //   const handleChange = useCallback((event) => {
  //     if (status == "Available") {
  //       ////update array of objects
  //       const newState = data.map((obj) => {
  //         if (obj.location_name === location_name) {
  //           return { ...obj, type: event.target.value };
  //         }

  //         // 👇️ otherwise return the object as is
  //         return obj;
  //       });

  //       setData(newState);
  //       setValues(event.target.value);

  //       //Axios call

  //       toast.success("Type changed succesfully");
  //     } else {
  //       toast.error("The pallet is in use, cannot change its type");
  //     }
  //   }, []);

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

          <Typography color="text.primary" variant="h5" sx={{ pt: 1, pb: 2, mb: 0 }}>
            Unloading Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Consignor Name"
                  name="consignor_name"
                  onChange={handleChange}
                  required
                  value={values.consignor_name}
                />
                {touched.consignor_name && errors.consignor_name ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.consignor_name}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  name="invoice_number"
                  onChange={handleChange}
                  required
                  value={values.invoice_number}
                />
                {touched.invoice_number && errors.invoice_number ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.invoice_number}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  defaultValue={now.format("YYYY-MM-DD")}
                  fullWidth
                  label="Invoice Date"
                  name="invoice_date"
                  onChange={(value) => {
                    values.invoice_date = Date.parse(value);
                  }}
                  required
                  value={values.invoice_date}
                  type="date"
                />
                {touched.invoice_date && errors.invoice_date ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.invoice_date}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name of Supervisor"
                  name="name_of_supervisor"
                  onChange={handleChange}
                  value={values.name_of_supervisor}
                  required
                />
                {touched.name_of_supervisor && errors.name_of_supervisor ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.name_of_supervisor}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Received from"
                  name="received_from"
                  onChange={handleChange}
                  value={values.received_from}
                />
                {touched.received_from && errors.received_from ? (
                  <Typography sx={{ textColor: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.received_from}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Truck Number"
                  name="truck_number"
                  onChange={handleChange}
                  value={values.truck_number}
                ></TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  defaultValue={now.format("YYYY-MM-DD")}
                  fullWidth
                  label="Unloading Date"
                  name="unloading_date"
                  onChange={(value) => {
                    values.unloading_date = Date.parse(value);
                  }}
                  value={values.unloading_date}
                  type="date"
                />
                {touched.unloading_date && errors.unloading_date ? (
                  <Typography sx={{ textcolor: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.unloading_date}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
            <Button
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                right: "20px",
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              Save details
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Addnewunloadingmodal;
