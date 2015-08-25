HD_.ArrayCollection = (function() {

    return {

        create : function() {
            var collection = Object.create(null);
            collection._elements = [];

            HD_._Collection.initCollection(collection);

            collection._addCollectionElement = function(element) {
                this._elements.push(element);
                return element;
            };

            collection.addCollectionElements = function(elements) {
                var that = this;
                elements.forEach(function(element) {
                    that.addElement(element);
                });
            };

            collection.eachElement = function(fun) {
                this._elements.forEach(function(element, index) {
                    fun(element, index);
                });
            };

            collection.clearCollection = function() {
                collection._elements = [];
            };

            collection.toArray = function() {
                var array = [];
                this.eachElement(function(element) {
                    array.push(element);
                });
                return array;
            };

            return collection;
        }
    };
})();
