import { Handlers } from "$fresh/server.ts";
import { User } from "../../../models/User.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const headers = new Headers();

    try {
      const formData = await req.formData();
      const body = {
        email: formData.get("email"),
        name: formData.get("name"),
        password: formData.get("password"),
        repeat: formData.get("repeat"),
      };
      const usuario = await User.create(body);

      //TODO: Flash message y redireccionar por ahora a la raiz.
      console.log("usuario creado", usuario);
      headers.set("location", "/");
    } catch (error) {
      const sequelizeErrors = error.errors.map((err: any) => err.message);
      const messages: any[] = [];
      sequelizeErrors.map((msg: any) => {
        messages.push({
          message: msg,
          category: "error",
        });
      });

      //TODO: manage the flash messages in a helper.
      await fetch(
        `${Deno.env.get("APP_URL")}/api/flash`,
        {
          method: "POST",
          body: JSON.stringify({ messages }),
        },
      );

      console.log("redirect...");
      headers.set("location", "/users/create");
    }

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
