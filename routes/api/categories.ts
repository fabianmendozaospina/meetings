import { Handlers } from "$fresh/server.ts";
import { Category } from "../../models/Category.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const categories = await Category.findAll();

    if (categories) {
      return new Response(JSON.stringify(categories), {
        status: 200,
      });
    }

    return new Response(null, {
      status: 404,
    });
  },
};
