import './App.css';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const apiKey = 'lT4w53R8HB9AkUgPJ2Nhw8e7OLEF6sfg9t8x8HbL';
const url = 'https://jia31dggl2.execute-api.us-east-2.amazonaws.com/dev/';
const calling = {
  url: [
    'create_input',
    'update_input',
    'delete_input',
  ],
  title: [
    'Add product',
    'Change quantity',
    'Delete product'
  ]
}

function App() {
  const [data, setData] = useState([]);
  const [report, setReport] = useState(0);
  const [open, setOpen] = useState(-1);
  const [searchText, setSearchText] = useState("");
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const headers = {
    'x-api-key': `${apiKey}`,
    'Content-Type': 'application/json', // Set the content type if needed
  };

  const handleClick = (typeFunction) => {
    setOpen(typeFunction);
  };

  const handleClose = () => {
    setOpen(-1);
  };

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  const handleSubmit = () => {    
    const calingUrl = url + calling.url[open];
    const requestBody = {
      "name": `${input1}`,
      "quantity": `${input2}`,
      "person_id": `${input3}`,
    };

    const callData = async () => {
      await axios.post(calingUrl, requestBody, { headers })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      await loadData();

      setInput1('');
      setInput2('');
      setInput3('');
      setOpen(-1);
    }

    callData();
  };

  const loadData = async () => {
    const readUrl = url + 'read_input';
    await axios.get(readUrl, {}, { headers })
      .then((response) => {
        setData(response.data.products);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    const reportUrl = url + 'report_input';
    await axios.get(reportUrl, {}, { headers })
      .then((response) => {
        let temp = Object.values(response)[0].total;
        if (temp !== null) {
          setReport(Object.values(response)[0].total);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {    
    loadData();
  }, []);
  
  return (
    <>
      <Typography 
        variant="h2"
        style={{
          fontSize: '3rem', 
          textAlign: 'center', 
          paddingBottom: '5%'
        }}>
        Thanh Le - CS348 project
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding={2}
      >
        <Typography variant="h5">
          Total Products: {report}
        </Typography>
      </Box>
      <div className='container'>

        <TextField
          display="flex"
          variant="outlined"
          label="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <SearchIcon color="action" />
            ),
          }}
          value={searchText}
          onChange={handleSearch}
        />

        <ButtonGroup  align='center' variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => handleClick(0)}>{calling.title[0]}</Button>
          <Button onClick={() => handleClick(1)}>{calling.title[1]}</Button>
          <Button onClick={() => handleClick(2)}>{calling.title[2]}</Button>
        </ButtonGroup>

        {/* create part */}
        <Dialog open={open !== -1} onClose={handleClose}>
          <DialogTitle>{calling.title[open]}</DialogTitle>
          <DialogContent className='dialog'>
            <TextField
              label="Product Name"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              fullWidth
            />
            {open !== 2 &&
              <TextField
                label="Quantity"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                fullWidth
              />
            }
            {open !== 2 &&
              <TextField
                label="Your ID"
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
                fullWidth
              />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {calling.title[open]}
            </Button>
          </DialogActions>
        </Dialog>

      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Product Name</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align="center">Last modified by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter((item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            ).map((row) => (
              row.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ?
              <TableRow
                key={row.product_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' component="th" scope="row">{row.name}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.person_id}</TableCell>
              </TableRow>
              : null
            ))
          }

          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
