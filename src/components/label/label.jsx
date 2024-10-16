import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';

import { StyledLabel } from './styles';


const Label = forwardRef(
  ({ children, color='default', variant='soft', startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const customBorderColor = {
      'default': `2px solid #000`,
      'success': `2px solid #00B087`,
      'warning': `2px solid #FABE24`,
      'error': `2px solid #DF0404`,
    }

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          width: "90px",
          height: "36px",
          padding: "5px 12px",
          border: customBorderColor[color],
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
      </StyledLabel>
    );
  }
);

Label.propTypes = {
  children: PropTypes.node,
  endIcon: PropTypes.object,
  startIcon: PropTypes.object,
  sx: PropTypes.object,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'soft']),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
};

export default Label;
