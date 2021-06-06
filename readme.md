# Benjamin Brooke Web Development Blog

My website. Built with NextJS + Strapi

## Blog Posts

| Date | Name |
| :--: | :--: |
|      |      |

## NPM Scripts

## Environment Variables

### Client

|          Name           |                 Description                 |
| :---------------------: | :-----------------------------------------: |
| `KLAVIYO_PRIVATE_TOKEN` | Connects Klaviyo digital marketing platform |
| `KLAVIYO_PUBLIC_TOKEN`  | Connects Klaviyo digital marketing platform |

### Server

|        Name         | Description |
| :-----------------: | :---------: |
|    `ADMIN_HOST`     |             |
|     `ADMIN_JWT`     |             |
|    `ADMIN_PORT`     |             |
|     `ADMIN_URL`     |             |
|  `CLOUDINARY_KEY`   |             |
| `CLOUDINARY_SECRET` |             |
|  `CLOUDINARY_NAME`  |             |
|   `DATEBASE_HOST`   |             |
|   `DATEBASE_PORT`   |             |
|   `DATEBASE_NAME`   |             |
| `DATEBASE_USERNAME` |             |
| `DATEBASE_PASSWORD` |             |
|   `DATEBASE_SSL`    |             |
|  `REDIS_PASSWORD`   |             |

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

### PM2 Process Manager

Node process are run in the background and managed by [PM2](https://github.com/Unitech/pm2)

Install PM2 globally on server

```bash
npm install -g pm2
```

Initial PM2 processes

The Next application depends on Strapi so always run first

```bash
pm2 start npm --name "strapi" -- start
pm2 start npm --name "next" -- start
```

### Server Repository

A `post-receive` hook runs on the server to rebuild both NextJS and Strapi

```bash
#!/bin/sh

# add npm executable to PATH
PATH="/root/.nvm/versions/node/v14.17.0/bin:$PATH"

# variable assignment
sitePath=/var/www/bvgsoftware.com
repoPath=/var/repo/bvgsoftware.git
assetPath=/root/bvgsoftware

# copy current main branch to project directory
git --work-tree=$sitePath --git-dir=$repoPath checkout -f main

# copy environmment variable files into project directory
cp $assetPath/.env.local $sitePath/frontend/.env.local
cp $assetPath/.env $sitePath/backend/.env

# rebuild and restart Strapi back end
cd $sitePath/backend

npm run cleanup

npm install

npm run build

pm2 restart strapi

# rebuild and restart Next front end
cd $sitePath/frontend

npm run cleanup

npm install

npm run build

pm2 restart next

exit 0
```

### Data Migration

#### Local To Server

Copy local postgres database to a `tar` file and send it to remote server

```bash
npm run migrate
```

On remote server the database must be restored from the `tar` file by the postgres user

```bash
sudo -i -u postgres
pg_restore -v -c -d postgres /var/www/bvgsoftware.com/data.tar
```

#### Server To Local

Download `tar` file from server and restore local postgres database

```bash
pg_restore -U postgres -v -c -d postgres /var/www/brokeveganguy.com/data.tar
```

### Strapi Middleware Cache

Cache requests on demand to speed up data fetching

#### Development

Start Redis from Docker Desktop or from command line

Start Redis in Docker container using `-d` to run as a daemon

```bash
docker run --name redis1 -p 6379:6379 redis -d
```

Can also be declared in a `docker-compose.dev.yml` file

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Open an interactive sheel to explore Redis

```bash
docker exec -it redis1 sh
redis-cli
KEYS *
```

View docker logs

```bash
docker logs --tail 50 --follow --timestamps redis1
```

#### Production

Redis is running as a service managed by `systemd`

```bash
systemctl status redis
```
