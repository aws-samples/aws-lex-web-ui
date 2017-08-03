WEB_UI_DIR := ../lex-web-ui
WEB_UI_BUNDLE_DIR := $(WEB_UI_DIR)/dist/bundle
SRC_DIR := ../src

# environment file controls config parameters
CONFIG_ENV := ../config/env.mk
include $(CONFIG_ENV)

all: build copy-bundle lex-web-ui-mobile-hub.zip
.PHONY: all

build:
	@echo "[INFO] Building from dir [$(WEB_UI_DIR)]"
	cd $(WEB_UI_DIR) && npm run build-dist
.PHONY: build

LIBRARY_SRC_FILES := $(wildcard $(WEB_UI_BUNDLE_DIR)/lex-web-ui.*)
LIBRARY_SRC_FILES += $(wildcard $(WEB_UI_BUNDLE_DIR)/*-worker.*)
LIBRARY_FILES := $(patsubst $(WEB_UI_BUNDLE_DIR)/%,%,$(LIBRARY_SRC_FILES))
$(LIBRARY_FILES): $(LIBRARY_SRC_FILES)
	@echo "[INFO] Copying library file [$(<)]"
	cp $(?) .

copy-bundle: $(LIBRARY_FILES)

MOBILE_HUB_FILES += $(wildcard $(SRC_DIR)/config/*.json)
MOBILE_HUB_FILES += $(wildcard $(SRC_DIR)/mobile-hub/*)
MOBILE_HUB_FILES += $(LIBRARY_FILES)
lex-web-ui-mobile-hub.zip: $(MOBILE_HUB_FILES)
	@echo "[INFO] Building Mobile Hub project [$(@)] with files: [$(^)]"
	@zip -u -j lex-web-ui-mobile-hub.zip $(^)

MOBILEHUB_BUCKET ?= $()
sync-mb: copy-bundle
	@[ "$(MOBILEHUB_BUCKET)" ] || \
		(echo "[ERROR] MOBILEHUB_BUCKET variable not set" ; exit 1)
	aws s3 sync --acl public-read --exclude aws-config.js --exclude Makefile \
		. s3://$(MOBILEHUB_BUCKET)
	aws s3 sync --acl public-read --exclude mobile-hub-project.yml \
		$(SRC_DIR)/mobile-hub/ s3://$(MOBILEHUB_BUCKET)
	aws s3 sync --acl public-read --exclude '*' --include '*.json' \
		$(SRC_DIR)/config/ s3://$(MOBILEHUB_BUCKET)
.PHONY: sync-mb

clean:
	-rm -f ./*.*
.PHONY: clean
