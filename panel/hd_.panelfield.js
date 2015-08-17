HD_.PanelField = (function() {

    function _findHtmlInputValue(node) {
        return node.value;
    }

    var _types = {
        list : {
            findDomValue : function() {
                return this._panelContainer.options[this._panelContainer.selectedIndex].value;
            },
            buildDomElement : function() {
                var select = document.createElement("select");
                var option = null;
                this.values.forEach(function(value) {
                    option = document.createElement("option");
                    option.setAttribute("value", value.value);
                    option.innerHTML = value.label;
                    select.appendChild(option);
                });
                return select;
            }
        },

        number : {
            buildDomElement : function() {
                return HD_._DomTk.buildTextInput(5, null);
            },
            findDomValue : function() {
                return parseInt(_findHtmlInputValue(this._panelContainer), 10);
            }
        },

        fileSelector : {
            buildDomElement : function() {
                var fileInput = HD_._DomTk.buildDomInput("file");
                return fileInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._panelContainer);
            },
            //Retrieve the first (and only!) File from the FileList object
            change : function(evt, field) {
                var f = evt.target.files[0];
                if (f) {
                    field.postChangeValue = f;
                }
                else {
                    alert("Failed to load file");
                }
            },
            //http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=uTCcfskrObx
            readFileAsText : function(onFileRead) {
                var r = new FileReader();
                r.onload = function(e) {
                    var contents = e.target.result;
                    onFileRead(contents);
                };
                r.readAsText(this.postChangeValue);
            }
        },

        button : {
            buildDomElement : function() {
                var button = HD_._DomTk.buildButtonWithClickHandler(this.innerLabel, this.handler);
                return button;
            },
            findDomValue : function() {
                return null;
            }
        },

        text : {
            buildDomElement : function() {
                var textArea = HD_._DomTk.createDomElement("textarea");
                textArea.setAttribute("rows", this.height);
                textArea.setAttribute("cols", this.width);
                return textArea;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._panelContainer);
            },
            setFieldContent : function(content) {
                this._panelContainer.value = content;
            }
        },

        string : {
            buildDomElement : function() {
                var stringInput = HD_._DomTk.buildTextInput(this.width, this.initValue);
                return stringInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._panelContainer);
            },
            setFieldContent : function(content) {
                this._panelContainer.value = content;
            }
        },

        textDisplay : {
            buildDomElement : function() {
                var div = HD_._DomTk.createDomElement("div");
                return div;
            },
            setParentStyle : function() {
                if ( this.style.verticalAlign ) {
                    this.parentContainerStyle['verticalAlign'] = "top";
                }
            },
            findDomValue : function() {
                return "textDisplay: findDomValue todo";
            },
            setFieldContent : function(content) {
                var that = this;
                var paragraph = null;
                content.split("\n").forEach(function(line) {
                    paragraph = HD_._DomTk.createDomElement("p");
                    paragraph.innerHTML = line;
                    that._panelContainer.appendChild(paragraph);
                });
            }
        },

        image : {
            buildDomElement : function() {
                var img = HD_._DomTk.createDomElement("img");
                return img;
            },
            findDomValue : function() {
                return null;
            },
            setFieldContent : function(content) {
                this._panelContainer.setAttribute('src', content);
            }
        }
    };

    return {
        create : function(data) {
            var field = Object.create(_types[data.type]);
            HD_._PanelLeaf.init(field, data.name, "fPanel", data.style);
            field.values = data.values;
            field.eventListeners = data.eventListeners;
            field.innerLabel = data.innerLabel;
            field.handler = data.handler;
            field.height = data.height;
            field.width = data.width;
            field.initValue = data.initValue;
            field.style = data.style;
            field.type = data.type;
            field.parentContainerStyle = {};

            if (field.setParentStyle) {
                field.setParentStyle();
            }

            field.buildPanelDomNode = function() {
                var that = this;

                that._panelContainer = that.buildDomElement();

                if (data.initValue) {
                    that.setFieldContent(that.initValue);
                }

                if (that.eventListeners) {
                    that.eventListeners.forEach(function(eventListener) {
                        var listener = _types[that.type][eventListener.name];
                        if (listener) {
                            that._panelContainer.addEventListener(eventListener.name, function(evt) {
                                listener(evt, that);
                                eventListener.handler(evt);
                            },
                            false);
                        }
                    });
                }

                
                return that._panelContainer;
            };

            return field;
        }
    };

})();
