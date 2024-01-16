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

    //TODO: How to sanitize?
    //req.sanitizeBody("name");
    //req.sanitizeBody("url");

    const group = await req.json();
    //TODO: Store the authenticated user as the group creator (see video: Sanitizando Grupos).
    //group.User.id = req.user.id;

    //read the image.
    //group.image = req.file.fileName;

    try {
      await Group.create(group);

      session.flash("success", "The group has been created sucessfully");
      headers.set("location", "/admin");
    } catch (error) {
      const messages: string[] = [];
      error.errors?.map((err: any) => messages.push(err.message));
      console.log(">> new-group error", error);
      session.flash("error", messages);
      headers.set("location", "/groups/new-group");
    }

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
