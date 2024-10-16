import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
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

export default function MedicationsTableRow({ id, name, category, stock, price, total_sales, howToUse, sideEffect }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row" sx={{ paddingLeft: 5 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              component="img"
              alt={name}
              src="/assets/images/medications/medication_1.jpg"
              sx={{ width: 90, height: 56, borderRadius: 1.5, flexShrink: 0 }}
            />
            <Box sx={{ display: 'block' }}>
              <Typography variant="h6">{name}</Typography>
              <Link color="#9197B3" underline="hover" noWrap sx={{ cursor: 'pointer' }} onClick={handleOpen}>
                View Details
              </Link>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>{category}</TableCell>
        <TableCell>{stock} in stock</TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            RWF {price}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {total_sales}
          </Typography>
        </TableCell>
      </TableRow>

      {/* Modal for displaying medication details */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
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

          {/* Modal Header with Edit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="h2">
              {name}
            </Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
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
            >
              Edit
            </Button>
          </Box>

          {/* Medication Details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                ID
              </Typography>
              <Typography>{id}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Category
              </Typography>
              <Typography>{category}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Left in Stock
              </Typography>
              <Typography>{stock}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                How to Use
              </Typography>
              <Typography>{howToUse}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Side Effect
              </Typography>
              <Typography>{sideEffect}</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

MedicationsTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  stock: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  total_sales: PropTypes.string.isRequired,
  howToUse: PropTypes.string.isRequired,
  sideEffect: PropTypes.string.isRequired,
};
