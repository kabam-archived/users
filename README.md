# MYWEBCLASS

## Installation Note

### Requirements

Base Applications

 1. [Node.js](http://nodejs.org), see [Installing Node.js](http://www.webizly.com/node/35)
 2. [MongoDB](http://www.mongodb.org), see [Installing MongoDB](http://www.webizly.com/node/31)
 3. [Redis](http://redis.io), see [Introduction to Redis](http://www.webizly.com/node/6)

It's only tested in Ubuntu Linux 12.04, 12.10 and 13.04

Several npm packages needs to be installed globally (using `sudo npm install -g [package name]`), they are:
 1. express (the main web application framework)
 2. yo (application scaffold)
 3. grunt (task runner)
 4. bower (client-side JavaScript dependency manager)
 5. mocha (testing framework)
 6. grunt-mocha
 7. phantomjs (client-side testing platform)
 8. jshint (code style checker)
 9. coffee-script (coffee script compiler)
10. node-dev (node application restarter)

### Installation Notes

Clone the repository:

```sh
$ git clone git@github.com:Webizly/users.git
```

Install npm modules for the backend:

```sh
$ cd users
$ npm install
```

Install npm modules and JavaScript libraries for the frontend:

```sh
$ cd client
$ npm install
$ bower install
```

Configuration (create and edit config.yml)

```sh
$ cd ..
$ cp config/config.sample.yml config/config.yml
```

Then edit `config/config.yml` as appropriate.

Run the application:

```sh
$ npm start
```

Or to run it in development mode:
```sh
$ node-dev app.js
```
