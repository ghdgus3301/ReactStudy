import React, {useEffect, useState} from 'react';
import LoginDiv from '../../Style/UserCSS';
import { MyPageDiv } from '../../Style/UserCSS';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase.js';
import {useSelector} from "react-redux";

function Login() {
  const [Email,setEmail] = useState("");
  const [PW,setPW] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(user.accessToken){
        alert("로그인한 회원은 접근 불가능한 페이지입니다.");
        navigate("/");
      }
  },[])

  const SignInFucn = async (e) => { 
    e.preventDefault();
    if(!(Email && PW)){
        return alert("모든 값을 입력해주세요.");
    }
    try{
        await firebase.auth().signInWithEmailAndPassword(Email, PW);
        navigate("/");
    } catch(error) {
        if(error.code === "auth/user-not-found"){
            setErrorMsg("존재하지 않는 이메일입니다.");
        }
        else if(error.code === "auth/wrong-password"){
            setErrorMsg("비밀번호가 일치하지 않습니다.");
        }
        else{
            setErrorMsg("로그인에 실패하였습니다.");
        }
    }

  }

  return( 
  <LoginDiv>
      <form>
      <label>이메일</label>
      <input type = "email" value={Email} onChange={(e) => {
            setEmail(e.currentTarget.value);
      }}></input>
      <label>비밀번호</label>
      <input type = "password" value={PW} onChange={(e) => {
          setPW(e.currentTarget.value);
      }}></input>
      {ErrorMsg != "" && <p style={{color : "red"}}>{ErrorMsg}</p>}
      <button onClick={(e) => SignInFucn(e)
      }>로그인</button>
      <button onClick={(e) => {
          e.preventDefault();
          navigate("/register");
      }}>회원가입</button>
      </form>
  </LoginDiv>
  );
}

export default Login;
