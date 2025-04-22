
import axios from "axios";

// Create instance of axios
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

// GET method
export const getPost = () => {
  return api.get('/posts');
};

// DELETE method
export const postDelete = (id) => {
  return api.delete(`/posts/${id}`);
};



//create
export const postCreate = (post) => {
    return api.post('/posts', post); ///second argument is payload data pass in api ==post
  };
  


  //update id
  export const updatePost = (id,post) => {
    return api.put(`/posts/${id}`, post); ///second argument is payload data pass in api ==post id=old date 
  };