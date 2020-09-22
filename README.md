# nuxt-auth-on-express-w_mongodb

> Scaffold app, Nuxt auth on express w/ MongoDB

## Setup

### Dev

Copy `server/config/#keys.js` to `server/config/keys.js`, and set MongoDB connection string in the new file. This file (`keys.js`) is listed in `.gitignore`.

### Production

This app is deployed on a Heroku dyno. The MongoDB Atlas URI is setup as a environment variable, so that there's no need for a `keys.js` file, and the app can be stored on Github (and deployed from there) with ease.

Set heroku path: `heroku config:set HEROKU_URL=$(heroku apps:info -s | grep web_url | cut -d= -f2)`

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
