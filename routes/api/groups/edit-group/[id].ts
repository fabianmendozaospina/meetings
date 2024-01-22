import { Handlers } from "$fresh/server.ts";
import { Group } from "../../../../models/Group.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const group = await Group.findByPk(ctx.params.id);
  },
};
