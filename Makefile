.PHONY: test

test:
	node_modules/jasmine-node/bin/jasmine-node test/end-point-test/ --forceexit
