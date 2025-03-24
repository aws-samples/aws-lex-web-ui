#  This Makefile is used to update the bootstrap bucket containing
#  the project source and CloudFormation templates

# environment file controls config parameters
CONFIG_ENV := ../config/env.mk
include $(CONFIG_ENV)

# cfn templates
TEMPLATES_DIR := ../templates
TEMPLATES := $(wildcard $(TEMPLATES_DIR)/*.yaml)

# lambda dir
SOURCE_DIR := ../src

# build output directory
OUT := out
# put output dir in VPATH to simplify finding dependencies
VPATH := $(OUT)

.DELETE_ON_ERROR:

# upload files to bootstrap bucket
# NOTE: files uploaded with public read permissions
upload: upload-templates upload-custom-resources-zip upload-src-zip \
	upload-response-card-image upload-initiate-chat-lambda upload-streaming-lambda upload-qbusiness-lambda
.PHONY: upload

# create the output directory for tracking dependencies
$(OUT):
	mkdir -p "$(@)"

# upload cfn templatess
upload-templates: $(TEMPLATES) | $(OUT)
	#@echo "[INFO] Validating templates"
	#@$(MAKE) -C $(TEMPLATES_DIR)
	@echo "[INFO] Uploading templates"
	aws s3 sync --acl public-read --exclude "*" --include "*.yaml" \
		"$(TEMPLATES_DIR)" "s3://$(BOOTSTRAP_BUCKET_PATH)/templates/" \
		| tee "$(OUT)/$(@)"
	@echo "[INFO] master template: https://s3.amazonaws.com/$(BOOTSTRAP_BUCKET_PATH)/templates/master.yaml"


# cfn custom resource lambda files are found under this directory
CUSTOM_RESOURCES_DIR := $(TEMPLATES_DIR)/custom-resources

# zip cfn custom resource lambda files
PY_MODULES := $(CUSTOM_RESOURCES_DIR)/py_modules
CUSTOM_RESOURCES_ZIP := custom-resources-$(VERSION).zip
CUSTOM_RESOURCES_FILES := $(wildcard $(CUSTOM_RESOURCES_DIR)/*.py)
CUSTOM_RESOURCES_FILES += $(PY_MODULES)
$(PY_MODULES):
	pushd $(CUSTOM_RESOURCES_DIR) ; \
	[ -f requirements.txt ] && \
    	python3 -m pip install --upgrade -r requirements.txt -t ./py_modules || true ; \
    popd ;
$(CUSTOM_RESOURCES_ZIP): $(CUSTOM_RESOURCES_FILES) | $(OUT)
	@echo "[INFO] Creating custom resource Lambda zip file"
	zip -u -j "$(OUT)/$(@)" $(?) ; \
	pushd $(CUSTOM_RESOURCES_DIR)/py_modules ; \
	zip -r -q "../../../build/$(OUT)/$(@)" . ; \
	popd ;
upload-custom-resources-zip: $(CUSTOM_RESOURCES_ZIP) | $(OUT)
	@echo "[INFO] Uploading custom resources Lambda zip file"
	aws s3 cp --acl public-read \
		"$(OUT)/$(CUSTOM_RESOURCES_ZIP)" \
		"s3://$(BOOTSTRAP_BUCKET_PATH)/$(CUSTOM_RESOURCES_ZIP)" \
		| tee -a "$(OUT)/$(@)"

# initiate chat lambda function

INITIATE_CHAT_LAMBDA_DIR := $(SOURCE_DIR)/initiate-chat-lambda
INITIATE_CHAT_LAMBDA_ZIP := initiate-chat-lambda-$(VERSION).zip
INITIATE_CHAT_LAMBDA_RESOURCES_FILES := $(wildcard $(INITIATE_CHAT_LAMBDA_DIR)/*.js)

$(INITIATE_CHAT_LAMBDA_ZIP): $(INITIATE_CHAT_LAMBDA_DIR)/index.js
	@echo "[INFO] Creating initiate chat Lambda zip file"
	zip -r -j "$(OUT)/$(INITIATE_CHAT_LAMBDA_ZIP)" $(INITIATE_CHAT_LAMBDA_DIR) ; 

upload-initiate-chat-lambda:
		@echo "[INFO] uploading initiate chat lambda"
	aws s3 cp --acl public-read \
			"$(OUT)/$(INITIATE_CHAT_LAMBDA_ZIP)" "s3://$(BOOTSTRAP_BUCKET_PATH)/$(INITIATE_CHAT_LAMBDA_ZIP)" \
			| tee -a "$(OUT)/$(@)"

# initiate chat lambda function

STREAMING_LAMBDA_DIR := $(SOURCE_DIR)/streaming-lambda
STREAMING_LAMBDA_ZIP := streaming-lambda-$(VERSION).zip
STREAMING_LAMBDA_RESOURCES_FILES := $(wildcard $(STREAMING_LAMBDA_DIR)/*.js)

$(STREAMING_LAMBDA_ZIP): $(STREAMING_LAMBDA_DIR)/index.js
	@echo "[INFO] Creating streaming Lambda zip file"
	zip -r -j "$(OUT)/$(STREAMING_LAMBDA_ZIP)" $(STREAMING_LAMBDA_DIR) ; 

upload-streaming-lambda:
		@echo "[INFO] uploading streaming lambda"
	aws s3 cp --acl public-read \
			"$(OUT)/$(STREAMING_LAMBDA_ZIP)" "s3://$(BOOTSTRAP_BUCKET_PATH)/$(STREAMING_LAMBDA_ZIP)" \
			| tee -a "$(OUT)/$(@)"

QBUSINESS_LAMBDA_DIR := $(SOURCE_DIR)/qbusiness-lambda
QBUSINESS_LAMBDA_ZIP := qbusiness-lambda-$(VERSION).zip
QBUSINESS_LAMBDA_RESOURCES_FILES := $(wildcard $(QBUSINESS_LAMBDA_DIR)/*.py)

$(QBUSINESS_LAMBDA_ZIP): $(QBUSINESS_LAMBDA_DIR)/index.py
	@echo "[INFO] Creating qbusiness Lambda zip file"
	zip -r -j "$(OUT)/$(QBUSINESS_LAMBDA_ZIP)" $(QBUSINESS_LAMBDA_DIR) ; 

upload-qbusiness-lambda:
		@echo "[INFO] uploading qbusiness lambda"
	aws s3 cp --acl public-read \
			"$(OUT)/$(QBUSINESS_LAMBDA_ZIP)" "s3://$(BOOTSTRAP_BUCKET_PATH)/$(QBUSINESS_LAMBDA_ZIP)" \
			| tee -a "$(OUT)/$(@)"

# files in this repo are bundled in a zip file to boostrap the codecommit repo
SRC_ZIP := src-$(VERSION).zip
SRC_FILES := $(shell git ls-files ..)
$(SRC_ZIP): $(SRC_FILES) | $(OUT)
	@echo "[INFO] creating git repo archive"
	cd .. && git archive --format=zip HEAD > "build/$(OUT)/$(@)"

upload-src-zip: $(SRC_ZIP) | $(OUT)
	@echo "[INFO] uploading git repo archive"
	aws s3 cp --acl public-read \
		"$(OUT)/$(SRC_ZIP)" "s3://$(BOOTSTRAP_BUCKET_PATH)/$(SRC_ZIP)" \
		| tee -a "$(OUT)/$(@)"

RESPONSE_CARD_IMAGE := ../lex-web-ui/public/img/flowers.jpeg
upload-response-card-image: $(RESPONSE_CARD_IMAGE) | $(OUT)
	@echo "[INFO] uploading response card image"
	aws s3 cp --acl public-read --content-type 'image/jpg' \
		"$(RESPONSE_CARD_IMAGE)" "s3://$(BOOTSTRAP_BUCKET_PATH)/flowers.jpeg" \
		| tee -a "$(OUT)/$(@)"

clean:
	-rm -f $(OUT)/*
.PHONY: clean
