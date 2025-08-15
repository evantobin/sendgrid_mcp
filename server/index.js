#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, FROM_EMAIL } = process.env;

if (!SENDGRID_API_KEY || !FROM_EMAIL) {
  console.error("Missing SENDGRID_API_KEY or FROM_EMAIL environment variables.");
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

const server = new Server(
  {
    name: "sendgrid-dxt",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  return {
    tools: [
      {
        name: "sendEmail",
        description: "Sends an email using the SendGrid API.",
        inputSchema: {
          type: "object",
          properties: {
            to: { type: "string", description: "The recipient's email address." },
            subject: { type: "string", description: "The subject of the email." },
            body: { type: "string", description: "The body of the email." },
          },
          required: ["to", "subject", "body"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "sendEmail") {
    const { to, subject, body } = request.params.arguments || {};

    if (!to || !subject || !body) {
      throw new Error("Missing required parameters: to, subject, and body");
    }

    const msg = {
      to,
      from: FROM_EMAIL,
      subject,
      text: body,
    };

    try {
      await sgMail.send(msg);
      return {
        content: [
          {
            type: "text",
            text: "Email sent successfully.",
          },
        ],
      };
    } catch (error) {
      console.error(error);
      return {
        content: [
          {
            type: "text",
            text: `Error sending email: ${error.message}`,
          },
        ],
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

const transport = new StdioServerTransport();
server.connect(transport);

console.error("SendGrid DXT server running...");
