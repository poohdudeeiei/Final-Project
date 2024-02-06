import Dialog from "@mui/material/Dialog";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ReportDialogProps {
  open: boolean;
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
}

const ReportDialog: React.FC<ReportDialogProps> = ({ open, handleClose }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      scroll="body"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "60%",
            maxWidth: "700px",
            height: "auto",
          },
        },
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          padding: "5% 3%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
          {"Report"}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: "3%", width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{ width: "100%" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
              Bad Behavior
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Detail with button report</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          style={{ width: "100%" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
              Bad Behavior
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis
              laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          style={{ width: "100%" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
              Bad Behavior
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          style={{ width: "100%" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
              Others
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Divider />
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => handleClose(event, null)}
        >
          Disagree
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={(event) => handleClose(event, null)}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
