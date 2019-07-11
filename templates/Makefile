TEMPLATES := $(wildcard *.json *.yml *.yaml)

# build output directory
OUT := out
# put output dir in VPATH to simplify finding dependencies
VPATH := $(OUT)

# build output files in the out directory using suffixes (e.g. .lint)
LINT = $(addsuffix .lint, $(TEMPLATES))
VALIDATE = $(addsuffix .validate, $(TEMPLATES))

.DELETE_ON_ERROR:

all: check
.PHONY: all

# create the output directory for tracking dependencies
$(OUT):
	mkdir -p "$(@)"

check: $(LINT) $(VALIDATE) | $(OUT)
.PHONY: check

# parse yaml/json with python to check syntax validity
# creates .lint files in the out dir
# detects if file is json or yaml by the file extension
# imports json or yaml libraries and calls appropriate function
$(LINT): %.lint: % | $(OUT)
	$(eval EXT := $(subst ., ,$(suffix $?))) @# remove dot from extension
	$(eval LIB := $(strip $(subst yml, yaml, $(EXT)))) @# s/yml/yaml/
	@echo "[INFO] Linting $(LIB) syntax of template: $(?)"
	@sed -e 's#\![^[:blank:]]*[[:blank:]]\{0,1\}##gm' < "$(?)" | \
		python -c 'import $(LIB), sys; print $(LIB).load(sys.stdin);' \
		> "$(OUT)/$(?).lint"

lint: $(LINT) | $(OUT)
.PHONY: lint

# check validity with cloudformation validate-template api
$(VALIDATE): %.validate: % | $(OUT)
	@echo "[INFO] Validating cloudformation template: $(?)"
	@aws cloudformation validate-template --template-body \
		"file://$(?)" > "$(OUT)/$(?).validate"

validate: $(VALIDATE) | $(OUT)
.PHONY: validate

clean:
	-rm -f $(OUT)/*
.PHONY: clean
