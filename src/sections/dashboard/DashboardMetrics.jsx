import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { fShortenNumber } from 'src/utils/format-number';

export default function DashboardMetrics(
  {
    title, total,
    icon, subtext,
    percent_change, trend, moneyValue=true,
    sx, metricsVariant="default", ...other
  }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 3,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 100, height: 100 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
        <Typography variant="h4">{ moneyValue && "$" } {fShortenNumber(total)}</Typography>

        {
          metricsVariant === "default" &&
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: .4,
            }}
          >
            <Typography variant="subtitle2"
              sx={{
                color: trend === 'increased' ? '#00AC4F' : '#D0004B',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {
                trend === 'increased' ?
                <ArrowUpward /> :
                <ArrowDownward />
              }
              {percent_change}%
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.desabled',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {subtext}
            </Typography>
          </Box>
        }

        {
          metricsVariant === "avatar" &&
          <AvatarGroup
            // renderSurplus={(surplus) => <span>+5</span>}
            // total={189}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://thispersondoesnotexist.com/"
              sx={{
                width: 36,
                height: 36,
                cursor: 'pointer',
              }}
            />
            <Avatar
              alt="Travis Howard"
              src="https://thispersondoesnotexist.com/"
              sx={{
                width: 36,
                height: 36,
                cursor: 'pointer',
              }}
            />
            <Avatar
              alt="Agnes Walker"
              src="https://thispersondoesnotexist.com/"
              sx={{
                width: 36,
                height: 36,
                cursor: 'pointer',
              }}
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://thispersondoesnotexist.com/"
              sx={{
                width: 36,
                height: 36,
                cursor: 'pointer',
              }}
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://thispersondoesnotexist.com"
              sx={{
                width: 36,
                height: 36,
                cursor: 'pointer',
              }}
            />
          </AvatarGroup>
        }
      </Stack>
    </Card>
  );
}

DashboardMetrics.propTypes = {
  trend: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  subtext: PropTypes.string,
  moneyValue: PropTypes.bool,
  metricsVariant: PropTypes.string,
  percent_change: PropTypes.number,
};
