import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PostDiv, Post, BtnDiv,} from "../../Style/PostDetailCSS.js";
import { useSelector } from 'react-redux';
import Avatar from "react-avatar";

function Detail(props) {
  let params = useParams();
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const DeleteHandler = () => {
      if(window.confirm("정말로 삭제하시겠습니까?")){
        let body = {
            postNum : params.postNum
        }
        axios.post('/api/post/delete', body).then((response) => {
            if(response.data.success){
                alert("게시글이 삭제되었습니다.");
                navigate("/");
            }
        }).catch((err) => {
            alert("게시글 삭제에 실패하였습니다.");
        })
      }
  }

  return (
    <PostDiv>
            <Post>
                <h1>제목 : {props.PostInfo.title}</h1>
                <p className='author'>
                    <Avatar size = "40" round ={true} src ={props.PostInfo.author.photoURL} style ={{border : "1px solid #c6c6c6"}}></Avatar>
                    {props.PostInfo.author.displayName}
                </p>
                {props.PostInfo.image ? ( 
                <img src = {props.PostInfo.image} alt="" style={{width : "100%", height : 'auto'}}></img> ) : null}
                <p>{props.PostInfo.content}</p>
            </Post>
            {user.uid === props.PostInfo.author.uid && ( <BtnDiv>
                <Link to = {`/edit/${props.PostInfo.postNum}`}>
                <button className='edit'>수정</button>
                </Link>
                <button className='delete' onClick={() => DeleteHandler()}>삭제</button>
            </BtnDiv>)}
    </PostDiv>
  );
}

export default Detail;
