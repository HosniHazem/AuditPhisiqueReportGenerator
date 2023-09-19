import { useEffect, useRef, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import './sidebar.scss';
import swal from 'sweetalert';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';


const project_id = sessionStorage.getItem('project_id');
const project_name = sessionStorage.getItem('project_name');
let info = sessionStorage.getItem("user");
// eslint-disable-next-line 
    let userInfo = JSON.parse(info);
    if (!userInfo) {
        userInfo = {};
      }
    let sidebarNavItems = [
        {
            display: 'Projects',
            icon: <i className='bx bx-briefcase'></i>,
            to: '/projects',
            section: 'projects'
        },
        {
            display: 'Add Anomalies',
            icon: <i className='bx bx-file'></i>,
            to: `/anomalie/`,
            section: 'anomalie'
        },
        {
            display: 'View Anomalies',
            icon: <i className='bx bx-zoom-in'></i>,
            to: '/view-anomalie',
            section: 'view-anomalie'
        },
         {
            display: 'Api Consum',
            icon: <i className='bx bx-comment-detail'></i>,
            to: '/ApiConsum',
            section: 'ApiConsum'
        },
        {
            display: 'Sign Out',
            icon: <i className='bx bx-log-out'></i>,
            to: '/logout',
            section: 'logout'
        }
    ];

 if(userInfo){
    if (userInfo.RoleID !== "0") {
        sidebarNavItems = [
            {
                display: 'Projects',
                icon: <i className='bx bx-briefcase'></i>,
                to: '/projects',
                section: 'projects'
            },
            {
                display: 'Add Anomalie',
                icon: <i className='bx bx-file'></i>,
                section: 'anomalie'
            },
            {
                display: 'Sign Out',
                icon: <i className='bx bx-log-out'></i>,
                to: '/logout',
                section: 'logout'
            }
        ];
    }
}
const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

  
      


    const [projectID, setProjectID] = useState(sessionStorage.getItem('project_id'));
    const [projectName, setProjectName] = useState({
       Nom: project_name
        
    });
    const [name, setName] = useState(userInfo.name || null);


    useEffect(() => {
      // Watch for changes in sessionStorage
      const pollInterval = setInterval(() => {
        const newProjectID = sessionStorage.getItem('project_id');
       
        if (newProjectID !== projectID) {
          setProjectID(newProjectID);
          axios
          .get(`http://webaudit.smartskills.tn:8000/api/Project/${newProjectID}/show`)
          .then((response) => {
            setProjectName(response.data.Project); // Store the entire response data object
          })
          .catch((error) => {
            // Handle errors
            console.error('Error sending data:', error);
          });
      }
      }, 500); // Poll every 1 second 
  
      return () => {
        clearInterval(pollInterval);
      };
    }, [projectID]);

    
    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Web Audit
        </div>
        <div className='project'>
       <Stack direction="row" spacing={2}>
      <Avatar>
        <FolderIcon />  
      </Avatar>
      
      <h3>Project Name:</h3>
      <span>{projectName && projectName.Nom}</span>
   
      </Stack>
      </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}
                            onClick={
                                item.section === 'view-anomalie' && project_id === undefined ? () => navigate('/') :
                                undefined
                            }
                            >
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        <div className='sidebar__footer'>Web Audit V0.2</div>
    </div>;
};

export default Sidebar;