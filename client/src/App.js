import logo from './logo.svg';
import './App.css';
import Test from './Test';
import {Routes, Route} from 'react-router-dom';
import Heading from './component/Heading.js';
import List from './component/Post/List.js';
import Upload from './component/Post/Upload.js';
import Detail from "./component/Post/Detail.js"
import Edit from "./component/Post/Edit.js";

function App() {
  
  return(
    <>
    <Heading></Heading>
    <Routes>
    <Route path = '/' element={<List></List>}></Route>
    <Route path = '/upload' element={<Upload></Upload>}></Route>
    <Route path = '/post/:postNum' element={<Detail></Detail>}></Route>
    <Route path = '/edit/:postNum' element={<Edit></Edit>}></Route>
    </Routes>
    </>
  );
}

export default App;
