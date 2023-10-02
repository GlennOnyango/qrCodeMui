'use client'
import { useState, useEffect, useRef, useMemo } from "react";
import { Box, Button, Typography, Stack, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material";
type Props = {
  nameValue: string;
  text: string;
  bring?: (e: any) => any;
  customStyling?: React.CSSProperties;
  customTextStyling?: React.CSSProperties;
  required?: boolean;
  multiple?: boolean;
  hideData?: boolean;
  dis?: boolean;
  hideDelete?: boolean;
};

interface FileValues {
  [fileRes: string]: File | null;
}

interface FileValuseList {
  [fileRes: string]: FileList | null;
}

const Btnstyle = {
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "90vh",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 0,
};

export default function FileUploadComponent({
  nameValue,
  text,
  bring,
  customStyling,
  customTextStyling,
  required,
  multiple,
  hideData,
  dis,
  hideDelete,
}: Props) {
  const theme = useTheme();
  const [file, setFile] = useState<FileValues>({ fileRes: null });
  const [filelist, setFilelist] = useState<FileValuseList[]>([]);

  const [filename, setFileName] = useState<string | undefined | string[]>("");
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [ur, setUr] = useState<string>("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: any) => {
    const { name } = e.target;
    if (!multiple) {
      if (e.target.files[0] !== undefined) {
        setFile({ [name]: e.target.files[0] });
        setUr(URL.createObjectURL(e.target.files[0]));
      }
      if (e.target.files[0] === undefined && !("fileRes" in file)) {
        setFileName(file[Object.keys(file)[0]]?.name);
      }
    } else {
      if (e.target.files.length > 3) {
        alert("Cannot select more than 3 files");
      } else if (e.target.files.length > 0) {
        setFilelist(e.target.files);
      }
    }
  };

  useEffect(() => {
    bring && bring({ [ref.current.name]: filelist });
    let count = filelist.length - 1;
    let index = 0;
    const names: string[] = [];
    if (filelist.length > 0) {
      while (count > -1) {
        index++;
        names.push(
          `${index}.${filelist[count]?.name} ${count === 0 ? "" : " , "}`
        );
        count--;
      }
    }
    setFileName(names);
  }, [filelist]);

  const deleteFile = () => {
    ref.current.value = "";
    setFile({ fileRes: null });
    setFilelist([]);
    setFileName("");
  };
  const deleteSingleFile = () => {
    ref.current.value = "";
    setFile({ [nameValue]: null });
    setFileName("");
  };

  useEffect(() => {
    bring && bring(file);
    if (hideData) ref.current.value = "";
    if (!("fileRes" in file)) {
      if (!multiple) {
        setFileName(file[Object.keys(file)[0]]?.name);
      }
    }
  }, [file]);

  const checkFile = useMemo(() => {
    if (file[nameValue]) {
      return true;
    } else {
      return false;
    }
  }, [file]);

  const filenameString = useMemo(() => {
    if (filename === undefined) {
      return "";
    } else if (filename.length > 0) {
      return "Click to view file";
    }
  }, [filename]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <embed src={ur} width="100%" height="100%" title="Arcnet.io video" />
        </Box>
      </Modal>

      <Stack direction="column" width="100%" sx={{ ...customStyling }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={1}
          sx={{
            backgroundColor: "white",
            border: "1px solid #000",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <Stack spacing={1} direction="row">
            {checkFile ? (
              <CheckCircleIcon fontSize="small" color="primary" />
            ) : null}
            <Typography sx={{ fontSize: "14px", ...customTextStyling }}>
              {text}{" "}
              {required && (
                <Typography
                  variant="inherit"
                  display="inline"
                  color="error.main"
                >
                  *
                </Typography>
              )}
            </Typography>
          </Stack>

          <Stack spacing={1} direction="row">
            <Button
              variant="outlined"
              size="small"
              component="label"
              style={{ ...Btnstyle, position: "relative" }}
            >
              <input
                type="file"
                style={{
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
                ref={ref}
                required={required}
                accept=".xls,.xlsx"
                onChange={handleInputChange}
                name={nameValue}
                multiple={multiple}
                disabled={dis ? dis : false}
              ></input>
              <FileUploadIcon fontSize="small" />
            </Button>

            {!("fileRes" in file) ||
              (filelist.length > 0 && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={deleteFile}
                  style={Btnstyle}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              ))}
            {checkFile && !hideDelete ? (
              <Button
                variant="outlined"
                size="small"
                onClick={deleteSingleFile}
                style={Btnstyle}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            ) : null}
          </Stack>
        </Box>
        {!hideData && (
          <Typography
            fontSize="14px"
            component={"a"}
            onClick={handleOpen}
            mt={1}
            ml={1}
            color={theme.palette.primary.main}
            style={{ cursor:"default" }}
            data-cy={`fileLink_${nameValue}`}
          >{filenameString}</Typography>
        )}
      </Stack>
    </>
  );
}
