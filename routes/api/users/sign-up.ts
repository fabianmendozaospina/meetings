import { Handlers } from "$fresh/server.ts";
import type { WithSession } from "fresh-session";
import { User } from "../../../models/User.ts";
import { sendEmail } from "../../../emails/handlers.ts";

export const handler: Handlers<
  unknown,
  WithSession<"KEY_A" | "KEY_B" | "KEY_C", "success" | "error">
> = {
  async POST(req, ctx) {
    let messages: string[] = [];
    const headers = new Headers();
    const { session } = ctx.state;

    try {
      const formData = await req.formData();
      const password = formData.get("password")?.toString().trim();
      const confirm = formData.get("confirm")?.toString().trim();

      if (confirm == "") {
        messages.push("Password confirmed cannot be empty");
      }

      if (password != confirm) {
        messages.push("Password is different");
      }

      const user = {
        email: formData.get("email"),
        name: formData.get("name"),
        password,
        confirm,
      };

      await User.create(user);

      // Generate confirmation url.
      const url =
        `http://${ctx.url.host}/api/users/confirm-account/${user.email}`;
      console.log("** url", url);
      // Send the confirmation email.
      await sendEmail({
        user,
        url,
        subject: "Confirm your Meetings account",
        file: "confirm-account",
      });

      //Flash message y redireccionar.
      session.flash(
        "success",
        ["We have sent an email, please confirm your account"],
      );
      headers.set("location", "/users/sign-in");
    } catch (error) {
      console.log(">>> error", error);
      error.errors?.map((err: any) => messages.push(err.message));
      session.flash("error", messages);
      headers.set("location", "/users/sign-up");
    }

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
