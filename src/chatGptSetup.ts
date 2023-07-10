import * as openai from "openai";
import * as vscode from "vscode";

import * as fs from "fs";
import * as path from "path";

const apiKey: string | undefined = getApiKey();

const configuration = new openai.Configuration({
  apiKey: apiKey,
});
const chatGpt = new openai.OpenAIApi(configuration);

// Get the API key from the configuration file
function getApiKey(): string | undefined {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]; // Assumes a single workspace folder
  if (workspaceFolder) {
    const configFilePath = path.join(workspaceFolder.uri.fsPath, ".iliso.json");
    if (fs.existsSync(configFilePath)) {
      const configFileContent = fs.readFileSync(configFilePath, "utf8");
      const config = JSON.parse(configFileContent);
      return config.OPEN_API_KEY;
    }
  }
  return undefined;
}

async function processCodeWithPrompt(
  prompt: string
): Promise<string | undefined> {
  const chatResult = await chatGpt.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  // Extract and return the assistant's reply
  const assistantReply: string | undefined =
    chatResult.data.choices[0].message?.content;

  return "" + assistantReply;
}

export { chatGpt, processCodeWithPrompt, getApiKey };
