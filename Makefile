# this Makefile is mainly meant to be called from CodeBuild
# or to setup/run the local dev environment
BUILD_DIR := build

all: build
.PHONY: all

WEBAPP_DIR := ./lex-web-ui
build: config
	@echo "[INFO] Building web app in dir [$(WEBAPP_DIR)]"
	cd $(WEBAPP_DIR) && npm run build
.PHONY: build

dev: config
	@echo "[INFO] Running web app in dev mode"
	cd $(WEBAPP_DIR) && npm run dev
.PHONY: dev

PACKAGE_JSON := $(WEBAPP_DIR)/package.json
install-deps: $(PACKAGE_JSON)
	@echo "[INFO] Installing npm dependencies"
	cd $(WEBAPP_DIR) && npm install
.PHONY: install

UPDATE_CONFIG_SCRIPT := $(BUILD_DIR)/update-lex-web-ui-config.js
export IFRAME_CONFIG ?= $(realpath $(WEBAPP_DIR)/static/iframe/config.json)
export WEBAPP_CONFIG_PROD ?= $(realpath $(WEBAPP_DIR)/src/config/config.prod.json)
export WEBAPP_CONFIG_DEV ?= $(realpath $(WEBAPP_DIR)/src/config/config.dev.json)
CONFIG_FILES := $(IFRAME_CONFIG) $(WEBAPP_CONFIG_PROD) $(WEBAPP_CONFIG_DEV)
config: $(UPDATE_CONFIG_SCRIPT) $(CONFIG_ENV) $(CONFIG_FILES)
	@echo "[INFO] Running config script: [$(<)]"
	node $(<)
.PHONY: config

DIST_DIR := $(WEBAPP_DIR)/dist
s3sync:
	@echo "[INFO] synching to S3 webapp bucket: [$(WEBAPP_BUCKET)]"
	aws s3 sync --acl public-read "$(DIST_DIR)" "s3://$(WEBAPP_BUCKET)/"
.PHONY: s3sync

s3deploy:
	@echo "[INFO] deploying to S3 webapp bucket: [$(WEBAPP_BUCKET)]"
	@echo "[INFO] copying build: [$(CODEBUILD_BUILD_ID)]"
	aws s3 cp --recursive "$(DIST_DIR)" \
		"s3://$(WEBAPP_BUCKET)/builds/$(CODEBUILD_BUILD_ID)/"
	@echo "[INFO] copying new version"
	aws s3 cp --recursive --acl public-read \
		"s3://$(WEBAPP_BUCKET)/builds/$(CODEBUILD_BUILD_ID)/" \
		"s3://$(WEBAPP_BUCKET)/"
	@[ "$(PARENT_PAGE_BUCKET)" ] && \
		( echo "[INFO] synching parent page to bucket: [$(PARENT_PAGE_BUCKET)]" ; \
		aws s3 sync --acl public-read "$(DIST_DIR)/static/iframe" \
			"s3://$(PARENT_PAGE_BUCKET)/static/iframe" ) || \
		echo "[INFO] no parent bucket to deploy"
	@echo "[INFO] all done deploying"
.PHONY: s3deploy
