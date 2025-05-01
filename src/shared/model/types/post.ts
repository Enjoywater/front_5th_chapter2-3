export interface BasePost {
  title: string;
  body: string;
  tags?: string[];
  userId: number;
}

export interface Post extends BasePost {
  id: number;
  reactions?: PostReactions;
  views?: number;
}

export interface NewPost extends BasePost {}

export interface PostReactions {
  likes: number;
  dislikes: number;
}

export interface User {
  id: number;
  username: string;
  image: string;
}

export interface PostWithAuthor extends Post {
  author?: User;
}

export interface BaseResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface PostsResponse extends BaseResponse {
  posts: Post[];
}

export interface UsersResponse extends BaseResponse {
  users: User[];
}

export interface SearchPostResponse extends BaseResponse {
  posts: Post[];
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  userId: number;
  user?: User;
}

export interface NewComment {
  body: string;
  postId: number;
  userId: number;
}

export interface CommentsResponse extends BaseResponse {
  comments: Comment[];
}
