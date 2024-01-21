import { Handlers } from "$fresh/server.ts";
import { expandGroups } from "twind";
import { Group } from "../../models/Group";

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
