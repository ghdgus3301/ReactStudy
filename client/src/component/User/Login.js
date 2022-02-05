import React, {useState} from 'react';
import LoginDiv from '../../Style/UserCSS';
import { MyPageDiv } from '../../Style/UserCSS';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [Email,setEmail] = useState("");
  const [PW,setPW] = useState("");
  let navigate = useNavigate();
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
      <button>로그인</button>
      <button onClick={(e) => {
          e.preventDefault();
          navigate("/register");
      }}>회원가입</button>
      </form>
  </LoginDiv>
  );
}

export default Login;
