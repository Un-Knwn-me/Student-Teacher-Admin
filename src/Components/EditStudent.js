import React from 'react';
import Base from './Base';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Fab, TextField } from '@mui/material';
import * as yup from 'yup';

// schema validation
export const studValidationSchema = yup.object({
  studName: yup.string().required("Please enter Student name").min(3, "Minimum 3 characters required"),
  mentorName: yup.string().required("Please enter Mentor name").min(3, "Minimum 3 characters required"),
  subject: yup.string().required("Please enter your Subject"),
  batch: yup.string().required("Please enter your Batch"),
});

const EditStudent = ({ studData, setStudData }) => {
  const history = useHistory();
  const { id } = useParams();

  const stud = studData.find((stud) => stud.id === id);

  const handleSubmit = (values) => {
    updateStudData(values);
  };

  const updateStudData = async (updatedStud) => {
    try {
      const res = await fetch(`https://643d2495f0ec48ce90536438.mockapi.io/Student/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedStud),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data) {
        const updatedStudData = studData.map((stud) => {
          if (stud.id === id) {
            return updatedStud;
          }
          return stud;
        });

        setStudData(updatedStudData);
        history.push("/students");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      studName: stud?.studName || "",
      mentorName: stud?.mentorName || "",
      subject: stud?.subject || "",
      batch: stud?.batch || "",
    },
    validationSchema: studValidationSchema,
    onSubmit: handleSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <Base title={"Update Student"}>
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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="outlined-studName"
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
              id="outlined-mentor"
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
              id="outlined-sub"
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
              id="outlined-batch"
              onBlur={handleBlur}
              label="Batch"
              onChange={handleChange}
              value={values.batch}
              name="batch"
              variant="outlined"
              sx={{ m: 1, width: '25ch' }}
            />
            {touched.batch && errors.batch && <p style={{ color: 'red' }}>{errors.batch}</p>}

            <Fab variant="extended" type="submit" color="success" style={{ margin: '0 auto', display: 'flex' }}>
              Update Student
            </Fab>
          </form>
        </div>
      </Box>
    </Base>
  );
};

export default EditStudent;
