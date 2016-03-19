HD_.Translater = (function() {

    function _createTranslation(name, translations) {
        var translation = Object.create(null);
        translation._name = name;
        translation._translations = translations;
        translation.getName = function() {
            return this._name;
        };

        return translation;
    }

    return {
        create : function() {
            var translater = HD_.ArrayCollection.create();
            translater._translationsKeys = null;
            translater._currentTranslation = null;

            translater.addTranlsation = function(name, translations) {
                this.addElement(_createTranslation(name, translations));
            };

            translater.setCurrentTranlsation = function(name) {
                this._currentTranslation = this.findElement(function(translation) {
                    return translation._name === name;
                });
            };

            translater.getCurrentTranslationName = function() {
                return translater._currentTranslation._name;
            };

            translater.setTrKeys = function(translationsKeys) {
                this._translationsKeys = translationsKeys;
            };

            translater.getTrKey = function(translationsKeys) {
                return this._translationsKeys[translationsKeys];
            };

            translater.findTranslation = function(str) {
                var translation = translater._currentTranslation._translations[str];
                return translation ? translation : str;
            };

            translater.translate = function(str, placeholdersValues) {

                var fullTranslation = null;
                var currentTranslation = this.findTranslation(str);
                if (placeholdersValues) {
                    fullTranslation = HD_.Translater.replaceArgs(currentTranslation, placeholdersValues);
                }
                else {
                    var temp = currentTranslation;
                    if (! temp) {
                        fullTranslation = str;
                    }
                    else {
                        fullTranslation = temp;
                    }
                }

                return fullTranslation;
            };

            translater.trKey = function(key) {
                return this.translate(this.getTrKey(key));
            };

            return translater;
        },

        /*
        Ajoute à l'application appObject un traducteur initialisé avec la langue de départ.
        
        appObject: l'application à laquelle on ajoute le traducteur
        propName: nom du traducteur dans l'application
        language: langage de départ
        translationsKeys: id éléments à traduire
        translationsArray: tableau contenant toutes les traductions
        
        Exemple d'appel:
        HD_.Translater.setAppTrProperty(this, "tr", "fr", {key1:key1, key2:key2}, [
            {name: "en", translations: {key1: "key 1", key2: "key 2"} },
            {name: "fr", translations: {key1: "clé 1", key2: "clé 2"} },
        ]);
        */
        setAppTrProperty : function(appObject, propName, language, translationsKeys, translationsArray) {
            var translater = this.create();
            translationsArray.forEach(function(translation) { // translation == {name: str, translations: array}
                translater.addTranlsation(translation.name, translation.translations);
            });
            translater.setCurrentTranlsation(language);
            translater.setTrKeys(translationsKeys);

            appObject[propName] = translater;
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
