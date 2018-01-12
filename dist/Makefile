all: copy-bundle build-loader lex-web-ui-mobile-hub.zip
.PHONY: all

# build the application bundle
WEB_UI_DIR := ../lex-web-ui
WEB_UI_SRC_FILES := $(shell git ls-files $(WEB_UI_DIR)/src)
WEB_UI_BUNDLE_DIR := $(WEB_UI_DIR)/dist/bundle
LIBRARY_SRC_FILES := $(wildcard $(WEB_UI_BUNDLE_DIR)/lex-web-ui.*)
LIBRARY_SRC_FILES += $(wildcard $(WEB_UI_BUNDLE_DIR)/*-worker.*)
LIBRARY_FILES := $(patsubst $(WEB_UI_BUNDLE_DIR)/%,%,$(LIBRARY_SRC_FILES))

# build the application bundle
$(LIBRARY_SRC_FILES): $(WEB_UI_SRC_FILES)
	@echo "[INFO] Building from dir [$(WEB_UI_DIR)]"
	cd $(WEB_UI_DIR) && npm run build-dist

# copy library files to dist dir
$(LIBRARY_FILES): $(LIBRARY_SRC_FILES)
	@echo "[INFO] Copying library files"
	cp $(?) .

copy-bundle: $(LIBRARY_SRC_FILES) $(LIBRARY_FILES)

# copy webiste bot loader files from source to dist dir
SRC_DIR := ../src
LOADER_SRC_DIR := $(SRC_DIR)/lex-web-ui-loader
LOADER_SRC_JS_FILES := \
	$(wildcard $(LOADER_SRC_DIR)/js/*.js) \
	$(wildcard $(LOADER_SRC_DIR)/lib/*.js)
LOADER_SRC_CSS_FILES := $(wildcard $(LOADER_SRC_DIR)/css/*.css)
LOADER_SRC_FILES := $(LOADER_SRC_JS_FILES) $(LOADER_SRC_CSS_FILES)

LOADER_SRC_BASE_NAME := lex-web-ui-loader
LOADER_TARGET_PROD_FILES := \
	$(LOADER_SRC_BASE_NAME).min.js \
	$(LOADER_SRC_BASE_NAME).min.js.map \
	$(LOADER_SRC_BASE_NAME).min.css \
	$(LOADER_SRC_BASE_NAME).min.css.map
LOADER_TARGET_DEV_FILES := $(subst .min,,$(LOADER_TARGET_PROD_FILES))

$(LOADER_TARGET_PROD_FILES): $(LOADER_SRC_FILES)
	@echo "[INFO] building loader prod library files"
	npm run build-prod
build-loader-prod: $(LOADER_TARGET_PROD_FILES)

$(LOADER_TARGET_DEV_FILES): $(LOADER_SRC_FILES)
	@echo "[INFO] building loader dev library files"
	npm run build-dev
build-loader-dev: $(LOADER_TARGET_DEV_FILES)

build-loader: build-loader-dev build-loader-prod

# create mobile hub zip file
SRC_CONFIG_DIR := $(SRC_DIR)/config
SRC_WEBSITE_DIR := $(SRC_DIR)/website
MH_ZIP_FILES := $(LOADER_TARGET_DEV_FILES)
MH_ZIP_FILES += $(wildcard $(SRC_WEBSITE_DIR)/*.html)
MH_ZIP_FILES += $(SRC_CONFIG_DIR)/lex-web-ui-loader-config.json
MH_ZIP_FILES += $(SRC_CONFIG_DIR)/mobile-hub-project.yml
lex-web-ui-mobile-hub.zip: $(MH_ZIP_FILES) $(LIBRARY_FILES)
	@echo "[INFO] Building Mobile Hub project [$(@)] with files: [$(^)]"
	@zip -u -j lex-web-ui-mobile-hub.zip $(^)

clean:
	-rm -f ./*.{css,js,json,html,map,yml,zip}
.PHONY: clean
