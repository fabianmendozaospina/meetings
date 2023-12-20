import { Handlers, PageProps } from "$fresh/server.ts";
import type { WithSession } from "fresh-session";

export const handler: Handlers<
  unknown,
  WithSession<"KEY_A" | "KEY_B" | "KEY_C", "success" | "error">
> = {
  async GET(_, ctx) {
    const { session } = ctx.state;
    const successMessages: string[] = session.flashNow("success");
    const errorMessages: string[] = session.flashNow("error");

    return await ctx.render({ successMessages, errorMessages });
  },
};

export default function CreateAccount(props: PageProps) {
  return (
    <main class="contenedor contenedor-formularios">
      <h1>Sign In</h1>

      <form action="/api/users/sign-in" method="POST" class="default-form">
        <div class="campo">
          <label>E-mail</label>
          <input type="email" name="email" placeholder="Your Email" />
        </div>
        <div class="campo">
          <label>Password</label>
          <input type="password" name="password" placeholder="Your Password" />
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Sign In" />
        </div>
      </form>
    </main>
  );
}
