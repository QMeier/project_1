var fs = require('fs');

var readme = fs.readFileSync('read.txt','utf8');

fs.writeFileSync('write.txt',readme);