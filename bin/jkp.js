#!/usr/bin/env node
var conf = require('./config'),
  fs = require('fs'),
  path = require('path'),
  post = conf.post,
  stdin = process.stdin,
  stdout = process.stdout;

/**
 * 主方法
 * @param obj
 */
var run = function (obj) {
  if (!obj.length || obj[0] === '-h') {
    //帮助信息
    console.log('\r\n  Usage: ');
    console.log('  jkp 文件名     新建一个md文档');
    console.log('  jkp -h         查看帮助信息\r\n');
  } else {
    var filename = formatDate('ymd') + '-' + obj.join('-') + '.md';
    var fullPath = path.join(conf.file_path, filename);
    post.title = obj.join(' ');
    post.date = formatDate('ymdhms');
    create(fullPath);
  }
};

/**
 * 创建文件
 * @param fullPath
 */
var create = function (fullPath) {
  //判断文件是否存在
  if (fs.existsSync(fullPath)) {
    stdout.write('\033[31m' + path.basename(fullPath) + ' has existed!\033[0m\r\n');
    stdout.write('\033[33mwould you want delete it and rebuild ? y/n: \033[0m');
    stdin.resume(); //等待用户输入
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
      //注意：由于获取的data数据，尾部会自动带上换行符，需要把换行符去掉再匹配字符是否相当
      var data = data.substring(0, data.length - 1);
      if (data === 'y') {
        fs.unlinkSync(fullPath);
        create(fullPath);
      } else {
        process.exit(0);
      }
    });
  } else {
    //构建文件主体
    var buf = [];
    buf.push('---\r\n');
    for (var item in post) {
      if (post.hasOwnProperty(item)) {
        buf.push(item + ': ' + post[item] + '\r\n');
      }
    }
    buf.push('---\r\n');
    //创建文件
    fs.writeFile(fullPath, buf.join(''), {
      flag: 'w' //追加写入日志，不存在则创建
    }, function (err) {
      if (err) console.log(err);
      console.log(path.basename(fullPath) + ' created successful.');
      process.exit();
    });
  }
};

/**
 * 格式化时间
 * @param flag
 * @returns {string}
 */
var formatDate = function (flag) {
  var result = [];
  var date = new Date();
  result.push(date.getFullYear());
  result.push(pad2(date.getMonth() + 1));
  result.push(pad2(date.getDate()));
  if (flag === 'ymd') {
    return result.join('-');
  }
  return result.join('-') + ' '
    + pad2(date.getHours()) + ':'
    + pad2(date.getMinutes()) + ':'
    + pad2(date.getSeconds());
};

/**
 * 2位补零
 * @param str
 * @returns {string}
 */
var pad2 = function (str) {
  return str.toString().length === 1 ? '0' + str : str;
};

//运行
run(process.argv.splice(2));