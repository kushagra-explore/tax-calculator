//let autoSuggestorInstanceArray = [];
export function initializeAutoSuggestorInstanceSearchV2(options){
  if(getObjectLength(options) == 0) {
    	return;
    }

    if(options.typeAhead == 1){
    	options.typeAhead = true;
    }else{
    	options.typeAhead = false;
    }
    autoSuggestorInstanceArray[options.objectName] = new AutoSuggestor(options.searchBoxId , options.suggestionContainerId, options.typeAhead, options.suggestionType, options.suggestionCount);
	  let AutoSuggestorCallbackInstance = new AutoSuggestorCallbackHandler(autoSuggestorInstanceArray[options.objectName]);
    autoSuggestorInstanceArray[options.objectName].setAutoSuggestorConfigOptions(options);
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnMouseClick                     = (checkIfFunctionExist(options.mouseClickedHandler)) ? eval(options.mouseClickedHandler) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnMouseClickLastElement          = (checkIfFunctionExist(options.mouseClickedHandlerLastElement)) ? eval(options.mouseClickedHandlerLastElement) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnMouseClickCTA		              = (checkIfFunctionExist(options.mouseClickedHandlerCTA)) ? eval(options.mouseClickedHandlerCTA) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnEnterPressed                   = (checkIfFunctionExist(options.enterPressedHandler)) ? eval(options.enterPressedHandler) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnInputKeysPressed               = (checkIfFunctionExist(options.inputKeysHandler)) ? eval(options.inputKeysHandler) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnKeyPressed                     = (checkIfFunctionExist(options.navigationKeysHandler)) ? eval(options.navigationKeysHandler) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnBackKeyPressed                 = (checkIfFunctionExist(options.backKeyHandler)) ? eval(options.backKeyHandler) : '';
    autoSuggestorInstanceArray[options.objectName].callBackOnZeroResults                            = (checkIfFunctionExist(options.callBackOnZeroResults)) ? eval(options.callBackOnZeroResults) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionOnRightKeyPressed                = (checkIfFunctionExist(options.rightKeyHandler)) ? eval(options.rightKeyHandler) : '';
    autoSuggestorInstanceArray[options.objectName].callBackFunctionAfterBuildingSuggestionContainer = (checkIfFunctionExist(options.callBackFunctionAfterBuildingSuggestionContainer)) ? eval(options.callBackFunctionAfterBuildingSuggestionContainer) : '';

    if (window.addEventListener) {
        let ele = document.getElementById(options.searchBoxId);
        if(ele != null){
        	ele.addEventListener('keyup', AutoSuggestorCallbackInstance.handleInputKeys, false);
        	if(autoSuggestorInstanceArray[options.objectName].getTrendingSuggestions == 1){
        		ele.addEventListener('click', function(event){autoSuggestorInstanceArray[options.objectName].handleInputKeys.call(autoSuggestorInstanceArray[options.objectName], event)}, false);
        	}
            if(checkIfFunctionExist(options.tabPressedHandler)) {
                ele.addEventListener('keydown', function(e) { AutoSuggestorCallbackInstance.handleAutoSuggestorTabPressed(e,eval(options.tabPressedHandler), autoSuggestorInstanceArray[options.objectName])}, false);
            }
            return true;
        }
        return false;
    } else if (window.attachEvent){
        let ele = document.getElementById(options.searchBoxId);
        ele.attachEvent('onkeyup', AutoSuggestorCallbackInstance.handleInputKeys);
        if(autoSuggestorInstanceArray[options.objectName].getTrendingSuggestions == 1){
        	ele.attachEvent('click', function(event){autoSuggestorInstanceArray[options.objectName].handleInputKeys.call(autoSuggestorInstanceArray[options.objectName], event)});
        }

        if(checkIfFunctionExist(options.tabPressedHandler)) {
            ele.attachEvent('onkeydown', function(e) { AutoSuggestorCallbackInstance.handleAutoSuggestorTabPressed(e,eval(options.tabPressedHandler), autoSuggestorInstanceArray[options.objectName])});
        }
    }
}
