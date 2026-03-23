.PHONY: debug stop test-contact test-customer push clean

debug:
	@npm install --prefer-offline --no-audit --no-fund
	@echo ""
	@echo "Microservice starting at http://localhost:3000"
	node ./src/index.js

stop:
	@lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No process on port 3000"

test-contact:
	@curl -s -X POST http://localhost:3000/v1/contacts/11111111-1111-1111-1111-111111111111/offers/sync | python3 -m json.tool

test-customer:
	@curl -s -X POST http://localhost:3000/v1/customers/customer1/offers/sync | python3 -m json.tool

push:
	GIT_SSH_COMMAND="ssh -F ~/.ssh/ssh_config" git push -u origin $$(git branch --show-current)

clean:
	rm -rf node_modules
