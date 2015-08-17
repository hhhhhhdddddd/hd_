// Un panneau à une direction horizontale ou verticale
// todo: renommer en StackPanel
HD_._OneDirectionPanel = (function() {

    return {

        create : function(direction, elements, name, style) {
            var oneDirPanel = Object.create(null);
            HD_._Panel.init(oneDirPanel, name, direction + 'Panel', style);

            oneDirPanel._panelElements = [];
            oneDirPanel._cellsStyle = [];

            if (direction === "horizontal") {
                oneDirPanel.getNumberOfRows = function(index) {
                    return 1;
                };
                oneDirPanel.getNumberOfColumns = function(index) {
                    return this.getNumberOfElements();
                };
                oneDirPanel.getRowIndex = function(index) {
                    return 0;
                };
                oneDirPanel.getColumnIndex = function(index) {
                    return index;
                };
            }
            else if (direction === "vertical") {
                oneDirPanel.getNumberOfRows = function(index) {
                    return this.getNumberOfElements();
                };
                oneDirPanel.getNumberOfColumns = function(index) {
                    return 1;
                };
                oneDirPanel.getRowIndex = function(index) {
                    return index;
                };
                oneDirPanel.getColumnIndex = function(index) {
                    return 0;
                };
            }
            else {
                alert("HD_._OneDirectionPanel.create: direction '" + direction + "' not defined");
            }
            
            oneDirPanel.addPanelElement = function(panelElt) {

                function addCellStyle(oneDirPanel, cellStyle, cellIndex) {
                    if (cellStyle) {
                        oneDirPanel._cellsStyle.push({
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
                    oneDirPanel.addPanelElement(elt);
                });
            }

            oneDirPanel.applyPanelTreeStyle = function(domNode) {
                var that = this;

                // On ajoute les styles que l'enfant impose à son container dom parent.
                // NB. Pas à son _Panel parent mais à son container dom parent.
                oneDirPanel._cellsStyle.forEach(function(cellStyleData) {
                    var tableCell = that.getPanelTableCell(cellStyleData.cellNumber);
                    HD_._DomTk.applyStyle(tableCell, cellStyleData.style);
                });
            };

            oneDirPanel.addAndShow = function(panelElt) {
                this.addPanelElement(panelElt);
                var eltNode = panelElt.buildPanelDomNode();
                this._panelContainer.appendChild(eltNode);
            };

            oneDirPanel.eachPanelElement = function(fun) {
                this._panelElements.forEach(function(panelElt) {
                    fun(panelElt);
                });
            };

            oneDirPanel.getChildPanel = function(i) {
                return this._panelElements[i];
            };

            oneDirPanel.clearPanelElements = function() {
                this._panelElements = [];
            };

            oneDirPanel.buildPanelDomNode = function() {
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

            oneDirPanel.getNumberOfElements = function() {
                return this._panelElements.length;
            };

            oneDirPanel.findVerifyingPanel = function(predicat) {
                for (var i = 0; i < this._panelElements.length; i++) {
                    var element = this._panelElements[i];
                    var res = element.findPanel(predicat);
                    if (res) {
                        return res;
                    }
                }
            };

            oneDirPanel.buildPanelEmptyTable = function() {
                return HD_._DomTk.buildEmptyTable(this.getNumberOfRows(), this.getNumberOfColumns());
            };

            oneDirPanel.setPanelTableCell = function(index, domNode) {
                HD_._DomTk.setDomTableCell(this._panelContainer,this.getRowIndex(index) , this.getColumnIndex(index), domNode);
            };

            oneDirPanel.getPanelTableCell = function(index) {
                return HD_._DomTk.getDomTableCell(this._panelContainer,this.getRowIndex(index) , this.getColumnIndex(index));
            };

            return oneDirPanel;
        }
    };

})();
