var express = require('express');
var path = require('path');
var port = 8087;
var app = express();
var fs = require('fs');


var routeArr = [];

fs.readdir(path.resolve(__dirname, '../src/site/'), function (err, files) {
    if (!!err)
        return;
    files.map(function (file, fileIndex) {
        var dirpath = path.resolve(__dirname, '../src/site/' + file);
        fs.stat(dirpath, function (err, stats) {
            if (err) {
                return console.error(err);
            }
            //该目录是文件夹
            if (stats.isDirectory()) {
                var filePath = path.resolve(__dirname, '../src/site/' + file + '/config.json');

                //目录下config.json文件是否存在
                fs.stat(filePath, function(err2, stats2){
                    if(!!stats2 && stats2.isFile()){
                        // console.log(stats2,stats2.isFile(),'stats2')

                        fs.readFile(filePath, function(err1, data){
                            if(!!err1){
                                return console.error(err1);
                            }
                            var stringData = data.toString();
                            try {
                                var parseData =JSON.parse(stringData);
                                if(!!parseData && !!parseData.api && !!parseData.api.length){
                                    parseData.api.map(function(elem){
                                        routeArr.push(elem);
                                    });
                                    loadRoute()
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        });
                    }
                })


            }
        });

    });
});



function loadRoute(){
    console.log(routeArr, 'routeArr');
    routeArr.map(function(elem){
        if(elem.type == 'get'){
            app.get('/api'+elem.path,function(req,res){
                res.sendFile(path.resolve(__dirname,'../src/api/'+elem.file+'.json'))
            });
        } else {
            app.post('/api'+elem.path,function(req,res){
                res.sendFile(path.resolve(__dirname,'../src/api/'+elem.file+'.json'))
            });
        }
    });

    let server = app.listen(port, function() {
        let ipaddress = getIPAdress();
        if (ipaddress) {
            console.log('please open ' + ipaddress + ':' + port + ' in browser');
        } else {
            ipaddress = '127.0.0.1';
            console.log('no networking, please open ' + ipaddress + ':' + port + ' in browser')
        }
    });
}





/**
 * 获取本机IP
 * @return {[string]} [IP地址]
 */
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}