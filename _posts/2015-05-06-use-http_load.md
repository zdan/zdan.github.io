---
layout: post
date: 2015-05-06 19:56:10
author: zdan
tags: [性能测试]
title: http_load性能测试工具
categories: post
---
http_load是基于linux平台的一种性能测试工具，以并行复用的方式运行，用以测试web服务器的吞吐量与负载以及web页面的性能。

### 安装
linux 使用make install方式安装，[点击这里下载](http://acme.com/software/http_load/)，
MacOS 可以直接使用brew安装。   

```bash
$ brew install http_load
```
    
### 参数解释
**-fetches**	简写 -f ：含义是总计的访问次数  
**-rate** 		简写 -r ：含义是每秒的访问频率  
**-seconds**	简写 -s ：含义是总计的访问时间  
**-parallel** 	简写 -p ：并发访问的线程数  
**urls**		是一个url 列表，每个url 单独的一行。可以单个页面。 
 
### 示例

```bash    
#测试网站每秒能承受的平均访问量
$ http_load -p 100 -f 10000 urls.txt
$ http_load -p 100 -s 10 url.txt

#测试网站是否能承受住预期的访问压力
$ http_load -rate 200 -seconds 10 url.txt
```

#### 返回结果解释

```bash
495 fetches, 100 max parallel, 2.24393e+07 bytes, in 10.0022 seconds
#一共请求连接495次，最大并发线程100个，持续10.0022秒，总传输速率为 2.24393e+07 bytes

45332 mean bytes/connection
#每次请求连接平均数据量

49.4891 fetches/sec, 2.24344e+06 bytes/sec
#每秒的响应请求连接数，每秒传输的数据量

msecs/connect: 112.466 mean, 157.051 max, 103.031 min
#每次连接平均响应时间，最大时间，最小时间

msecs/first-response: 1053.73 mean, 2466.83 max, 179.647 min
#每次连接平均返回时间，最大，最小。

HTTP response codes:
code 200 -- 495
#HTTP返回码：200 ，一共495次。
```
