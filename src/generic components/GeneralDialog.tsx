import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  handleClose?: () => void;
  handleConfirm: () => void;
  showCancelButton: boolean;
  title: string;
  text: string | JSX.Element;
};

const GeneralDialog: React.FC<Props> = ({
  open,
  handleClose,
  handleConfirm,
  showCancelButton,
  title,
  text,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
            {/* האם הינך בטוח/ה כי בצונך למחוק משתמש זה? משתמש שימחק מהמערכת ימחק
            לצמיתות! */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {showCancelButton && <Button onClick={handleClose}>ביטול</Button>}
          <Button onClick={handleConfirm} autoFocus>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GeneralDialog;
