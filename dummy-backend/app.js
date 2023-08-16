const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)

  // Set allowed origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Set allowed headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Set allowed HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Allow credentials (if needed)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2500));
  res.json({ posts: storedPosts });
});
// 
app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

app.delete('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const id = req.body.id;
  const updatedPosts = existingPosts.filter(post => post.id !== id);
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Deleted post.', id: id });
});

app.listen(8080);
