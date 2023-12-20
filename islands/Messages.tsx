export default function Messages(
  props: { successMessages: string[]; errorMessages: string[] },
) {
  const { successMessages, errorMessages } = props;
  return (
    <>
      {successMessages &&
        successMessages.map((message: string) => (
          <div class="alertas">
            <p class="alerta success">{message}</p>
          </div>
        ))}
      {errorMessages &&
        errorMessages.map((message: string) => (
          <div class="alertas">
            <p class="alerta error">{message}</p>
          </div>
        ))}
    </>
  );
}
