# SendGrid MCP Server

This MCP Server provides a tool to send emails using the SendGrid API.

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=sendgrid&config=eyJjb21tYW5kIjoibnB4IHNlbmRncmlkLW1jcC1zZXJ2ZXIiLCJlbnYiOnsiU0VOREdSSURfQVBJX0tFWSI6IllPVVJfU0VOREdSSURfQVBJX0tFWSIsIkZST01fRU1BSUwiOiJZT1VSX0ZST01fRU1BSUwifX0%3D)

## Installation and Setup

This server can be used with any DXT-compatible application or configured to run directly in your preferred IDE (Cursor, Cline, etc).

### For Claude (as a DXT Extension)

1.  **Install the Extension:**
    *   Download the latest `sendgrid-mcp-server.dxt` file from the [GitHub Releases](https://github.com/evantobin/sendgrid_mcp/releases) tab.
    *   Open Claude for macOS or Windows.
    *   Install the extension by opening the downloaded `.dxt` file.

2.  **Configure the Extension:**
    *   After installation, you will be prompted to configure the extension.
    *   **SendGrid API Key:** Enter your SendGrid API key. This is a sensitive value and will be stored securely.
    *   **From Email:** Enter the email address you want to send emails from. This must be a verified sender in your SendGrid account.

### For Cline Desktop (using NPX)

You can configure the server to run directly with `npx` in Cline Desktop's MCP settings. There are two ways to do this:

#### Option 1: Using the Cline Desktop UI

1.  **Open Cline Desktop's settings.**
2.  Navigate to the **MCP (Model Context Protocol)** section.
3.  Click **"Add Server"** and configure it as follows:

    *   **Server Name:** `SendGrid MCP Server` (or any name you prefer)
    *   **Command:** `npx`
    *   **Arguments:** `sendgrid-mcp-server`
    *   **Environment Variables:**
        *   `SENDGRID_API_KEY`: Your SendGrid API key.
        *   `FROM_EMAIL`: The email address you want to send emails from.

4.  **Save the settings and restart Cline.**

The server will now be managed by Cline and will start automatically.

#### Option 2: Manual JSON Configuration

Alternatively, you can add the following JSON object to your `cline_mcp_settings.json` file:

```json
{
  "mcpServers": {
    "sendgrid": {
      "command": "npx",
      "args": [
        "sendgrid-mcp-server"
      ],
      "env": {
        "SENDGRID_API_KEY": "YOUR_API_KEY",
        "FROM_EMAIL": "YOUR_VERIFIED_FROM_ADDRESS"
      },
      "transportType": "stdio"
    }
  }
}
```

Replace `"YOUR_API_KEY"` and `"YOUR_VERIFIED_FROM_ADDRESS"` with your actual credentials.

### For Cursor

Add the following to your `mcp_servers.json` file:

```json
{
"sendgrid": {
  "command": "npx",
  "args": [
    "sendgrid-mcp-server"
  ],
  "env": {
    "SENDGRID_API_KEY": "YOUR_SENDGRID_API_KEY",
    "FROM_EMAIL": "YOUR_FROM_EMAIL"
  }
}}
```

Replace `"YOUR_SENDGRID_API_KEY"` and `"YOUR_FROM_EMAIL"` with your actual credentials.

## Usage

The extension provides a single tool: `sendEmail`.

### `sendEmail(to: string, subject: string, body: string)`

This tool sends an email to the specified recipient.

*   `to`: The recipient's email address.
*   `subject`: The subject of the email.
*   `body`: The plain text body of the email.

**Example:**

```
sendEmail(
  to: "recipient@example.com",
  subject: "Hello from DXT!",
  body: "This is a test email sent from the SendGrid DXT extension."
)
```

## Development

### Prerequisites

*   Node.js >= 16.0.0
*   npm

### Setup

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Server

To run the MCP server directly for testing, you can use `npm start` or `npx`:

```bash
npm start
```

Or, if you want to run it without cloning the repository:

```bash
npx sendgrid-mcp-server
```

### Packaging the Extension

To package the extension into a `.dxt` file:

1.  Install the `dxt` CLI tool:
    ```bash
    npm install -g @anthropic-ai/dxt
    ```
2.  Run the pack command:
    ```bash
    dxt pack
    ```

This will create a `sendgrid-mcp-server.dxt` file in the project root.
