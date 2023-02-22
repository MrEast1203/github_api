# 如何啟動專案

1. 把/client/src/containers/Header.js 中的 CLIENT_ID 更改為你的 CLIENT_ID
2. 把/server/.env 中的 CLIENT_ID 和 CLIENT_SECRETS 更為你自己的並把 NODE_ENV 設為 development
3. type `yarn install:all` in your terminal
4. `yarn start`
5. open a new terminal and `yarn server`

P.S. set your HomeURL and ReturnURL `http://localhost:3000/`
I deploy on:
https://githubissiueapi-production.up.railway.app

```
.
├── Dockerfile
├── README.md
├── client
│   ├── README.md
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   └── yarn.lock
├── package.json
└── server
    ├── node_modules
    ├── package.json
    ├── src
    └── yarn.lock
```

```
.client/src
├── App.css
├── index.css
├── index.js
├── api.js
├── components
├── containers
├── hooks
```

- api.js is used to call api from proxy server
- components is the element that I will use in my project
- containers is the page I will use in my project
- hooks is the place I store the globe variables and functions

```
.server/src
├── fetch.js
├── routes
└── server.js
```

- fetch.js is the fetch function that I use
- routes is all the routes at I will use
- server.js is used to build the proxy server

The reason that I use proxy server is because I want to hide the sensitive like CLIENT_SECRETS.
