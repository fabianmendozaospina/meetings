import onyx from "onyx";
import LocalStrategy from "onyx-local";
import { User } from "../models/User.ts";

onyx.use(
  new LocalStrategy(
    async (email: string, password: string, next: Function) => {
      // This code is executed when the form is filled.
      console.log(
        `verify function invoked with username ${email} and password ${password}`,
      );
      try {
        const user = await User.findOne({ where: { email, active: 1 } });

        // Review if does not exist.
        if (!user) {
          return await next(null, false, {
            message: "The user does not exist",
          });
        }

        // The user exists, compare its password.
        const verifyPass = user.validatePassword(password);

        // If the password is wrong.
        if (!verifyPass) {
          return await next(null, false, {
            message: "Incorrect Password",
          });
        }

        // All is OK.
        return await next(null, user);
      } catch (error) {
        console.error("Error during local strategy verification:", error);
        return await next(error);
      }
    },
  ),
);

onyx.serializeUser((user: any, cb: any) => {
  cb(null, user);
});

onyx.deserializeUser((user: any, cb: any) => {
  cb(null, user);
});

export default onyx;
