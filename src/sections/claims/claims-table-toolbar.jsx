import PropTypes from 'prop-types';
// import Tooltip from '@mui/material/Tooltip';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function ClaimsTableToolbar({ filterName, onFilterName }) {
  return (
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
          All Claims
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
          sx={{
            backgroundColor: '#f8f9fd',
            borderRadius: '8px',
            pr: 2,
            minWidth: 220,
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
            },
          }}
        />
        <OutlinedInput
          placeholder="Sort by: Date"
          sx={{
            backgroundColor: '#f8f9fd',
            borderRadius: '8px',
            pr: 2,
            display: { xs: "none", lg: "flex" },
            minWidth: 180,
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <Iconify icon="eva:chevron-down-fill" />
            </InputAdornment>
          }
        />
      </Box>
    </Toolbar>
  );
}

ClaimsTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
