# This Makefile is used to configure and deploy the sample app.
# It is used in CodeBuild by the CloudFormation stack.
# It can also be run from a local dev environment.
# It can either deploy a full build or use the prebuilt library in
# in the dist directory

# environment file provides config parameters
CONFIG_ENV := config/env.mk
include $(CONFIG_ENV)

all: build
.PHONY: all

WEBAPP_DIR := ./lex-web-ui
BUILD_DIR := build
DIST_DIR := dist
SRC_DIR := src
CONFIG_DIR := $(SRC_DIR)/config
WEBSITE_DIR := $(SRC_DIR)/website

# this install all the npm dependencies needed to build from scratch
install-deps:
	@echo "[INFO] Installing npm dependencies"
	cd $(WEBAPP_DIR) && npm install
.PHONY: install-deps

# BUILD_TYPE controls whether the configuration is done for a full build or
# for using the prebuilt/dist libraries
# Expected values: full || dist
# If empty, probably this is being run locally or from an external script
BUILD_TYPE ?= $()

# updates the config files with values from the environment
UPDATE_CONFIG_SCRIPT := $(BUILD_DIR)/update-lex-web-ui-config.js
export IFRAME_CONFIG ?= $(realpath $(WEBAPP_DIR)/static/iframe/config.json)
export WEBAPP_CONFIG_PROD ?= $(realpath $(WEBAPP_DIR)/src/config/config.prod.json)
export WEBAPP_CONFIG_DEV ?= $(realpath $(WEBAPP_DIR)/src/config/config.dev.json)
export WEBAPP_CONFIG_PREBUILT ?= $(realpath $(SRC_DIR)/config/bot-config.json)
export IFRAME_CONFIG_PREBUILT ?= $(realpath $(CONFIG_DIR)/chatbot-ui-iframe-loader-config.json)
CONFIG_FILES := $(IFRAME_CONFIG) $(WEBAPP_CONFIG_PROD) $(WEBAPP_CONFIG_DEV) \
	$(WEBAPP_CONFIG_PREBUILT) $(IFRAME_CONFIG_PREBUILT)
config: $(UPDATE_CONFIG_SCRIPT) $(CONFIG_ENV) $(CONFIG_FILES)
	@echo "[INFO] Running config script: [$(<)]"
	node $(<)
.PHONY: config

build: config
	@echo "[INFO] Building web app in dir [$(WEBAPP_DIR)]"
	cd $(WEBAPP_DIR) && npm run build
.PHONY: build

# used by the Pipeline deployment mode when building from scratch
WEBAPP_DIST_DIR := $(WEBAPP_DIR)/dist
CODEBUILD_BUILD_ID ?= none
deploy-to-s3:
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
.PHONY: deploy-to-s3

# Run by CodeBuild deployment mode when which uses the prebuilt libraries
# Can also be used to easily copy local changes to a bucket
# (e.g. mobile hub created bucket)
# It avoids overwriting the aws-config.js file when using outside of a build
sync-website:
	@[ "$(WEBAPP_BUCKET)" ] || \
		(echo "[ERROR] WEBAPP_BUCKET variable not set" ; exit 1)
	@echo "[INFO] copying libary files"
	aws s3 sync --acl public-read \
		--exclude Makefile \
		--exclude lex-web-ui-mobile-hub.zip \
		$(DIST_DIR) s3://$(WEBAPP_BUCKET)
	@echo "[INFO] copying website files"
	aws s3 sync --acl public-read \
		$(WEBSITE_DIR) s3://$(WEBAPP_BUCKET)
	@echo "[INFO] copying config files"
	aws s3 sync --acl public-read \
		--exclude '*' \
		--include 'bot-*config.json' \
		$(CONFIG_DIR) s3://$(WEBAPP_BUCKET)
	@[ "$(BUILD_TYPE)" = 'dist' ] && \
		echo "[INFO] copying aws-config.js" ;\
		aws s3 sync --acl public-read \
			--exclude '*' \
			--include 'aws-config.js' \
			$(CONFIG_DIR) s3://$(WEBAPP_BUCKET)
	@echo "[INFO] all done deploying"
.PHONY: sync-website
