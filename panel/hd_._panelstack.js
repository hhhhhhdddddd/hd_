// Un panneau à une direction horizontale ou verticale
// todo: renommer en StackPanel
HD_._PanelStack = (function() {

    return {

        create : function(direction, elements, name, style) {
            var panelStack = Object.create(null);
            HD_._Panel.init(panelStack, name, direction + 'Panel', style);

            panelStack._panelElements = [];
            panelStack._cellsStyle = [];

            if (direction === "horizontal") {
                panelStack.getNumberOfRows = function(index) {
                    return 1;
                };
                panelStack.getNumberOfColumns = function(index) {
                    return this.getNumberOfElements();
                };
                panelStack.getRowIndex = function(index) {
                    return 0;
                };
                panelStack.getColumnIndex = function(index) {
                    return index;
                };
            }
            else if (direction === "vertical") {
                panelStack.getNumberOfRows = function(index) {
                    return this.getNumberOfElements();
                };
                panelStack.getNumberOfColumns = function(index) {
                    return 1;
                };
                panelStack.getRowIndex = function(index) {
                    return index;
                };
                panelStack.getColumnIndex = function(index) {
                    return 0;
                };
            }
            else {
                alert("HD_._PanelStack.create: direction '" + direction + "' not defined");
            }
            
            panelStack.addPanelElement = function(panelElt) {

                function addCellStyle(panelStack, cellStyle, cellIndex) {
                    if (cellStyle) {
                        panelStack._cellsStyle.push({
                            cellNumber: cellIndex,
                            style: cellStyle
                        });
                    }
                }

                panelElt.setPanelParent(this);
                addCellStyle(this, panelElt.parentContainerStyle, this._panelElements.length);
                this._panelElements.push(panelElt);
                return panelElt;
            };

            // Nécessite addPanelElement
            if (elements) {
                elements.forEach(function(elt) {
                    panelStack.addPanelElement(elt);
                });
            }

            panelStack.applyPanelTreeStyle = function(domNode) {
                var that = this;

                // On ajoute les styles que l'enfant impose à son container dom parent.
                // NB. Pas à son _Panel parent mais à son container dom parent.
                panelStack._cellsStyle.forEach(function(cellStyleData) {
                    var tableCell = that.getPanelTableCell(cellStyleData.cellNumber);
                    HD_._DomTk.applyStyle(tableCell, cellStyleData.style);
                });
            };

            panelStack.addAndShow = function(panelElt) {
                this.addPanelElement(panelElt);
                var eltNode = panelElt.buildPanelDomNode();
                this._panelContainer.appendChild(eltNode);
            };

            panelStack.eachPanelElement = function(fun) {
                this._panelElements.forEach(function(panelElt) {
                    fun(panelElt);
                });
            };

            panelStack.getChildPanel = function(i) {
                return this._panelElements[i];
            };

            panelStack.clearPanelElements = function() {
                this._panelElements = [];
            };

            panelStack.buildPanelDomNode = function() {
                var that = this;
                that._panelContainer = that.buildPanelEmptyTable();
                that._panelContainer.setAttribute("name", that._name);
                HD_._DomTk.appendClassName(that._panelContainer, that._className);
                that._panelElements.forEach(function(panelElement, index) {
                    var domNode = panelElement.buildDomNode();
                    domNode.setAttribute("parentPanel", that._name);
                    var tableCell = that.getPanelTableCell(index);
                    tableCell.appendChild(domNode);
                });
                return that._panelContainer;
            };

            panelStack.getNumberOfElements = function() {
                return this._panelElements.length;
            };

            panelStack.findVerifyingPanel = function(predicat) {
                for (var i = 0; i < this._panelElements.length; i++) {
                    var element = this._panelElements[i];
                    var res = element.findPanel(predicat);
                    if (res) {
                        return res;
                    }
                }
            };

            panelStack.buildPanelEmptyTable = function() {
                return HD_._DomTk.buildEmptyTable(this.getNumberOfRows(), this.getNumberOfColumns());
            };

            panelStack.setPanelTableCell = function(index, domNode) {
                HD_._DomTk.setDomTableCell(this._panelContainer,this.getRowIndex(index) , this.getColumnIndex(index), domNode);
            };

            panelStack.getPanelTableCell = function(index) {
                return HD_._DomTk.getDomTableCell(this._panelContainer,this.getRowIndex(index) , this.getColumnIndex(index));
            };

            return panelStack;
        }
    };

})();
