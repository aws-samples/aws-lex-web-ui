# this Makefile is mainly meant to be called from CodeBuild
# or to setup/run the local dev environment

# environment file controls config parameters
CONFIG_ENV := config/env.mk
include $(CONFIG_ENV)

all: build
.PHONY: all

WEBAPP_DIR := ./lex-web-ui
build: config
	@echo "[INFO] Building web app in dir [$(WEBAPP_DIR)]"
	cd $(WEBAPP_DIR) && npm run build
.PHONY: build

install-deps:
	@echo "[INFO] Installing npm dependencies"
	cd $(WEBAPP_DIR) && npm install
.PHONY: install-deps

BUILD_DIR := build
UPDATE_CONFIG_SCRIPT := $(BUILD_DIR)/update-lex-web-ui-config.js
export IFRAME_CONFIG ?= $(realpath $(WEBAPP_DIR)/static/iframe/config.json)
export WEBAPP_CONFIG_PROD ?= $(realpath $(WEBAPP_DIR)/src/config/config.prod.json)
export WEBAPP_CONFIG_DEV ?= $(realpath $(WEBAPP_DIR)/src/config/config.dev.json)
export WEBAPP_CONFIG_PREBUILT ?= $(realpath src/config/config.json)
CONFIG_FILES := $(IFRAME_CONFIG) $(WEBAPP_CONFIG_PROD) $(WEBAPP_CONFIG_DEV) \
	$(WEBAPP_CONFIG_PREBUILT)
config: $(UPDATE_CONFIG_SCRIPT) $(CONFIG_ENV) $(CONFIG_FILES)
	@echo "[INFO] Running config script: [$(<)]"
	node $(<)
.PHONY: config

DIST_DIR := $(realpath dist)
WEBAPP_INDEX := $(realpath src/index.html)
s3deploy-prebuilt:
	@[ "$(WEBAPP_BUCKET)" ] || \
 		(echo "[ERROR] WEBAPP_BUCKET env var not set" ; exit 1)
	@echo "[INFO] deploying to S3 webapp bucket: [$(WEBAPP_BUCKET)]"
	aws s3 sync --acl public-read --exclude "*" \
		--include "*.css" --include "*.js" \
		--include "*.map" --include "*.html" \
		"$(DIST_DIR)" "s3://$(WEBAPP_BUCKET)/"
	@echo "[INFO] copying config file to S3 webapp bucket: [$(WEBAPP_BUCKET)]"
	aws s3 cp --acl public-read \
		"$(WEBAPP_CONFIG_PREBUILT)" "s3://$(WEBAPP_BUCKET)/"
	@echo "[INFO] copying index.html file to S3 webapp bucket: [$(WEBAPP_BUCKET)]"
	aws s3 cp --acl public-read \
		"$(WEBAPP_INDEX)" "s3://$(WEBAPP_BUCKET)/"
	@echo "[INFO] all done deploying"
.PHONY: s3deploy-prebuilt

WEBAPP_DIST_DIR := $(realpath $(WEBAPP_DIR)/dist)
CODEBUILD_BUILD_ID ?= none
s3deploy:
	@[ "$(WEBAPP_BUCKET)" ] || \
 		(echo "[ERROR] WEBAPP_BUCKET env var not set" ; exit 1)
	@echo "[INFO] deploying to S3 webapp bucket: [$(WEBAPP_BUCKET)]"
	@echo "[INFO] copying build: [$(CODEBUILD_BUILD_ID)]"
	aws s3 cp --recursive "$(WEBAPP_DIST_DIR)" \
		"s3://$(WEBAPP_BUCKET)/builds/$(CODEBUILD_BUILD_ID)/"
	@echo "[INFO] copying new version"
	aws s3 cp --recursive --acl public-read \
		"s3://$(WEBAPP_BUCKET)/builds/$(CODEBUILD_BUILD_ID)/" \
		"s3://$(WEBAPP_BUCKET)/"
	@[ "$(PARENT_PAGE_BUCKET)" ] && \
		( echo "[INFO] synching parent page to bucket: [$(PARENT_PAGE_BUCKET)]" ; \
		aws s3 sync --acl public-read "$(WEBAPP_DIST_DIR)/static/iframe" \
			"s3://$(PARENT_PAGE_BUCKET)/static/iframe" ) || \
		echo "[INFO] no parent bucket to deploy"
	@echo "[INFO] all done deploying"
.PHONY: s3deploy
