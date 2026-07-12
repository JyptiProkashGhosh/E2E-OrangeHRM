import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { BrowserManager } from "./browser-manager";
import { runPlaywrightTests } from "./test-runner";

const browserManager = BrowserManager.getInstance();

const server = new Server(
  {
    name: "playwright-ai-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "browser_navigate",
        description: "Navigate to a specific URL in the browser",
        inputSchema: {
          type: "object",
          properties: {
            url: { type: "string", description: "The URL to navigate to (e.g., https://example.com)" }
          },
          required: ["url"],
        },
      },
      {
        name: "browser_click",
        description: "Click a UI element matching a selector",
        inputSchema: {
          type: "object",
          properties: {
            selector: { type: "string", description: "CSS, XPath, or Text selector (e.g., button#submit, text=Login)" },
            timeout: { type: "number", description: "Maximum time in milliseconds to wait for element (default: 30000)" }
          },
          required: ["selector"],
        },
      },
      {
        name: "browser_fill",
        description: "Fill a form text input field with a value",
        inputSchema: {
          type: "object",
          properties: {
            selector: { type: "string", description: "CSS, XPath, or Text selector of the input field" },
            value: { type: "string", description: "Text value to fill into the input field" }
          },
          required: ["selector", "value"],
        },
      },
      {
        name: "browser_type",
        description: "Type text characters into a focused UI element (useful for simulating keypresses)",
        inputSchema: {
          type: "object",
          properties: {
            selector: { type: "string", description: "CSS, XPath, or Text selector of the target element" },
            text: { type: "string", description: "Text to type into the element" },
            delay: { type: "number", description: "Delay between keystrokes in milliseconds (default: 0)" }
          },
          required: ["selector", "text"],
        },
      },
      {
        name: "browser_press_key",
        description: "Focus a selector and press a keyboard key (e.g. Enter, Tab, ArrowDown, Control+A)",
        inputSchema: {
          type: "object",
          properties: {
            selector: { type: "string", description: "CSS, XPath, or Text selector of the element to focus" },
            key: { type: "string", description: "Name of the key to press (e.g., Enter, Tab, Escape, Backspace)" }
          },
          required: ["selector", "key"],
        },
      },
      {
        name: "browser_hover",
        description: "Hover mouse cursor over a selector",
        inputSchema: {
          type: "object",
          properties: {
            selector: { type: "string", description: "CSS, XPath, or Text selector to hover over" }
          },
          required: ["selector"],
        },
      },
      {
        name: "browser_screenshot",
        description: "Capture a full-page or viewport screenshot of the current page as base64 png image content",
        inputSchema: {
          type: "object",
          properties: {
            fullPage: { type: "boolean", description: "Whether to capture a full scrollable page screenshot (default: true)" }
          }
        },
      },
      {
        name: "browser_get_html",
        description: "Retrieve the raw HTML content of the current page",
        inputSchema: {
          type: "object",
          properties: {}
        },
      },
      {
        name: "browser_get_text",
        description: "Retrieve visible inner text content of the page or a specific selector",
        inputSchema: {
          type: "object",
          properties: {
            selector: { type: "string", description: "Optional selector. If omitted, gets text of entire document body" }
          }
        },
      },
      {
        name: "browser_evaluate",
        description: "Execute custom JavaScript inside the browser page context and return the result",
        inputSchema: {
          type: "object",
          properties: {
            script: { type: "string", description: "JavaScript snippet to execute (must return a value or promise)" }
          },
          required: ["script"],
        },
      },
      {
        name: "browser_get_accessibility",
        description: "Fetch the accessibility tree snapshot of the page (ARIA attributes, roles, etc.)",
        inputSchema: {
          type: "object",
          properties: {}
        },
      },
      {
        name: "browser_status",
        description: "Retrieve the current page URL, page title, and connection status",
        inputSchema: {
          type: "object",
          properties: {}
        },
      },
      {
        name: "browser_close",
        description: "Shut down the active browser instance",
        inputSchema: {
          type: "object",
          properties: {}
        },
      },
      {
        name: "run_test_suite",
        description: "Run automated Playwright tests configured in the project workspace",
        inputSchema: {
          type: "object",
          properties: {
            spec: { type: "string", description: "Optional spec file path to run (e.g. tests/login.spec.ts)" },
            project: { type: "string", description: "Optional browser project target (e.g. chromium, firefox, webkit)" },
            grep: { type: "string", description: "Optional tag filters to match (e.g. @smoke, @regression, @accessibility)" },
            headless: { type: "boolean", description: "Run tests in headless mode (default: true)" }
          }
        },
      }
    ],
  };
});

