import {Dialog, DialogActions, DialogTitle, Button, DialogContent} from '@mui/material';

interface ConfirmDialogProps {
  title: string;
  content?: string;
  show: boolean;
  buttonText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = function(props) {

  // Delegate function.  Stop event from bubbling up
  const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    props.onConfirm();
  };

  // Delegate function. Call parent onCancel
  const cancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    props.onCancel();
  };

  return (
    <>
      <Dialog open={props.show} onClose={cancel}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.content}</DialogContent>
        <DialogActions>

          <Button onClick={cancel} color="primary">
            {props.cancelText || "Cancel"}
          </Button>

          <Button onClick={confirm} color="error" autoFocus>
            {props.buttonText || "Are you sure?"}
          </Button>

        </DialogActions>
      </Dialog >
    </>
  );
};

export default ConfirmDialog;
