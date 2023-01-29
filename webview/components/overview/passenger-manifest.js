import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { flightNumberAtom } from '../atoms';

const const_orders = [
  {
    id: uuid(),
    seat_number: 'A1',
    bag_count: 5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'checked in'
  },
  {
    id: uuid(),
    seat_number: 'A2',
    bag_count: 1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'boarded'
  }
];

export const PassengerManifest = (props) => {
  const flightNumber = useRecoilValue(flightNumberAtom);

  useEffect(() => {
    console.log("here");
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

        let database_passengers = []
        data[1]["flight"]["passengers"].forEach((passenger) => {
          // console.log(passenger);
          const passenger_body = {
            "username": passenger,
            "query": {
              "type": "status"
            }
          };
          fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(passenger_body) })
          .then(response => response.json())
          .then((response) => {
            database_passengers.push({
              id: response[1]["user"]["id"],
              seat_number: response[1]["user"]["seat_number"],
              bag_count: response[1]["user"]["bags"].length,
              customer: {name: response[1]["user"]["name"]},
              status: response[1]["user"]["status"]
            });
            setPassengers(database_passengers.slice());
            // console.log(response);
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    console.log("here2");
  }, [flightNumber]);

  const [passengers, setPassengers] = useState(const_orders);

  return (
    <Card {...props}>
      <CardHeader title="Passenger Manifest" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  User Id
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell>
                  Seat Number
                </TableCell>
                <TableCell>
                  Bag Count
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {passengers.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.id}
                  </TableCell>
                  <TableCell>
                    {order.customer.name}
                  </TableCell>
                  <TableCell>
                    {order.seat_number}
                  </TableCell>
                  <TableCell>
                    {order.bag_count}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={( (order.status === 'concourse' || order.status === 'boarded') && 'success')
                        || (order.status === 'unconfirmed' && 'error')
                        || 'warning'}
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      </Box>
    </Card>
  );
}
