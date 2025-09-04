const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (req, res) => {
    res.send('Hello World')
})

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogRouter.post('/blogs', async (request, response) => {
  const { title, url, author, likes } = request.body
 
  if (!title || !url) {
    return response.status(400).end()
  }

  const blog = new Blog(request.body)
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

//route for deleting single blog
blogRouter.delete('/blogs/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

//route for updating a blog
blogRouter.put('/blogs/:id', async (request, response) => {
  const { title, author, url, likes } = request.body //destructure the values of the blog we want to update

  const id = request.params.id;
  const blog = await Blog.findById(id) //finding the blog we want to update
  if (!blog) {
    return response.status(404).json({error: "Blog not found"})
  }

  blog.title = title || blog.title
  blog.author = author || blog.author
  blog.url = url || blog.url
  blog.likes = likes ?? blog.likes

  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)

})


module.exports = blogRouter