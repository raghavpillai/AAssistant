import Head from 'next/head';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { flightNumberAtom } from '../components/atoms';

function Example() {
  // And now you can use hooks
  // But only inside your functional component's
  // body
  const [status, setStatus] = useState('Unconfirmed');
  const flightNumber = useRecoilValue(flightNumberAtom);

  useEffect(() => {
    // console.log("here");
    const url = 'http://127.0.0.1:5000/api/post';
    const body = {
      "username": "admin_acc",
      "query": {
        "type": "change_flight_progress",
        "flight_number": flightNumber,
        "status": status
      }
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body) })
      .then(data => data.json())
      .then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      });
    console.log("here2");
  }, [status]);

  return (
    <Box sx={{ pt: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Boarding Portal</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Boarding Status"
          onChange={(event) => setStatus(event.target.value)}
          sx={{ color: 'black', width: '30%' }}
        >
          <MenuItem value={"Unconfirmed"}>Unconfirmed</MenuItem>
          <MenuItem value={"At Gate"}>At Gate</MenuItem>
          <MenuItem value={"Boarding First Class"}>First Class</MenuItem>
          <MenuItem value={"Boarding Group A"}>Group A</MenuItem>
          <MenuItem value={"Boarding Group B"}>Group B</MenuItem>
          <MenuItem value={"Boarding Group C"}>Group C</MenuItem>
          <MenuItem value={"Boarding Group D"}>Group D</MenuItem>
        </Select>
      </FormControl>
      <br/><br></br>
      <TextField id="outlined-basic" label="Check In User" sx={{ color: 'black', width: '30%' }} variant="outlined" />
    </Box>
  );
}

const Page = () => (
  <>
    <Head>
      <title>
        AAssistant | Portal Products
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth={false}>
      <Typography variant="h3">Boarding Portal</Typography>
        {Example()}
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
