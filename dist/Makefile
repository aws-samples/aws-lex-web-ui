all: build copy-bundle copy-botloader lex-web-ui-mobile-hub.zip
.PHONY: all

# build the application bundle
WEB_UI_DIR := ../lex-web-ui
build:
	@echo "[INFO] Building from dir [$(WEB_UI_DIR)]"
	cd $(WEB_UI_DIR) && npm run build-dist
.PHONY: build

# copy library files to dist dir
WEB_UI_BUNDLE_DIR := $(WEB_UI_DIR)/dist/bundle
LIBRARY_SRC_FILES := $(wildcard $(WEB_UI_BUNDLE_DIR)/lex-web-ui.*)
LIBRARY_SRC_FILES += $(wildcard $(WEB_UI_BUNDLE_DIR)/*-worker.*)
LIBRARY_FILES := $(patsubst $(WEB_UI_BUNDLE_DIR)/%,%,$(LIBRARY_SRC_FILES))
$(LIBRARY_FILES): $(LIBRARY_SRC_FILES)
	@echo "[INFO] Copying library files"
	cp $(?) .

copy-bundle: $(LIBRARY_FILES)

# copy webiste bot loader files from source to dist dir
SRC_DIR := ../src
WEBSITE_SRC_DIR := $(SRC_DIR)/website
BOTLOADER_SRC_FILES := $(wildcard $(WEBSITE_SRC_DIR)/chatbot-ui-iframe-loader.*)
BOTLOADER_FILES := $(patsubst $(WEBSITE_SRC_DIR)/%,%,$(BOTLOADER_SRC_FILES))
$(BOTLOADER_FILES): $(BOTLOADER_SRC_FILES)
	@echo "[INFO] Bot Loader files"
	cp $(?) .

copy-botloader: $(BOTLOADER_FILES)

# create mobile hub zip file
MH_ZIP_FILES := $(wildcard $(WEBSITE_SRC_DIR)/*)
SRC_CONFIG_DIR := $(SRC_DIR)/config
MH_ZIP_FILES += $(wildcard $(SRC_CONFIG_DIR)/*.json)
MH_ZIP_FILES += $(SRC_CONFIG_DIR)/mobile-hub-project.yml
lex-web-ui-mobile-hub.zip: $(MH_ZIP_FILES) $(LIBRARY_FILES) $(MH_PROJECT_FILE)
	@echo "[INFO] Building Mobile Hub project [$(@)] with files: [$(^)]"
	@zip -u -j lex-web-ui-mobile-hub.zip $(^)

clean:
	-rm -f ./*.{css,js,json,html,map,yml,zip}
.PHONY: clean
