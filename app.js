const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
let userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
let User = mongoose.model('User', userSchema);

app.set('view engine', 'ejs');
app.set('views');

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('index', {
    users: [],
  });
});
app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
  mongoose.connect(
    'mongodb://localhost:27017/dallasDB',
    { useNewUrlParser: true },
    (err) => {
      let newUser = new User({
        name: req.body.name,
        age: req.body.age,
      });
      newUser.save((err, result) => {
        console.log(result);
        mongoose.disconnect();
        res.redirect('/');
      });
    }
  );
});
app.listen(3000, () => {
  console.log('server is running');
});
