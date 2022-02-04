const express = require('express');
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const port = 5000;
const config = require("./config/key.js");


app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use("/api/post", require("./Router/post.js"))

//mongodb+srv://KoHongHyun:k92092812@cluster0.facnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.listen(port, () => { //서버여는 함수
    mongoose.connect(config.mongoURI)
    .then(() => {
        console.log(`Example app listening on port ${port}`);
        console.log(`Connecting MongoDB...`)
    }).catch((err) => {
        console.log(`${err}`);
    });
  });

app.get('/', (req, res) => { //서버 응답함수
  res.sendFile(path.join(__dirname,"../client/build/index.html"));
});

app.get('*', (req, res) => { //서버 응답함수
    res.sendFile(path.join(__dirname,"../client/build/index.html"));
  });
  






