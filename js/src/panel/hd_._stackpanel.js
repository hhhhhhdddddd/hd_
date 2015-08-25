// Un panneau à une direction horizontale ou verticale
HD_._StackPanel = (function() {

    return {

        create : function(direction, options) {
            var stackPanel = Object.create(null);
            HD_._Panel.init(stackPanel, {name: options.name, className: direction + 'Panel', style: options.style});

            if (options.type && (options.type === "table")) {
                stackPanel.buildPanelEmptyTable = function() {
                    return HD_._DomTk.buildEmptyTable(this.getNumberOfRows(), this.getNumberOfColumns());
                };

                stackPanel.setPanelTableCell = function(index, domNode) {
                    HD_._DomTk.setDomTableCell(this._panelDomContent,this.getRowIndex(index) , this.getColumnIndex(index), domNode);
                };

                stackPanel.getPanelTableCell = function(index) {
                    return HD_._DomTk.getDomTableCell(this._panelDomContent,this.getRowIndex(index) , this.getColumnIndex(index));
                };
            }
            else {
                stackPanel.buildPanelEmptyTable = function() {
                    return HD_._DomTk.buildEmptyDivTable(this.getNumberOfRows(), this.getNumberOfColumns());
                };

                stackPanel.setPanelTableCell = function(index, domNode) {
                    HD_._DomTk.setDivTableCell(this._panelDomContent,this.getRowIndex(index) , this.getColumnIndex(index), domNode);
                };

                stackPanel.getPanelTableCell = function(index) {
                    return HD_._DomTk.getDivTableCell(this._panelDomContent,this.getRowIndex(index) , this.getColumnIndex(index));
                };
            }

            stackPanel._panelElements = [];
            stackPanel._cellsStyle = [];

            if (direction === "horizontal") {
                stackPanel.getNumberOfRows = function(index) {
                    return 1;
                };
                stackPanel.getNumberOfColumns = function(index) {
                    return this.getNumberOfElements();
                };
                stackPanel.getRowIndex = function(index) {
                    return 0;
                };
                stackPanel.getColumnIndex = function(index) {
                    return index;
                };
                stackPanel.setChildFloatStyle = function(child) {
                    child.addPanelStyle("float", "left");
                };
            }
            else if (direction === "vertical") {
                stackPanel.getNumberOfRows = function(index) {
                    return this.getNumberOfElements();
                };
                stackPanel.getNumberOfColumns = function(index) {
                    return 1;
                };
                stackPanel.getRowIndex = function(index) {
                    return index;
                };
                stackPanel.getColumnIndex = function(index) {
                    return 0;
                };
                stackPanel.setChildFloatStyle = function(child) {
                    child.addPanelStyle("clear", "both");
                };
            }
            else {
                alert("HD_._StackPanel.create: direction '" + direction + "' not defined");
            }
            
            stackPanel.pushPanelElement = function(panelElt) {

                function addCellStyle(stackPanel, cellStyle, cellIndex) {
                    if (cellStyle) {
                        stackPanel._cellsStyle.push({
                            cellNumber: cellIndex,
                            style: cellStyle
                        });
                    }
                }

                panelElt.setPanelParent(this);
                this.setChildFloatStyle(panelElt);
                addCellStyle(this, panelElt._parentContainerStyle, this._panelElements.length);
                this._panelElements.push(panelElt);
                return panelElt;
            };

            stackPanel.applyPanelTreeStyle = function(domNode) {
                var that = this;

                // On ajoute les styles que l'enfant impose à son container dom parent.
                // NB. Pas à son _Panel parent mais à son container dom parent.
                stackPanel._cellsStyle.forEach(function(cellStyleData) {
                    var tableCell = that.getPanelTableCell(cellStyleData.cellNumber);
                    HD_._DomTk.applyStyle(tableCell, cellStyleData.style);
                });

                if (! that.hasPanelStyle("float")) {
                    this.addPanelStyle("clear", "both");
                }
            };

            stackPanel.pushAndShow = function(panelElt) {
                this.pushPanelElement(panelElt);
                var eltNode = panelElt.buildDomNode();
                this._panelDomContent.appendChild(eltNode);
            };

            stackPanel.eachPanelElement = function(fun) {
                this._panelElements.forEach(function(panelElt) {
                    fun(panelElt);
                });
            };

            stackPanel.mapPanels = function(fun) {
                this._panelElements.forEach(function(panelElt) {
                    fun(panelElt);
                    if (panelElt._panelElements) {
                        panelElt.mapPanels(fun);
                    }
                });
            };

            stackPanel.getChildPanel = function(i) {
                return this._panelElements[i];
            };

            stackPanel.clearPanelElements = function() {
                this._panelElements = [];
            };

            stackPanel.buildPanelDomNode = function() {
                var that = this;
                that._panelDomContent = that.buildPanelEmptyTable();
                that._panelDomContent.setAttribute("name", that._name + "_divtable");
                that._panelElements.forEach(function(panelElement, index) {
                    var domNode = panelElement.buildDomNode();
                    domNode.setAttribute("parentPanel", that._name);
                    var tableCell = that.getPanelTableCell(index);
                    tableCell.appendChild(domNode);
                });
            };

            stackPanel.getNumberOfElements = function() {
                return this._panelElements.length;
            };

            stackPanel.findVerifyingPanel = function(predicat) {
                for (var i = 0; i < this._panelElements.length; i++) {
                    var element = this._panelElements[i];
                    var res = element.findPanel(predicat);
                    if (res) {
                        return res;
                    }
                }
            };

            return stackPanel;
        }
    };

})();
