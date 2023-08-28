
const axios = require('axios');
// Assume your API base URL
const API_BASE_URL = 'http://localhost:7070/api/posts';
const PAGINATON_BASE_URL = 'http://localhost:7070/api/posts/pagination';

// Your single post endpoint
/* const getSinglePostEndpoint = (postId: string) =>
  `${API_BASE_URL}/posts/${postId}`; */

const postIDs = ["64e4a217d8b535a040881f45",
  "64e8b7a7dac57be27ecf4f94",
  "64e8b7afdac57be27ecf4f96",
  "64e8b7b8dac57be27ecf4f98",
  "64e8b7c7dac57be27ecf4f9c",
  "64e8b7cddac57be27ecf4f9e"
]

describe('API Tests', () => {
  test('GET Single Post', async () => {
    postIDs.forEach(async (postId) => {
      const response = await axios.get(`${API_BASE_URL}/${postId}`)
      expect(response.status).toBe(200);
      const { data } = response;


      //expect(response.data.id).toBe(postId);
      expect(response.data).toHaveProperty('title');
      expect(response.data).toHaveProperty('author');
      expect(response.data).toHaveProperty('likes');
      expect(response.data).toHaveProperty('description');
    })

  });

  /*    test('GET /posts/:id returns a 404 status code for non-existent post', async () => {
      const nonExistentId = '64e8b7af3tc57bd27ac54f92'; // Use a non-existent post ID
      const response = await axios.get(`http://localhost:7070/api/posts/64e8b7af3tc57bd27ac54f92`);
      
      expect(response.status).toBe(404); // product not found
      expect(response.text).toBe('Post not found');
  
    }); */

  test('Get All Posts', async () => {
    const response = await axios.get(`${API_BASE_URL}`);

    expect(response.status).toBe(200)

  })

  test('Get paginated response, page = 1', async () => {
    const response = await axios.get(`${PAGINATON_BASE_URL}?pi=1`);
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toBeDefined();

    //expect(data).toHaveLength(5)
    const jsonArray = response.data; // Assuming the API response is a JSON array
    console.log(response.data)
  })

  test('GET /pagination sorts by likes in ascending order', async () => {
    const response = await axios.get(`${PAGINATON_BASE_URL}?sort=likes&oderby=asc`);
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toBeDefined();

    const sortedPosts = response.data;
    for (let i = 1; i < sortedPosts.length; i++) {
      console.log(sortedPosts.length);
      const previousLikes = sortedPosts[i - 1].likes;
      const currentLikes = sortedPosts[i].likes;
      expect(previousLikes <= currentLikes).toBe(true);
    }
    //expect(data).toHaveLength(5)
    const jsonArray = response.data; // Assuming the API response is a JSON array
    console.log(response.data)
  })

  test('GET /pagination sorts by likes in ascending order', async () => {
    const response = await axios.get(`${PAGINATON_BASE_URL}?sort=likes&oderby=asc`);
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toBeDefined();

    const sortedPosts = response.data;
    for (let i = 1; i < sortedPosts.length; i++) {
      console.log(sortedPosts.length);
      const previousLikes = sortedPosts[i - 1].likes;
      const currentLikes = sortedPosts[i].likes;
      expect(previousLikes <= currentLikes).toBe(true);
    }
    //expect(data).toHaveLength(5)
    const jsonArray = response.data; // Assuming the API response is a JSON array
    console.log(response.data)
  })

  test('GET /posts/search?q=text search for expression "text"', async () => {
    const keyword = "text";
    const response = await axios.get(`${API_BASE_URL}/search?q=${keyword}`);
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toBeDefined();

    const posts = response.data.posts;
    let found = false
    posts.forEach(element => {
      if (element.title == keyword || element.author == keyword || element.description == element.keyword) {
        found = true;
      }
    });
    expect(found).toBe(true);
  })

  test('GET /pagination?filter=likes:2-10 filter for likes field', async () => {
    const leastLike = 2;
    const mostLikes = 10
    const response = await axios.get(`${PAGINATON_BASE_URL}?filter=likes:${leastLike}-${mostLikes}`);
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toBeDefined();
    let asExpected = true;
    const posts = response.data;
    for (let i = 1; i < posts.length; i++) {
      if (posts[i].likes < leastLike || posts[i].likes > mostLikes)
        asExpected = false
        return
    }
    expect(asExpected).toBe(true);
  }) 


});

