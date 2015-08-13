HD_.HtmlBuilder = (function() {

    return {
        create : function() {
            var htmlBuider = Object.create(null);

            return htmlBuider;
        },

        appendClassName : function( domNode, className ) {
            domNode.className = domNode.className + " " + className;
        },

        buildHeightSpacer : function(height) {
            var spacer = document.createElement("span");
            spacer.style.display = "inline-block";
            spacer.style.height = height + "px";
            return spacer;
        },

        buildWidthSpacer : function(width) {
            var spacer = document.createElement("span");
            spacer.style.display = "inline-block";
            spacer.style.width = width + "px";
            return spacer;
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

        buildButton : function(label) {
            var button = document.createElement("button");
            button.innerHTML = label;
            return button;
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

        setDomTableCell : function(table, row, column, domNode) {
            var tableChildren = table.children; // [body]
            var tableBody = tableChildren[0];
            var bodyChildren = tableBody.children; // [tr, tr, ...]
            var tableRow = bodyChildren[row];
            var rowChildren = tableRow.children; // [td, td, ...]
            var tableCell = rowChildren[column];
            this.appendDomElement(tableCell, domNode);
        }

    };

})();
