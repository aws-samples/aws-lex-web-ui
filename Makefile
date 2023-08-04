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

# merge existing user modified lex-web-ui-loader-config.json during upgrade
# replace user custom-chatbot-style.css files during upgrade
CURRENT_CONFIG_FILE := $(WEBAPP_DIR)/current/user-lex-web-ui-loader-config.json
USER_CUSTOM_CSS_COPY := $(WEBAPP_DIR)/current/user-custom-chatbot-style.css

# this install all the npm dependencies needed to build from scratch
install-deps:
	@echo "[INFO] Installing loader npm dependencies"
	npm install
	@echo "[INFO] Installing component npm dependencies"
	cd $(WEBAPP_DIR) && npm install
.PHONY: install-deps


load-current-config:
	@echo "[INFO] Downloading current lex-web-ui-loader-config.json from s3 to merge user changes"
	@echo "[INFO] Downloading s3://$(WEBAPP_BUCKET)/lex-web-ui-loader-config.json if it exists or load defaults"
	-aws s3 ls "s3://$(WEBAPP_BUCKET)/lex-web-ui-loader-config.json" && \
    	aws s3 cp "s3://$(WEBAPP_BUCKET)/lex-web-ui-loader-config.json" "$(CURRENT_CONFIG_FILE)" || \
        cp "$(CONFIG_DIR)/default-lex-web-ui-loader-config.json" "$(CURRENT_CONFIG_FILE)"
	@echo "[INFO] Downloading s3://$(WEBAPP_BUCKET)/custom-chatbot-style.css file if it exists or load defaults"
	-aws s3 ls "s3://$(WEBAPP_BUCKET)/custom-chatbot-style.css" && \
    	aws s3 cp "s3://$(WEBAPP_BUCKET)/custom-chatbot-style.css" "$(USER_CUSTOM_CSS_COPY)" || \
        cp "$(DIST_DIR)/custom-chatbot-style.css" "$(USER_CUSTOM_CSS_COPY)"
.PHONY: load-current-config

# BUILD_TYPE controls whether the configuration is done for a full build or
# for using the prebuilt/dist libraries
# Expected values: full || dist
# If empty, probably this is being run locally or from an external script
BUILD_TYPE ?= $()

# updates the config files with values from the environment
CREATE_CUSTOM_CSS := $(BUILD_DIR)/create-custom-css.js
UPDATE_CONFIG_SCRIPT := $(BUILD_DIR)/update-lex-web-ui-config.js
export CURRENT_CONFIG_FILE ?= $(realpath $(CURRENT_CONFIG_FILE))
export WEBAPP_CONFIG_PROD ?= $(realpath $(WEBAPP_DIR)/src/config/config.prod.json)
export WEBAPP_CONFIG_DEV ?= $(realpath $(WEBAPP_DIR)/src/config/config.dev.json)
export LOADER_CONFIG ?= $(realpath $(SRC_DIR)/config/lex-web-ui-loader-config.json)
CONFIG_FILES := \
	$(WEBAPP_CONFIG_PROD) \
	$(WEBAPP_CONFIG_DEV) \
	$(LOADER_CONFIG)
config: $(UPDATE_CONFIG_SCRIPT) $(CONFIG_ENV) $(CONFIG_FILES)
	@echo "[INFO] Running config script: [$(<)]"
	node $(<)
	@echo "[INFO] Running custom css creation script: [$(<)]"
	node $(CREATE_CUSTOM_CSS) $(USER_CUSTOM_CSS_COPY)
.PHONY: config

build: config
	@echo "[INFO] Building component in dir [$(WEBAPP_DIR)]"
	cd $(WEBAPP_DIR) && npm run build
	cd $(WEBAPP_DIR) && npm run build-dist
	@echo "[INFO] Building loader"
	npm run build-dev
	npm run build-prod
	@echo "[INFO Building Dist"
	cd $(DIST_DIR) && make
.PHONY: build

# creates an HTML file with a JavaScript snippet showing how to load the iframe
CREATE_IFRAME_SNIPPET_SCRIPT := $(BUILD_DIR)/create-iframe-snippet-file.sh
export IFRAME_SNIPPET_FILE := $(DIST_DIR)/iframe-snippet.html
$(IFRAME_SNIPPET_FILE): $(CREATE_IFRAME_SNIPPET_SCRIPT)
	@echo "[INFO] Creating iframe snippet file: [$(@)]"
	bash $(?)
