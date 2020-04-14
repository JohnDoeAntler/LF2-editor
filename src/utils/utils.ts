import * as vscode from 'vscode';

const key = "odBearBecauseHeIsVeryGoodSiuHungIsAGo";

//
// ─── DECRYPT ────────────────────────────────────────────────────────────────────
//
export const decrypt = (text: Uint8Array) => {
	let result = "";

	for (let i = 123, j = 0; i < text.length; i++, j++) {
		result += String.fromCharCode(text[i] - key.charCodeAt(j % key.length));
	}
	
	return result;
};

//
// ─── ENCRYPT ────────────────────────────────────────────────────────────────────
//
export const encrypt = (text: Uint8Array) => {
	let result = "This data file was encrypted by Visual Studio Code extension by John Doe Antler, http://github.com/JohnDoeAntler/LF2-editor";

	for (let i = 0; i < text.length; i++) {
		result += String.fromCharCode(text[i] + key.charCodeAt(i % key.length));
	}

	return result;
};

//
// ─── SELECT ALL LINES ON DOCUMENT ───────────────────────────────────────────────
//
export const selectAll = (doc: vscode.TextDocument) => {
	const firstLine = doc.lineAt(0);
	const lastLine = doc.lineAt(doc.lineCount - 1);
	return new vscode.Range(firstLine.range.start, lastLine.range.end);
}