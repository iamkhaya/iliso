.**.** .**  
|**| | |**| **\_\_\_\_****  
| | | | |/ **_/ _ \
| | |\_| |\_** ( <\_> )
|**|\_\_**/**/\_\_** >\_\_\_\_/
\/

# Summary

iliso is a user-friendly Visual Studio Code extension that empowers developers by allowing them to store and utilize their own personalized ChatGpt prompts for code analysis.
With iliso, developers can effortlessly access and run their predefined prompts against their code, gaining valuable insights into security vulnerabilities, performance enhancements, and overall code quality or basically anything they would like.
By bringing customizable prompts right to their fingertips, iliso enhances the development experience, enabling developers to easily tailor code analysis to their specific needs and preferences.

# Requirements

- Visual Studio Code version 1.60.0 or higher

# Installation

1. Launch Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the left sidebar or pressing `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS).
3. Search for "iliso" in the Extensions marketplace.
4. Click the "Install" button next to the "iliso" extension by AusarianCoder.
5. Once installed, the iliso extension will be activated automatically.

## Extension Settings

This extension provides the following settings that can be customized:

- `iliso.prompts`: An array of objects representing prompts for code analysis. Each object should have a `title` and `prompt` property. Users can define their own prompts using this setting.

To configure the extension settings:

1. Open the user settings by navigating to File > Preferences > Settings or pressing `Ctrl+,` (or `Cmd+,` on macOS).
2. Search for "iliso" to locate the extension settings.
3. Modify the settings as desired.

## Usage

The iliso extension requires an API key from OpenAI to function properly. Follow the steps below to provide your API key:

1. Create a file named `.iliso.json` in the root directory of your workspace.
2. Inside the `.iliso.json` file, add the following JSON content:
   ```json
   {
     "OPEN_API_KEY": "YOUR_API_KEY"
   }
   ```
   Replace YOUR_API_KEY with your actual OpenAI API key.
3. **Critical: Protect Your API Key - Keep it Confidential**

Ensure you do not include the `.iliso.json` file in your version control system. It is highly recommended to add this file to your `.gitignore` to prevent any accidental exposure of your API key. Safeguarding your key is crucial as unauthorized access can result in potential misuse, leading to financial consequences. Prioritize the security and confidentiality of your API key to avoid any unwanted expenses or breaches.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue on the GitHub repository. You can also submit pull requests for fixes or enhancements.

## License

This extension is released under the MIT License.

## Hire Me

Looking for a skilled developer to work on your next project? I'm available for hire and would love to contribute to your team's success. With expertise in building VS Code extensions, I can help enhance your development workflows and create custom tools tailored to your needs.

### Services Offered

- Development of custom VS Code extensions
- Code analysis and optimization
- Integration with third-party APIs and services
- Bug fixing and troubleshooting
- Feature enhancements and additions

If you're interested in working together, feel free to reach out to me at [khayelihle.tshuma@gmail.com](khayelihle.tshuma@gmail.com). Let's discuss your project requirements and how I can assist you in achieving your goals.

Let's build something amazing together!
