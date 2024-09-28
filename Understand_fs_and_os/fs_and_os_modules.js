var fs = require('fs');
var os = require('os');

var user = os.userInfo();
console.log(user);


fs.appendFile('greeting.txt', 'Hi' + user.username + '!!\n', () => console.log('file is created'));

