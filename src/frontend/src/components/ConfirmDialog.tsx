import {Dialog, DialogActions, DialogTitle, Button, DialogContent} from '@mui/material';

interface ConfirmDialogProps {
  title: string;
  content?: string;
  show: boolean;
  errorText?: string;
  buttonText?: string;
  cancelText?: string;
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
        <DialogTitle>{props.errorText ? props.errorText : props.title}</DialogTitle>
        <DialogContent>{props.errorText ? props.errorText : props.content}</DialogContent>
        <DialogActions>

          {props.errorText &&
            <Button onClick={cancel} color="error">
              Close
            </Button>
          }

          {!props.errorText &&
            <>
              <Button onClick={cancel} color="primary">
                {props.cancelText || "Cancel"}
              </Button>

              <Button onClick={props.onConfirm} color="error" autoFocus>
                {props.buttonText || "Are you sure?"}
              </Button>
            </>
          }

        </DialogActions>
      </Dialog >
    </>
  );
};

export default ConfirmDialog;
