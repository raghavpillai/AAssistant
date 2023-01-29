import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { flightNumberAtom } from '../atoms';

export const PassengerStatuses = (props) => {
  const theme = useTheme();
  const [percentages, setPercentages] = useState([63, 15, 22]); //boarded, checked in, booked
  const flightNumber = useRecoilValue(flightNumberAtom);

  useEffect(() => {
    // get_flight_status
    // console.log("here");
    const url = 'http://127.0.0.1:5000/api/post';
    const body = {
      "username": "admin_acc",
      "query": {
        "type": "get_flight_status",
        "flight_number": flightNumber
      }
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body) })
      .then(data => data.json())
      .then((data) => {
        // console.log(data[1]["flight"]["passengers"]);
        data = data[1];
        console.log(data);
        const total = data['boarded'] + data['checked_in'] + data['concourse'] + data['security'] + data['unconfirmed'];
        console.log(total);
        const fetch_percentages = [
          (data['boarded'] / total * 100).toFixed(2), 
          (data['checked_in'] / total * 100).toFixed(2), 
          (data['unconfirmed'] / total * 100).toFixed(2)
        ];
        setPercentages(fetch_percentages);
        console.log(data);
      }).catch((err) => {
        console.log(err);
      });
    // console.log("here2");
  }, []);

  const data = {
    datasets: [
      {
        data: percentages, // 63% desktop, 15% tablet, 22% mobile
        backgroundColor: ['#14B8A6', '#086591', '#b53126'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Boarded', 'Checked In', 'Unconfirmed']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Boarded',
      value: percentages[0],
      icon: LaptopMacIcon,
      color: '#14B8A6'
    },
    {
      title: 'Checked In',
      value: percentages[1],
      icon: TabletIcon,
      color: '#086591'
    },
    {
      title: 'Unconfirmed',
      value: percentages[2],
      icon: PhoneIcon,
      color: '#b53126'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Passenger Statuses" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
