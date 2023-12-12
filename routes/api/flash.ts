import { Handlers } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(req, _) {
    const flashCookie = getCookies(req.headers).flash;
    const messages: string = flashCookie == undefined
      ? []
      : JSON.parse(decodeURIComponent(flashCookie));
    //console.log("## messages GET:", messages);
    const headers = new Headers();

    //setCookie(headers, { name: "flash", value: "", maxAge: 0 });

    return new Response(JSON.stringify(messages), { headers });
  },
  async POST(req, _) {
    const messages = await req.text();
    const headers = new Headers();
    const url = new URL(req.url);

    setCookie(headers, {
      name: "flash",
      value: encodeURIComponent(messages),
      maxAge: 3600,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    const flashCookie = getCookies(req.headers).flash;
    console.log("++ flashCookie", flashCookie);

    return new Response("", { headers });
  },
};
