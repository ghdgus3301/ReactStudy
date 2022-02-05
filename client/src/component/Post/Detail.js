import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PostDiv,SpinnerDiv, Post, BtnDiv,} from "../../Style/PostDetailCSS.js";
import { Spinner } from 'react-bootstrap';
import {UploadButtonDiv, UploadDiv, UploadForm} from "../../Style/UploadCSS.js";
import { useSelector } from 'react-redux';


function Detail() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    let body = {
        postNum : params.postNum
    }
    axios.post('/api/post/detail', body).then((response) => {
        if(response.data.success){
            setPostInfo(response.data.post);
            setFlag(true);
        }
    }).catch((err) => {
        console.log(err);
    })
  }, [])
  
  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo])

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
        {Flag ? (
            <>
            <Post>
                <h1>{PostInfo.title}</h1>
                <h1>{PostInfo.author.displayName}</h1>
                {PostInfo.image ? ( 
                <img src = {PostInfo.image} alt="" style={{width : "100%", height : 'auto'}}></img> ) : null}
                <p>{PostInfo.content}</p>
            </Post>
            {user.uid === PostInfo.author.uid && ( <BtnDiv>
                <Link to = {`/edit/${PostInfo.postNum}`}>
                <button className='edit'>수정</button>
                </Link>
                <button className='delete' onClick={() => DeleteHandler()}>삭제</button>
            </BtnDiv>)}
            </>
        ) : (
            <SpinnerDiv>
                <Spinner animation='border' role = "status">
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </SpinnerDiv>
        )
        }
    </PostDiv>
  );
}

export default Detail;
