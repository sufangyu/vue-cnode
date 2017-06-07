const express = require('express');
const childProcess = require('child_process');
const app = express();
const port = 8080;


// Config
app.use(express.static(__dirname + '/public'));  // 静态资源目录


// Routers
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
});



// Start server
if (!module.parent) {
    const server = app.listen(port);
    console.log('Express started on port ' + port);
    // 自动打开浏览器
    childProcess.exec('start http://localhost:' + port);
}

module.exports = app;