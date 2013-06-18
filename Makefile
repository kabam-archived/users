.PHONY: setup

setup:
	npm install
	npm install -d
	npm install -g express
	npm install -g yo
	npm install -g grunt
	npm install -g bower
	npm install -g mocha
	npm install -g grunt-mocha
	npm install -g phantomjs
	npm install -g jshint
	npm install -g coffee-script
	npm install -g node-dev
	cd client; npm install; bower install