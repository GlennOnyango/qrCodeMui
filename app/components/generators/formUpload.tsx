"use client";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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
type CompanyValues = {
  kra_pin: string;
  company_name: string;
  company_reg_date: string;
  company_exp_date: string;
  validity: number;
};

export default function QRForm() {
  const date = new Date();
  const [kra, setKra] = useState<boolean>();

  const todayDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth() + 1}-${date.getDate() - 1 < 10 ? "0" : ""}${
    date.getDate() - 1
  }`;

  const [formValues, setFormValues] = useState<CompanyValues | any>({
    kra_pin: "",
    company_name: "",

    company_reg_date: todayDate,
    company_exp_date: todayDate,

    validity: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    let smallChar = /[a-z]/g;
    let specialChar = /\W/g;

    if (formValues.kra_pin.length > 0) {
      if (
        smallChar.test(formValues.kra_pin) ||
        specialChar.test(formValues.kra_pin)
      ) {
        setKra(true);
      } else {
        setKra(false);
      }
    }
  }, [formValues.kra_pin]);

  return (
    <form onSubmit={() => {}} style={{ marginTop: 12 }}>
      <FormControl fullWidth>
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Stack direction={"column"} sx={{ width: "100%" }}>
            <Typography component="label" fontSize="16px" lineHeight="2">
              Full Registered Company Name{" "}
              <Typography variant="inherit" display="inline" color="error.main">
                *
              </Typography>
            </Typography>
            <OutlinedInput
              required
              id="outlined-company-name"
              type="text"
              size="small"
              name="company_name"
              placeholder="ABC Limited"
              onChange={handleChange}
              sx={{
                borderRadius: "13px",
                backgroundColor: "white",
              }}
            />
          </Stack>

          <Stack direction={"column"} mt={2} sx={{ width: "100%" }}>
            <Typography component="label" fontSize="16px" lineHeight="2">
              Company KRA PIN
              <Typography variant="inherit" display="inline" color="error.main">
                *
              </Typography>
            </Typography>

            <OutlinedInput
              required
              id="outlined-company-kra-pin"
              type="text"
              size="small"
              name="kra_pin"
              error={kra}
              placeholder="A123456789B"
              onChange={handleChange}
              defaultValue={formValues.kra_pin}
              inputProps={{
                length: 11,
              }}
              sx={{
                borderRadius: "13px",
                backgroundColor: "white",
              }}
            />
          </Stack>
          <Stack direction={"column"} mt={2} sx={{ width: "100%" }}>
            <Typography component="label" fontSize="16px" lineHeight="2">
              Company validity{" "}
              <Typography variant="inherit" display="inline" color="error.main">
                *
              </Typography>
            </Typography>

            <Autocomplete
              id="country_of_ops"
              options={Vailidity}
              size="small"
              value={formValues.validity.code}
              sx={{
                borderRadius: "13px",
                backgroundColor: "white",
              }}
              getOptionLabel={(option) => option.name}
              autoHighlight
              onChange={(event: any, newValue: any) => {
                if (newValue) {
                  setFormValues((prev: any) => ({
                    ...prev,
                    validity: newValue.code,
                  }));
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
                  label="Validity"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Stack>

          <Stack direction={"column"} mt={2} sx={{ width: "100%" }}>
            <Typography component="label" fontSize="16px" lineHeight="2">
              Company Registration Date{" "}
              <Typography variant="inherit" display="inline" color="error.main">
                *
              </Typography>
            </Typography>

            <DatePicker
              label=""
              value={dayjs(formValues.company_reg_date)}
              defaultValue={dayjs(todayDate)}
              onChange={(newDate) => {
                const organizedDate = `${newDate?.year()}-${
                  typeof newDate?.month() === "number"
                    ? newDate?.month() + 1
                    : 1
                }-${newDate?.date()}`;

                setFormValues((Prev: CompanyValues | any) => ({
                  ...Prev,
                  company_reg_date: organizedDate,
                }));
              }}
              format="DD/MM/YYYY"
              sx={{
                borderRadius: "13px",
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

          <Stack direction={"column"} mt={2} sx={{ width: "100%" }}>
            <Typography component="label" fontSize="16px" lineHeight="2">
              Company Expiration Date{" "}
              <Typography variant="inherit" display="inline" color="error.main">
                *
              </Typography>
            </Typography>

            <DatePicker
              label=""
              value={dayjs(formValues.company_exp_date)}
              defaultValue={dayjs(todayDate)}
              onChange={(newDate) => {
                const organizedDate = `${newDate?.year()}-${
                  typeof newDate?.month() === "number"
                    ? newDate?.month() + 1
                    : 1
                }-${newDate?.date()}`;

                setFormValues((Prev: CompanyValues | any) => ({
                  ...Prev,
                  company_reg_date: organizedDate,
                }));
              }}
              format="DD/MM/YYYY"
              sx={{
                borderRadius: "13px",
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
          <Box mt={2} display={"flex"} justifyContent={"center"}>
            <Button type="submit" variant="contained">Submit form</Button>
          </Box>
        </Stack>
      </FormControl>
    </form>
  );
}
