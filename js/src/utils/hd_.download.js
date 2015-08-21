HD_.Download = (function() {

    return {

        // http://stackoverflow.com/questions/12718210/how-to-save-file-from-textarea-in-javascript-with-a-name?lq=1
        saveEncodedData : function(encodedData, name) {

            function buildLink(data, name){
                var a = document.createElement('a');
                a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
                a.href = data || self.location.href;
                return a;
            }

            function click(node) {
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                return node.dispatchEvent(ev);
            }

            var link = buildLink(encodedData, name);
            click(link);
        }
    };
})();