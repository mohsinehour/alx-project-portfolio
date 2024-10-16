import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { pharmacies } from 'src/_mock/pharmacies';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import PharmacyTableRow from '../pharmacies-table-row';
import PharmacyTableHead from '../pharmacies-table-head';
import PharmacyTableToolbar from '../pharmacies-table-toolbar';
import DashboardMetrics from '../../dashboard/DashboardMetrics';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function PharmacyPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: pharmacies,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h3">
          Pharmacies
        </Typography>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="All Pharmacies"
            total={320}
            trend="increased"
            percent_change="10"
            subtext="this month"
            moneyValue={false}
            icon={<img alt="icon" src="/assets/icons/customers/customers.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Active Pharmacies"
            total={120}
            trend="decreased"
            percent_change="2"
            subtext="this month"
            moneyValue={false}
            icon={<img alt="icon" src="/assets/icons/customers/members.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Active Now"
            total={189}
            trend=""
            percent_change=""
            subtext=""
            moneyValue={false}
            metricsVariant="avatar"
            icon={<img alt="icon" src="/assets/icons/customers/active.svg" />}
          />
        </Grid>
      </Grid>

      <Card>
        <PharmacyTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <PharmacyTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'name', label: 'Pharmacy Name' },
                  { id: 'phone', label: 'Phone Number' },
                  { id: 'email', label: 'Email' },
                  { id: 'location', label: 'Location' },
                  { id: 'claims', label: 'Claim History' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <PharmacyTableRow
                      key={row.id}
                      index={page * rowsPerPage + index + 1}
                      name={row.name}
                      phone={row.phone}
                      email={row.email}
                      location={row.location}
                      claims={row.claims}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, pharmacies.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={pharmacies.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
