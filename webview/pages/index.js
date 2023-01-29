import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { TotalPassengers } from '../components/overview/total-passengers';
import { PassengerManifest } from '../components/overview/passenger-manifest';
import { PassengerCapacity } from '../components/overview/passenger-capacity';
import { TotalBags } from '../components/overview/total-bags';
import { BagCapacity } from '../components/overview/bag-capacity';
import { PassengerStatuses } from '../components/overview/passenger-statuses';
import { DashboardLayout } from '../components/dashboard-layout';
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const Page = () => (
  <RecoilRoot>
  <>
    <Head>
      <title>
        AAssistant | Portal Dash
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalPassengers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalBags />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <PassengerCapacity />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <BagCapacity sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            
            <PassengerManifest sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <PassengerStatuses sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  </RecoilRoot>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
