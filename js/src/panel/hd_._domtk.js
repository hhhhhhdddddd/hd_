HD_._DomTk = (function() {

    return {
        appendClassName : function( domNode, className ) {
            domNode.className = domNode.className + " " + className;
        },

        buildDomInput : function(type) {
            var input = document.createElement("input");
            input.setAttribute("type", type);
            return input;
        },

        buildTextInput : function(size, data) {
            var input = this.buildDomInput("text");
            input.setAttribute("size", size);
            if (data) {
                input.value = data;
            }
            return input;
        },

        buildButtonWithClickHandler : function(label, handler) {
            var button = document.createElement("button");
            if (handler) {
                button.addEventListener("click", handler, false);
            }
            button.innerHTML = label;
            return button;
        },

        createDomElement : function(tagName) {
            return document.createElement(tagName);
        },

        appendDomElement : function(parent, child) {
            parent.appendChild(child);
        },

        applyStyle : function(domNode, style) {
            for (var styleName in style) {
                domNode.style[styleName] = style[styleName];
            }
        },

        // Tableaux

        buildEmptyTable : function(rows, columns) {
            var body = this.createDomElement("tbody");
            for (var r = 0; r < rows; r++) {
                var tr = this.createDomElement("tr");
                for (var c = 0; c < columns; c++) {
                    var td = this.createDomElement("td");
                    this.appendDomElement(tr, td);
                }
                this.appendDomElement(body, tr);
            }
            var table = this.createDomElement("table");
            this.appendDomElement(table, body);
            return table;
        },

        getDomTableCell : function(table, row, column) {
            var tableChildren = table.children; // [body]
            var tableBody = tableChildren[0];
            var bodyChildren = tableBody.children; // [tr, tr, ...]
            var tableRow = bodyChildren[row];
            var rowChildren = tableRow.children; // [td, td, ...]
            var tableCell = rowChildren[column];
            return tableCell;
        },

        setDomTableCell : function(table, row, column, domNode) {
            var tableCell = this.getDomTableCell(table, row, column);
            this.appendDomElement(tableCell, domNode);
        },

        buildEmptyDivTable : function(rows, columns) {
            var table = this.createDomElement("div");
            for (var r = 0; r < rows; r++) {
                var row = this.createDomElement("div");
                row.setAttribute("row", r);
                for (var c = 0; c < columns; c++) {
                    var column = this.createDomElement("div");
                    column.setAttribute("column", c);
                    this.appendDomElement(row, column);
                }
                this.appendDomElement(table, row);
            }
            return table;
        },

        getDivTableCell : function(table, row, column) {
            var tableChildren = table.children; // [row, row, ...]
            var tableRow = tableChildren[row];
            var rowChildren = tableRow.children; // [column, column, ...]
            var tableCell = rowChildren[column];
            return tableCell;
        },

        setDivTableCell : function(table, row, column, domNode) {
            var tableCell = this.getDomTableCell(table, row, column);
            this.appendDomElement(tableCell, domNode);
        },

    };

})();
