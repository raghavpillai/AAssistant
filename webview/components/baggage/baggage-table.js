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
  },
  /*
    {
      id: uuid(),
      ref: 'CDD1047',
      amount: 10.99,
      customer: {
        name: 'Alexa Richardson'
      },
      createdAt: 1554930000000,
      status: 'refunded'
    },
    {
      id: uuid(),
      ref: 'CDD1046',
      amount: 96.43,
      customer: {
        name: 'Anje Keizer'
      },
      createdAt: 1554757200000,
      status: 'pending'
    },
    {
      id: uuid(),
      ref: 'CDD1045',
      amount: 32.54,
      customer: {
        name: 'Clarke Gillebert'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    },
    {
      id: uuid(),
      ref: 'CDD1044',
      amount: 16.76,
      customer: {
        name: 'Adam Denisov'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    }
  */
];

export const BaggageTable = (props) => {
  useEffect(() => {
    console.log("here");
    const url = 'http://127.0.0.1:5000/api/post';
    const body = {
      "username": "admin_acc",
      "query": {
        "type": "get_flight_status",
        "flight_number": "AA 1511"
      }
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(body)}).then((data) => {
      console.log(data.json());
      // setOrders(data);
    }).catch((err) => {
      console.log(err);
    });
    console.log("here2");
  }, []);

  const [orders, setOrders] = useState([]);

  return (
    <Card {...props}>
      <CardHeader title="Baggage Directory" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Luggage ID
                </TableCell>
                <TableCell>
                  Owner ID
                </TableCell>
                <TableCell>
                  Owner Name
                </TableCell>
                <TableCell>
                  From
                </TableCell>
                <TableCell>
                  To
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.id.substring(0, 6)}
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
                      color={(order.status === 'boarded' && 'success')
                        || (order.status === 'booked' && 'error')
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
