// http://stackoverflow.com/questions/12718210/how-to-save-file-from-textarea-in-javascript-with-a-name?lq=1
HD_.Download = (function() {

    function _click(node) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return node.dispatchEvent(ev);
    }

    function _encode(data) {
            return 'data:application/octet-stream;base64,' + utf8_to_b64( data );
    }

    function _link(data, name){
        var a = document.createElement('a');
        a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
        a.href = data || self.location.href;
        return a;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
    // function b64_to_utf8(str) {
    //     return decodeURIComponent(escape(window.atob(str)));
    // }

    return {

        save : function(data, name) {
            _click(
                _link(
                    _encode( data ),
                    name
                )
            );
        }
    };
})();
