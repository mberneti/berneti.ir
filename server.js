import { createRequestHandler } from "@react-router/node";
import { installGlobals } from "@react-router/node";
import * as http from "node:http";
import * as path from "node:path";
import * as url from "node:url";

installGlobals();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const BUILD_PATH = path.resolve(__dirname, "build/server/index.js");

const build = await import(BUILD_PATH);

const requestHandler = createRequestHandler(build, "production");

const server = http.createServer(async (req, res) => {
  const host = req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "http";

  // Redirect non-www to www
  if (host && !host.startsWith("www.")) {
    const redirectUrl = `${protocol}://www.${host}${req.url}`;
    res.writeHead(301, { Location: redirectUrl });
    res.end();
    return;
  }

  try {
    const request = new Request(`${protocol}://${host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? req
          : undefined,
    });

    const response = await requestHandler(request);

    res.writeHead(response.status, Object.fromEntries(response.headers));

    if (response.body) {
      const reader = response.body.getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }
        res.write(value);
        await pump();
      };
      await pump();
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("WWW redirect enabled: non-www -> www");
});
