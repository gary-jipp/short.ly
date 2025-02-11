import {Dialog, DialogActions, DialogTitle, Button, DialogContent, DialogContentText} from '@mui/material';

interface ConfirmDialogProps {
  title: string;
  show: boolean;
  buttonText?: string;
  cancelText?: string;
  cancelInfo?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = function(props) {

  const cancel = function() {
    props.onCancel();
  };

  return (
    <>
      <Dialog open={props.show} onClose={cancel}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.cancelInfo}</DialogContent>
        <DialogActions>

          <Button onClick={cancel} color="primary">
            {props.cancelText || "Cancel"}
          </Button>

          <Button onClick={props.onConfirm} color="error" autoFocus>
            {props.buttonText || "Are you sure?"}
          </Button>
        </DialogActions>
      </Dialog >
    </>
  );
};

export default ConfirmDialog;
