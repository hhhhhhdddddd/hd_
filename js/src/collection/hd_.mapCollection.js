HD_.MapCollection = (function() {

    return {

        create : function() {
            var collection = Object.create(null);
            collection._elements = {};

            HD_._Collection.initCollection(collection);

            collection._addCollectionElement = function(key, element) {
                this._elements[ key ] = element;
            };

            collection.eachElement = function(fun) {
                for (var propName in this._elements) {
                    fun(this._elements[ propName ]);
                }
            };

            collection.clearCollection = function() {
                for (var key in this._elements) {
                    delete this._elements[key];
                }
            };

            return collection;
        }
    };
})();
