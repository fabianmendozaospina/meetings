import { type ClientOptions, type SendConfig, SMTPClient } from "denomailer";
import * as dejs from "dejs";
import { config } from "./config.ts";

const clientOptions: ClientOptions = {
  connection: {
    hostname: config.host,
    port: config.port,
    tls: true,
    auth: {
      username: config.user,
      password: config.pass,
    },
  },
  pool: {
    size: 2,
    timeout: 60000,
  },
  client: {
    warning: "log",
    preprocessors: [],
  },
  debug: {
    log: true,
    allowUnsecure: true,
    encodeLB: false,
    noStartTLS: false,
  },
};

export const sendEmail = async (options: any) => {
  // Read the file for the email.
  const file = `${Deno.cwd()}/emails/${options.file}.ejs`;
  console.log("** file", file);

  // Open the file as a Reader.
  const fileReader = await Deno.open(file);
  console.log("** fileReader", fileReader);

  // Compile the template with dejs.
  const compiled = await dejs.compile(fileReader);
  console.log("** compiled", compiled);

  // Create the HTML.
  const html = await compiled({ url: options.url });
  console.log("** html", html);

  // Config the options for the email.
  const emailOptions: SendConfig = {
    from: "Meetings <noreply@meetings.com>",
    to: options.user.email,
    subject: options.subject,
    content: "auto",
    html,
  };
  console.log("** emailOptions", emailOptions);

  // Send the email.
  console.log("** clientOptions", clientOptions);
  const emailClient = new SMTPClient(clientOptions);
  await emailClient.send(emailOptions);
  console.log("** enviado");

  // Close the file reader.
  fileReader.close();
};
