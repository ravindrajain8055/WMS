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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  height: "45%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  border: 1,
  borderRadius: "16px",
};

let now = dayjs();

const Materiallogmodal = ({ handleClose, showModal, setNdata, ndata }) => {
  const {} = ndata;

  const initialValues = {
    transporter: "",
    lrnumber: "",
    customernumber: "",
    sapinvoice: "",
    gstinvoice: "",
    sapinvoicedate: "",
    incoterm: "",
    ewaybill: "",
    drivernumber: "",
    tentativedeliverydate: "",
    actualdeliverydate: "",
    Remarks: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      console.log("Valuesssssssssss", values);
      setNdata(values);
      //// to get rid of all the values after submitting the form
      action.resetForm();
    },
  });

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
            More Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transporter Name"
                  name="transporter"
                  onChange={handleChange}
                  value={values.transporter}
                />
                {touched.transporter && errors.transporter ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.transporter}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="LR number"
                  name="lrnumber"
                  onChange={handleChange}
                  value={values.lrnumber}
                />
                {touched.lrnumber && errors.lrnumber ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.lrnumber}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer Number"
                  name="customernumber"
                  onChange={handleChange}
                  value={values.customernumber}
                />
                {touched.customernumber && errors.customernumber ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.customernumber}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SAP COM invoice number"
                  name="sapinvoice"
                  onChange={handleChange}
                  value={values.sapinvoice}
                />
                {touched.sapinvoice && errors.sapinvoice ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.sapinvoice}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="GST invoice number"
                  name="gstinvoice"
                  onChange={handleChange}
                  value={values.gstinvoice}
                />
                {touched.gstinvoice && errors.gstinvoice ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.gstinvoice}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  name="invoice_number"
                  onChange={handleChange}
                  value={values.invoice_number}
                />
                {touched.invoice_number && errors.invoice_number ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.invoice_number}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transporter Name"
                  name="gstinvoice"
                  onChange={handleChange}
                  value={values.gstinvoice}
                />
                {touched.gstinvoice && errors.gstinvoice ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.gstinvoice}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SAP invoice date"
                  name="sapinvoicedate"
                  onChange={handleChange}
                  value={values.sapinvoicedate}
                />
                {touched.sapinvoicedate && errors.sapinvoicedate ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.sapinvoicedate}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="incoterm"
                  name="incoterm"
                  onChange={handleChange}
                  value={values.incoterm}
                />
                {touched.incoterm && errors.incoterm ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.incoterm}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="E-waybill number"
                  name="ewaybill"
                  onChange={handleChange}
                  value={values.ewaybill}
                />
                {touched.ewaybill && errors.ewaybill ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.ewaybill}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Driver number"
                  name="drivernumber"
                  onChange={handleChange}
                  value={values.drivernumber}
                />
                {touched.drivernumber && errors.drivernumber ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.drivernumber}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tentative delivery date"
                  name="tentativedeliverydate"
                  onChange={handleChange}
                  value={values.tentativedeliverydate}
                />
                {touched.tentativedeliverydate && errors.tentativedeliverydate ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.tentativedeliverydate}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Remarks"
                  name="Remarks"
                  onChange={handleChange}
                  value={values.Remarks}
                />
                {touched.Remarks && errors.Remarks ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.Remarks}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Actual delivery date"
                  name="actualdeliverydate"
                  onChange={handleChange}
                  value={values.actualdeliverydate}
                />
                {touched.actualdeliverydate && errors.actualdeliverydate ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.actualdeliverydate}
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

export default Materiallogmodal;
