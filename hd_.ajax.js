HD_.Ajax = (function() {

    return {
        makeRequest : function(requestType, url, onSuccess, onError, onFinished) {
            // Instances of XMLHttpRequest can make an HTTP request to the server.
            var httpRequest = new XMLHttpRequest();

            // Tells the HTTP request object which JavaScript function will handle processing the response. 
            httpRequest.onreadystatechange = function responseHandler() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        onSuccess(httpRequest.responseText);
                        onFinished();
                    } else {
                        onError();
                        onFinished();
                    }
                }
            };

            // Actually make the request.
            httpRequest.open(requestType, url);
            httpRequest.send();
        },

        chainRequests : function(requestType, urls, onEachSuccess, onEachFinished, onEachError, onAllFinished) {

            function createArrayIterator(anArray) {
                var iterator = Object.create(null);
                iterator.position = 0;
                iterator.list = anArray;

                iterator.hasNext = function() {
                    return this.position < this.list.length;
                };
                
                iterator.next = function() {
                    return this.list[this.position++];
                };

                return iterator;
            }

            function chainRequestsAux() {
                if (! iterator.hasNext()) {
                    if (onAllFinished) {
                        onAllFinished();
                    }
                    return;
                }

                var url = iterator.next();
                HD_.Ajax.makeRequest(requestType, url, function onEverySuccess(responseText) {
                    onEachSuccess(url, responseText);

                    chainRequestsAux();
                }, function onEveryError() {
                    console.log("HD_.chainRequests - error on processing request: " + url);
                    if (onEachError) {
                        onEachError();
                    }
                }, function onEveryFinished() {
                    console.log("HD_.chainRequests - finished processing request: " + url);
                    if (onEachFinished) {
                        onEachFinished();
                    }
                });
            }

            var iterator = createArrayIterator(urls);
            chainRequestsAux();
        }
    };
})();
