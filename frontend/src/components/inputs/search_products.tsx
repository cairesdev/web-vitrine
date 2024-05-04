"use client";
import { createUrl } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/buscar", newParams));
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        key={searchParams?.get("q")}
        type="text"
        name="search"
        placeholder="Procurar por produtos..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="input__pesquisa"
      />
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form>
      <input placeholder="Procurar por produtos..." />
    </form>
  );
}
