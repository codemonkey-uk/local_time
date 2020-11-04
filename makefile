NAME = local_time
VERSION = 0_4_2
BUILD_DIR = release
BUILD_FILE = $(BUILD_DIR)/$(NAME)_$(VERSION).zip
FILES = browser-polyfill.js core.js content.js manifest.json LICENSE icon-512.png icon-128.png options.js options.html popup.css

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