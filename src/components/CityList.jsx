import React from "react";
import {
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Toolbar,
} from "@mui/material";

export default function CityList({ cities, city, cityChange }) {
  return (
    <Toolbar>
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        List of Available Doctors
      </Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">City: </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={city}
          label="City"
          onChange={(e) => cityChange(e.target.value)}
        >
          {cities.map((thing) => (
            <MenuItem key={thing.city} value={thing.city}>
              {thing.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Toolbar>
  );
}
