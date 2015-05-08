---
layout: post
date: 2015-05-09 00:07:20
author: zdan
tags: Mailchimp
title: 使用Mailchimp添加邮件订阅功能
categories: post
---
### 简介
通过使用[MailChimp]( http://mailchimp.com/)提供的邮件相关服务，可以非常方便的在页面中嵌入邮件订阅功能，也可以使用MailChimp提供的后台进行邮件编辑、邮件发送、邮件统计等功能；MailChimp的免费版本提供每月2000个订阅用户，可发送12,000封邮件，因此对于一些小的业务是很方便的，当然付费版本会提供更多的功能。 

> MailChimp简介： 
> More than 8 million people and businesses around the world use MailChimp. Our features and integrations allow you to send marketing emails, automated messages, and targeted campaigns. And our detailed reports help you keep improving over time.（摘自官方） 

### 为页面添加邮箱订阅功能 
1. [注册]( https://login.mailchimp.com/signup)成为MailChimp用户；   
2. 通过[MailChimp平台]( https://us10.admin.mailchimp.com/lists/new-list/)新建List；   
3. 在新增的List里设置Signup forms;   
> Signup forms分为General forms、Embedded forms、Subscriber popup、Form integrations4种 

4. 选择General forms，完成Signup form设置以后会生成一个URL，如：http://eepurl.com/bml0Qr； 

```js 
//把该地址使用A标签嵌入到网页，用户点击该链接就会跳转到邮箱订阅表单 
<a href=" http://eepurl.com/bml0Qr">订阅</a> 

//如果想实现在自己的网页，用户输入邮箱就发送订阅邮件给用户，可以在设置Signup Forms时选择“Subscriber popup”选项，MailChimp会生成js代码，引入js至自己的页面即可 
``` 

### 自定义Signup form 
**需求：**实现在自己的网页，用户输入邮箱就发送订阅邮件给用户？   

> 除了第4步提到的方式，也可以自定义Signup form，首先还是需要新增一个General forms(方法同上文提到的1-4步)；
然后复制生成的URL在网页进行访问，查看源代码，可以查看到类似如下的代码，去掉没用的字段(这些字段是在生成General forms时设置的)字段，
这里只留下email字段，然后复制代码至自己的页面，代码如下:

```html 
<form class="form-inline" action=" http://zdan.us10.list-manage.com/subscribe/post"> 
  <div class="form-group"> 
    <!-- u和id为系统自动生成，每个用户都不一样 --> 
    <input type="hidden" name="u" value="3c767102b2c4a3ea4653b5e7x"> 
    <input type="hidden" name="id" value="efb7a6e1bx"> 
    <input type="email" name="MERGE0" id="MERGE0" class="form-control input-mail" id="txt-email" placeholder="Enter Email"> 
    <button type="button" class="btn btn-default" id="btn-submit">Submit</button> 
  </div> 
  <div class="form-group"> 
    Keep in touch with Moai 
  </div> 
</form> 
``` 

自定义的表单如下图：  
![]( http://7xi82w.com1.z0.glb.clouddn.com/blog20150508234536.png)  

点击submit以后效果：  
![]( http://7xi82w.com1.z0.glb.clouddn.com/blog20150508235748.jpg)  

收到的订阅确认邮件：  
![]( http://7xi82w.com1.z0.glb.clouddn.com/blog20150509000157.jpg)
