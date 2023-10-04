import {
  Modal,
  Stack,
  Paper,
  Typography,
  Fade,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { ReactElement, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ATLargeModalProps {
  triggerElement: ReactElement;
  title: string;
  children: ReactElement;
  onOk?: () => void;
  onCancel?: () => void;
  width?: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ATLargeModal(props: ATLargeModalProps) {
  const [open, setOpen] = useState(false);

  async function handleCloseModal(callbacks?: () => void) {
    try {
      callbacks && (await callbacks());
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        closeAfterTransition
      >
        <Fade in={open}>
          <Paper sx={{ ...style, ...(props.width && { width: props.width }) }}>
            <Stack gap={5}>
              <Stack
                gap={5}
                justifyContent="space-between"
                alignItems="stretch"
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4">{props.title}</Typography>
                  <IconButton onClick={() => handleCloseModal()}>
                    <CloseIcon
                      sx={{ color: "error.main", cursor: "pointer" }}
                    />
                  </IconButton>
                </Stack>
                <Box sx={{ width: "100%" }}>{props.children}</Box>
              </Stack>
              <Stack
                gap={2}
                direction="row"
                justifyContent="end"
                alignItems="center"
              >
                <Button
                  sx={{ color: "error.main" }}
                  onClick={() => handleCloseModal(props.onCancel)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleCloseModal(props.onOk)}
                >
                  Ok
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </Modal>
      <div onClick={() => setOpen(true)}>{props.triggerElement}</div>
    </>
  );
}
