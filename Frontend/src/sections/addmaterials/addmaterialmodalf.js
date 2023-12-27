import React, { useEffect, useState, useCallback, useRef } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import axios from "axios";

import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";

const style = {
  position: "absolute",
  overflowY: "auto",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  border: 1,
  borderRadius: "16px",
};

const palletselection = [
  {
    value: "automatic",
    label: "automatic",
  },
  {
    value: "manual",
    label: "manual",
  },
];

let availablePallet = [
  "A-0-001",
  "A-0-002",
  "F-0-003",
  "E-0-002",
  "G-1-002",
  "A-0-003",
  "A-0-004",
  "F-0-005",
  "E-0-006",
  "G-1-007",
  "F-0-008",
  "E-0-009",
  "G-1-010",
  "A-0-011",
  "A-0-012",
  "F-0-013",
  "E-0-012",
  "G-1-012",
  "A-0-013",
  "A-0-014",
  "F-0-015",
  "E-0-016",
  "G-1-017",
  "F-0-018",
  "E-0-019",
  "G-1-020",
];

let now = dayjs();

const initialValues = {
  material_code: "",
  batch_number: "",
  total_weight: "",
  quantity: "",
  manufacturing_date: new Date(),
  expiry_date: new Date(),
};

const signUpSchema = Yup.object({
  total_weight: Yup.string().required("Please enter total weight"),
  quantity: Yup.string().required("Please enter the Quantity"),
});

const Addmaterialmodalf = ({ handleClose, showModal, setData, data }) => {
  // const [values, setValues] = useState("");
  const [palletset, setPalletset] = useState("automatic");
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(availablePallet);
  const [selectedElement, setSelectedElement] = useState("");
  const [mdesc, setMdesc] = useState("");

  const handleSelect = (selectedItem) => {
    setSelectedElement(selectedItem);
    setQuery("");
    setFilteredResults([]);
  };

  // Handle form submission (you can customize this according to your needs

  useEffect(() => {
    console.log("unloadingmodal");
    // get the available pallets
    // get the material detail
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // Filter the array based on the input value
    const filtered = availablePallet.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredResults(filtered);
  };

  const handleSelectChange = (event) => {
    setPalletset(event.target.value);
    console.log(palletset);
  };

  console.log(initialValues, "initialvalues");

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      if (
        mdesc == "" ||
        mdesc == "Material code not available, please add it in the material master"
      ) {
        toast.error(
          "The material code is not available in the material master, please add the material details there"
        );
        return;
      }

      values.description = mdesc;
      values.sr_no = data.length + 1;
      values.pallet_selection = palletset;
      values.putaway_location = "A-0-001";
      values.manufacturing_date = format(values.manufacturing_date, "yyyy-MM-dd HH:mm:ss");
      values.expiry_date = format(values.expiry_date, "yyyy-MM-dd HH:mm:ss");

      let pallet_start = "";

      if (palletset == "manual") {
        if (selectedElement == "") {
          toast.error("Please select the staring pallet");
          return;
        }
        pallet_start = selectedElement;
        values.putaway_location = selectedElement;
      }

      console.log("🚀 ~ file: App.jsx ~ line 155 ~ App ~ values", values);

      setData([...data, values]);
      console.log(data);
      //// to get rid of all the values after submitting the form
      action.resetForm();
      handleClose(false);
    },
  });

  const handleMaterialCode = (event) => {
    handleChange(event);
    let materialCode = event.target.value;

    if (materialCode.length < 6) {
      return;
    }

    // axios
    //   .get("https://kawalpatel.online/laravelProjects/wms-wizard/public/api/getallmaterials/{material_code}")
    //   .then((response) => {
    //     setData(response.data.record);
    //     //toast.error('Users loading xsuccessful')
    //   })
    //   .catch((error) => {
    //     // console.error('An error occurred:', error);
    //     console.log("error");
    //   });

    if (materialCode == "45011617") {
      setMdesc("MSeal 909 IN");
    } else {
      setMdesc("Material code not available, please add it in the material master");
      return;
    }
  };

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
            New Unloading Detail
          </Typography>

          <form id="my-form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Material Code"
                  name="material_code"
                  onChange={handleMaterialCode}
                  required
                  value={values.material_code}
                />
                {touched.material_code && errors.material_code ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0", m: "0" }}>
                    {errors.material_code}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Batch Number"
                  name="batch_number"
                  onChange={handleChange}
                  value={values.batch_number}
                />
                {touched.batch_number && errors.batch_number ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.batch_number}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="description"
                  name="description"
                  value={mdesc}
                  disabled
                />
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  defaultValue={now.format("YYYY-MM-DD")}
                  disableFuture
                  fullWidth
                  label="Manufacturing Date"
                  name="manufacturing_date"
                  onChange={(value) => {
                    values.manufacturing_date = Date.parse(value);
                  }}
                  required
                  value={values.manufacturing_date}
                  type="date"
                />
                {touched.manufacturing_date && errors.manufacturing_date ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.manufacturing_date}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  defaultValue={now.format("YYYY-MM-DD")}
                  fullWidth
                  label="Expiry Date"
                  name="expiry_date"
                  onChange={(value) => {
                    values.expiry_date = Date.parse(value);
                  }}
                  required
                  value={values.expiry_date}
                  type="date"
                />
                {touched.expiry_date && errors.expiry_date ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.expiry_date}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  onChange={handleChange}
                  value={values.quantity}
                  required
                />
                {touched.quantity && errors.quantity ? (
                  <Typography sx={{ color: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.quantity}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Weight"
                  name="total_weight"
                  onChange={handleChange}
                  value={values.total_weight}
                  required
                />
                {touched.total_weight && errors.total_weight ? (
                  <Typography sx={{ textColor: "#b22b27", fontSize: "15px", p: "0" }}>
                    {errors.total_weight}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </form>

          <hr></hr>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Pallet Selection"
              name="truck_number"
              onChange={handleSelectChange}
              select
              SelectProps={{ native: true }}
              required
              value={palletset}
            >
              {palletselection.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.value}
                </option>
              ))}
            </TextField>
          </Grid>
          <hr></hr>
          {palletset == "manual" && (
            <Grid>
              <Typography variant="h4" sx={{ display: "flex", fontWeight: "100" }}>
                Search for the starting pallet
              </Typography>
              <Typography sx={{ m: 0, p: 0 }}>
                {" "}
                Required pallets after it will be automatically assigned from the available pallets
              </Typography>

              <TextField
                label="Search pallet"
                type="text"
                name="search"
                placeholder="Type to search..."
                value={query}
                onChange={handleInputChange}
              />

              {filteredResults.length > 0 && (
                <div sx={{ overflow: "auto", maxHeight: "100vh" }}>
                  <select
                    value={selectedElement}
                    onChange={(e) => handleSelect(e.target.value)}
                    sx={{ marginTop: "8px", fontSize: "16px", width: "100%" }}
                  >
                    <option value="" disabled>
                      Select an element from the below list
                    </option>
                    {filteredResults.map((item) => (
                      <option key={item} value={item} onClick={() => handleSelect(item)}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedElement && <Typography>Selected Element: {selectedElement}</Typography>}
            </Grid>
          )}
          <Button
            form="my-form"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "20px",
            }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Addmaterialmodalf;
