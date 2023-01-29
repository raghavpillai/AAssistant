import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { BaggageTable } from '../components/baggage/baggage-table';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        AAssistant | Baggage Portal
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
        <Box sx={{ mt: 3 }}>
          <BaggageTable sx={{ height: '100%' }} />
        </Box>
        
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
