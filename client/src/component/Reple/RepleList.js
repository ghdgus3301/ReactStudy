import React, {useEffect, useState} from 'react';
import axios from 'axios'; 
import RepleContent from './RepleContent.js';
import { RepleListDiv } from '../../Style/RepleCSS.js';

function RepleList(props) {

    const [repleList, setrepleList] = useState([]);
    useEffect(() => {
        let body = {
            postId : props.postId
        };
        axios.post("/api/reple/getReple", body).then((response) => {
            if(response.data.success){
                setrepleList([...response.data.repleList]);
            }
        })
    },[])


  return( 
    <RepleListDiv>
        {repleList.map((reple,idx) => {
            return <RepleContent reple ={reple} key={idx}></RepleContent>
        })}
    </RepleListDiv>
  );
}

export default RepleList;
