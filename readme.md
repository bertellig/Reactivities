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

# Section 12 Identity

- Install and configure ASP.Net Core identity. We've taken a look at JWT token authentication, which is the method we're using to allow users to authenticate to our API, a very commonly used method of authenticating to an API because we don't have a session with our API when we're making requests to API endpoints.As soon as we've received the data back from the API, our client is effectively disconnected from ourAPI. So we can't remember the user login state.When we're using an API, we have to use something like a JWT so that we can send that token with every request to the API and that's how we maintain our login status with our API. So we've added login and register methods to allow users to sign up and log in and we've added authentication to our endpoints. So other than the API account controller, everything in our application now requires authenticated requests to retrieve the data. One of the security concerns might be the length of time that our token is valid for seven days. This is insecure. Well, our token at the moment is valid for seven days, and in fact we're not even checking the token expiry as a token validation parameter. So effectively our token could be said to be valid forever. Our server isn't going to check the expiry to see if the token is still valid at this point. And this is something that we address later on. We're going to take a look at refresh tokens so we can reduce the amount of time our token lives for and we can reduce it to say, ten minutes or something. And as that time expires, then we can refresh the token, so long as our user is still using our application. It's just the steps you take to make it as difficult as possible. There are levels of security you can go to and we will look at securing our application better than we're doing it right now. We're not publishing our application right now. We're still working on it. In production we don't use Http. We use Https, which is a requirement if you're asking users for usernames and passwords because they are also sent in clear text at the moment as well. So the header and the payload are weaknesses. If we do not use SSL to protect our network requests, but in production we do use that, which means the headers and the payload are encrypted and SSL is a secure and mature technology to protect network traffic from going to the client to the server. 