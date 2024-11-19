This repo is based on the Udemy course complete guide to building an app with net core and react (https://bah.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/learn/lecture/24835518#overview)

The repo follows the course using for React state management MobX and for Theming Semantic-UI.
The API has minimal feature to support only what implemented by the client-app

# Prerequisites

# First time run

- Start the API from root folder (reactivities)

```shell
cd API
```

```shell
dotnet watch
```

- Start Client UI from root folder (reactivities)

```shell
cd client-app
```

```shell
npm i
```

```shell
npm run start
```


On chapter 10 to cleanup db had to install

dotnet tool install --global dotnet-ef --version 8.*

then call (run from foot not from /api)
dotnet ef database drop -s API -p Persistence 

then cd api
an then run dotnet watch