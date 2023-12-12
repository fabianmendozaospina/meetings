import { Context } from "https://deno.land/x/oak@v8.1.0/mod.ts";
import { globalData } from "../state/global.ts";

export const  authMiddleware = async (ctx: Context, next: () => Promise<void>) => {
    // Aquí puedes agregar la lógica de tu middleware
    // Por ejemplo, puedes verificar si el usuario está autenticado
  
    // const isAuthenticated = checkAuthentication(ctx.request); // Asume que checkAuthentication es una función que verifica la autenticación
  
    // if (!isAuthenticated) {
    //   // Si el usuario no está autenticado, puedes decidir qué hacer, por ejemplo, redirigir al usuario a la página de inicio de sesión
    //   ctx.response.status = 302;
    //   ctx.response.headers.set("Location", "/login");
    //   return;
    // }
  
    // Si el usuario está autenticado, puedes agregar el objeto de contexto a la solicitud
    // const date = new Date();
    // ctx.state.user = "Fabián", //getUser(ctx.request); // Asume que getUser es una función que obtiene el nombre del usuario
    // ctx.state.year = date.getFullYear().toString()

    globalData.user = "Fabián";    
  
    await next();
};