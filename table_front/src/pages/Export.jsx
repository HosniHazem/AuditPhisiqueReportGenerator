import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate,useParams} from 'react-router-dom';
import React, { useEffect } from 'react';


const Export = () => {
    const navigate = useNavigate();
    const project_id = sessionStorage.getItem('project_id');
    const { id } = useParams();
    console.log(id);
     const dataToSend = {
        project_id: id,
      };

        useEffect(() => {
        axios.post('http://webapp.smartskills.local:8000/api/generate-word-document',dataToSend)
        .then((response) => {
         // Assuming the response is in JSON format and contains a 'download_link'
         const downloadLink = response.data.download_link;
        
         // Trigger the download
         downloadFile(downloadLink);
            swal("Exported","Successfully");
        
        })
        .catch((error) => {
          // Handle errors
          console.error('Error sending data:', error);
         /*  swal("Error","Check the project");
          navigate("/");  */

        });
    }, []);  
      const downloadFile = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // Open the link in a new tab
        link.download = 'document_name.docx'; // Change the name as needed
        link.click();
      }; 

    return  <div><h1>Export Page</h1></div>;
};

export default Export;