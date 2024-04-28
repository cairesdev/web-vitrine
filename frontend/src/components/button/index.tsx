"use client";
interface Props {
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  text: string;
  action: "excluir" | "editar" | "salvar";
}

export default function Button({
  text,
  className,
  disabled,
  type,
  action,
}: Props) {
  function handleButton() {
    switch (action) {
      case "salvar":
        console.log("salvar");
        break;
      case "editar":
        console.log("editar");
        break;
      case "excluir":
        console.log("excluir");
        break;
      default:
        break;
    }
  }

  return (
    <button
      className={className}
      onClick={handleButton}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
