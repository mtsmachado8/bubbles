# Bubbles
## The future of Bubbles 🚀
![bubbles](https://user-images.githubusercontent.com/11022437/98303172-726c6e00-1f9c-11eb-87df-975b23f7526b.gif)
**Obs:** the design will change a bit.

## The Problem explained, Concept and Benchmarking (only available in pt-br)
https://www.notion.so/Bubbles-9f62cfeb5e8a4999adf7bdf5af8f359f


Please leave your comments, feedback and feature ideas on the document (soon we can make a Bubble for that kind of thing 😄 )

## Up and running

First, install dependencies

```bash
yarn
```
Then run your migrations to dabase (heroku for now)

```bash
yarn migrate:up
```
Then, start your development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Database
You can start the database locally by using
```
docker-compose up
```
To tell Docker-Compose to destroy the volumes and its data, you need to use:
```
docker-compose down --volumes
```

## Prisma
To map your data model to the database schema, you need to use the prisma migrate
```bash
npx prisma migrate save --name "name-of-the-migration" --experimental
yarn migrate:up
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
