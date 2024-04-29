import Button from "@/components/buttons/buttons_admin";
import ItemProdutoADM from "@/components/itens/product";
import { getProducts } from "@/hooks/useProdutos";
import "@/styles/containers.css";

export default async function Listagem() {
  const data = await getProducts();

  return (
    <div className="box">
      <h1>Lista</h1>
      {data.results.map((item) => (
        <ItemProdutoADM key={item._id} item={item}>
          <Button action="visualizar" data={item} className="btn_green" />
          <Button action="editar" data={item} className="btn_orange" />
          <Button action="excluir" data={item} className="btn_red" />
        </ItemProdutoADM>
      ))}
    </div>
  );
}
