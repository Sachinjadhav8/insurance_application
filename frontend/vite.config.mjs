// /home/ubuntu/frontend/vite.config.mjs
console.log("🔥 vite.config.mjs loaded by Vite");

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const logDir = "/var/log/frontend";

function ensureLogDir() {
  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
      console.log(`📁 Created log directory: ${logDir}`);
    }
  } catch (err) {
    console.error(`⚠️ Unable to create log directory: ${logDir}`);
  }
}

// ✅ Create reusable logging middleware
function logMiddleware() {
  ensureLogDir();

  const accessLog = path.join(logDir, "access.log");
  const loginLog = path.join(logDir, "login.log");

  console.log(`✅ Logging all requests to: ${accessLog}`);
  console.log(`✅ Logging login requests to: ${loginLog}`);

  return (req, res, next) => {
    const now = new Date().toISOString();
    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const ua = req.headers["user-agent"] || "";
    const line = `${now} ${ip} "${req.method} ${req.url}" "${ua}"\n`;

    console.log(line.trim());

    fs.appendFile(accessLog, line, (err) => {
      if (err) console.error("❌ Access log write error:", err.message);
    });

    if (req.url && req.url.toLowerCase().includes("login")) {
      fs.appendFile(loginLog, line, (err) => {
        if (err) console.error("❌ Login log write error:", err.message);
      });
    }

    next();
  };
}

// ✅ Proper plugin pattern for Vite 7
function requestLoggerPlugin() {
  return {
    name: "request-logger",
    apply: "serve", // runs only in dev mode
    configureServer(server) {
      console.log("🚀 Attaching custom request logger middleware...");
      server.middlewares.use(logMiddleware());
    },
  };
}

export default defineConfig({
  plugins: [react(), requestLoggerPlugin()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
});

