NAME = local_time
VERSION = 0_5_3
BUILD_DIR = release
MASTER_FILE = $(BUILD_DIR)/$(NAME)_$(VERSION).zip
FIREFOX_FILE = $(BUILD_DIR)/$(NAME)_FF_$(VERSION).zip
CHROME_FILE = $(BUILD_DIR)/$(NAME)_CHROME_$(VERSION).zip
SRC = browser-polyfill.js core.js content.js background.js background.html options.js options.html popup.css
ICONS = icon-512.png icon-128.png button*.png
FILES = $(SRC) $(ICONS) manifest_v2.json manifest_v3.json LICENSE

.DEFAULT_GOAL := build

.PHONY : clean
clean:
	rm -rf $(BUILD_DIR)/*.*

$(MASTER_FILE) : $(FILES)
	@mkdir -p $(@D)
	zip -r9T $@ $(FILES)

$(FIREFOX_FILE) : $(MASTER_FILE)
	cp $(MASTER_FILE) $(FIREFOX_FILE)
	printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w $(FIREFOX_FILE)

$(CHROME_FILE) : $(MASTER_FILE)
	cp $(MASTER_FILE) $(CHROME_FILE)
	printf "@ manifest_v3.json\n@=manifest.json\n" | zipnote -w $(CHROME_FILE)

chrome: $(CHROME_FILE)

firefox: $(FIREFOX_FILE)

.PHONY : build
build: chrome firefox