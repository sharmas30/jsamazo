{
    "name": "jsamazon",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "nodemon --watch backend --exec babel-node backend/server.js",
        "build": "rm -rf dest && babel backend -d dist",
        "serve": "node dist/server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/sharmas30/jsamazo.git"
    },
    "author": "",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/sharmas30/jsamazo/issues"
    },
    "homepage": "https://github.com/sharmas30/jsamazo#readme",
    "dependencies": {
        "body-parser": "^1.19.0",
        "cors": "^2.8.5",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "express-async-handler": "^1.1.4",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^5.10.6",
        "multer": "^1.4.2"
    },
    "devDependencies": {
        "@babel/cli": "^7.11.6",
        "@babel/core": "^7.11.6",
        "@babel/node": "^7.10.5",
        "@babel/preset-env": "^7.11.5"
    }
}