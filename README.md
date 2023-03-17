## Introduction
A Hexo plugin that generates tags for blog posts, and all the plugin's code is written by ChatGPT. 

## Installation
To install the plugin, run the following command:
- `npm install hexo-gpt-tags --save`


## Usage
- `export OPENAI_API_KEY={YOUR_API_KEY}`

After installing the plugin and export api key, you can use it to generate tags for your Hexo blog posts. To do this, run the following command:

- `hexo tags-gpt {post_file_name}`

Replace {post_file_name} with the file name of your post without the .md extension. The plugin will automatically generate new tags for the post and update its front-matter accordingly.

## Example
``` bash
❯ hexo t fix
INFO  Validating config
WARN  Deprecated config detected: "external_link" with a Boolean value is deprecated. See https://hexo.io/docs/configuration for more details.
INFO  Start processing
Generated tags:  [
  'Hexo',     'Chic',
  'ChatGPT',  'disqus',
  '主题定制', 'CSS',
  '图片处理', 'iframe',
  '健康',     '日本'
]
---
title: fix
date: 2023-03-16 02:55:04
updated_date:
categories: [前端, 日常]
tags: ['Hexo', 'Chic', 'ChatGPT', 'disqus', '主题定制', 'CSS', '图片处理', 'iframe', '健康', '日本']
---

Updated post file /home/user/code/hexo-blog/source/_posts/fix.md

```
