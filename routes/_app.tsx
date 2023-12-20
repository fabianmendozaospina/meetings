import { PageProps } from "$fresh/server.ts";
import { globalData } from "../state/global.ts";
import Messages from "../islands/Messages.tsx";

export default function App({ Component, data }: PageProps) {
  const { successMessages, errorMessages } = data ??
    { successMessages: [], errorMessages: [] };
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Meetings</title>
        <link rel="stylesheet" href="/css/app.css" />
        <link
          rel="stylesheet"
          href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,700,900|Staatliches"
          rel="stylesheet"
        />
      </head>

      <body>
        <header class="site-header contenedor">
          <a href="/">
            <img
              src="/img/logo.png"
              width={200}
              height={200}
              alt="Logo Meetings"
            />
          </a>

          <nav class="nav">
            <a href="#">Create Group</a>
            <a href="/users/sign-in">Sign In</a>
            <a href="/users/sign-up">Sign Up</a>
          </nav>
        </header>

        <Messages
          successMessages={successMessages}
          errorMessages={errorMessages}
        />
        <Component />

        <footer class="site-footer contenedor">
          <nav class="nav">
            <a href="#">Create Group</a>
            <a href="/users/sign-in">Sign In</a>
            <a href="/users/sign-up">Sign Up</a>
          </nav>

          <p class="copyright">
            All right reserved Meetings {globalData.year} &copy;
          </p>
        </footer>
      </body>
    </html>
  );
}
