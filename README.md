# [DevDocs](https://devdocs.io) — API Documentation Browser [![Build Status](https://travis-ci.org/freeCodeCamp/devdocs.svg?branch=master)](https://travis-ci.org/freeCodeCamp/devdocs)

> This project fork from [Devdocs](https://github.com/freeCodeCamp/devdocs). The project removed the `ruby` part and use `webpcak` to manage assets which means change some code.

## Quick Start

run `yarn start`

### publish

replace `docs_origin` and `docs` props with your server url on `./webpack/prod.js` and run build script.

eg:
```json
'APP': JSON.stringify({
    news: [],
    // if you want deploy your own server, please follow https://github.com/freeCodeCamp/devdocs
    docs: 'https://devdocs.io/docs/docs.json',
    docs_origin: 'https:/devdocs.io/docs',
    version: pkg.version,
})
```
