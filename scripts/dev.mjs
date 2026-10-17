import { spawn } from "node:child_process";
const args = process.argv.slice(2);
let hostname = "0.0.0.0";
let port = process.env.PORT || "3000";
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--host" || args[index] === "--hostname") hostname = args[++index] || hostname;
  if (args[index] === "--port") port = args[++index] || port;
}
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", hostname, "--port", port], { stdio: "inherit" });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
