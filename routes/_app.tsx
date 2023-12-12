import { AppProps } from "$fresh/server.ts";
import { globalData } from "../state/global.ts";
import Messages from "../islands/Messages.tsx";

export default function App({ Component }: AppProps) {
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
        {
          /* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" /> */
        }
        {/* <link href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Roboto&family=Staatliches&display=swap" rel="stylesheet" /> */}
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,700,900|Staatliches"
          rel="stylesheet"
        />
      </head>

      <Messages />

      <body>
        <header class="site-header contenedor">
          <a href="/">
            <img src="/img/logo.png" alt="Logo ágora" />
          </a>

          <nav class="nav">
            <a href="#">Create Group</a>
            <a href="#">Sign In</a>
            <a href="/users/create">Create Account</a>
          </nav>
        </header>

        <Component />

        <footer class="site-footer contenedor">
          <nav class="nav">
            <a href="#">Create Group</a>
            <a href="#">Sign In</a>
            <a href="/users/register">Login Up</a>
          </nav>

          <p class="copyright">
            All right reserved ágora {globalData.year} &copy;
          </p>
        </footer>
      </body>
    </html>
  );
}
