import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function AddMedicationModal({ filterName, onFilterName }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 3, 0, 3),
        }}
      >
        <Box>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
            Medications
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#FABE24',
              borderRadius: '10px',
              color: 'white',
              padding: '8px 16px',
              height: '45px',
              '&:hover': {
                backgroundColor: '#faa924',
              },
            }}
            onClick={handleOpen}
          >
            Add Medication
          </Button>
        </Box>
      </Toolbar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Add Medication
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Medication Details */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <TextField label="Name" variant="outlined" fullWidth />
              <TextField label="Category" variant="outlined" fullWidth />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <TextField label="Price" variant="outlined" fullWidth />
              <TextField label="In Stock" variant="outlined" fullWidth />
            </Box>

            {/* Multiline text fields */}
            <TextField
              label="How to use"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              placeholder="Provide usage instructions..."
            />
            <TextField
              label="Side effect"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              placeholder="Describe any potential side effects..."
            />

            {/* Add Medication Button */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#FABE24',
                color: 'white',
                borderRadius: '8px',
                mt: 3,
                py: 1.6,
                '&:hover': {
                  backgroundColor: '#faa924',
                },
              }}
            >
              Add Medication
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

AddMedicationModal.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
