import { Database } from "./../models/index.ts";

const db = new Database();

try {
  await db.addModels();
  await db.connect();
} catch (error) {
  console.log(error);
}

export default function Home() {
  return (
    <h1>
      Home
    </h1>
  );
}
