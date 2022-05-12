import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import {Button} from '@mui/material';
import HomePage from "./pages/home.page";
import InvalidPage from "./pages/invalid.page";
import LoginModal from "./components/loign/login.modal";
import { useSelector, useDispatch } from 'react-redux';
import {clearLoginData} from './api-services/utility/userSlice';
import useAuth from "./api-services/utility/user.auth";

function App() {
  const userAuth = useAuth();
  const dispatch = useDispatch();
  const {loginState,userName} = useSelector((state) => state.user);
  console.log('log_ no # APP App useAuth var: ',userAuth);
  const logout = (event) => {
    // localStorage.clear();
    dispatch(clearLoginData({}));
    console.log('redux state: ',loginState,userName);
  } 
  return (
    <div>
      <Button onClick={logout} variant='contained'>Logout</Button>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='*' element={<InvalidPage/>}/>
        </Routes>
      </Router>
      <LoginModal openModal={!userAuth} />
      <h1>username:{userName}, state:{loginState? 'true': 'false'}</h1>
    </div>
     
  );
}

export default App;
