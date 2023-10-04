"use client";
import {
  Autocomplete,
  Box,
  Grid,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

export const Vailidity = [
  {
    name: "valid",
    code: 1,
  },
  {
    name: "Not valid",
    code: 0,
  },
];

const date = new Date();

const todayDate = `${date.getFullYear()}-${
  date.getMonth() + 1 < 10 ? "0" : ""
}${date.getMonth() + 1}-${date.getDate() - 1 < 10 ? "0" : ""}${
  date.getDate() - 1
}`;
export default function FilterCard() {
  return (
    <Grid container spacing={1} item bgcolor={"white"} pb={1} pr={1} ml={2}>
      <Grid item xs={3}>
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Typography component="label" fontSize="16px" lineHeight="2">
            Filter by Company Name{" "}
          </Typography>
          <OutlinedInput
            required
            id="outlined-company-name"
            type="text"
            size="small"
            name="company_name"
            placeholder="ABC Limited"
            //onChange={handleChange}
            sx={{
              borderRadius: "0px",
              backgroundColor: "white",
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Typography component="label" fontSize="16px" lineHeight={2}>
            Filter by certificate status{" "}
          </Typography>

          <Autocomplete
            id="country_of_ops"
            options={Vailidity}
            size="small"
            //value={formValues.validity.code}
            sx={{
              borderRadius: "0px",
              backgroundColor: "white",
            }}
            getOptionLabel={(option) => option.name}
            autoHighlight
            onChange={(event: any, newValue: any) => {
              if (newValue) {
                // setFormValues((prev: any) => ({
                //   ...prev,
                //   validity: newValue.code,
                // }));
              }
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select status"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Typography component="label" fontSize="16px" lineHeight="2">
            Company Registration Date{" "}
          </Typography>

          <DatePicker
            label=""
            //value={dayjs(formValues.company_reg_date)}
            defaultValue={dayjs(todayDate)}
            onChange={(newDate) => {
              const organizedDate = `${newDate?.year()}-${
                typeof newDate?.month() === "number" ? newDate?.month() + 1 : 1
              }-${newDate?.date()}`;

              //   setFormValues((Prev: CompanyValues | any) => ({
              //     ...Prev,
              //     company_reg_date: organizedDate,
              //   }));
            }}
            format="DD/MM/YYYY"
            sx={{
              borderRadius: "0px",
              border: "1px solid black",
              backgroundColor: "white",
            }}
            slotProps={{
              textField: {
                size: "small",
                helperText: "DD/MM/YYYY",
                id: "outlined-company-registration-date",
                sx: {
                  borderRadius: "13px",
                  backgroundColor: "transparent",
                },
              },
            }}
            maxDate={dayjs(todayDate)}
          />
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Typography component="label" fontSize="16px" lineHeight="2">
            Company Registration Date{" "}
          </Typography>

          <DatePicker
            label=""
            //value={dayjs(formValues.company_reg_date)}
            defaultValue={dayjs(todayDate)}
            onChange={(newDate) => {
              const organizedDate = `${newDate?.year()}-${
                typeof newDate?.month() === "number" ? newDate?.month() + 1 : 1
              }-${newDate?.date()}`;

              //   setFormValues((Prev: CompanyValues | any) => ({
              //     ...Prev,
              //     company_reg_date: organizedDate,
              //   }));
            }}
            format="DD/MM/YYYY"
            sx={{
              borderRadius: "0px",
              border: "1px solid black",
              backgroundColor: "white",
            }}
            slotProps={{
              textField: {
                size: "small",
                helperText: "DD/MM/YYYY",
                id: "outlined-company-registration-date",
                sx: {
                  borderRadius: "13px",
                  backgroundColor: "transparent",
                },
              },
            }}
            maxDate={dayjs(todayDate)}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
