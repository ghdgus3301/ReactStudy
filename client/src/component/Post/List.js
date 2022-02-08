
import React, { useState, useEffect } from "react";
import axios from "axios";
import {ListDiv,ListItem} from "../../Style/ListCSS";
import {Link} from "react-router-dom";
import Avatar from "react-avatar";

function List(props) {
    const [PostList, setPostList] = useState([]);
    useEffect(() => {
        axios.post("/api/post/list").then((response) => {
            if(response.data.success){
                setPostList([...response.data.postList]);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

  return (
    <ListDiv>
        {PostList.map((post, idx) => {
            console.log(post);
            return (

                    <ListItem key = {idx}>
                        <Link to = {`/post/${post.postNum}`}>
                        <p className = "title">제목 : {post.title}</p>
                        <Avatar size = "40" round ={true} src ={post.author.photoURL} style ={{border : "1px solid #c6c6c6"}}></Avatar>
                        <p className = "author">{post.author.displayName}</p>
                        <p>내용 : {post.content}</p>
                        </Link>
                    </ListItem>
            )
        })}
    </ListDiv>

    );
}

export default List;
