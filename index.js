var express = require('express');
//var lodash = require('lodash');
var fs = require('fs');
var path = require('path');
var app = express();


function getProjects(){
     var projects = fs.readdirSync(__dirname).map(function (dir) {
        var commands = [];
        try {
            commands = fs.readdirSync(__dirname + "/" + dir + "/sh").map(function (filename) {
                return path.basename(filename, '.sh')
            })
        } catch (e) {
        }
        return {
            project: dir,
            commands: commands
        }
    }).filter(function (prj) {
        return prj.commands.length;
    });
    return projects;
}

app.all('/', function (req, res) {

    res.json(getProjects());
});

var logs = {};
app.all('/logs', function (req, res) {
    var result = Object.keys(logs).map(function(logId){
       return '<a href="/log?id='+ logId + '">' + logId +'</a>';
    });
    return res.send(result);
});
app.all('/log', function (req, res) {
    var logId = req.param('id');
    return res.json(logs[logId]);
});
app.all('/deploy', function (req, res) {
    var logId = +new Date();
    logs[logId] = [];
    function log(buffer) {
        var str = buffer.toString();
        logs[logId].push(str);
        console.log(str);
    }

    var project = req.param('project');
    var cwd = path.join(__dirname, project);
    var shell = path.join(__dirname, project, "sh", "run.sh");

    var spawn = require('child_process').spawn;
    var proc = spawn('/bin/sh', [shell], {env:process.env, cwd: cwd});
    proc.stdout.on('data', log);
    proc.stderr.on('data', log);
    res.redirect("/log?id="+logId);
    //
    //require('child_process').exec('/bin/sh ' + script, function (err, stdout, stderr) {
    //    var logs = stdout.toString();
    //    res.send(logs);
    //})
});


app.listen(8001, function () {
    console.log('Example app listening on port 8001!');
});
