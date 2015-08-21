HD_.Data = (function() {

    return {
        encodeImage : function(imageSource) {

            // http://stackoverflow.com/a/10473992
            function imageToArraybuffer(imageSource) {
                // atob to base64_decode the data-URI
                var image_data = atob(btoa(imageSource));
                // Use typed arrays to convert the binary data to a Blob
                var arraybuffer = new ArrayBuffer(image_data.length);
                var view = new Uint8Array(arraybuffer);
                for (var i=0; i<image_data.length; i++) {
                    view[i] = image_data.charCodeAt(i) & 0xff;
                }
                
                return arraybuffer;
            }

            function imageToBlob(imageSource) {
                var arraybuffer = imageToArraybuffer(imageSource);
                var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
                return blob;
            }

            function imageToUrl(imageSource) {
                var blob = imageToBlob(imageSource);
                var url = URL.createObjectURL(blob);
                return url;
            }

            var url = imageToUrl(imageSource);
            return url;
        },

        encodeString : function(str) {
            
            // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa
            function utf8_to_b64(str) {
                return window.btoa(unescape(encodeURIComponent(str)));
            }

            // Just in case
            // function b64_to_utf8(str) {
            //     return decodeURIComponent(escape(window.atob(str)));
            // }

            var url = 'data:application/octet-stream;base64,' + utf8_to_b64( data );
            return url;
        }
        

    };

})();
