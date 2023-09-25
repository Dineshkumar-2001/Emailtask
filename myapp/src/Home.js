import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import './App.css'; // Import your CSS file for custom styling

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false); // Add state to track successful email send

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:4000/submit-form', formData)
      .then((response) => {
        console.log(response.data);
        setIsEmailSent(true); // Set the state to indicate successful email send
        fetchSubmittedData(); // Fetch and update the submitted data
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const fetchSubmittedData = () => {
    axios.get('http://localhost:4000/fetch-data')
      .then((response) => {
        setSubmittedData(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Form Submission
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>

      {isEmailSent && (
        <TableContainer>
          <Typography variant="h4" align="center" gutterBottom>
            Submitted Data
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.subject}</TableCell>
                  <TableCell>{data.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Home;
