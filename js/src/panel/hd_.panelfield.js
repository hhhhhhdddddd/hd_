HD_.PanelField = (function() {

    function _findHtmlInputValue(node) {
        return node.value;
    }

    var _types = {
        list : {
            findDomValue : function() {
                return this._fieldDomNode.options[this._fieldDomNode.selectedIndex].value;
            },
            buildDomElement : function() {
                var select = document.createElement("select");
                var option = null;
                var values = this._labelValuesBuilder();
                var labels = this._labelsBuilder();
                values.forEach(function(value, index) {
                    option = document.createElement("option");
                    option.setAttribute("value", value);
                    option.innerHTML = labels[index];
                    select.appendChild(option);
                });
                return select;
            },
            refreshFieldTexts : function(text) {
                var labels = this._labelsBuilder();
                for (var i = 0; i < this._fieldDomNode.options.length; i++) {
                    this._fieldDomNode.options[i].innerHTML = labels[i];
                }
            },
            getValue : function(i) {
                return this._labelValuesBuilder()[i];
            },
            multiLabels : true,
            multiLabelValues : true,
        },

        number : {
            buildDomElement : function() {
                return HD_._DomTk.buildTextInput(5, null);
            },
            findDomValue : function() {
                return parseInt(_findHtmlInputValue(this._fieldDomNode), 10);
            }
        },

        fileSelector : {
            buildDomElement : function() {
                var fileInput = HD_._DomTk.buildDomInput("file");
                return fileInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._fieldDomNode);
            },
            addMandatoryEventListeners : function() {
                var that = this;
                that._panelDomContent.addEventListener("change", function(evt) {
                    //Retrieve the first (and only!) File from the FileList object

                    var f = evt.target.files[0];
                    if (f) {
                        that.postChangeValue = f;
                    }
                    else {
                        alert("Failed to load file");
                    }
                },
                false);
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
                var label = this._labelBuilder();
                var button = HD_._DomTk.buildButtonWithClickHandler(label, this._handler);
                return button;
            },
            findDomValue : function() {
                return null;
            },
            refreshFieldTexts : function(text) {
                var label = this._labelBuilder();
                this._fieldDomNode.innerHTML = label;
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
                return _findHtmlInputValue(this._fieldDomNode);
            },
            setFieldContent : function(content) {
                this._fieldDomNode.value = content;
            }
        },

        string : {
            buildDomElement : function() {
                var stringInput = HD_._DomTk.buildTextInput(this._width, this._initValue);
                return stringInput;
            },
            findDomValue : function() {
                return _findHtmlInputValue(this._fieldDomNode);
            },
            setFieldContent : function(content) {
                this._fieldDomNode.value = content;
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
                return "HD_.PanelField._types.textDisplay: findDomValue todo";
            },
            setFieldContent : function(content) {
                var that = this;
                var paragraph = null;
                content.split("\n").forEach(function(line) {
                    paragraph = HD_._DomTk.createDomElement("p");
                    paragraph.innerHTML = line;
                    that._fieldDomNode.appendChild(paragraph);
                });
            },
            addLine : function(str) {
                var text = document.createTextNode(str);
                this._fieldDomNode.appendChild(text);
                var nl = document.createElement("br");
                this._fieldDomNode.appendChild(nl);
            }
        },

        title : {
            buildDomElement : function() {
                this._size =  this._size ? this._size : "medium";
                var titleTagName = null;
                if (this._size) {
                    if (this._size === "small") {
                        titleTagName = "h3";
                    }
                    else if (this._size === "medium") {
                        titleTagName = "h2";
                    }
                    else if (this._size === "big") {
                        titleTagName = "h1";
                    }
                }

                var node = HD_._DomTk.createDomElement(titleTagName);

                return node;
            },
            findDomValue : function() {
                return "HD_.PanelField._types.title: findDomValue todo";
            },
            setFieldContent : function(content) {
                this._fieldDomNode.innerHTML = content;
                
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
                this._fieldDomNode.setAttribute('src', content);
            }
        }
    };

    return {
        create : function(options) {
            var field = Object.create(_types[options.type]);
            HD_._Panel.init(field, {name: options.name, className: "fieldPanel", style: options.style});

            field._valuesGetter = options.valuesGetter;
            field._eventListeners = options.eventListeners;
            field._handler = options.handler;
            field._height = options.height;
            field._width = options.width;
            field._initValue = options.initValue;
            field._type = options.type;
            field._parentContainerStyle = {};
            field._fieldDomNode = null;
            field._size = options.size;
            field._name = options.name;
            field._label = options.label;
            field._labelUpdater = options.labelUpdater;
            field._placeholdersValues = options.placeholdersValues;

            if (field.setParentStyle) {
                field.setParentStyle();
            }

            // Tous les champs ont un libellé, simple ou multiple
            if (field.multiLabels === true) {
                field._labelsBuilder = options.labelsBuilder;
            }
            else {
                field._labelBuilder = options.labelBuilder;
            }

            // Tous les champs n'ont pas de valeur associé à leur libellé.
            if (field.multiLabelValues === true) {
                field._labelValuesBuilder = options.labelValuesBuilder;
            }

            field.buildPanelDomNode = function() {
                var that = this;

                that._fieldDomNode = that.buildDomElement();
                that._panelDomContent = HD_._DomTk.createDomElement("div");
                that._panelDomContent.appendChild(that._fieldDomNode);

                if (options.initValue) {
                    that.setFieldContent(that._initValue);
                }

                // Ajout des écouteurs obligatoires
                if (that.addMandatoryEventListeners) {
                    that.addMandatoryEventListeners();
                }

                // Ajout des écouteurs de l'utilisateur
                if (that._eventListeners) {
                    that._eventListeners.forEach(function(eventListener) {
                        that._panelDomContent.addEventListener(eventListener.name, function(evt) {
                            eventListener.handler(evt);
                        },
                        false);
                    });
                }

                return that._panelDomContent;
            };

            field.mapPanels = function(fun) {
                fun(this);
            };

            field.findVerifyingPanel = function(predicat) {
                // Rien de plus à faire que ce qui est fait dans panel.findPanel()
            };

            field.applyPanelTreeStyle = function(domNode) {
                // Rien de plus à faire que ce qui est fait dans panel.findPanel()
            };


            field.changeTexts_ = function(textsObject) {
                if (this.changeFieldTexts) {
                    this.changeFieldTexts(textsObject);
                }
            };

            /*
            L'argument est
            - soit un texte simple
            - soit un tableau
            Si c'est un tableau alors textUpdater() doit pouvoir le gérer.
            */
            field.generateText = function(label) {
                if (this._labelUpdater) {
                    if (this._placeholdersValues) {
                        return this._labelUpdater(this._label, this._placeholdersValues);
                    }
                    else {
                        return this._labelUpdater(this._label);
                    }
                }
                else {
                    return this._label;
                }
            };

            return field;
        }
    };

})();

/*
trois types de textes
- un seul texte: le libellé d'un bouton
- plusieurs textes: les libellés d'un select
- 
*/
