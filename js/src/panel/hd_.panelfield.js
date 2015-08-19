HD_.PanelField = (function() {

    function _findHtmlInputValue(node) {
        return node.value;
    }

    var _types = {
        list : {
            findDomValue : function() {
                return this._panelDomNode.options[this._panelDomNode.selectedIndex].value;
            },
            buildDomElement : function() {
                var select = document.createElement("select");
                var option = null;
                this._values.forEach(function(value) {
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
                return parseInt(_findHtmlInputValue(this._panelDomNode), 10);
            }
        },

        fileSelector : {
            buildDomElement : function() {
                var fileInput = HD_._DomTk.buildDomInput("file");
                return fileInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._panelDomNode);
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
                var button = HD_._DomTk.buildButtonWithClickHandler(this._innerLabel, this._handler);
                return button;
            },
            findDomValue : function() {
                return null;
            }
        },

        text : {
            buildDomElement : function() {
                var textArea = HD_._DomTk.createDomElement("textarea");
                textArea.setAttribute("rows", this._height);
                textArea.setAttribute("cols", this._width);
                return textArea;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._panelDomNode);
            },
            setFieldContent : function(content) {
                this._panelDomNode.value = content;
            }
        },

        string : {
            buildDomElement : function() {
                var stringInput = HD_._DomTk.buildTextInput(this._width, this._initValue);
                return stringInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._panelDomNode);
            },
            setFieldContent : function(content) {
                this._panelDomNode.value = content;
            }
        },

        textDisplay : {
            buildDomElement : function() {
                var div = HD_._DomTk.createDomElement("div");
                return div;
            },
            setParentStyle : function() {
                if ( this._style.verticalAlign ) {
                    this._parentContainerStyle['verticalAlign'] = "top";
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
                    that._panelDomNode.appendChild(paragraph);
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
                this._panelDomNode.setAttribute('src', content);
            }
        }
    };

    return {
        create : function(options) {
            var field = Object.create(_types[options.type]);
            HD_._Panel.init(field, {name: options.name, className: "fieldPanel", style: options.style});

            field._values = options.values;
            field._eventListeners = options.eventListeners;
            field._innerLabel = options.innerLabel;
            field._handler = options.handler;
            field._height = options.height;
            field._width = options.width;
            field._initValue = options.initValue;
            field._type = options.type;
            field._parentContainerStyle = {};

            if (field.setParentStyle) {
                field.setParentStyle();
            }

            field.buildPanelDomNode = function() {
                var that = this;

                that._panelDomNode = that.buildDomElement();

                if (options.initValue) {
                    that.setFieldContent(that._initValue);
                }

                if (that._eventListeners) {
                    that._eventListeners.forEach(function(eventListener) {
                        var listener = _types[that._type][eventListener.name];
                        if (listener) {
                            that._panelDomNode.addEventListener(eventListener.name, function(evt) {
                                listener(evt, that);
                                eventListener.handler(evt);
                            },
                            false);
                        }
                    });
                }

                
                return that._panelDomNode;
            };

            field.findVerifyingPanel = function(predicat) {
                // Rien de plus à faire que ce qui est fait dans panel.findPanel()
            };

            field.applyPanelTreeStyle = function(domNode) {
                // Rien de plus à faire que ce qui est fait dans panel.findPanel()
            };

            return field;
        }
    };

})();
