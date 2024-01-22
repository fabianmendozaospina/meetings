import { Handlers } from "$fresh/server.ts";
import { Group } from "../../models/Group.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const groups = await Group.findAll({ where: { userId: req.user.Id } });

    if (groups) {
      return new Response(JSON.stringify(groups), {
        status: 200,
      });
    }

    return new Response(null, {
      status: 404,
    });
  },
};
