// src/components/Form.js

import React, { useState } from 'react';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData===>>>>',formData);
    try {
      const response = await axios.post('http://localhost:4000/send-email', formData);

      if (response.status === 200) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form >
           <Box  sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
           
            <h1>  FORM  </h1>
           </Box>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>  
     
     <h3> NAME : </h3>
     <TextField
     sx={{marginLeft:'17px'}}
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
       
        margin="small"
      />
      </Box>
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>  
    
     <h3> Subject : </h3>
     <TextField
      sx={{marginLeft:'10px'}}
        label="Subject"
        variant="outlined"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
       
        margin="small"
      />
      </Box>

      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>  
    
     <h3> Email : </h3>
     <TextField
      sx={{marginLeft:'19px'}}
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        
        margin="small"
      />
      </Box>
      
     
      <Button onClick={handleSubmit} sx={{marginLeft:'49px',marginTop:'10px'}} type="submit" variant="contained" color="primary">
        Submit 
      </Button>
    </form>
  );
}

export default Home;
