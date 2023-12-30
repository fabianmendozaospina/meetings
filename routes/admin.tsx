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
    <main class="contenedor panel-administracion">
      <h1>Administration Panel</h1>

      <div class="contenedor-botones">
        <a href="/new-group" class="btn btn-amarillo">
          New Group
        </a>
        <a href="/new-meeting" class="btn btn-azul">
          New Meeting
        </a>
        <a href="/edit-profile" class="btn btn-rosa">
          Edit Profile
        </a>
        <a href="/image-profile" class="btn btn-amarillo">
          Image Profile
        </a>
      </div>

      <div class="seccion-admin">
        <h2>Your Meetings</h2>

        <ul>
          <li>
            <div class="informacion-admin">
              <p class="fecha">Lunes, 22 de mayo de 2019</p>
              <h3>E-Commerce in Canada</h3>
              <small>23 Assistants</small>
            </div>
            <div class="acciones contenedor-botones">
              <a href="#" class="btn btn-verde">Editar</a>
              <a href="#" class="btn btn-azul2">Assistants</a>
              <a href="#" class="btn btn-rojo">Eliminar</a>
            </div>
          </li>
        </ul>
      </div>

      <div class="seccion-admin">
        <h2>Your Groups</h2>
        <ul>
          <li>
            <div class="informacion-admin">
              <h3>BlockChain Toronto</h3>
            </div>
            <div class="acciones contenedor-botones">
              <a href="#" class="btn btn-verde">Editar</a>
              <a href="#" class="btn btn-azul2">Assistants</a>
              <a href="#" class="btn btn-rojo">Eliminar</a>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
