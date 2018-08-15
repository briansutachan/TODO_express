var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static("css"));


var task = ["buy food", "go to treehouse"];

var complete = ["complete the tasks"];

app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;
    console.log(completeTask + "Hello");
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});


app.get('/', (req, res) => {
    res.render('index', { task: task, complete: complete });
});

app.listen(8806, () => {
    console.log('Working in the app')
});