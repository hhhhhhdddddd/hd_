HD_.ArrayCollection = (function() {

    return {

        create : function() {
            var collection = Object.create(null);
            collection._elements = [];

            HD_._Collection.initCollection(collection);

            collection.addElement = function(element) {
                this._elements.push(element);
                return element;
            };

            collection.eachElement = function(fun) {
                this._elements.forEach(function(element) {
                    fun(element);
                });
            };

            return collection;
        }
    };
})();
