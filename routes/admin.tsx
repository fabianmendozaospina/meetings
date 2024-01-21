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
    const resp = await fetch(`${Deno.env.get("APP_URL")}/api/categories`);
    let groups = [];

    if (resp.status == 200) {
      groups = await resp.json();
    }

    return await ctx.render({ successMessages, errorMessages, groups });
  },
};

export default function CreateAccount(props: PageProps) {
  const { groups } = props.data;
  return (
    <main class="contenedor panel-administracion">
      <h1>Administration Panel</h1>

      <div class="contenedor-botones">
        <a href="/groups/new-group" class="btn btn-amarillo">
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
              <a href="#" class="btn btn-verde">Edit</a>
              <a href="#" class="btn btn-azul2">Assistants</a>
              <a href="#" class="btn btn-rojo">Delete</a>
            </div>
          </li>;
        </ul>
      </div>

      <div class="seccion-admin">
        <h2>Your Groups</h2>

        {groups.length
          ? (
            <ul>
              {groups.array.forEach((group: any) => {
                <li>
                  <div class="informacion-admin">
                    <h3>{group.name}</h3>
                  </div>
                  <div class="acciones contenedor-botones">
                    <a href={`/edit-group/${group.id}`} class="btn btn-verde">
                      Edit
                    </a>
                    <a href={`/image-group/${group.id}`} class="btn btn-azul2">
                      Image
                    </a>
                    <a href={`/delete-group/${group.id}`} class="btn btn-rojo">
                      Delete
                    </a>
                  </div>
                </li>;
              })}
            </ul>
          )
          : <p>You don't have any group created</p>}
      </div>
    </main>
  );
}
