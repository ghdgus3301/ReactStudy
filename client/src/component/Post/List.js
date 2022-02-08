
import React from "react";
import {ListDiv,ListItem} from "../../Style/ListCSS";
import {Link} from "react-router-dom";
import Avatar from "react-avatar";
import moment from "moment";
import "moment/locale/ko";

function List(props) {
    
    const SetTime = (a, b) => {
        if(a !== b){
            return moment(b).format('YYYY년 MMMM Do , hh:mm') + "(수정됨)";
        }else{
            return moment(a).format('YYYY MMMM Do , hh:mm');
        }
    }
  return (
    <ListDiv>
        {props.PostList.map((post, idx) => {
            console.log(post);
            return (

                    <ListItem key = {idx}>
                        <Link to = {`/post/${post.postNum}`}>
                        <p className = "title">제목 : {post.title}</p>
                        <Avatar size = "40" round ={true} src ={post.author.photoURL} style ={{border : "1px solid #c6c6c6"}}></Avatar>
                        <p className = "author">{post.author.displayName}</p>
                        <p>내용 : {post.content}</p>
                        <p>{SetTime(post.createdAt, post.updatedAt)}</p>
                        </Link>
                    </ListItem>
            )
        })}
    </ListDiv>

    );
}

export default List;
