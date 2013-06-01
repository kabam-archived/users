.PHONY: test setup

setup:
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

test:
	node_modules/jasmine-node/bin/jasmine-node test/end-point-test/ --forceexit
