export default async function BuscarPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };

  return (
    <div>
      <h1>Buscar</h1>
      <p>{searchValue}</p>
    </div>
  );
}
