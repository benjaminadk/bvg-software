# Benjamin Brooke Web Development Blog

My website. Built with NextJS + Strapi

## Front End

### Environment Variables

|          Name           |                 Description                 |
| :---------------------: | :-----------------------------------------: |
| `KLAVIYO_PRIVATE_TOKEN` | Connects Klaviyo digital marketing platform |
| `KLAVIYO_PUBLIC_TOKEN`  | Connects Klaviyo digital marketing platform |

## Back End

Strapi CMS + Postgres + Redis

### Strapi Middleware Cache

Cache requests on demand to speed up data fetching

#### Development

Start Redis from Docker Desktop or from command line

- Start Redis in Docker container using `-d` to run as a daemon

```bash
docker run --name redis1 -p 6379:6379 redis -d
```

- Can also be declared in a `docker-compose.dev.yml` file

```bash
docker-compose -f docker-compose.dev.yml up -d
```

- Open an interactive sheel to explore Redis

```bash
docker exec -it redis1 sh
```

## Deployment

### Git Setup

Utilizes dual `origin` remotes for `push`

1. GitHub Repository
2. Server Repository (Bare)

```bash
 git remote set-url --add --push origin ssh://[user]@[server ip][path to bare git repo on server]
```

Confirm configuration by running to view verbose remotes

```bash
git remote -v
```

Output should list 2 `push` and 1 `fetch` remotes named `origin`. When a normal `git push` is run the code is sent to both GitHub and the server

```bash
git add [files]
git commit -m [message]
git push origin main
```

### Server Repository

A `post-receive` hook runs on the server to rebuild both NextJS and Strapi

### Data Migration

Copy local postgres database to a `tar` file and send it to remote server

```bash
npm run migrate
```

On remote server the database must be restored from the `tar` file by the postgres user

```bash
sudo -i -u postgres
pg_restore -v -c -d postgres /var/www/bvgsoftware.com/data.tar
```
