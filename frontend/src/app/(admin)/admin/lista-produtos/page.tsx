import Button from "@/components/button";
import ItemProdutoADM from "@/components/itens/product";
import { getProducts } from "@/hooks/useProdutos";

export default async function Listagem() {
  const data = await getProducts();

  return (
    <div>
      <h1>Lista</h1>
      {data.results.map((item) => (
        <ItemProdutoADM key={item._id} item={item}>
          <Button text="Excluir" type="button" action="editar" />
        </ItemProdutoADM>
      ))}
    </div>
  );
}
