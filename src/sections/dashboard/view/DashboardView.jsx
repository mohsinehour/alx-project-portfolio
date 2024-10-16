import { faker } from '@faker-js/faker';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MonthlyEarning from '../MonthlyEarning';
import ActiveCustomers from '../ActiveCustomers';
import DashboardMedList from '../DashboardMedList';
import DashboardMetrics from '../DashboardMetrics';
import medicationsData from '../../../_mock/medications.json';


export default function DashboardView() {

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 4 }}>
        Hi, John 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Earning"
            total={198000}
            trend="increased"
            percent_change="37.8"
            subtext="this month"
            icon={<img alt="icon" src="/assets/icons/dashboard/earning.svg" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Balance"
            total={2400}
            trend="decreased"
            percent_change="2"
            subtext="this month"
            icon={<img alt="icon" src="/assets/icons/dashboard/balance.svg" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Total Sales"
            total={89000}
            trend="increased"
            percent_change="11"
            subtext="this week"
            icon={<img alt="icon" src="/assets/icons/dashboard/sales.svg" />}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <MonthlyEarning
            title="Overview"
            subheader="Monthly Earning"
            chart={{
              labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
                '09/01/2024',
                '10/01/2024',
                '11/01/2024',
              ],
              series: [
                {
                  name: 'Earnings',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <ActiveCustomers
            title="Customers"
            subheader="Customers that buys products"
            chart={{
              series: [
                { label: 'Active', value: 4344 },
                { label: 'Not Active', value: 5435 },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} >
          <DashboardMedList
            title="Medications"
            // list={[...Array(5)].map((_, index) => ({
            //   id: faker.string.uuid(),
            //   name: "Aspirin",
            //   image: `/assets/images/medications/medication_1.jpg`,
            //   stock: 32,
            //   price: 45.99,
            //   totalSales: 20
            // }))}

            list={medicationsData.slice(0, 5).map((medication, index) => ({
              id: faker.string.uuid(),
              name: medication.name,
              image: `/assets/images/medications/medication_1.jpg`,
              stock: 32,
              price: medication.price,
              totalSales: 20,
              category: medication.category,
              description: medication.description,
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
