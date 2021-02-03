const express = require('express');
const multer = require('multer'); // multerモジュールを読み込む
const { v4: uuidv4 } = require('uuid');
uuidv4();

const app = express(); //expressをappに入れてる

// webフォルダの中身を公開する
app.use(multer().none());
app.use(express.static('unchi'));

const todoList = [];

// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    // JSONを送信する
    res.json(todoList);
});

// http://localhost:3000/api/v1/add にデータを送信してきたときに
// TODOリストに項目を追加する
app.post('/api/v1/add', (req, res) => {
    const todoData = req.body;
    console.log(req.body)
    const todoTitle = todoData.title;

    // ユニークIDを生成する
    const id = uuidv4();
    console.log(id);
    const todoItem = {
        id,
        title: todoTitle,
        done: false
    };

    // TODOリストに項目を追加する
    todoList.push(todoItem);

    // コンソールに出力する
    console.log('Add: ' + JSON.stringify(todoItem));

    // 追加した項目をクライアントに返す
    res.json(todoItem);
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));