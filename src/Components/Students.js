import React from 'react'
import { useHistory } from 'react-router-dom';
import Base from './Base';
import { Card, CardActionArea, CardActions, CardContent, Fab, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteForever } from '@mui/icons-material';

const Students = ({studData, setStudData}) => {
    const history = useHistory();

     // Delete user
     const deleteStudent = async (studId) =>{
        try {
            const res = await fetch(`https://643d2495f0ec48ce90536438.mockapi.io/Student/${studId}`,{
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            const selectStud = studData.filter((stud) => stud.id !== studId);
            setStudData(selectStud);
            
        } catch (error) {
            console.log("error");
        }} 

  return (
    <Base title={"Student List"}>
        <div className='card-container'>
        {studData.map((stud,id)=>(
            <Card sx={{ maxWidth: 345 }} key={stud.id} className='card'>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {stud.studName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Mentor Name: {stud.mentorName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subject: {stud.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Batch: {stud.batch}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
                <Fab aria-label='edit' color='primary' onClick={()=>history.push(`/edit-stud/${stud.id}`)} style={{margin: '0 auto', display: 'flex'}}>
                    <EditIcon/>
                </Fab>
              <Fab aria-label='delete' style={{margin: '0 auto', display: 'flex'}} color='error' onClick={()=>deleteStudent(stud.id)}>
                <DeleteForever/>
              </Fab>
            </CardActions>
          </Card>
        ))}
        </div>
    
    </Base>
  )
}

export default Students