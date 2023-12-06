# node-back

## Installation

Read on on how to set up this for development. Clone the repo.

```
$ git clone https://github.com/kpatel0170/node-back.git
$ cd node-back
```

### Server

#### .env file

Rename `.env.example` to `.env` and fill in database connection strings, Google and Facebook tokens, JWT secret and your client and server production URLs.

```
#db
MONGO_URI_DEV=
MONGO_URI_PROD=

#google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=/auth/google/callback

#facebook
FACEBOOK_APP_ID=
FACEBOOK_SECRET=
FACEBOOK_CALLBACK_URL=/auth/facebook/callback

#jwt
JWT_SECRET_DEV=secret
JWT_SECRET_PROD=

#site urls
CLIENT_URL_DEV=
CLIENT_URL_PROD=
SERVER_URL_DEV=
SERVER_URL_PROD=

```


#### Install dependencies

```
$ npm install
```

#### Run the server

You are good to go, server will be available on `https://localhost:3001`

```
$ npm start
```

## Contributing

We welcome contributions to the project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b new-feature`.
3. Make the changes to the codebase

