import React from 'react';
import { Modal, Backdrop, Fade, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    position:'absolute',
    top:'5%',
    overflowY:'scroll',
    height:'80%',
    display:'block',
  },
}));

const ModalComponent = ({ open, handleClose, title, children}) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            {children}
          </div>
        </Fade>
      </Modal >
    </div>
  )}

export default ModalComponent;
