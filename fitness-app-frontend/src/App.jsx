import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/authSlice';
import { AuthContext } from 'react-oauth2-code-pkce';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router"
import { Box, Button } from '@mui/material';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetail from './components/ActivityDetail';

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } 
      = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {
        !token ? (
        <Button variant="contained"
          onClick={() => {logIn();}}>
          LOGIN
        </Button>
      ) : (
        <div>
         <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Button variant="contained" onClick={() => {logOut();}} >
            LOGOUT  
          </Button>
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />}/>
            <Route path="/activities/:id" element={<ActivityDetail />}/>
            <Route path="/" element={token ? <Navigate to="/activities" replace/> :
                                  <div>Welcome! Please login</div>}/>
          </Routes>
        </Box>
        </div>
        )
      }
    </Router>
  )
}

export default App
