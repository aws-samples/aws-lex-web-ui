WEB_UI_DIR := ../lex-web-ui
WEB_UI_BUNDLE_DIR := $(WEB_UI_DIR)/dist/bundle

all: build copy-bundle
.PHONY: all

build:
	@echo "[INFO] Building from dir [$(WEB_UI_DIR)]"
	cd $(WEB_UI_DIR) && npm run build-dist
.PHONY: build

copy-bundle:
	@echo "[INFO] Copying from dir [$(WEB_UI_BUNDLE_DIR)]"
	-rm ./*.{js,css,map}
	cp $(WEB_UI_BUNDLE_DIR)/*.{js,css,map} .
.PHONY: copy-bundle
