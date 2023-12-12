import { PageProps } from "$fresh/server.ts";

export default function CreateAccount(props: PageProps) {
  return (
    <main class="contenedor contenedor-formularios">
      <h1>Create Account</h1>

      <form action="/api/users/create" method="POST" class="default-form">
        <div class="campo">
          <label>E-mail</label>
          <input type="email" name="email" placeholder="Your Email" />
        </div>
        <div class="campo">
          <label>Name</label>
          <input type="text" name="name" placeholder="Your Name" />
        </div>
        <div class="campo">
          <label>Password</label>
          <input type="password" name="password" placeholder="Your Password" />
        </div>
        <div class="campo">
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat"
            placeholder="Repeat your Password"
          />
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Create Account" />
        </div>
      </form>
    </main>
  );
}
