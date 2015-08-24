HD_.Translater = (function() {

    return {
        create : function() {
            var translater = Object.create(null);
            translater._localTranslations = null;
            translater._translationsKeys = null;

            translater.setLocalTr = function(localTranslations) {
                this._localTranslations = localTranslations;
            };

            translater.setTrKeys = function(translationsKeys) {
                this._translationsKeys = translationsKeys;
            };

            translater.getTrKey = function(translationsKeys) {
                return this._translationsKeys[translationsKeys];
            };

            translater.findLocalTranslation = function(str) {
                var translation = translater._localTranslations[str];
                return translation ? translation : str;
            };

            translater.translate = function(str, placeholdersValues) {

                var fullTranslation = null;
                if (placeholdersValues) {
                    fullTranslation = HD_.Translater.replaceArgs(translater.findLocalTranslation(str), placeholdersValues);
                }
                else {
                    var temp = translater._localTranslations[str];
                    if (! temp) {
                        fullTranslation = str;
                    }
                    else {
                        fullTranslation = temp;
                    }
                }

                return fullTranslation;
            };

            return translater;
        },

        /*
        Retourne une chaine de caractères où les variables de la forme %x 
        (avec x un entier allant de 1 à 9) sont remplacées par les valeurs
        des arguments correspondant. Le premier argument étant là chaine originale,
        on a :
        %1 est remplacée par la valeur du deuxième argument (arguments[1])
        %2 est remplacée par la valeur du troisième argument (arguments[2]), etc.
        */
        replaceArgs : function (str, placeholdersValues) {
            var stringVarRegExp = /(%.)/;
            var matchData;
            var currentReplacement;
            var i = 0;
            var translatedString = str;
            while ( ( matchData = stringVarRegExp.exec(translatedString )) !== null ) {
                currentReplacement = translatedString.replace( matchData[0], placeholdersValues[ i ]  );
                translatedString =  currentReplacement;
                i++;
            }

            return translatedString;
        }
    };

})();
