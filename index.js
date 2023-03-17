const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

hexo.extend.console.register('tags-gpt', 'Generate tag suggestions using ChatGPT', {
  arguments: [
    { name: 'postName', desc: 'Name of the post to generate tag suggestions for' }
  ]
}, async function(args) {
  const postName = args._[0];
  hexo.load().then(async function() {
    const tags = hexo.locals.get('tags');
    const tagNames = tags.data.map(tag => tag.name);

    const post = hexo.locals.get('posts').data.find((p) => p.slug === postName);
    const text = post._content;
    const prompt = `We currently have these tags: ${tagNames.join(', ')}. \n\
      Please suggest 10 tags  as the keywords of this following post and following these rules : \n\
      1. Select from existing tags or create new if necessary \n\
      2. You don't need to translate if the keyword is not in English \n\
      3. Return in the following style: tag1, tag2, tag3, ..., tag10 \n\
      \n\n Here is the post: ${text}`;

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
    });
    const tagList = completion.data.choices[0].message.content.split(",").map(tag => tag.trim());
    console.log("Generated tags: ", tagList);

    const postContent = post.raw;
    const frontMatterregex = /^---\n[\s\S]*?\n---\n/;
    const frontMatterMatch = postContent.match(frontMatterregex);
    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[0];
      const newTagsString = `tags: [${tagList.map(tag => `'${tag}'`).join(', ')}]`;
      const tagsRegex = /tags:.*?(\n|$)/s;
      const newFrontMatter = frontMatter.replace(tagsRegex, newTagsString + '\n');
      console.log(newFrontMatter)
      const newPostContent = postContent.replace(frontMatterregex, newFrontMatter);

      const fs = require('fs');
      fs.writeFile(post.full_source, newPostContent, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updated post file ${post.full_source}`);
        }
      });
    }
  }).catch(err => {
    console.log(err);
  });
});

