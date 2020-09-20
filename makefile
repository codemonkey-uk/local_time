NAME = local_time
VERSION = 0_2_1
BUILD_DIR = release
BUILD_FILE = $(BUILD_DIR)/$(NAME)_$(VERSION).zip
FILES = content.js manifest.json LICENSE icon.svg

.DEFAULT_GOAL := build

.PHONY : clean
clean:
	rm -rf $(BUILD_FILE)
	@echo "Release zip deleted - " $(BUILD_FILE)

$(BUILD_FILE) : $(FILES)
	@mkdir -p $(@D)
	zip -r9T $@ $(FILES)

.PHONY : build
build: $(BUILD_FILE)