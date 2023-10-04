"use client";

import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

type Props = {
  Name: string;
  KRA: string;
  Validity: number;
  date: number;
  expiry: number;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function QRImageDisplay({
  Name,
  KRA,
  Validity,
  date,
  expiry,
}: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
              {Name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={Name}
        />
        <CardMedia
          component="img"
          height="200"
          sx={{ objectFit: "contain" }}
          image={`/qrImages/${Name}.png`}
          alt="Paella dish"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="download">
            <DownloadIcon />
          </IconButton>
          <IconButton aria-label="validity">
            <CheckCircleOutlineIcon color={Validity === 1 ? 'success' : "error"}/>
          </IconButton>
          <IconButton
            aria-label="zoom"
            component="a"
            href={`/qrImages/${Name}.png`}
            LinkComponent={"a"}
            target="_blank"
          >
            <ZoomInIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    </Grid>
  );
}
