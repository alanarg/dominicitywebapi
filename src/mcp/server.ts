import { registrarTools } from "./tools";

// The installed SDK version exposes McpServer at runtime, but its TS exports are
// not resolved correctly by this Nest build setup.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { McpServer } = require("@modelcontextprotocol/sdk/dist/cjs/server/mcp.js");

export function createMCPServer() {
  const server = new McpServer({
    name: "meu-saas-publico",
    version: "1.0.0",
  });

  registrarTools(server);

  return server;
}
