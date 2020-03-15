# Skeleton for node express api

<!-- toc -->

## Context

- [Technologies](#technologies)
- [Application structure](#application-structure)
- [Preparation & initial start](#preparation-&-initial-start)
    - [Preconditions](#preconditions)
    - [Installation](#installation)
- [Scripts](#scripts)

<!-- tocstop -->

## Technologies

- [Node.js v12.x](https://nodejs.org/dist/latest-v12.x/docs/api/)
- [Express.js](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/docs/home.html)

## Application structure
- **/.devops** - manual/auto deploy/build scripts/configs
  - **/config** -  predefined configs for envs
  - **/scripts** - general purpose scripts
    - **/local** - scripts for local development
- **/dist** - all binaries should be here
	   - **svc** - `svc` binaries for prod
- **/src** - source code
     - **/libs** - `service` middleware and global libs 
     - **/modules** - `services` features
     - **/types** - files for describing or overriding global types for typescript
     - **/utils** - helpers functions what used for easier implementation
     - **/index.ts** - point of income into `service` application
- **package.json** - component meta file (default for js environment). Here the whole `service` version history is tracked

## Preparation & initial start

### Preconditions

- node.js should be installed
- docker should be installed

### Installation
- Clone project from [svc repo](https://github.com/ciklum-digital/node-express-typescript-skeleton)
- Go to repo folder and run ``npm i`` - install dependencies
- Run ``npm run start`` launch service
- Go to [http://localhost:9000](http://localhost:9000) in browser

## Scripts
- `start` - launch application
- `ts-node` - wrap local `ts-node` package
- `jest` - wrap local `jest` package
- `clean:dist` - clear dist folder before new build
- `prebuild` - launched before build command automatically
- `build` - build sources of application
- `lint` - static analize of application 
- `lint:fix` - auto fix errors after linter check
- `test` - run unit tests
- `test:coverage` - run unit tests and generate coverage report