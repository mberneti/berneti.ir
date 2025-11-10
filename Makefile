.PHONY: help build run stop clean rebuild logs shell test push

# Variables
IMAGE_NAME ?= berneti-blog
CONTAINER_NAME ?= berneti-blog-server
PORT ?= 3030
REGISTRY ?= ghcr.io
REPO ?= $(shell git config --get remote.origin.url | sed 's/.*://;s/.git//')

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build Docker image
	docker build -t $(IMAGE_NAME):latest .

build-no-cache: ## Build Docker image without cache
	docker build --no-cache -t $(IMAGE_NAME):latest .

run: ## Run container from image
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):3030 \
		-e NODE_ENV=production \
		--restart unless-stopped \
		-v ./logs:/app/logs \
		$(IMAGE_NAME):latest

run-it: ## Run container interactively
	docker run -it --rm \
		-p $(PORT):3030 \
		-e NODE_ENV=production \
		$(IMAGE_NAME):latest

stop: ## Stop running container
	docker stop $(CONTAINER_NAME) || true

remove: stop ## Stop and remove container
	docker rm $(CONTAINER_NAME) || true

clean: remove ## Remove container and image
	docker rmi $(IMAGE_NAME):latest || true

rebuild: clean build ## Clean, build, and run
	$(MAKE) run

logs: ## Show container logs
	docker logs -f $(CONTAINER_NAME)

shell: ## Access container shell
	docker exec -it $(CONTAINER_NAME) sh

pm2-logs: ## Show PM2 logs
	docker exec -it $(CONTAINER_NAME) pm2 logs

pm2-monit: ## Show PM2 monitoring dashboard
	docker exec -it $(CONTAINER_NAME) pm2 monit

pm2-status: ## Show PM2 process status
	docker exec -it $(CONTAINER_NAME) pm2 status

compose-up: ## Start with docker-compose
	docker-compose up -d

compose-down: ## Stop docker-compose services
	docker-compose down

compose-build: ## Build with docker-compose
	docker-compose build

compose-logs: ## Show docker-compose logs
	docker-compose logs -f

compose-rebuild: ## Rebuild and restart with docker-compose
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

push: ## Push image to registry
	docker tag $(IMAGE_NAME):latest $(REGISTRY)/$(REPO):latest
	docker push $(REGISTRY)/$(REPO):latest

pull: ## Pull image from registry
	docker pull $(REGISTRY)/$(REPO):latest

test: ## Run tests in container
	docker run --rm $(IMAGE_NAME):latest npm test

inspect: ## Inspect container
	docker inspect $(CONTAINER_NAME)

stats: ## Show container resource usage
	docker stats $(CONTAINER_NAME)

prune: ## Clean up unused Docker resources
	docker system prune -af --volumes
