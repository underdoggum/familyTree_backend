# Clean TypeScript Blog Backend
## By: Nathan Noack

This is a simple backend API to support interfacing data between MongoDB and the Frontend repo linked below. (which has way more info about the app than this repo's readme!)
[Frontend repo](https://github.com/underdoggum/typescript-blog-frontend)
[Deployed Frontend](https://mvp-blog.netlify.app/)
[Deployed Backend](https://typescript-blog-backend.herokuapp.com/)

## Dependencies
 - Dotenv
 - Express
 - Mongoose
 - Morgan
 - Cors
 - Nodemon (for local development)

## Model
 - Blog post
   - Title
   - Headline
   - Body

## CRUD Route Table
| Action | Path       | HTTP Verb | Action                                |
|--------|------------|-----------|---------------------------------------|
| Index  | /blogs     | GET       | get all blog posts (index)            |
| Show   | /blogs/:id | GET       | get one specific blog post (show)     |
| Create | /blogs     | POST      | create a new blog post (create)       |
| Update | /items/:id | PUT       | update a specific blog post (update)  |
| Delete | /items/:id | DELETE    | delete a specific blog post (destroy) |

## Challenges
Please see the [frontend repo](https://github.com/underdoggum/typescript-blog-frontend) for a list of challenges encountered while making this full-stack app