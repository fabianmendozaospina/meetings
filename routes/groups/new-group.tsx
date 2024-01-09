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
    let categories = [];

    if (resp.status == 200) {
      categories = await resp.json();
    }

    return await ctx.render({ successMessages, errorMessages, categories });
  },
};

export default function NewGroup(props: PageProps) {
  const { categories } = props.data;
  console.log(">> categories", categories.length);

  return (
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Create a New Group</h1>
      <form class="default-form" action="/api/groups/new-group" method="POST">
        <div class="campo">
          <label>Nombre</label>
          <input type="text" name="name" placeholder="Group name"></input>
        </div>
        <div class="campo descripcion">
          <label>Description</label>
          <div className="contenedor-editor">
            <input type="hidden" id="x" name="description"></input>
            <trix-editor input="x"></trix-editor>
          </div>
        </div>
        <div className="campo">
          <label>Category</label>
          <select name="category">
            <option value="" selected disabled>
              -- Choose a category --
            </option>
            {categories.forEach((category: any) => {
              <option value={category.id}>
                {category.name}
              </option>;
            })}
          </select>
        </div>
        <div className="campo">
          <label>Image</label>
          <input type="file" name="image"></input>
        </div>
        <div className="campo">
          <label>Web Site</label>
          <input type="url" name="url" placeholder="Group Name"></input>
        </div>
        <div className="campo enviar">
          <input type="submit" value="Create Group" class="btn btn-rosa">
          </input>
        </div>
      </form>
    </main>
  );
}
