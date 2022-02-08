import React from 'react';
import RepleList from './RepleList';
import RepleUpload from './RepleUpload';
import { useSelector} from "react-redux";

function RepleArea(props) {
    const user = useSelector((state) => state.user);
  return( 
  <div>
      {user.accessToken && <RepleUpload postId = {props.postId}></RepleUpload>}
      <RepleList  postId = {props.postId}></RepleList>
  </div>);
}

export default RepleArea;