// Handle tool executions
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments || {};

  try {
    switch (toolName) {
      case "browser_navigate": {
        const url = String(args.url);
        const page = await browserManager.getPage();
        await page.goto(url, { waitUntil: "domcontentloaded" });
        const finalUrl = page.url();
        return {
          content: [{ type: "text", text: `Successfully navigated to: ${finalUrl}` }],
        };
      }

      case "browser_click": {
        const selector = String(args.selector);
        const timeout = typeof args.timeout === "number" ? args.timeout : undefined;
        const page = await browserManager.getPage();
        await page.click(selector, { timeout });
        return {
          content: [{ type: "text", text: `Clicked element matching selector: ${selector}` }],
        };
      }

      case "browser_fill": {
        const selector = String(args.selector);
        const value = String(args.value);
        const page = await browserManager.getPage();
        await page.fill(selector, value);
        return {
          content: [{ type: "text", text: `Filled element '${selector}' with text: ${value}` }],
        };
      }

      case "browser_type": {
        const selector = String(args.selector);
        const text = String(args.text);
        const delay = typeof args.delay === "number" ? args.delay : undefined;
        const page = await browserManager.getPage();
        await page.type(selector, text, { delay });
        return {
          content: [{ type: "text", text: `Typed text into element '${selector}'` }],
        };
      }

      case "browser_press_key": {
        const selector = String(args.selector);
        const key = String(args.key);
        const page = await browserManager.getPage();
        await page.focus(selector);
        await page.press(selector, key);
        return {
          content: [{ type: "text", text: `Focused element '${selector}' and pressed key '${key}'` }],
        };
      }

      case "browser_hover": {
        const selector = String(args.selector);
        const page = await browserManager.getPage();
        await page.hover(selector);
        return {
          content: [{ type: "text", text: `Hovered over element matching selector: ${selector}` }],
        };
      }

      case "browser_screenshot": {
        const fullPage = args.fullPage !== false;
        const page = await browserManager.getPage();
        const buffer = await page.screenshot({ fullPage });
        const base64 = buffer.toString("base64");
        return {
          content: [
            { type: "text", text: "Here is the screenshot of the active browser viewport." },
            { type: "image", data: base64, mimeType: "image/png" }
          ],
        };
      }

      case "browser_get_html": {
        const page = await browserManager.getPage();
        const html = await page.content();
        return {
          content: [{ type: "text", text: html }],
        };
      }

      case "browser_get_text": {
        const selector = args.selector ? String(args.selector) : "body";
        const page = await browserManager.getPage();
        const text = await page.innerText(selector);
        return {
          content: [{ type: "text", text }],
        };
      }

      case "browser_evaluate": {
        const script = String(args.script);
        const page = await browserManager.getPage();
        const result = await page.evaluate(script);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "browser_get_accessibility": {
        const page = await browserManager.getPage();
        const tree = await page.accessibility.snapshot();
        return {
          content: [{ type: "text", text: JSON.stringify(tree, null, 2) }],
        };
      }

      case "browser_status": {
        const page = await browserManager.getPage();
        const url = page.url();
        const title = await page.title();
        return {
          content: [
            {
              type: "text",
              text: `Browser Status:\n- Current URL: ${url}\n- Page Title: ${title}\n- Browser State: Running`
            }
          ],
        };
      }

      case "browser_close": {
        await browserManager.close();
        return {
          content: [{ type: "text", text: "Browser closed successfully." }],
        };
      }

      case "run_test_suite": {
        const spec = args.spec ? String(args.spec) : undefined;
        const project = args.project ? String(args.project) : undefined;
        const grep = args.grep ? String(args.grep) : undefined;
        const headless = args.headless !== false;

        const result = await runPlaywrightTests({ spec, project, grep, headless });
        return {
          content: [
            {
              type: "text",
              text: `=== Test Execution Complete ===\nSuccess: ${result.success}\n\n${result.output}`
            }
          ],
        };
      }

      default:
        throw new Error(`Tool not found: ${toolName}`);
    }
  } catch (error: any) {
    console.error(`Error executing tool ${toolName}:`, error);
    return {
      content: [{ type: "text", text: `Error: ${error.message || String(error)}` }],
      isError: true,
    };
  }
});

// Setup connection transport (Stdio is default for MCP tools integration)
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Playwright MCP server running on stdio transport.");
}

main().catch((error) => {
  console.error("Server crash:", error);
  process.exit(1);
});
