// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { getApiKey, processCodeWithPrompt } from "./chatGptSetup";

/**
 * Activates the extension.
 *
 * @param {vscode.ExtensionContext} context - The extension context.
 */
export async function activate(context: vscode.ExtensionContext) {
  const editor = getActiveTextEditor();

  const apiKey = getApiKey();
  if (!apiKey) {
    showApiKeyErrorMessage();
    return;
  }

  if (editor) {
    const code = getDocumentText(editor.document);

    const prompts = getPromptsFromSettings();
    if (prompts.length === 0) {
      showNoPromptsWarning();
      return;
    }

    const selectedPrompt = await showPromptQuickPick(prompts);
    if (selectedPrompt) {
      const prompt = buildPrompt(selectedPrompt, code);

      const result = await processCodeWithPrompt(prompt);

      if (result !== undefined) {
        openResultInNewTab(result.toString());
      }
    }
    console.log("No prompt selected.");
  }

  console.log('Congratulations, your extension "iliso" is now active!');

  let disposable = registerCommand("iliso.runPrompts", () => {
    showHelloWorldMessage();
  });

  context.subscriptions.push(disposable);
}

/**
 * Deactivates the extension.
 */
export function deactivate() {
  // Clean up resources if needed
}

/**
 * Gets the active text editor.
 *
 * @returns {vscode.TextEditor | undefined} The active text editor.
 */
function getActiveTextEditor(): vscode.TextEditor | undefined {
  return vscode.window.activeTextEditor;
}

/**
 * Gets the text content of a document.
 *
 * @param {vscode.TextDocument} document - The text document.
 *
 * @returns {string} The text content of the document.
 */
function getDocumentText(document: vscode.TextDocument): string {
  return document.getText();
}

/**
 * Gets the prompts from the user settings.
 *
 * @returns {Array<{ title: string; prompt: string }>} The prompts array.
 */
function getPromptsFromSettings(): Array<{ title: string; prompt: string }> {
  const userSettings = vscode.workspace.getConfiguration("iliso");
  return userSettings.get("prompts", []);
}

/**
 * Shows an error message when the API key is not provided.
 */
function showApiKeyErrorMessage() {
  vscode.window.showErrorMessage(
    "Please provide the API key in the .iliso.json file."
  );
}

/**
 * Shows a warning message when no prompts are defined.
 */
function showNoPromptsWarning() {
  vscode.window.showWarningMessage(
    "No prompts are defined in the extension settings. Please configure prompts using 'iliso.prompts' setting."
  );
}

/**
 * Shows a quick pick menu to select a prompt.
 *
 * @param {Array<{ title: string; prompt: string }>} prompts - The array of prompts.
 *
 * @returns {Promise<string | undefined>} A promise that resolves to the selected prompt.
 */
async function showPromptQuickPick(
  prompts: Array<{ title: string; prompt: string }>
): Promise<string | undefined> {
  return vscode.window.showQuickPick(
    prompts.map((p) => p.title),
    {
      placeHolder: "Select a prompt",
    }
  );
}

/**
 * Builds the prompt string.
 *
 * @param {string} promptTitle - The title of the selected prompt.
 * @param {string} code - The code to be analyzed.
 * @returns {string} The constructed prompt string.
 */
function buildPrompt(promptTitle: string, code: string): string {
  return `${promptTitle}\n\nPlease analyze the following code:\n${code}`;
}

/**
 * Opens the result in a new editor tab.
 *
 * @param {string} result - The result to be displayed.
 */
function openResultInNewTab(result: string) {
  vscode.workspace
    .openTextDocument({ language: "EN", content: result })
    .then((doc) => vscode.window.showTextDocument(doc));
}

/**
 * Registers a command.
 *
 * @param {string} commandId - The command ID.
 * @param {() => void} callback - The callback function to execute when the command is executed.
 *
 * @returns {vscode.Disposable} The disposable object for the registered command.
 */
function registerCommand(
  commandId: string,
  callback: () => void
): vscode.Disposable {
  return vscode.commands.registerCommand(commandId, callback);
}

/**
 * Shows a hello world message.
 */
function showHelloWorldMessage() {
  vscode.window.showInformationMessage("Hello World from iliso!");
}
