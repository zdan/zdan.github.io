---
layout: post
date: 2015-04-23 17:36:28
author: zdan
tags: [node.js,npm link]
title: 使用Node.js创建命令行工具
categories: post
---
最近在用jekyll写博客，每次写博客时都要在文件头部加上如下代码，而且还要自己创建文件，感觉非常麻烦，因此就自己动手写了个命令行生成模版的小工具，
本篇文章简单记录下如何生成自己到command命令。

```
---
layout: post
date: 2015-04-23 17:36:28
author: zdan
tags: [node.js,commands]
title: 使用Node.js创建命令行工具
categories: post
---
```

### 创建目录

首先任意创建一个文件夹，初始化`package.json`文件，在该文件夹下创建bin目录，：

```bash
$ mkdir test
$ cd test && mkdir bin
$ npm init
```

### 编写命令行js

cd到bin目录下，新建一个cmd.js文件(名字自取)，编写如下代码，在js文件顶部加上```#!/usr/bin/env node```这段代码：

```js
#!/usr/bin/env node
var run= function (obj) {
  if(obj[1] === '-v'){
    console.log('version is 1.0.0');
  }
  if(obj[1] === '-h'){
    console.log('Useage:');
    console.log('  -v --version [show version]');
  }
};
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2)); 
```

在命令行运行js，输入：```node cmd.js -v```，就会返回 "version is 1.0.0"

### npm link

打开package.json文件，添加如下代码：

```json
"bin": { "cmd": "./bin/cmd.js" } //cmd为自定义的command命令
```

打开命令行，输入```npm link```会自动添加全局的symbolic link，然后就可以使用自己的命令了。

```js
$ npm link
//返回信息：/Users/zdan/.nvm/versions/node/v0.12.2/lib/node_modules/zdan.github.io -> /Users/zdan/github/zdan.github.io

$ cmd -v
//version is 1.0.0

$ cmd -h 
//Useage:
//  -v --version [show version]
```

更多npm link的信息请查看[npm官方文档](https://docs.npmjs.com/cli/link)。