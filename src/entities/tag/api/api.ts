import axios from 'axios';

export const getPostTags = async () => await axios.get('/api/posts/tags');
