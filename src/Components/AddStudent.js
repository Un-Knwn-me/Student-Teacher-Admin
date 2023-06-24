import React from 'react'
import Base from './Base'
import { Box, Fab, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

// schema validation
export const studValidationSchema = yup.object({
    studName: yup.string().required("Please enter Student name").min(3, "Minimum 3 characters required"),
    mentorName: yup.string().required("Please enter Mentor name").min(3, "Minimum 3 characters required"),
    subject: yup.string().required("Please enter your Subject"),
    batch: yup.string().required("Please enter your Batch"),
  });

const AddStudent = ({ studData = [], setStudData }) => {
    const history = useHistory();

  const addStud = async (newStud) => {
    try {
      const res = await fetch("https://643d2495f0ec48ce90536438.mockapi.io/Student", {
        method: "POST",
        body: JSON.stringify(newStud),
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      console.log(data);
      setStudData([...studData, data]);
      history.push("/students");
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      studName: "",
      mentorName: "",
      subject: "",
      batch: ""
    },
    validationSchema: studValidationSchema,
    onSubmit: async (newStud) => {
      console.log("onSubmit triggered", newStud);
      await addStud(newStud);
      history.push("/students");
    },
  });

  return (
    <Base title={"Add a student"}>
        <Box
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
      }}
    >
    <div className="input-section">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-name"
          label="Student Name"
          onChange={handleChange}
          value={values.studName}
          onBlur={handleBlur}
          name="studName"
          variant="outlined"
          sx={{ m: 1, width: '25ch' }} 
        />
        {touched.studName && errors.studName && <p style={{ color: 'red' }}>{errors.studName}</p>}
  
        <TextField
          id="outlined-mail"
          label="Mentor Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mentorName}
          name="mentorName"
          variant="outlined"
          sx={{ m: 1, width: '25ch' }} 
        />
        {touched.mentorName && errors.mentorName && <p style={{ color: 'red' }}>{errors.mentorName}</p>}
  
        <TextField
          id="outlined-number"
          label="Subject"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.subject}
          name="subject"
          variant="outlined"
          sx={{ m: 1, width: '25ch' }} 
        />
        {touched.subject && errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}
  
        <TextField
          id="outlined-gender"
          label="Batch"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.batch}
          name="batch"
          variant="outlined"
          sx={{ m: 1, width: '25ch' }} 
        />
        {touched.batch && errors.batch && <p style={{ color: 'red' }}>{errors.batch}</p>}
  
        <Fab variant="extended" type="submit" color="success" style={{ margin: '0 auto', display: 'flex' }}>
          Add User
        </Fab>
      </form>
    </div>
    </Box>
    </Base>
  )
}

export default AddStudent