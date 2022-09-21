    // Insert things into the office client
    // Parameters
    //      toBeInserted: the content to be inserted
    //      cType: the type of content to be inserted.
    function insert(toBeInserted, cType) {
        if (_doc.mode === Office.DocumentMode.ReadOnly) {
            UI.writeError(Errors.docCodeError, ErrorType.error);
            return;
        }

        _doc.setSelectedDataAsync(toBeInserted, { coercionType: cType }, function (asyncResult) {
            ignoreDocument = true;

            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                if (asyncResult.error.code === 2002) {
                    UI.writeError(Errors.textInsertionFailureForMultiCell, ErrorType.error);
                } else {
                    UI.writeError(asyncResult.error.message, ErrorType.error);
                }
            }

            UI.hideInsertLoadingImage();
        });
    }
    
    // Inserts highlighted text into the document at the cursor.
    // Parameters(text): the text to place into the document.
    this.insertText = function (text) {
        if (Office.context.document.customXmlParts) {
            var textInHTML = "<html><head><body><br/>"
                + CodeSnippet.insertText(text, GlobalVars.currState.topic)
                + "<br/></body></html>";
            insert(textInHTML, Office.CoercionType.Html);
        } else {
            var excelText = text.trim() + "\n" + UIStrings.source + GlobalVars.currState.topic +
                " - https://" + LANGUAGE + ".wikipedia.org";
            insert(excelText, Office.CoercionType.Text);
        }
    };


    