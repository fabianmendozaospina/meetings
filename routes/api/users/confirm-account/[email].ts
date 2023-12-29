import { Handlers } from "$fresh/server.ts";
import type { WithSession } from "fresh-session";
import { User } from "../../../../models/User.ts";

export const handler: Handlers<
  unknown,
  WithSession<"KEY_A" | "KEY_B" | "KEY_C", "success" | "error">
> = {
  async GET(_, ctx) {
    // Verify that the user exists.
    const user = await User.findOne({ where: { email: ctx.params.email } });
    const { session } = ctx.state;
    const headers = new Headers();

    // If he does not exist, redirect.
    if (!user) {
      session.flash("error", ["The account does not exist"]);
      headers.set("location", "/users/sign-up");
      return new Response(null, {
        status: 303,
        headers,
      });
    }

    // If he exists, confirm subscription and redirect.
    user.active = true;
    await user.save();

    session.flash(
      "success",
      ["The account has been confirmed, you can now log in."],
    );
    headers.set("location", "/users/sign-in");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
