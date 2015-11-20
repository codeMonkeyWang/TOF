
var vscode = require('vscode');

function activate(context) {

	var isRun = false;
	var runlistener;
	var TOF = vscode.commands.registerCommand('extension.TOF-Run', function () {
		if(!isRun){
			var canChange = true;
			 runlistener =	vscode.window.onDidChangeTextEditorSelection(function(event){
				var selection = event.textEditor.selection;
				var editor = event.textEditor;
				
				if(canChange){
					if(editor.document.getText(selection)=="true"){
						editor.edit(function(edit){
							edit.replace(selection,"false");
							canChange = false;
						})
					}else if(editor.document.getText(selection)=="false"){
						editor.edit(function(edit){
							edit.replace(selection,"true");
							canChange = false;
						})
					}
				}else{
					canChange = true;
				}
			});
			isRun = true;
			vscode.window.showInformationMessage("TOF is run");	
		}else{
			runlistener.dispose();
			isRun = false;
			vscode.window.showInformationMessage("TOF is stop");
		}
	});
	
	context.subscriptions.push(TOF);
}

exports.activate = activate;