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

export const BaggageTable = (props) => {
  const flightNumber = useRecoilValue(flightNumberAtom);
  useEffect(() => {
    const url = 'http://127.0.0.1:5000/api/post';
    const body = {
      "username": "admin_acc",
      "query": {
        "type": "get_bag_db",
        "flight_number": flightNumber
      }
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(body)})
    .then(data => data.json())
    .then((data) => {
      let bags_data = []
      data.forEach((bag) => bags_data.push({
        "luggage_id": bag.name,
        "owner_id": bag.owner,
        "from": bag.from,
        "to": bag.to
      }));

      setBags(bags_data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const [bags, setBags] = useState([]);

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
                {/* <TableCell>
                  Owner Name
                </TableCell> */}
                <TableCell>
                  From
                </TableCell>
                <TableCell>
                  To
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bags.map((order) => (
                <TableRow
                  hover
                  key={order['luggage_id']}
                >
                  <TableCell>
                    {order['luggage_id']}
                  </TableCell>
                  <TableCell>
                    {order['owner_id']}
                  </TableCell>
                  {/* <TableCell>
                    {order.seat_number}
                  </TableCell> */}
                  <TableCell>
                    {order['from']}
                  </TableCell>
                  <TableCell>
                  {order['to']}
                    {/* <SeverityPill
                      color={(order.status === 'boarded' && 'success')
                        || (order.status === 'booked' && 'error')
                        || 'warning'}
                    >
                      {order.status}
                    </SeverityPill> */}
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
