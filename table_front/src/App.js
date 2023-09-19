import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "./Components/layout/AppLayout";
import Anomalie from './Components/anomalie/Anomalie';
import View from './Components/anomalie/Anomalie-view';
import Projects from './Components/projects/Projects';
import Blank from './pages/Blank';
import Login from './Session/login';
import Logout from './Session/logout';
import Export from './pages/Export';
import ApiGet from './Components/ApiConsum/ApiGEt';

function App() {
    let info = sessionStorage.getItem("user");
// eslint-disable-next-line 
let userInfo = JSON.parse(info);
const project_id = sessionStorage.getItem('project_id');


if(userInfo){
var Role=userInfo.RoleID;
}
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<AppLayout />}>
                    <Route index element={
    !sessionStorage.getItem('token')  ? (
      <Navigate to='/login' />
    ) : (
      <View />
    )
  } />
                    <Route path='/projects' element={
    !sessionStorage.getItem('token')  ? (
      <Navigate to='/login' />
    ) : (
      <Projects />
    )
  } />
          
                    <Route path='/anomalie/' element={
    !sessionStorage.getItem('token') || project_id===undefined ? (
      <Navigate to='/login' />
    ) : (
      <Anomalie />
    )
  } />
            <Route path='/ApiConsum' element={
    !sessionStorage.getItem('token')  ? (
      <Navigate to='/login' />
    ) : (
      <ApiGet />
    )
  } />
             
                 {/*    <Route path='/export/:id' element={
    !sessionStorage.getItem('token') || Role !== "0"  ? (
      <Navigate to='/login' />
    ) : (
      <Export />
    )
  } /> */}
                    <Route path='/view-anomalie' element={
    !sessionStorage.getItem('token') || Role !== "0" || project_id===undefined  ? (
      <Navigate to='/login' />
    ) : (
      <View />
    )
  } />
                    
                    <Route path='/annexe'  element={
    !sessionStorage.getItem('token')  ? (
      <Navigate to='/login' />
    ) : (
      <Blank />
    )
  } />
                    <Route path='/logout' element={
    !sessionStorage.getItem('token')  ? (
      <Navigate to='/login' />
    ) : (
      <Logout />
    )
  } />
                    <Route path='/login' element={
    sessionStorage.getItem('token')  ? (
      <Navigate to='/' />
    ) : (
      <Login />
    )
  } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;