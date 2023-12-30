import React, { useEffect, useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";

const style = {
  position: "absolute",
  overflowY: "auto",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "65%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  border: 1,
  borderRadius: "16px",
};

let now = dayjs();

const initialValues = {
  consignee_name: "",
  shipment_number: "",
  shipment_date: new Date(),
  name_of_supervisor: "",
  transporter: "",
  truck_number: "",
  loading_date: new Date(),
  lr_number: "",
  driver_mobile: "",
};

const signUpSchema = Yup.object({
  consignee_name: Yup.string().min(2).max(25).required("Please enter consignee name"),
  shipment_number: Yup.string().min(2).max(25).required("Please enter your shipment number"),
  shipment_date: Yup.date().required("Please enter shipment Date"),
  name_of_supervisor: Yup.string().required("Please enter Supervisor name"),
  transporter: Yup.string().required("Please enter Transporter"),
  loading_date: Yup.date().required("Please enter loading date"),
});

const Addnewloadingmodal = ({ handleClose, showModal, setData, data }) => {
  // const [values, setValues] = useState("");

  useEffect(() => {
    console.log("loadingmodal");
  }, []);

  const getCurrentTime = () => {
    // Get current date and time
    const now = new Date();
    return format(now, "HH:mm:ss");
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);

      values.sr_no = data.length + 1;
      values.actionn = "start_pickup";
      values.loading_time = "";
      values.outward_time = getCurrentTime();
      values.loading_date = format(values.loading_date, "yyyy-MM-dd HH:mm:ss");
      values.shipment_date = format(values.shipment_date, "yyyy-MM-dd HH:mm:ss");

      setData((prevArray) => [...prevArray, values]);
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
            loading Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Consignee Name"
                  name="consignee_name"
                  onChange={handleChange}
                  required
                  value={values.consignee_name}
                />
                {touched.consignee_name && errors.consignee_name ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.consignee_name}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Shipment Number"
                  name="shipment_number"
                  onChange={handleChange}
                  required
                  value={values.shipment_number}
                />
                {touched.shipment_number && errors.shipment_number ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.shipment_number}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  defaultValue={now.format("YYYY-MM-DD")}
                  disableFuture
                  fullWidth
                  label="Shipment Date"
                  name="shipment_date"
                  onChange={(value) => {
                    values.shipment_date = Date.parse(value);
                  }}
                  required
                  value={values.shipment_date}
                  type="date"
                />
                {touched.shipment_date && errors.shipment_date ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.shipment_date}
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
                  label="transporter"
                  name="transporter"
                  onChange={handleChange}
                  value={values.transporter}
                  required
                />
                {touched.transporter && errors.transporter ? (
                  <Typography sx={{ textColor: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.transporter}
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
                  label="loading Date"
                  name="loading_date"
                  onChange={(value) => {
                    values.loading_date = Date.parse(value);
                  }}
                  value={values.loading_date}
                  type="date"
                />
                {touched.loading_date && errors.loading_date ? (
                  <Typography sx={{ textcolor: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.loading_date}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="LR number"
                  name="lr_number"
                  onChange={handleChange}
                  value={values.truck_number}
                ></TextField>
              </Grid>{" "}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Driver mobile Number"
                  name="driver_mobile"
                  onChange={handleChange}
                  value={values.truck_number}
                ></TextField>
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

export default Addnewloadingmodal;
