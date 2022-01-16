import React, { useState } from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

export default function Book({ open, onClose, doctor }) {
  const initialFieldValues = {
    patientName: "",
    patientPhone: "",
    patientAge: "",
    patientAddress: "",
    patientGender: "M",
  };

  const [loading, setLoading] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const docName = doctor.docName;
  const docId = doctor.docId;

  const validate = (name, value) => {
    switch (name) {
      case "patientName":
        if (value.length <= 1) {
          setErrors({
            ...errors,
            patientName: "Name must atleast have 2 letters",
          });
        } else {
          setErrors({
            ...errors,
            patientName: "",
          });
        }
        break;

      case "patientAddress":
        if (value.length <= 5) {
          setErrors({
            ...errors,
            patientAddress: "Address should atleast have 6 letters",
          });
        } else {
          setErrors({
            ...errors,
            patientAddress: "",
          });
        }
        break;
      case "patientAge":
        if (parseInt(value) < 1) {
          setErrors({
            ...errors,
            patientAge: "Patient age must be above 0",
          });
        } else {
          setErrors({
            ...errors,
            patientAge: "",
          });
        }
        break;
      case "patientPhone":
        if (!new RegExp("^[789][0-9]{9}$").test(value)) {
          setErrors({
            ...errors,
            patientPhone: "Enter a valid phone number",
          });
        } else {
          setErrors({
            ...errors,
            patientPhone: "",
          });
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    validate(name, value);
  };

  const submitPatientData = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, docName, docId }),
      };
      const response = await fetch(
        "https://bigohealthdevtest.herokuapp.com/sendBookingRequest",
        requestOptions
      );
      const fetchedData = await response.json();
      setAppointmentId(fetchedData.appointmentId);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (
      errors &&
      Object.keys(errors).length !== 0 &&
      Object.getPrototypeOf(errors) === Object.prototype
    ) {
      alert("There are errors in your form!");
    } else {
      submitPatientData();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {loading ? (
        <DialogTitle>Loading... Please wait</DialogTitle>
      ) : (
        <div>
          {appointmentId ? (
            <DialogTitle>Your Appointment Id: {appointmentId}</DialogTitle>
          ) : (
            <div>
              <DialogTitle>Please fill the following details</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To get an appointment, please fill the following details
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  name="patientName"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleInputChange}
                  value={values.patientName}
                />
                {errors.patientName && (
                  <Typography variant="subtitle2" color="red" align="center">
                    {errors.patientName}
                  </Typography>
                )}
                <TextField
                  autoFocus
                  margin="dense"
                  name="patientPhone"
                  label="Phone"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleInputChange}
                  value={values.patientPhone}
                />
                {errors.patientPhone && (
                  <Typography variant="subtitle2" color="red" align="center">
                    {errors.patientPhone}
                  </Typography>
                )}

                <TextField
                  autoFocus
                  margin="dense"
                  name="patientAge"
                  label="Age"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.patientAge}
                  onChange={handleInputChange}
                />
                {errors.patientAge && (
                  <Typography variant="subtitle2" color="red" align="center">
                    {errors.patientAge}
                  </Typography>
                )}
                <TextField
                  autoFocus
                  margin="dense"
                  name="patientAddress"
                  label="Address"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.patientAddress}
                  onChange={handleInputChange}
                />
                {errors.patientAddress && (
                  <Typography variant="subtitle2" color="red" align="center">
                    {errors.patientAddress}
                  </Typography>
                )}
                <FormControl variant="standard" sx={{ my: 1, minWidth: 120 }}>
                  <InputLabel id="patientGender">Gender</InputLabel>
                  <Select
                    labelId="patientGender"
                    name="patientGender"
                    label="Gender"
                    value={values.patientGender}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        ["patientGender"]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="dense"
                  name="docName"
                  label={doctor.docName}
                  type="text"
                  fullWidth
                  variant="standard"
                  disabled
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
}
