HD_._PanelComposite = (function() {

    return {

        create : function(elements, name, className, style) {
            var panelComposite = Object.create(null);
            HD_._Panel.init(panelComposite, name, className, style);

            panelComposite._panelElements = [];
            panelComposite._cellsStyle = [];
            
            panelComposite.buildPanelEmptyTable = function() {
                alert("HD_._PanelComposite - Panel " + this._className + "has no buildPanelEmptyTable() method.");
            };

            panelComposite.setPanelTableCell = function(index, domNode) {
                alert("HD_._PanelComposite - Panel " + this._className + "has no setPanelTableCell() method.");
            };

            panelComposite.getPanelTableCell = function(index) {
                alert("HD_._PanelComposite - Panel " + this._className + "has no getPanelTableCell() method.");
            };

            panelComposite.addPanelElement = function(panelElt) {

                function addCellStyle(panelComposite, cellStyle, cellIndex) {
                    if (cellStyle) {
                        panelComposite._cellsStyle.push({
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
                    panelComposite.addPanelElement(elt);
                });
            }

            panelComposite.applyPanelTreeStyle = function(domNode) {
                var that = this;

                // On ajoute les styles que l'enfant impose à son container dom parent.
                // NB. Pas à son _Panel parent mais à son container dom parent.
                panelComposite._cellsStyle.forEach(function(cellStyleData) {
                    var tableCell = that.getPanelTableCell(cellStyleData.cellNumber);
                    HD_._DomTk.applyStyle(tableCell, cellStyleData.style);
                });
            };

            panelComposite.addAndShow = function(panelElt) {
                this.addPanelElement(panelElt);
                var eltNode = panelElt.buildPanelDomNode();
                this._panelContainer.appendChild(eltNode);
            };

            panelComposite.eachPanelElement = function(fun) {
                this._panelElements.forEach(function(panelElt) {
                    fun(panelElt);
                });
            };

            panelComposite.getChildPanel = function(i) {
                return this._panelElements[i];
            };

            panelComposite.clearPanelElements = function() {
                this._panelElements = [];
            };

            panelComposite.buildPanelDomNode = function() {
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

            panelComposite.getNumberOfElements = function() {
                return this._panelElements.length;
            };

            panelComposite.findVerifyingPanel = function(predicat) {
                for (var i = 0; i < this._panelElements.length; i++) {
                    var element = this._panelElements[i];
                    var res = element.findPanel(predicat);
                    if (res) {
                        return res;
                    }
                }
            };

            return panelComposite;
        }
    };

})();
