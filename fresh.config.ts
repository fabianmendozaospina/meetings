import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import { getDenoKvSessionPlugin } from "https://deno.land/x/fresh_session@beta-0.3.0/mod.ts";

export default defineConfig({
  plugins: [
    twindPlugin(twindConfig),
    getDenoKvSessionPlugin("/", {
      client: await Deno.openKv(":memory:"),
      cookieOptions: { maxAge: 60 * 10 },
    }),
  ],
});
