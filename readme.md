## Option 1: To run it using yarn:
```bash
npm install --global yarn

yarn install
yarn build
yarn start
```

Open the [demo](http://localhost:3000/)

## Option 2: To build and run the docker image, run:
```bash
docker build -t perfworkloadsearch:latest .

docker run -it --rm -p 3001:3000 perfworkloadsearch:latest
```

Open the [demo](http://localhost:3001/)

*Created with CodeSandbox*

