HD_.PanelField = (function() {

    var index = 0;

    function _findHtmlInputValue(node) {
        return node.value;
    }

    var _types = {
        list : {
            findDomValue : function() {
                return this.domNode.options[this.domNode.selectedIndex].value;
            },
            buildDomElement : function() {
                var select = document.createElement("select");
                var option = null;
                this.getValues().forEach(function(value) {
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
                return parseInt(_findHtmlInputValue(this.domNode), 10);
            }
        },

        fileSelector : {
            buildDomElement : function() {
                var fileInput = HD_._DomTk.buildDomInput("file");
                return fileInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this.domNode);
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
                return _findHtmlInputValue(this.domNode);
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
                return _findHtmlInputValue(this.domNode);
            },
            setFieldContent : function(content) {
                this.domNode.value = content;
            }
        },

        string : {
            buildDomElement : function() {
                var stringInput = HD_._DomTk.buildTextInput(this.width, this.initValue);
                return stringInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this.domNode);
            },
            setFieldContent : function(content) {
                this.domNode.value = content;
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
                    that.domNode.appendChild(paragraph);
                });
            }
        },

        image : {
            buildDomElement : function() {
                var img = HD_._DomTk.createDomElement("img");
                return img;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this.domNode);
            },
            setFieldContent : function(content) {
                this.domNode.setAttribute('src', content);
            }
        }
    };

    return {
        /*
        data === {
            name : string,
            type : string,
            values : array,
            eventListeners : array,
            label: string,
            innerLabel: string,
            noLabel : boolean
        }
        */
        create : function(data) {
            var field = Object.create(_types[data.type]);
            HD_._PanelLeaf.init(field, data.name, "fPanel");
            field.name = data.name;
            field.type = data.type;
            field.values = data.values;
            field.eventListeners = data.eventListeners;
            field.noLabel = data.noLabel;
            field.label = data.label;
            field.innerLabel = data.innerLabel;
            field.box = data.box;
            field.handler = data.handler;
            field.height = data.height;
            field.width = data.width;
            field.initValue = data.initValue;
            field.style = data.style;
            field.parentContainerStyle = {};

            if (field.setParentStyle) {
                field.setParentStyle();
            }

            field.getValues = function() {
                return this.values;
            };

            // Nécessite getValues()
            field.domNode = field.buildDomElement();

            if (data.initValue) {
                field.setFieldContent(data.initValue);
            }

            // Nécessite buildDomElement()
            if (data.eventListeners) {
                data.eventListeners.forEach(function(eventListener) {
                    var listener = _types[data.type][eventListener.name];
                    if (listener) {
                        field.domNode.addEventListener(eventListener.name, function(evt) {
                            listener(evt, field);
                            eventListener.handler(evt);
                        },
                        false);
                    }
                });
            }

            field.getName = function() {
                return this.name;
            };

            field.getType = function() {
                return this.type;
            };

            field.buildPanelDomNode = function() {
                this._panelContainer = this.domNode;
                return this._panelContainer;
            };

            field.getPostChangeValue = function() {
                return this.postChangeValue;
            };

            field.getLabel = function() {
                return "label" + index++;
            };

            field.hasLabel = function() {
                return (typeof this.noLabel === "undefined") || (! this.noLabel);
            };

            field.getBoxName = function() {
                return this.box;
            };

            field.hasStyle = function() {
                return this.style;
            };

            return field;
        },

        findDomValue : function(type, node) {
            return _types[type].getNodeValue(node);
        },

        buildDomElement : function(field) {
            return _types[type].buildDomElement(type);
        }
    };

})();
