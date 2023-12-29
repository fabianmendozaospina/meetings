import { Handlers } from "$fresh/server.ts";
import onyx from "../../../config/onyx.ts";

export const handler: Handlers = {
  POST(_req, _ctx) {
    onyx.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/sign-in",
      failureMessage: "Auth errors",
    });
  },
};
