# Bubbles
## The future of Bubbles 🚀
![bubbles](https://user-images.githubusercontent.com/11022437/98303172-726c6e00-1f9c-11eb-87df-975b23f7526b.gif)
**Obs:** the design will change a bit.

## The Problem explained, Concept and Benchmarking (only available in pt-br)
https://www.notion.so/Bubbles-9f62cfeb5e8a4999adf7bdf5af8f359f

## Demo
A demo is worth a thousand words, so take a look:  
[Bubbles Demo](https://bubbles-demo.vercel.app/)

## Proposals
Please leave your comments, feedback and feature ideas on:  
[Bubbles Proposals](https://bubbles-proposals.vercel.app/)

## Up and running

First, install dependencies

```bash
yarn
```
Then run your migrations to dabase (heroku for now)

```bash
yarn migration:up
```

Generate prisma dependencies based on schema

```bash
yarn generate
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
yarn migration:generate
yarn migration:up
```

## TO DO
- Different stages (Stage 0, Stage 1 - Approved, etc... must be configurable)
- I18N
- Notion like text editor
- Configurable themes
- bubbles.config.[js | json | yml] to configure specific things	
- Template for new Bubbles, like github issue ones (on bubbles.config or template.md)
- Easily configurable Logotype of the company implementing Bubbles (in bubbles.config)
- Admins that can promote a bubble (proposal) or archieve it (email of admins in bubbles.config)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
