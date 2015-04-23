---
layout: post
title:  "使用Github pages搭建个人博客"
date: 2015-04-20 16:11:56
tags: [github pages,jekyll,pygments]
categories: post
---
### 初衷
想搭建自己的博客已经很久了，但是由于太懒，想法一直没有付诸行动，为了改掉自己的拖延症习惯，也为了记录自己的技术学习生活，
就从写博客开始吧。

### 创建github pages
通过[github](https://github.com/new)平台创建一个repository，命名规范为：```username.github.io```；  
例如：我的账号是zdan，就是zdan.github.io；username.github.io也是页面地址。  

### 设置个性域名
为了使用自己的域名访问博客，可以通过如下设置完成：  

**创建CNAME文件**   

把username.github.io clone到本地，在项目根目录下新建CNAME文件（CNAME必须是大写），
在该文件写入你的网址，如：zdan.me、www.zdan.me，不要添加http://前缀。  

**设置域名解析**  

通过自己购买域名的服务商进行设置，我使用的是万网的云解析，添加如下图3条解析：  
![](http://7xi82w.com1.z0.glb.clouddn.com/blog20150421141817.jpg)  

- 其中2条A记录指向：192.30.252.153和192.30.252.154  
- CNAME记录指向：username.github.io   

详细操作请参考github pages[相关文档](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/)

### jekyll简介

关于什么是jekyll与怎么安装jekyll，请查看[jekyll官方文档](http://jekyllrb.com/docs/home/)、[中文文档地址](http://jekyllcn.com/docs/home/)，
以下只是记录自己使用jekyll时遇到的一些问题，
由于jekyll模版使用的是[liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)语法，
所以大部分是在使用liquid的问题。  

#### 一、如何实现代码高亮

> 备注：由于花括号与liquid语法冲突，复制代码时请将 ```{ %、% }、{ {、} }```中的空格去掉

jekyll使用pgyments插件处理代码高亮，语法格式如下： 

```js
{ % highlight javascript % }
function hello(){
  console.log('hello world');
}
{ % endhighlight % }
```

但是上面这种写法不便markdown阅读，jekyll也支持类似github markdown的写法：  

    ```javascript  
    function hello(){
      console.log('hello world');
    }
    ```

**1. 安装pgyments (mac版本)**   

- 通过pgyments官网[下载](https://pypi.python.org/pypi/Pygments)最新版本  
- 解压Pygments-2.0.2.tar.gz，进入文件夹，在shell下输入```sudo python setup.py```进行安装  
- 其他安装方式，请查看[pgyments官网](http://pygments.org/)。 


**2. 安装pygments.rb**  

```bash
gem install pygments.rb
```

**3. 配置pygments**  

打开_config.yml文件，添加如下配置  
    
```bash
highlighter: pygments //使用pygments高亮
markdown: redcarpet //使用redcarpet进行markdown解析
extensions: ["fenced_code_blocks", "tables", "highlight", "strikethrough"] //插件
```

**4. 生成代码高亮css文件**

```bash
$ pygmentize -S default -f html > your/path/pygments.css
```

default表示代码的样式名称，查看pygments所有样式，可以通过如何python命令查看： 

```bash
$ python
>>> from pygments.styles import STYLE_MAP
>>> STYLE_MAP.keys()
```

输入回车以后可以看到所有主题样式，如：```['manni', 'igor', 'xcode', 'vim', ...]```等；
关于各主题的显示效果，请[点击这里](http://pygments.org/demo/1487252/?style=vs)查看。

**5. 引用css文件**  

把刚才生成的css文件引入到html的```<head></head>```中，就可以实现代码的高亮了。  
> 备注：除了pgyments，另外也可以采用js插件实现代码高亮，如：[google code prettify](https://code.google.com/p/google-code-prettify/)，只需要引用对应的样式和js文件即可。  


#### 二、分页显示文章 
  
首先通过_config.yml文件配置分页信息：  

```py
paginate: 5 #每页显示5篇文章
paginate_path: /page/:num #设置分页路由，:num是页码
```

**显示文章列表：** 


```js
{ % for post in paginator.posts % }
    { { post.url } }
    { { post.title } }
    { { post.date | date: "%b %-d, %Y" } } //格式化时间
    { { post.content | truncatewords: 100 } } //按照100个单词截取内容，中文截取会出现问题
{ % endfor % }
```

**显示分页链接：** 

```js
{ % if paginator.previous_page % }
    { % if paginator.previous_page == 1 % }
        <a href="/">上一页</a>
    { % else % }
        <a href="/page/{ { paginator.previous_page } }">上一页</a>
    { % endif % }
{ % endif % }
{ % if paginator.next_page % }
    <a href="/page/{ { paginator.next_page } }">下一页</a>
{ % endif % }
```

**根据标签显示标签对应的文章列表**

```js
{ % for tag in site.tags % }
    //tag[0]：标签名称  
    //tag[1]：存储该标签对应的所有文章
    { % for post in tag[1] % }
        //post存储文章的所有信息
        { { post.title } } 
        { { post.date } }
    { % endfor % }
{ % endfor % }
```
    
关于jekyll中各liquid标签的具体使用方法，请查看[官方文档](http://jekyllrb.com/docs/variables/)、
[中文文档](http://jekyllcn.com/docs/variables/)  
