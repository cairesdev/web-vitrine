interface Props {
  params: {
    produto_id: string;
  };
}

export default async function EditarProdutoPage({ params }: Props) {
  return (
    <div>
      <h2>Editar</h2>
      <p>{params.produto_id}</p>
    </div>
  );
}
