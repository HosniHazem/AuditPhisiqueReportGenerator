import React,{ useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./anomalie.scss";
import axios from 'axios';
import Button from '@mui/material/Button';
import swal from 'sweetalert';


const ApiGet = () => {
  let info = sessionStorage.getItem("user");
  // eslint-disable-next-line 
  let userInfo = JSON.parse(info);
    const tableCellStyle = {
        padding: '5px',
        backgroundColor: '#386494',
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'middle',
      };
      const tableCellStyle1 = {
        padding: '5px',
        backgroundColor: '#d7e0ea',
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'middle',
      };
      const tableCellStyle2 = {
        padding: '5px',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        verticalAlign: 'middle',
      };
      const [content, setContent] = useState({
        q:"",
        project_id:""
    });
    
      const handleChange = (e) => {
        e.persist();
     
        setContent({...content, [e.target.name]: e.target.value });
    }
    const [Response, setResponse] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  console.log(content.q)
  const dataToSend = {
    q: content.q,
    project_id: content.project_id,
    user: userInfo.name
  };
  console.log(dataToSend)
  // Make the Axios POST request to send the data
  axios.post('http://webaudit.smartskills.tn:8000/api/apicall', dataToSend)
    .then((response) => {

if(response.data.status===200){
        swal("Created",content.q,"successfully");
      console.log(response.data.targets);
    }
    })
    .catch((error) => {
      // Handle errors
      console.error('Error sending data:', error);
    }); 
};

   
    return (
        <div>
                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className='datatableTitle1' > <h1>ApiGet</h1></div>
                 <form onSubmit={handleSubmit}>
                 <table border="1" style={{ width: '85%',borderCollapse: 'separate', borderSpacing: '0' }}>
                 <tr>
        <td style={tableCellStyle}>Q</td>
          <td style={{ tableCellStyle1,color: 'black' }}><input type="text" name="q" value={content.q} onChange={handleChange}  style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
          </tr>
          <tr>
          <td style={tableCellStyle}>Project ID</td>
          <td style={{ tableCellStyle1 ,color: 'black' }}><input type="text" name="project_id" value={content.project_id} onChange={handleChange}  style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
        </tr>
       
     
</table>
<div><Button variant="contained" style={{ backgroundColor: '#308efe',color: 'white' }} type="submit">SAVE</Button></div>

                 </form>
      </div>
    );
};

export default ApiGet;