create-iframe-snippet: $(IFRAME_SNIPPET_FILE)

# used by the Pipeline deployment mode when building from scratch
WEBAPP_DIST_DIR := $(WEBAPP_DIR)/dist
CODEBUILD_BUILD_ID ?= none
deploy-to-s3: create-iframe-snippet
	@[ "$(WEBAPP_BUCKET)" ] || \
 		(echo "[ERROR] WEBAPP_BUCKET env var not set" ; exit 1)
	@echo "[INFO] deploying to S3 webapp bucket: [$(WEBAPP_BUCKET)]"
	@echo "[INFO] copying build: [$(CODEBUILD_BUILD_ID)]"
	aws s3 cp --recursive "$(WEBAPP_DIST_DIR)" \
		"s3://$(WEBAPP_BUCKET)/builds/$(CODEBUILD_BUILD_ID)/"
	@echo "[INFO] copying new version"
	aws s3 cp --recursive \
		"s3://$(WEBAPP_BUCKET)/builds/$(CODEBUILD_BUILD_ID)/" \
		"s3://$(WEBAPP_BUCKET)/"
	aws s3 cp \
		--metadata-directive REPLACE --cache-control max-age=0 \
		"s3://$(WEBAPP_BUCKET)/builds/$(CODEBUILD_BUILD_ID)/custom-chatbot-style.css" \
		"s3://$(WEBAPP_BUCKET)/"
	@[ "$(PARENT_PAGE_BUCKET)" ] && \
		( echo "[INFO] synching parent page to bucket: [$(PARENT_PAGE_BUCKET)]" && \
		aws s3 sync \
			--exclude '*' \
			--metadata-directive REPLACE --cache-control max-age=0 \
			--include 'lex-web-ui-loader-config.json' \
			"$(CONFIG_DIR)" "s3://$(PARENT_PAGE_BUCKET)/" && \
		aws s3 sync \
			--exclude '*' \
			--include 'lex-web-ui-loader.*' \
			--include 'parent.html' \
			--include 'iframe-snippet.html' \
			"$(DIST_DIR)" "s3://$(PARENT_PAGE_BUCKET)/" ) || \
		echo "[INFO] no parent bucket to deploy"
	@echo "[INFO] all done deploying"
.PHONY: deploy-to-s3

# Run by CodeBuild deployment mode when which uses the prebuilt libraries
# Can also be used to easily copy local changes to a bucket
sync-website: create-iframe-snippet
	@[ "$(WEBAPP_BUCKET)" ] || \
		(echo "[ERROR] WEBAPP_BUCKET variable not set" ; exit 1)
	@echo "[INFO] copying web site files"
	aws s3 sync \
		--exclude Makefile \
		--exclude custom-chatbot-style.css \
		"$(DIST_DIR)" s3://$(WEBAPP_BUCKET)
	@echo "[INFO] Restoring existing custom css file"
	@[ -f "$(USER_CUSTOM_CSS_COPY)" ] && \
	aws s3 cp \
		--metadata-directive REPLACE --cache-control max-age=0 \
		"$(USER_CUSTOM_CSS_COPY)" "s3://$(WEBAPP_BUCKET)/custom-chatbot-style.css"
	@echo "[INFO] Saving a backup copy of previous loader config json"
	aws s3 cp \
		"$(CURRENT_CONFIG_FILE)" "s3://$(WEBAPP_BUCKET)/lex-web-ui-loader-config.$(shell date +%Y%m%d%H%M%S).json"
#   For CodePipeline based distribution / builds where the custom style is managed in
#   Source control, uncomment the next four lines such that the css file is updated
#   on each CodePipeline/CodeBuild invocation.
#	@echo "[INFO] copying custom-chatbot-style.css and setting cache max-age=0"
#	aws s3 cp \
#		--metadata-directive REPLACE --cache-control max-age=0 \
#		"$(DIST_DIR)/custom-chatbot-style.css" s3://$(WEBAPP_BUCKET)
	@echo "[INFO] copying config files"
	aws s3 sync  \
		--exclude '*' \
		--metadata-directive REPLACE --cache-control max-age=0 \
		--include 'lex-web-ui-loader-config.json' \
		--include 'initial_speech*.*' \
		"$(CONFIG_DIR)" s3://$(WEBAPP_BUCKET)
	@echo "[INFO] all done deploying"
.PHONY: sync-website
