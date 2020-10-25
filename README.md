# node-typescript-boilerplate

A opinionated boilerplate project for building and running a node app with
typescript, and some other things that are (I) commonly use. The goal of this
project is to be simple but quick enough for anyone to get started on their
project with.  The included packages are:

- node
- typescript
- express
- jest
- eslint
- prettier


## npm scripts

The follow scripts or commands are available:

- `npm run build` - Compiles the typescript files into the `dist` folder
- `npm run test` - Runs jest (through a typescript transformer)
- `npm run lint` - Runs eslint with prettier, but does not adjust any files
- `npm run lint:watch` - Same as the linter, but with watch mode
- `npm run format` - Runs eslint **and** fixes the files the best it can
- `npm start` - The main development command; it concurrently runs typesript in
  watch mode, nodemon to run the compiled code and restart it, and `lint:watch`
  to have the linter output while developing


---
[Joseph Furlott](https://jmfurlott.com)
