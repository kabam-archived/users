# MYWEBCLASS

## Installation Note

### Requirements

Base Applications

 1. [Node.js](http://nodejs.org), see [Installing Node.js](http://www.webizly.com/node/35)
 2. [MongoDB](http://www.mongodb.org), see [Installing MongoDB](http://www.webizly.com/node/31)
 3. [Redis](http://redis.io), see [Introduction to Redis](http://www.webizly.com/node/6)

It's only tested in Ubuntu Linux 12.04, 12.10 and 13.04

Several npm packages needs to be installed globally (using `sudo npm install -g [package name]`), they are:
 1. [express](https://github.com/visionmedia/express) (the main web application framework)
 2. [yo](https://github.com/yeoman/yo) (application scaffold)
 3. [grunt](https://github.com/gruntjs/grunt) (task runner)
 4. [bower](https://github.com/bower/bower) (client-side JavaScript dependency manager)
 5. [mocha](http://github.com/visionmedia/mocha) (testing framework)
 6. [grunt-mocha](https://github.com/kmiyashiro/grunt-mocha)
 7. [phantomjs](https://github.com/Obvious/phantomjs) (client-side testing platform)
 8. [jshint](https://github.com/jshint/jshint) (code style checker)
 9. [coffee-script](https://github.com/jashkenas/coffee-script) (coffee script compiler)
 10. [node-dev](https://github.com/fgnass/node-dev) (node application restarter)

### Installation Notes

Clone the repository:

```sh
$ git clone git@github.com:Webizly/users.git
```

Install the dependencies for the frontend and backend:

```sh
$ sudo make setup
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

## Running Tests

To run the test suite first invoke the following command within the repo to
installing the development dependencies:

```sh
$ make setup
```

then run the tests:

```sh
$ make test
```

## RESTful API

We use [mers](https://github.com/jspears/mers) for RESTful API automatic generation from mongoose Schema.

The resulting API's are:

For example, we'll use the `User` object

  * Read / get list of all users:
    GET http://baseurl/rest/user

  * List with pagination:
    GET http://baseurl/rest/user?skip=10&limit=10

  * List with filter (all user with username containing 'ab'):
    GET http://baseurl/rest/user?filter[username]=ab

  * List with sorting (by activeDate desc, username asc):
    GET http://baseurl/rest/user?sort=activeDate:-1,username:1

  * List by custom finder (custom static method in the schema):
    GET http://baseurl/rest/user/finder/findByCustomParameter?param=value

  * Read / getOB a user based on its id:
    GET http://baseurl/rest/user/$id

  * Create a new user
    POST http://baseurl/rest/user with json data and `Content-Type: application/json` in the request headerOB

  * Update a user
    PUT http://baseurl/rest/user/$id with json data and `Content-Type: application/json` in the request header

  * Delete a user
    DELETE http://baseurl/rest/user/$id

All requests should also contain `Accept: application/json` in its header.

The response's format:
```javascript
{
  "status": 0,
  "payload": [ { ... } ]
}
```

  * For get list, it also has a "total" property.
  * `payload` is an object (instead of an array) for POST and PUT requests.
