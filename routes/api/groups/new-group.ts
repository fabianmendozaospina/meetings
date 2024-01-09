import { Handlers } from "$fresh/server.ts";
import type { WithSession } from "fresh-session";
import { Group } from "../../../models/Group.ts";

export const handler: Handlers<
  unknown,
  WithSession<"KEY_A" | "KEY_B" | "KEY_C", "success" | "error">
> = {
  async POST(req, ctx) {
    const headers = new Headers();
    const { session } = ctx.state;
    const group = await req.json();

    try {
      await Group.create(group);

      session.flash("success", "The group has been created sucessfully");
      headers.set("location", "/admin");
    } catch (error) {
      console.log(">> new-group error", error);
      session.flash("error", [error]);
      headers.set("location", "/groups/new-group");
    }

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
