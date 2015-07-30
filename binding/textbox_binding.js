define(['knockout', 'jquery', 'tbio-configurations'], function (ko, $, configurations) {
    ko.bindingHandlers.textboxio = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var theEditor;
            var configToLoad = allBindings.get('configuration');
            if (typeof  configToLoad != 'undefined') {
                //get defined configuration file - if missing load default!
                if (configurations[configToLoad]) {
                    theEditor = textboxio.replace(element, configurations[configToLoad]);
                } else {
                    theEditor = textboxio.replace(element);
                }
            } else {
                //load without a configuration file
                theEditor = textboxio.replace(element);         //no configuration in binding
            }

            theEditor.content.set(valueAccessor()());

            var editorInterval = setInterval(function() {
                if (valueAccessor()() != theEditor.content.get()) {
                    console.log('Value changed!');
                    valueAccessor()(theEditor.content.get());
                }
            }, 750);

            ko.utils.domNodeDisposal.addDisposeCallback( element, function() {
                console.log('In domNodeDisposal code.');
                theEditor.restore();
                clearInterval(editorInterval);
            });
        }
    };
});
