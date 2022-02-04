import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {UploadButtonDiv, UploadDiv, UploadForm} from "../../Style/UploadCSS.js";

function Edit() {
    let params = useParams();
    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);
    const [Title, setTitle] = useState("제목 입력");
    const [Content, setContent] = useState("내용 입력");
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
        setTitle(PostInfo.title);
        setContent(PostInfo.content);
        }, [PostInfo])

      const onSubmit = (e) => {
        e.preventDefault();
        if((Title === "" || Content === "") || (Title === "제목 입력" || Content === "내용 입력")){
          return alert("모든 항목을 채워주세요");
        }

        let body = {
          title : Title,
          content : Content,
          postNum : params.postNum,
        }

        axios.post("/api/post/edit", body).then((response) => {
          if(response.data.success){
            alert("글 수정이 완료되었습니다.");
            navigate(`/post/${params.postNum}`);
             
          } else{
            alert("글 수정에 실패하였습니다.");
          }
        }).catch((err) => {
          console.log(err);
        })
    };
  return(
  <UploadDiv>
    <UploadForm>
    <label htmlFor="">제목</label>
    <input id = 'title' type = 'text' value={Title} onChange={(event) => {
      setTitle(event.currentTarget.value);
      }} onClick={() => {
          if(Title === "제목 입력" || "")
            setTitle("");
      }}></input>
      <label htmlFor="content">내용</label>
      <textarea
      value={Content} onChange={(event) => {
        setContent(event.currentTarget.value);
        }} onClick={() => {
          if(Content === "내용 입력" || "")
              setContent("");
      }}></textarea>

        <UploadButtonDiv>
        <button className = "cancel" onClick={(e) => {
            e.preventDefault();
            navigate(-1);
            
            
        }}>취소</button>
        <button onClick={(e) => onSubmit(e)}>수정 완료</button>
        </UploadButtonDiv>

    </UploadForm> 
    

  </UploadDiv>);
}

export default Edit;
