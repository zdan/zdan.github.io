---
layout: post
title:  "使用Github pages搭建个人博客"
date:   2015-04-21 16:11:56
tags: [jekyll,github pages]
categories: post
---
### 初衷
想搭建自己的博客已经很久了，但是由于太懒，想法一直没有付诸行动，为了改掉自己的拖延症习惯，也为了记录自己的技术学习生活，
就从写博客开始吧。

### 初识github pages
最开始接触到github pages，主要是因为自己关注的一些技术牛人，都是用的github写博客；
为了搭建这个博客，最近几天一直在折腾github pages和jekyll，关于为什么选择github pages（其实是觉得这个看上去貌似比较高大上- -！），说下它的几个优点吧：
  
- 支持静态页面
- 免费，不限容量
- 配合jekyll，搭建起来非常方便
- 支持个人域名映射

### 创建github pages
通过[github](https://github.com/new)平台创建一个repository，命名规范为：username.github.io，
例如：我的账号是zdan，就是zdan.github.io；username.github.io也是页面地址。  

### 设置个性域名
为了使用自己的域名访问博客，可以通过如下设置完成：  

**创建CNAME文件**   

把username.github.io clone到本地，在项目根目录下新建CNAME文件（CNAME必须是大写），
在该文件写入你的网址，如：zdan.me、www.zdan.me，不要添加http://前缀。  

**设置域名解析**  

通过自己购买域名的服务商进行设置，我使用的是万网的云解析，添加如下图3条解析：  
![](http://7xi82w.com1.z0.glb.clouddn.com/blog3004F291-5CB4-45F4-BCDE-ABD30F1FE7B1.png)  

- 其中2条A记录指向：192.30.252.153和192.30.252.154  
- CNAME记录指向：username.github.io   

详细操作请参考github pages[相关文档](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/)

### jekyll简介

关于什么是jekyll与怎么安装jekyll，请查看[jekyll官方文档]()、[中文文档地址]()，
以下只是记录自己在用jekyll遇到的一些问题，
由于jekyll模版使用的是[liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)语法，
所以大部分是在使用liquid的问题。  

#### 分页显示文章
备注：由于花括号与liquid语法冲突，复制代码时请将 ```{ %、{ {、% }```中的空格去掉   
  
首先通过_config.yml文件配置分页信息：  

    paginate: 5 #每页显示5篇文章
    paginate_path: /page/:num #设置分页路由，:num是页码
	
**显示文章列表：** 

    { % for post in paginator.posts % }
        { { post.url } }
        { { post.title } }
        { { post.date | date: "%b %-d, %Y" } } //格式化时间
        { { post.content | truncatewords: 100 } } //按照100个单词截取内容，中文截取会出现问题
    { % endfor % }

**显示分页链接：** 

    { % if paginator.previous_page % }
        { % if paginator.previous_page == 1% }
            <a href="/">上一页</a>
        { % else % }
            <a href="/page/{ { paginator.previous_page } }">上一页</a>
        { % endif % }
    { % endif % }
    { % if paginator.next_page % }
        <a href="/page/{ { paginator.next_page } }">下一页</a>
    { % endif % }

**根据标签显示标签对应的文章列表**

    { % for tag in site.tags % }
        //tag[0]：标签名称  
        //tag[1]：存储该标签对应的所有文章
        { % for post in tag[1] % }
            //post存储文章的所有信息
            { { post.title } } 
            { { post.date } }
        { % endfor % }
    { % endfor % }
    
    
关于jekyll中各liquid标签的具体使用方法，请查看[官方文档](http://jekyllrb.com/docs/variables/)、
[中文文档](http://jekyllcn.com/docs/variables/)  


第一次写博客，写的不太完善，以后多多加强。。。