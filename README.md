# Posty API - A Social Media Platform API

## Introduction

Posty API is a sample project that demonstrates the integration of NestJS and Prisma to build a social media like platform. With Posty, API you can create posts, add comments, and react to posts.

## Tech Stack

- NestJS
- Prisma
- PostgreSQL
- Swagger
- TypeScript
- JWT
- Passport
- Zod
- Argon2

## Requirements

- Node.js >= 12.x
- npm >= 6.x
- Prisma CLI

## Getting Started

1. Clone the repository: `git clone https://github.com/drperalta/posty-api.git`
2. Change into the project directory: `cd posty-api`
3. Install dependencies: `pnpm install`
4. Set up the database:
   1. Create a new database in PostgreSQL
   2. Update the DATABASE_URL in `.env` file with your database url
   3. Run the Prisma migration: `pnpm prisma migrate dev`
5. Start the NestJS server: `pnpm start:dev`
6. Access the API at `http://localhost:3333/api`
7. Access the API Documentation at `http://localhost:3333/documentation`

## Features

- Create posts
- Add comments to posts
- React to posts (like and dislike)

## API Endpoints

#### Auth

- `POST /api/auth/login`: Login user
- `POST /api/auth/register`: Create new user

#### User

- `GET /api/users/:id`: Get single user
- `GET /api/users/me`: Get currently logged in user
- `GET /api/users/search/:name`: Find user by name
- `PATCH /api/users/:id`: Update user details

#### Post

- `POST /api/posts`: Create user post
- `GET /api/posts`: Get post by user id
- `GET /api/posts/me`: Get all logged in users posts
- `GET /api/posts/:id`: Get post by id
- `PATCH /api/posts/:id`: Update user post
- `DELETE /api/posts/:id`: Delete user post

#### Comment

- `POST /api/comments`: Create post comment
- `GET /api/comments`: Get comments by post id
- `GET /api/comments/:id`: Get single post comment
- `PATCH /api/comments/:id`: Update post comment
- `DELETE /api/comments/:id`: Delete post comment

#### Reaction

- `POST /api/reactions`: Create post reaction
- `GET /api/reactions`: Get reactions by post id or user id
- `GET /api/reactions/count`: Get reactions count by post id
- `PATCH /api/reactions/:id`: Update post reaction
- `DELETE /api/reactions/:id`: Delete post reaction

## Conclusion

Posty is a great starting point for building a social media platform with NestJS and Prisma. The project showcases the capabilities of the two technologies and provides a solid foundation for building more complex applications.
