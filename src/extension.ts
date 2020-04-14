// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { encrypt, decrypt, selectAll } from './utils/utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	//
	// ─── ON ENCRYPT COMMAND EXECUTED ────────────────────────────────────────────────
	//
	context.subscriptions.push(vscode.commands.registerCommand('lf2-editor.encryptDocument', async () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const doc = editor.document;
			const arr = await vscode.workspace.fs.readFile(doc.uri);

			await editor.edit((eb) => {
				return eb.replace(selectAll(doc), encrypt(arr));
			});

			await doc.save();

			vscode.window.showInformationMessage("Document encrypted.");
		} else {
			vscode.window.showErrorMessage("There is no document opened.");
		}
	}));

	//
	// ─── ON DECRYPT COMMAND EXECUTED ────────────────────────────────────────────────
	//
	context.subscriptions.push(vscode.commands.registerCommand('lf2-editor.decryptDocument', async () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const doc = editor.document;
			const arr = await vscode.workspace.fs.readFile(doc.uri);

			await editor.edit((eb) => {
				return eb.replace(selectAll(doc), decrypt(arr));
			});

			await doc.save();

			vscode.window.showInformationMessage("Document decrypted.");
		} else {
			vscode.window.showErrorMessage("There is no document opened.");
		}
	}));

	//
	// ─── ON TOGGLE COMMAND EXECUTED ─────────────────────────────────────────────────
	//
	context.subscriptions.push(vscode.commands.registerCommand('lf2-editor.toggleDocument', async () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const doc = editor.document;
			const arr = await vscode.workspace.fs.readFile(doc.uri);

			await editor.edit((eb) => {
				return doc.lineCount > 1 ? eb.replace(selectAll(doc), encrypt(arr)) : eb.replace(selectAll(doc), decrypt(arr));
			});

			await doc.save();

			vscode.window.showInformationMessage("Document decrypted.");
		} else {
			vscode.window.showErrorMessage("There is no document opened.");
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
