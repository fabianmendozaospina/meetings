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
  GET(_req, ctx) {
    // Check if the user is authenticated.
    const headers = new Headers();

    if (!ctx.state.email) {
      headers.set("location", "/users/sign-in");

      return new Response(null, {
        status: 303,
        headers,
      });
    }
  },
};
