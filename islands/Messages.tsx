export default function Messages() {
  let messages: any[] = [];
  (async () => {
    const response = await fetch(`http://localhost:8000/api/flash`, {
      method: "GET",
    });

    messages = await response.json();

    return messages;
  })();

  return (
    <>
      {messages &&
        messages.map((msg: any) => (
          <div class="alertas">
            <p class={`alerta ${msg.category}`}>{msg.message}</p>
          </div>
        ))}
    </>
  );
}
