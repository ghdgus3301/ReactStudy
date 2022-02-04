
import React, { useState, useEffect } from "react";
import axios from "axios";
import {ListDiv,ListItem} from "../../Style/ListCSS";
import {Link} from "react-router-dom";
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
            return (
                
                    <ListItem key = {idx}>
                        <Link to = {`/post/${post.postNum}`}>
                        <p className = "title">제목 : {post.title}</p>
                        <p>내용 : {post.content}</p>
                        </Link>
                    </ListItem>
            )
        })}
    </ListDiv>

    );
}

export default List;
