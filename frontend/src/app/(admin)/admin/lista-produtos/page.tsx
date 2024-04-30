import Button from "@/components/buttons/buttons_admin";
import ItemProdutoADM from "@/components/itens/product";
import { getProducts } from "@/hooks/useProdutos";
import { getCategorias } from "@/hooks/useCategorias";
import "@/styles/containers.css";
import Link from "next/link";
import ItemCategoriaADM from "@/components/itens/categoria";

export default async function Listagem() {
  const data = await getProducts();
  const categorias = await getCategorias();

  return (
    <div>
      <div className="header__listagem">
        <h1>Painel Administrativo</h1>
      </div>
      <div className="container__categorias_adm">
        <h2 className="subtitulo">Categorias Cadastradas</h2>
        <div className="box__categoria_adm">
          <div className="carrousel_categoria__adm">
            {categorias.results.map((item) => (
              <ItemCategoriaADM item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
      <div className="box">
        <h2 className="subtitulo">Listagem de Produtos</h2>
        {data.results.map((item) => (
          <ItemProdutoADM key={item._id} item={item}>
            <Button action="visualizar" data={item} className="btn_green" />
            <Button action="editar" data={item} className="btn_orange" />
            <Button action="excluir" data={item} className="btn_red" />
          </ItemProdutoADM>
        ))}
      </div>
      <div className="box__buttons">
        <Link className="btn_blue" href={"/"}>
          Ir para Loja
        </Link>
        <Link className="btn_green" href={"/admin/cadastrar-produto"}>
          Novo Produto
        </Link>
        <Link className="btn_green" href={"/admin/cadastrar-categoria"}>
          Nova Categoria
        </Link>
      </div>
    </div>
  );
}
