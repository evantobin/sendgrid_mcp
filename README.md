# SendGrid DXT

This Desktop Extension (DXT) provides a tool to send emails using the SendGrid API.

## Setup

1.  **Install the Extension:**
    *   Download the `sendgrid-dxt.dxt` file.
    *   Open your DXT-compatible application (e.g., Claude for macOS/Windows).
    *   Install the extension by opening the `.dxt` file.

2.  **Configure the Extension:**
    *   After installation, you will be prompted to configure the extension.
    *   **SendGrid API Key:** Enter your SendGrid API key. This is a sensitive value and will be stored securely.
    *   **From Email:** Enter the email address you want to send emails from. This must be a verified sender in your SendGrid account.

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
npx sendgrid-dxt-server
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

This will create a `sendgrid-dxt.dxt` file in the project root.
