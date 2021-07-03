# Benjamin Brooke Web Development Blog

My website. Built with NextJS + Strapi

## Blog Posts

|    Date    | Name                                                                                                                                                  |
| :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 06-25-2021 | [eCommerce Stories \| Automating Order Placement & Data Entry](https://bvgsoftware.com/blog/automating-order-placement-and-data-entry/)               |
| 06-15-2021 | [How To Build A Flip Card Component With React](https://bvgsoftware.com/blog/how-to-build-a-flip-card-component-with-react/)                          |
| 06-05-2021 | [How To Optimize Your Next.js Production Build](https://bvgsoftware.com/blog/how-to-optimize-your-nextjs-production-build/)                           |
| 06-04-2021 | [Build An eCommerce Color Search Tool With Node.js + React 2](https://bvgsoftware.com/blog/build-an-ecommerce-color-search-tool-with-nodejs-react-2/) |
| 05-25-2021 | [Build An eCommerce Color Search Tool With Node.js + React 1](https://bvgsoftware.com/blog/build-an-ecommerce-color-search-tool-with-nodejs-react-1/) |
| 05-11-2021 | [Build A Blog Article Progress Bar With React + Bootstrap](https://bvgsoftware.com/blog/build-a-blog-article-progress-bar-with-react-and-bootstrap/)  |
| 09-03-2020 | [Read Time Feature For React + Markdown Blog](https://bvgsoftware.com/blog/read-time-feature-for-react-markdown-blog/)                                |
| 09-03-2020 | [React Contact Form With Formik + Klaviyo](https://bvgsoftware.com/blog/react-contact-form-with-klaviyo-and-formik/)                                  |
| 08-16-2020 | [WordPress Form To Email + Google Sheet](https://bvgsoftware.com/blog/wordpress-form-to-email-and-google-sheet/)                                      |
| 01-24-2020 | [How To Build A Command Line Application With Node](https://bvgsoftware.com/blog/how-to-build-a-command-line-application-with-node/)                  |
| 12-21-2019 | [D3 Visualization \| Simple Binary Search Tree](https://bvgsoftware.com/blog/simple-binary-search-tree/)                                              |
| 11-17-2019 | [D3 Visualization \| High School Clock](https://bvgsoftware.com/blog/high-school-clock/)                                                              |
| 10-09-2019 | [React Form Validation With Formik + GraphQl + Yup](https://bvgsoftware.com/blog/react-form-validation-with-formik-graphql-yup/)                      |
| 08-23-2019 | [How To Encode GIFs With Node](https://bvgsoftware.com/blog/how-to-encode-gifs-with-node/)                                                            |
| 08-16-2019 | [How To Use Local Storage To Persist Data](https://bvgsoftware.com/blog/how-to-use-local-storage-to-persist-data/)                                    |
| 08-11-2019 | [How To Build A Color Picker With React](https://bvgsoftware.com/blog/how-to-build-a-color-picker-with-react/)                                        |
| 08-01-2019 | [Save Development Time With AutoHotKey](https://bvgsoftware.com/blog/save-development-time-with-autohotkey/)                                          |
| 07-17-2019 | [D3 Visualization \| Minesweeper](https://bvgsoftware.com/blog/minesweeper/)                                                                          |
| 07-09-2019 | [React SVG Icons With No Artistic Abilities](https://bvgsoftware.com/blog/react-svg-icons-with-no-artistic-abilities/)                                |

## Environment Variables

Environment variables are needed to configure various features throughout the application

### Client

Use `.env.local` in root of `frontend` folder

|         Name          |
| :-------------------: |
| KLAVIYO_PRIVATE_TOKEN |
| KLAVIYO_PUBLIC_TOKEN  |

### Server

Use `.env` in root `backend` folder

|       Name        |
| :---------------: |
|    ADMIN_HOST     |
|     ADMIN_JWT     |
|    ADMIN_PORT     |
|     ADMIN_URL     |
|  CLOUDINARY_KEY   |
| CLOUDINARY_SECRET |
|  CLOUDINARY_NAME  |
|   DATEBASE_HOST   |
|   DATEBASE_PORT   |
|   DATEBASE_NAME   |
| DATEBASE_USERNAME |
| DATEBASE_PASSWORD |
|   DATEBASE_SSL    |
|  REDIS_PASSWORD   |

## Deployment

Set up to deploy to GitHub and to a remote server on `push` of `main` branch

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

The client application depends on server so start Strapi first

```bash
pm2 start npm --name "strapi" -- start
```

Then run the Next process

```bash
pm2 start npm --name "next" -- start
```

Once both processes are running create an init script for PM2

```bash
pm2 startup
```

Freeze the process list so PM2 will restart automatically when server reboots

```bash
pm2 save
```

Remove PM2 init script

```bash
pm2 unstartup systemd
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

From the `backend` directory run the following

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
