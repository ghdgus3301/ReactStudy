import React, {useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Test from './Test';
import {Routes, Route} from 'react-router-dom';
import Heading from './component/Heading.js';
import List from './component/Post/List.js';
import Upload from './component/Post/Upload.js';
import Detail from "./component/Post/Detail.js"
import Edit from "./component/Post/Edit.js";
import Login from './component/User/Login';
import Register from './component/User/Register';
import { useDispatch } from 'react-redux';
import {loginUser, clearUser} from "./Reducer/userSlice.js";
import firebase from "./firebase.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if(userInfo !== null){
        dispatch(loginUser(userInfo.multiFactor.user));
      }else{
        dispatch(clearUser());
      }
    })
  },[])


  return(
    <>
    <Heading></Heading>
    <Routes>
    <Route path = '/' element={<List></List>}></Route>
    <Route path = '/upload' element={<Upload></Upload>}></Route>
    <Route path = '/post/:postNum' element={<Detail></Detail>}></Route>
    <Route path = '/edit/:postNum' element={<Edit></Edit>}></Route>
    <Route path = '/login' element={<Login></Login>}></Route>
    <Route path = '/register' element={<Register></Register>}></Route>
    </Routes>
    </>
  );
}

export default App;
