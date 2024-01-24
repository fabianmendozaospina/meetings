import { Handlers } from "$fresh/server.ts";
import { Group } from "../../../../models/Group.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const group = await Group.findByPk(ctx.params.id);

    if (group) {
      return new Response(JSON.stringify(group), {
        status: 200,
      });
    }

    return new Response(null, {
      status: 404,
    });
  },
};
