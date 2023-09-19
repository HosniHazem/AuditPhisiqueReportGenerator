import React, { useRef,useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import cvss from 'cvss';
import JoditEditor from 'jodit-react';
import {encode} from 'html-entities';
import {useParams} from 'react-router-dom';
import "./anomalie.scss";


const Anomalie = () => {
const editor=useRef(null);
const ref = useRef(null)
let id = sessionStorage.getItem('project_id');

const config={
  placeholder: "Start typing",

  pasteImage: true,
  uploader: {
    insertImageAsBase64URI: true, // This alFaibles inserting images from URLs
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
  const [id_vul, setId_vul] = useState('');
  const [risk, setRisk] = useState('');
  const [score, setScore] = useState('');
  const [content, setContent] = useState({
    name:"",
    element_imp: "",
    description: "",
    risque: "",
    score_cvss: "",
    score: "",
    AV: "",
    AC: "",
    UI: "",
    PR: "",
    S: "",
    C: "",
    I: "",
    A: "",
    ref: "",
    preuve: "",
    image: "",
    recommendation: "",
    up:"",
    compl:"",
    user_name:"",
    project_id:id
});


const handleLanguage = (e) => {
  e.persist();

  const inputText = e.target.value;
console.log(inputText)
  // Detect the language of the input text
  axios.post(`https://libretranslate.de/detect`, {
    q: inputText
  })
  .then((response) => {
    let detectedLanguage = response.data[0].language;
 
    console.log(detectedLanguage)

    // If detected language is not French (fr), translate to French
    if (detectedLanguage !== 'fr') {
      const translationData = {
        q: inputText,
        source: detectedLanguage,
        target: 'fr'
      };

      // Translate the input text to French
      axios.post(`https://libretranslate.de/translate`, translationData)
        .then((response) => {
          let resultText = response.data.translatedText;
          setContent({...content, [e.target.name]: resultText });
        })
        .catch((error) => {
          console.error('Error translating text:', error);
        });
    } else {
      // Input text is already in French
      let resultText = inputText;
    }
  })
  .catch((error) => {
    console.error('Error detecting language:', error);
  });
};




  const handleChange = (e) => {
    e.persist();
 
    setContent({...content, [e.target.name]: e.target.value });
}
const handleReset = () => {
  window.location.reload();
};

/* const handleClick = useCallback(() => {
  if (ref.current === null) {
    return
  }

  toPng(ref.current, { cacheBust: true, })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = content.name +'.png'
      link.href = dataUrl
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}, [ref,content.name]) */
/* const handleExport = () => {

  axios.get('http://webapp.smartskills.local:8000/api/generate-word-document')
      .then((response) => {
        // Handle the response as needed
        
          swal("Exported","Successfully");
      
      })
      .catch((error) => {
        // Handle errors
        console.error('Error sending data:', error);
      });

} */

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
      updatedContent.AV = 'Réseau';
    } else if (avMatch[1] === 'A') {
      updatedContent.AV = 'Adjacent';
    } else if (avMatch[1] === 'L') {
      updatedContent.AV = 'Locale';
    } else {
      updatedContent.AV = 'Physique';
    }
  }

  if (avMatch) {
    if (avMatch[1] === 'N') {
      updatedContent.AV = 'Réseau';
    } else if (avMatch[1] === 'A') {
      updatedContent.AV = 'Adjacent';
    } else if (avMatch[1] === 'L') {
      updatedContent.AV = 'Locale';
    } else {
      updatedContent.AV = 'Physique';
    }
  }

  if (acMatch) {
    if (acMatch[1] === 'L') {
      updatedContent.AC = 'Faible';
    } else {
      updatedContent.AC = 'Haut';
    }
  }

  if (prMatch) {
    if (prMatch[1] === 'N') {
      updatedContent.PR = 'Aucun';
    } else if (prMatch[1] === 'L') {
      updatedContent.PR = 'Faible';
    } else {
      updatedContent.PR = 'Haut';
    }
  }

  if (uiMatch) {
    if (uiMatch[1] === 'N') {
      updatedContent.UI = 'Aucun';
    } else {
      updatedContent.UI = 'Exigée';
    }
  }

  if (sMatch) {
    if (sMatch[1] === 'U') {
      updatedContent.S = 'Inchangé';
    } else {
      updatedContent.S = 'Changé';
    }
  }

  if (cMatch) {
    if (cMatch[1] === 'N') {
      updatedContent.C = 'Aucun';
    } else if (cMatch[1] === 'L') {
      updatedContent.C = 'Faible';
    } else {
      updatedContent.C = 'Haut';
    }
  }

  if (iMatch) {
    if (iMatch[1] === 'N') {
      updatedContent.I = 'Aucun';
    } else if (iMatch[1] === 'L') {
      updatedContent.I = 'Faible';
    } else {
      updatedContent.I = 'Haut';
    }
  }

  if (aMatch) {
    if (aMatch[1] === 'N') {
      updatedContent.A = 'Aucun';
    } else if (aMatch[1] === 'L') {
      updatedContent.A = 'Faible';
    } else {
      updatedContent.A = 'Haut';
    }
  }
  const modifiedCvss = cvssInput.replace(/^CVSS:\d+\.\d+/, 'CVSS:3.0');

  const scor = cvss.getScore(modifiedCvss); 
  setScore(scor);
  setRisk(cvss.getRating(scor)) ;
console.log(risk)


  
  setContent(updatedContent);

}






  const handleSubmit = (event) => {
    event.preventDefault();

    const modifiedPreuve = preuve.replace(/"/g, "'");


   
    // Prepare your data object to be sent
    const dataToSend = {
      name: encode(content.name),
      element_imp: encode(content.element_imp),
      description: encode(content.description),
      risque: encode(content.risque),
      score_cvss: content.score_cvss,
      score: score,
      AV: content.AV,
      AC: content.AC,
      UI: content.UI,
      PR: content.PR,
      S: content.S,
      C: content.C,
      I: content.I,
      A: content.A,
      ref: encode(content.ref),
      preuve: modifiedPreuve,
      image: risk,
      recommendation: encode(content.recommendation),
      compl: content.compl,
      user_name: userInfo.name,
      project_id: id
    };
    console.log(dataToSend.element_imp)
    // Make the Axios POST request to send the data
    axios.post('http://webapp.smartskills.local:8000/api/Anomalie/create', dataToSend)
      .then((response) => {
        // Handle the response as needed
        if(response.data.status === 200)
        {

          swal("Created",content.name,"success");
        console.log('Data sent successfully!', response.data);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error('Error sending data:', error);
      }); 
  };
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className='datatableTitle1' > <h1>Anomalie</h1></div>
      
     
      <form onSubmit={handleSubmit}>
      <table border="1" style={{ width: '85%',borderCollapse: 'separate', borderSpacing: '0' }}>
        <tr>
        <td style={tableCellStyle}>ID DE LA VULNÉRABILITÉ</td>
          <td style={{ tableCellStyle1,color: 'black' }}>{id_vul}</td>
          <td style={tableCellStyle}>RISQUE</td>
          <td style={{ tableCellStyle1 ,color: 'black' }}><h2>{risk}</h2></td>
        </tr>
        <tr>
        <td style={tableCellStyle}>NOM DE LA VULNÉRABILITÉ</td>
        <td colSpan="3" ><input type="text" name="name" value={content.name} onChange={handleChange}  style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
        </tr>
        <tr>
        <td  style={tableCellStyle}>ÉLÉMENTS IMPACTÉS</td>
        <td colSpan="4" style={{ padding: '0px' }}>
    <textarea
      name="element_imp"
      value={content.element_imp}
      onChange={handleChange}
      style={{
        ...tableCellStyle2,
        width: '96%',
        height: '250px',
        border: 'none',
        padding: '20px',
        wordWrap: 'break-word',
        resize: 'vertical', // Allow vertical resizing
      }}
    />
  </td>
        </tr>
<tr>
  <td colSpan="4" style={tableCellStyle}>
    DESCRIPTION
  </td>
</tr>
<tr>
  <td colSpan="4" style={{ padding: '0px' }}>
    <textarea
      name="description"
      value={content.description}
      onBlur={handleLanguage}
      onChange={handleChange}
      style={{
        ...tableCellStyle2,
        width: '96%',
        height: '250px',
        border: 'none',
        padding: '20px',
        wordWrap: 'break-word',
        resize: 'vertical', // Allow vertical resizing
      }}
    />
  </td>
</tr>
        <tr>
        <td colSpan="4" style={tableCellStyle}>
        RISQUES TECHNIQUES ET MÉTIER
          </td>
        </tr>
        <tr>
        <td colSpan="4" style={{ padding: '0px' }}>
    <textarea
      name="risque"
      value={content.risque}
      onBlur={handleLanguage}
      onChange={handleChange}
      style={{
        ...tableCellStyle2,
        width: '96%',
        height: '250px',
        border: 'none',
        padding: '20px',
        wordWrap: 'break-word',
        resize: 'vertical', // Allow vertical resizing
      }}
    />
  </td>
        </tr>
        <tr>
        <td style={tableCellStyle}>SCORE CVSS v3</td>
        <td colSpan="3" ><input type="text" value={content.score_cvss} name="score_cvss" onChange={handleChange}  onBlur={handleBlur} style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
        </tr>
        <tr>
        <td style={tableCellStyle}><h1>{score}</h1></td>
        <td colSpan={3} style={{ color: 'black', padding: '5px', verticalAlign: 'top', border: '1px solid black' }}>
          <div>
            <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }}>
              <tr>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}} >Métriques "exploitabilité</td>
                <td style={{ width: '500px'}} >
                  <table border="1" style={{ width: '100%',borderCollapse: 'separate', borderSpacing: '0' }} >
                    <tr>
                      <td style={{ width: '400px'}}>Vecteur d'attaque</td>
                      <td style={{ width: '400px'}}><input type="text"  name="AV" value={content.AV}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                    </tr>
                    <tr>
                      <td style={{ width: '400px'}}>Complexité de l'attaque</td>
                      <td style={{ width: '400px'}}><input type="text" name="AC" value={content.AC}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                    </tr>
                    <tr>
                      <td style={{ width: '400px'}}>Privilèges requis</td>
                      <td style={{ width: '400px'}}><input type="text" name="PR" value={content.PR}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                    </tr>
                    <tr>
                      <td style={{ width: '400px'}}>Interaction d’un utilisateur légitime</td>
                      <td style={{ width: '400px'}}><input type="text" name="UI" value={content.UI}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                    </tr>
                    <tr>
                      <td style={{ width: '400px'}}>Périmètre</td>
                      <td style={{ width: '400px'}}><input type="text" name="S" value={content.S}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
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
                      <td style={{ width: '400px'}}><input type="text"  name="C" value={content.C}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                    </tr>
                    <tr>
                      <td style={{ width: '400px'}}>Impact sur l’intégrité</td>
                      <td style={{ width: '400px'}}><input type="text" name="I" value={content.I}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
                    </tr>
                    <tr>
                      <td style={{ width: '400px'}}>Impact sur la disponibilité</td>
                      <td style={{ width: '400px'}}><input type="text" name="A" value={content.A}  style={{ tableCellStyle1, width: '400px',height:'50px' }} /></td>
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
        <td colSpan="4" style={{ padding: '0px' }}>
    <textarea
      name="ref"
      value={content.ref}
      onChange={handleChange}
      style={{
        ...tableCellStyle2,
        width: '96%',
        height: '250px',
        border: 'none',
        padding: '20px',
        wordWrap: 'break-word',
        resize: 'vertical', // Allow vertical resizing
      }}
    />
  </td>
        </tr>
        <tr>
        <td colSpan="4" style={tableCellStyle}>
        PREUVES

          </td>
        </tr>
        <tr>
        <td colSpan="4" style={{  padding: '0px' }} >
          
      
        <div ref={ref}>   {/*  <input type="textarea" name="preuve" value={content.preuve} onChange={handleChange} style={{ tableCellStyle1, width: '96%',height:'300px' ,border: 'none',padding: '20px',wordWrap: 'break-word' }} /> */}
          <JoditEditor
			ref={editor}
			value={preuve}
			config={config}
			onBlur={newPreuve => setPreuve(newPreuve)} // preferred to use only this option to update the content for performance reasons
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
        <td colSpan="4" style={{ padding: '0px' }}>
    <textarea
      name="recommendation"
      value={content.recommendation}
      onBlur={handleLanguage}
      onChange={handleChange}
      style={{
        ...tableCellStyle2,
        width: '96%',
        height: '250px',
        border: 'none',
        padding: '20px',
        wordWrap: 'break-word',
        resize: 'vertical', // Allow vertical resizing
      }}
    />
  </td>
        </tr>
        <tr>
        <td style={tableCellStyle}>Complexité de la recommendation</td>
        <td colSpan="3" ><input type="text" name="compl" value={content.compl} onChange={handleChange}   style={{ tableCellStyle1, width: '100%',height:'100%' ,border: 'none' }} /></td>
        </tr>
      </table>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  <div><Button variant="contained" style={tableCellStyle} type="submit">SAVE</Button></div>
  <div><Button variant="contained" style={tableCellStyle} onClick={handleReset}>RESET</Button></div>
</div>

    </form>
    </div>
  );
};

export default Anomalie;
