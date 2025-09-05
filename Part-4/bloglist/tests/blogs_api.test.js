const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/blogtest_helper')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Testing GET /api/blogs', () => {
  test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
  })

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 4)
  })

  test('unique identifier of blog is named id not _id', async()=>{
    const response = await api.get('/api/blogs');

    response.body.forEach(blog => {
      assert.ok(blog.hasOwnProperty('id'), "There is and '_id' property in a blog")
    })
  })
})


describe('Testing endpoint POST /api/blogs', () => {
  test( 'post request to "/api/blogs" creates a new blog', async() => {
  const newBlog =  {
    title: "Does the post test work",
    author: "Prince W. Test",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  };

  await api.post('/api/blogs').send(newBlog)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Test Author",
      url: "http://example.com"
      // likes is missing
    }

    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.body.likes, 0)
  })

  describe(' validating new blogs are not missing data', () => {
    test('like title', async () => {
      const newBlog = {
        author: "Test Author",
        url: "http://example.com"
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('like url', async () => {
      const newBlog = {
        title: "Blog without url",
        author: "Test Author"
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    })
  })
})

describe('Testing PUT /api/blogs/:id', () => {
  test('note is updated with new content', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    const updatedResponse = await api.put(`/api/blogs/${id}`).send({title: "Updated Blog"})

    assert.deepStrictEqual(updatedResponse.body.title, "Updated Blog")
  })

  test('fails with a status code 404 if blog does not exist', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011'
    await api.put(`/api/blogs/${nonExistentId}`).send({title: "Blog does not exist"}).expect(404)
  })
})

describe('deletion of a note', () => {
  test('succeed with a stus code of 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const noteToDelete = blogsAtStart.body[1]

    await api.delete(`/api/blogs/${noteToDelete.id}`).expect(204)
  })
})

after(async () =>{
  await mongoose.connection.close()
})