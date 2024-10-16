import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { medications } from 'src/_mock/medications';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import MedicationsTableRow from '../medications-table-row';
import MedicationsTableHead from '../medications-table-head';
import DashboardMetrics from '../../dashboard/DashboardMetrics';
import { emptyRows, applyFilter, getComparator } from '../utils';
import MedicationsTableToolbar from '../medications-table-toolbar';



export default function MedicationsView() {
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
    inputData: medications,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h3">
          Medications
        </Typography>
      </Stack>

      <Grid container spacing={3}  sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="In Stock"
            total={5423}
            trend="increased"
            percent_change="16"
            subtext="this month"
            moneyValue={false}
            icon={<img alt="icon" src="/assets/icons/medications/stock.svg" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Sold"
            total={1893}
            trend="decreased"
            percent_change="16"
            subtext="this month"
            moneyValue={false}
            icon={<img alt="icon" src="/assets/icons/medications/sold.svg" />}
          />
        </Grid>

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
      </Grid>

      <Card>
        <MedicationsTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <MedicationsTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Medication Name' },
                  { id: 'category', label: 'Category' },
                  { id: 'stock', label: 'Stock' },
                  { id: 'price', label: 'Price' },
                  { id: 'total_sales', label: 'Total Sales' },
                  // { id: 'action', label:'Action' },
                ]}
              />
              <TableBody>
                {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <MedicationsTableRow
                    key={row.id}
                    index={page * rowsPerPage + index + 1}
                    name={row.name}
                    category={row.category}
                    stock={row.stock}
                    price={row.price}
                    total_sales={row.total_sales}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, medications.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={medications.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
