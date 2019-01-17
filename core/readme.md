# @llfe/core

react + next + fastify  
a simple simple try

```
npm init
npm i --save @llfe/core react react-dom fastify fastify-plugin next
```

1.change package.json scripts

```
"scripts": {
  "dev": "llfe dev",
  "start": "llfe start",
  "build": "llfe build"
},
```

2.add client/pages/index.js

```javascript
// ./client/pages/index.js
export default () => <div>learn learn front end!</div>
```

3.add index.js

```javascript
// ./index.js
module.exports = async (fastify, options) => {
	fastify.get('/hello', async (res, req) => {
		return { code: 0, msg: 'learn learn front end!!!' }
	})
}
```

then

```
npm run dev
```

you can open  
http://localhost:3000  
or  
http://localhost:3000/hello
