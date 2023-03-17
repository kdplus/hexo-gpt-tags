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
