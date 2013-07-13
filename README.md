[![Stories in Ready](http://badge.waffle.io/mywebclass/users.png)](http://waffle.io/mywebclass/users)  
# MYWEBCLASS

## Installation Note

### Requirements

Base Applications

* [Node.js](http://nodejs.org), see [Installing Node.js](http://www.webizly.com/node/35)

It's only tested in Ubuntu Linux 12.04, 12.10 and 13.04

Several npm packages needs to be installed globally (using `sudo npm install -g [package name]`), they are:
* [yo](https://github.com/yeoman/yo) (application scaffold)
* [generator-angular](https://github.com/yeoman/generator-angular) (Yeoman generator for AngularJS)
* [grunt-cli](https://github.com/gruntjs/grunt-cli) (task runner)
* [bower](https://github.com/bower/bower) (client-side JavaScript dependency manager)
* [phantomjs](https://github.com/Obvious/phantomjs) (client-side testing platform)
* [jshint](https://github.com/jshint/jshint) (code style checker)
* [coffee-script](https://github.com/jashkenas/coffee-script) (coffee script compiler)

### Installation Notes

Clone the repository:

```sh
$ git clone git@github.com:mywebclass/users.git
```

Install the dependencies:

```sh
$ npm install && bower install
```

Or to run it in development mode:
```sh
$ grunt server
```

## Running Tests

then run the tests:

```sh
$ grunt test
```