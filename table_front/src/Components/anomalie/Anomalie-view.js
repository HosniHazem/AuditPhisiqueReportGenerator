
import React, { useRef,useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import cvss from 'cvss';
import JoditEditor from 'jodit-react';
import {useParams,useNavigate} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import {encode} from 'html-entities';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./anomalie.scss";

const View = () => {
  const project_id = sessionStorage.getItem('project_id');
    const editor=useRef(null);
    const ref = useRef(null)
    const navigate = useNavigate();
    
    let info = sessionStorage.getItem("user");
    // eslint-disable-next-line 
    let userInfo = JSON.parse(info);
    const config={
      placeholder: "Start typing",
    
      pasteImage: true,
      uploader: {
        insertImageAsBase64URI: true, // This allows inserting images from URLs
      },
      events: {
        afterPaste: (data) => {
          if (data.html) {
            // Process the pasted content here, including images
            setPreuve(data.html);
          }
        },
      },
      }
         const [anomalies, setAnomalies] = useState([]);

    useEffect(() => {
      axios.post(`http://webaudit.smartskills.tn:8000/api/my-anomalies/${project_id}`,).then((res) => {
        if(res.status === 200){
          const sortedAnomalies = res.data.Anomalies.sort((a, b) => b.score - a.score);
          setAnomalies(sortedAnomalies);
   }
      }) 
       .catch((error) => {
        // Handle errors
        console.error('Error sending data:', error);
        swal("Error","Select a project");
        navigate("/");

      });
    }, []);
    const [project, setProject] = useState(1); 
    useEffect(() => {
      axios.get(`http://webaudit.smartskills.tn:8000/api/Project/${project_id}/show/`).then((res) => {
        if(res.status === 200){
          setProject( res.data.Project);
          console.log(res.data)
   }
      }) 
       .catch((error) => {
        // Handle errors
        console.error('Error sending data:', error);
  

      });
    }, []);
   let p=sessionStorage.getItem('page');
    const [currentPage, setCurrentPage] = useState(p);
const itemsPerPage = 1; // You can adjust this as needed
    console.log(anomalies)
    
      const tableCellStyle = {
        padding: '5px',
        backgroundColor: '#386494',
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'middle',
      };
      const tableCellStyle2 = {
        padding: '5px',
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'middle',
      };
      const buttonstyle = {
        padding: '1px',
        backgroundColor: '#1976d2',
        color: 'white',
      
      };
      const tableCellStyle1 = {
        padding: '5px',
        backgroundColor: '#d7e0ea',
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'middle',
      };
      const [id_vul, setId_vul] = useState('');
      const [risk, setRisk] = useState('');
      const [score, setScore] = useState('');
      const [content, setContent] = useState([]);
      const [open, setOpen] = React.useState(false);
      const [Now, setNow] = useState('');
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      const handleClickOpen = (anom) => {
        setOpen(true);
        setNow(anom);
        setPreuve(anom.preuve)
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    
    
      const handleChange = (e) => {
        e.persist();
     
        setNow({...Now, [e.target.name]: e.target.value });
    }
   

    
  
    const [preuve, setPreuve] = useState("");
    const handleBlur = (event) => {
      const cvssInput = event.target.value;
      var cvss = require('cvss');
      const avMatch = cvssInput.match(/AV:([NALP])/);
      const prMatch = cvssInput.match(/PR:([LHN])/);
      const sMatch = cvssInput.match(/S:([UC])/);
      const aMatch = cvssInput.match(/A:([NLH])/);
      const cMatch = cvssInput.match(/\/C:([NLH])/);
      const acMatch = cvssInput.match(/\/AC:([LH])/);
      const iMatch = cvssInput.match(/\/I:([NLH])/);
      const uiMatch = cvssInput.match(/\/UI:([NR])/);
      
      
      const updatedContent = {
        ...content,
      };
    
      if (avMatch) {
        if (avMatch[1] === 'N') {
          updatedContent.AV = 'Network';
        } else if (avMatch[1] === 'A') {
          updatedContent.AV = 'Adjacent';
        } else if (avMatch[1] === 'L') {
          updatedContent.AV = 'Local';
        } else {
          updatedContent.AV = 'Physical';
        }
      }
    
      if (avMatch) {
        if (avMatch[1] === 'N') {
          updatedContent.AV = 'Network';
        } else if (avMatch[1] === 'A') {
          updatedContent.AV = 'Adjacent';
        } else if (avMatch[1] === 'L') {
          updatedContent.AV = 'Local';
        } else {
          updatedContent.AV = 'Physical';
        }
      }
    
      if (acMatch) {
        if (acMatch[1] === 'L') {
          updatedContent.AC = 'Low';
        } else {
          updatedContent.AC = 'High';
        }
      }
    
      if (prMatch) {
        if (prMatch[1] === 'N') {
          updatedContent.PR = 'None';
        } else if (prMatch[1] === 'L') {
          updatedContent.PR = 'Low';
        } else {
          updatedContent.PR = 'High';
        }
      }
    
      if (uiMatch) {
        if (uiMatch[1] === 'N') {
          updatedContent.UI = 'None';
        } else {
          updatedContent.UI = 'Required';
        }
      }
    
      if (sMatch) {
        if (sMatch[1] === 'U') {
          updatedContent.S = 'Unchanged';
        } else {
          updatedContent.S = 'Changed';
        }
      }
    
      if (cMatch) {
        if (cMatch[1] === 'N') {
          updatedContent.C = 'None';
        } else if (cMatch[1] === 'L') {
          updatedContent.C = 'Low';
        } else {
          updatedContent.C = 'High';
        }
      }
    
      if (iMatch) {
        if (iMatch[1] === 'N') {
          updatedContent.I = 'None';
        } else if (iMatch[1] === 'L') {
          updatedContent.I = 'Low';
        } else {
          updatedContent.I = 'High';
        }
      }
    
      if (aMatch) {
        if (aMatch[1] === 'N') {
          updatedContent.A = 'None';
        } else if (aMatch[1] === 'L') {
          updatedContent.A = 'Low';
        } else {
          updatedContent.A = 'High';
        }
      }
      const modifiedCvss = cvssInput.replace(/^CVSS:\d+\.\d+/, 'CVSS:3.0');
    
      const scor = cvss.getScore(modifiedCvss); 
      setScore(scor);
      setRisk(cvss.getRating(scor)) ;
    console.log(risk)
    
    
      
      setContent(updatedContent);
    
    }
    
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  
    const handleUpdate = (anomalie) => {
      setSelectedAnomaly(anomalie);
      setOpenUpdateDialog(true);
    };
  
    const handleCloseUpdateDialog = () => {
      setOpenUpdateDialog(false);
    };

    const handleValidate = (ids,e) => {

      e.persist();

      axios.put(`http://webaudit.smartskills.tn:8000/api/Anomalie/${ids}/validate`)
      .then((response) => {
        // Handle the response as needed
        if(response.data.status === 200)
        {
          sessionStorage.setItem('page',currentPage);

          swal("Validated","successfully");
          window.location.reload();
        console.log('Data sent successfully!', response.data);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error('Error sending data:', error);
      });  
  };
    const handleDevalidate = (ids,e) => {

      e.persist();
      axios.put(`http://webaudit.smartskills.tn:8000/api/Anomalie/${ids}/devalidate`)
      .then((response) => {
        // Handle the response as needed
        if(response.data.status === 200)
        {
          sessionStorage.setItem('page',currentPage);
          swal("Devalidated","successfully");
          window.location.reload();
        console.log('Data sent successfully!', response.data);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error('Error sending data:', error);
      });  
  };


    const handleSubmit = (event) => {
      event.preventDefault();
  
      const modifiedPreuve = preuve.replace(/"/g, "'");
  
  
     
      // Prepare your data object to be sent
      const dataToSend = {
        name: encode(Now.name),
        element_imp: encode(Now.element_imp),
        description: encode(Now.description),
        risque: encode(Now.risque),
        score_cvss: Now.score_cvss,
        score: Now.score,
        AV: Now.AV,
        AC: Now.AC,
        UI: Now.UI,
        PR: Now.PR,
        S: Now.S,
        C: Now.C,
        I: Now.I,
        A: Now.A,
        ref: encode(Now.ref),
        preuve: modifiedPreuve,
        image: Now.image,
        recommendation: encode(Now.recommendation),
        compl: Now.compl,
        user_name: userInfo.name,
        project_id: Now.project_id
      };
      console.log(dataToSend);
      // Make the Axios POST request to send the data
      axios.put(`http://webaudit.smartskills.tn:8000/api/Anomalie/${Now.id}/update`, dataToSend)
        .then((response) => {
          // Handle the response as needed
          if(response.data.status === 200)
          {
  
            swal("Updated",Now.name,"success");
          console.log('Data sent successfully!', response.data);
          }
        })
        .catch((error) => {
          // Handle errors
          console.error('Error sending data:', error);
        });  
    };




    const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedAnomalies = anomalies.slice(startIndex, endIndex);

      return (
        <div>

<Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth={false}>
        <DialogTitle>{Now.name}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent >
        <form  onSubmit={handleSubmit} >
          <table border="1" style={{ width: '85%',borderCollapse: 'separate', borderSpacing: '0' }}>
              <tr>
            <td style={tableCellStyle}>Project</td>
              <td style={{ tableCellStyle1,color: 'black' }}><h2>{project.Nom}</h2></td>
              <td style={tableCellStyle}>User Created</td>
              <td style={{ tableCellStyle1 ,color: 'black' }}><h2>{Now.user_name}</h2></td>
            </tr>
            <tr>
            <td style={tableCellStyle}>ID DE LA VULNÉRABILITÉ</td>
              <td style={{ tableCellStyle1,color: 'black' }}></td>
              <td style={tableCellStyle}>RISQUE</td>
              <td style={{ tableCellStyle1 ,color: 'black' }}><h2>{Now.image}</h2></td>
            </tr>
            <tr>
            <td style={tableCellStyle}>NOM DE LA VULNÉRABILITÉ</td>
            <td colSpan="3" ><input type="text" name="name" value={Now.name} onChange={handleChange}  style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
            </tr>
            <tr>
            <td  style={tableCellStyle}>ÉLÉMENTS IMPACTÉS</td>
            <td colSpan="3" ><input type="text" name="element_imp"  value={Now.element_imp} onChange={handleChange} style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
                DESCRIPTION
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea" name="description"  value={Now.description} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'250px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
            RISQUES TECHNIQUES ET MÉTIER
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea" name="risque"  value={Now.risque} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'250px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
            <td style={tableCellStyle}>SCORE CVSS v3</td>
            <td colSpan="3" ><input type="text" value={Now.score_cvss} name="score_cvss" onChange={handleChange}  onBlur={handleBlur} style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
            </tr>
            <tr>
            <td style={tableCellStyle}><h1>{Now.score}</h1></td>
            <td colSpan={3} style={{ color: 'black', padding: '5px', verticalAlign: 'top', border: '1px solid black' }}>
              <div>
                <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }}>
                  <tr>
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >Métriques "exploitabilité</td>
                    <td style={{ width: '500px'}} >
                      <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }} >
                        <tr>
                          <td style={{ width: '400px'}}>Vecteur d'attaque</td>
                          <td style={{ width: '400px'}}><input type="text"  name="AV" value={Now.AV}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Complexité de l'attaque</td>
                          <td style={{ width: '400px'}}><input type="text" name="AC" value={Now.AC}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Privilèges requis</td>
                          <td style={{ width: '400px'}}><input type="text" name="PR" value={Now.PR}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Interaction d’un utilisateur légitime</td>
                          <td style={{ width: '400px'}}><input type="text" name="UI" value={Now.UI}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Périmètre</td>
                          <td style={{ width: '400px'}}><input type="text" name="S" value={Now.S}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>Métriques d’impact</td>
                    <td style={{ width: '400px'}}>
                      <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }} >
                        <tr>
                          <td style={{ width: '400px'}} >Impacte sur la confidentialité</td>
                          <td style={{ width: '400px'}}><input type="text"  name="C" value={Now.C}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Impact sur l’intégrité</td>
                          <td style={{ width: '400px'}}><input type="text" name="I" value={Now.I}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Impact sur la disponibilité</td>
                          <td style={{ width: '400px'}}><input type="text" name="A" value={Now.A}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                </div>
              </td>
         
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
            RÉFÉRENCES
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea"  name="ref" value={Now.ref} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'300px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
            PREUVES
    
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} >
              
          
            <div ref={ref}>   {/*  <input type="textarea" name="preuve" value={Now.preuve} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'300px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /> */}
              <JoditEditor
                ref={editor}
                value={Now.preuve}
                config={config}
                onBlur={newPreuve => setPreuve(newPreuve)} // preferred to use only this option to update the Now for performance reasons
            />
        </div>
           </td>
            </tr>

            <tr>
            <td colSpan="4" style={tableCellStyle}>
            RECOMMANDATIONS
    
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea" name="recommendation" value={Now.recommendation} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'300px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
        <td style={tableCellStyle}>Complexité de la recommendation</td>
        <td colSpan="3" ><input type="text" name="compl" value={Now.compl} onChange={handleChange}   style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
        </tr>
       
              <tr>
              <td colSpan={4}>
  </td>
  </tr>
          </table>

          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type="submit">Update</Button>
        </DialogActions>
          </form>
          
        </DialogContent>
     
      </Dialog>
          

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className='datatableTitle1' > <h1>Anomalie</h1></div>
          
    
          <form>
          {displayedAnomalies.map((anomalie) => (
          <table border="1" style={{ width: '85%',borderCollapse: 'separate', borderSpacing: '0' }}>
              <tr>
            <td style={tableCellStyle}>Project</td>
              <td style={{ tableCellStyle1,color: 'black' }}><h2>{project.Nom}</h2></td>
              <td style={tableCellStyle}>User Created</td>
              <td style={{ tableCellStyle1 ,color: 'black' }}><h2>{anomalie.user_name}</h2></td>
            </tr>
            <tr>
            <td style={tableCellStyle}>ID DE LA VULNÉRABILITÉ</td>
              <td style={{ tableCellStyle1,color: 'black' }}></td>
              <td style={tableCellStyle}>RISQUE</td>
              <td style={{ tableCellStyle1 ,color: 'black' }}><h2>{anomalie.image}</h2></td>
            </tr>
            <tr>
            <td style={tableCellStyle}>NOM DE LA VULNÉRABILITÉ</td>
            <td colSpan="3" ><input type="text" name="name" value={anomalie.name} onChange={handleChange}  style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
            </tr>
            <tr>
            <td  style={tableCellStyle}>ÉLÉMENTS IMPACTÉS</td>
            <td colSpan="3" ><input type="text" name="element_imp"  value={anomalie.element_imp} onChange={handleChange} style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
                DESCRIPTION
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea" name="description"  value={anomalie.description} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'250px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
            RISQUES TECHNIQUES ET MÉTIER
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea" name="risque"  value={anomalie.risque} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'250px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
            <td style={tableCellStyle}>SCORE CVSS v3</td>
            <td colSpan="3" ><input type="text" value={anomalie.score_cvss} name="score_cvss" onChange={handleChange}  onBlur={handleBlur} style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
            </tr>
            <tr>
            <td style={tableCellStyle}><h1>{anomalie.score}</h1></td>
            <td colSpan={3} style={{ color: 'black', padding: '5px', verticalAlign: 'top', border: '1px solid black' }}>
              <div>
                <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }}>
                  <tr>
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >Métriques "exploitabilité</td>
                    <td style={{ width: '500px'}} >
                      <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }} >
                        <tr>
                          <td style={{ width: '400px'}}>Vecteur d'attaque</td>
                          <td style={{ width: '400px'}}><input type="text"  name="AV" value={anomalie.AV}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Complexité de l'attaque</td>
                          <td style={{ width: '400px'}}><input type="text" name="AC" value={anomalie.AC}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Privilèges requis</td>
                          <td style={{ width: '400px'}}><input type="text" name="PR" value={anomalie.PR}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Interaction d’un utilisateur légitime</td>
                          <td style={{ width: '400px'}}><input type="text" name="UI" value={anomalie.UI}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Périmètre</td>
                          <td style={{ width: '400px'}}><input type="text" name="S" value={anomalie.S}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>Métriques d’impact</td>
                    <td style={{ width: '400px'}}>
                      <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }} >
                        <tr>
                          <td style={{ width: '400px'}} >Impacte sur la confidentialité</td>
                          <td style={{ width: '400px'}}><input type="text"  name="C" value={anomalie.C}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Impact sur l’intégrité</td>
                          <td style={{ width: '400px'}}><input type="text" name="I" value={anomalie.I}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                        <tr>
                          <td style={{ width: '400px'}}>Impact sur la disponibilité</td>
                          <td style={{ width: '400px'}}><input type="text" name="A" value={anomalie.A}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                </div>
              </td>
         
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
            RÉFÉRENCES
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea"  name="ref" value={anomalie.ref} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'300px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
            <td colSpan="4" style={tableCellStyle}>
            PREUVES
    
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} >
              
          
            <div ref={ref}>   {/*  <input type="textarea" name="preuve" value={anomalie.preuve} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'300px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /> */}
              <JoditEditor
                ref={editor}
                value={anomalie.preuve}
                config={config}
                onBlur={newPreuve => setPreuve(newPreuve)} // preferred to use only this option to update the anomalie for performance reasons
            />
        </div>
           </td>
            </tr>

            <tr>
            <td colSpan="4" style={tableCellStyle}>
            RECOMMANDATIONS
    
              </td>
            </tr>
            <tr>
            <td colSpan="4" style={{  padding: '0px' }} ><input type="textarea" name="recommendation" value={anomalie.recommendation} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'300px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /></td>
            </tr>
            <tr>
        <td style={tableCellStyle}>Complexité de la recommendation</td>
        <td colSpan="3" ><input type="text" name="compl" value={anomalie.compl} onChange={handleChange}   style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
        </tr>
          {/*   <tr>
            <Tooltip title={anomalie.name}>
              <td colSpan="4" style={tableCellStyle2}>Current Item</td>
              </Tooltip>
              </tr> */}
              <tr>
              <td colSpan={4} style={{textAlign:'center',alignContent:'center',alignItems:'center'}}>
    <Button
      variant="contained"
      color="primary"
      
      onClick={() => handleClickOpen(anomalie)} // Pass the anomaly to the update handler
    >
      Update
    </Button>
    <Button
      variant="contained"
      color={anomalie.validation === "Yes" ? "secondary" : "primary"}
      
      onClick={(e) => {
        if (anomalie.validation === "No") {
          // Handle the validation logic here
          handleValidate(anomalie.id,e);
        } else if (anomalie.validation === "Yes") {
          // Handle the update logic here
          handleDevalidate(anomalie.id,e);
        } }}
    >
      {anomalie.validation === "No" ? "Validate" : "Validated"}
    </Button>
  </td>
  </tr>
          </table>

))}
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div style={{ width: '50%' }}>
  
    <Stack spacing={2}>
   
      <Pagination
        count={Math.ceil(anomalies.length / itemsPerPage)}
        color="primary"
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        
      />

    </Stack>
    
  </div>
 
</div>

    
        </form>
      
        </div>
        
      );
    };
    
    export default View;
    