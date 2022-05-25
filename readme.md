To run it user yarn:
```bash
npm install --global yarn

yarn install
yarn build
yarn start
```

To start and build the docker image, run:
```bash
docker build -t perfworkloadsearch:latest .

docker run -it --rm -p 3001:3000 perfworkloadsearch:latest
```

Open the [demo](http://localhost:3001/)

*Created with CodeSandbox*

