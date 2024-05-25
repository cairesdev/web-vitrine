/**
 * Revalida dados enviando uma solicitação POST para a API de revalidação.
 *
 * @async
 * @function __revalidate
 * @param {string} tag - A tag que deve ser revalidada.
 * @returns {Promise<boolean>} - Retorna uma promessa que resolve para `true` se a revalidação for bem-sucedida.
 */
async function __revalidate(tag) {
  try {
    const url = `${process.env.FRONTEND_URL}api/revalidate?tag=${tag}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "ok",
      }),
    });

    if (response.ok) {
      console.info("Dados revalidados com sucesso");
    } else {
      console.error("Erro na revalidação dos dados: ", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Erro ao revalidar dados: ", error);
    return false;
  }

  return true;
}

module.exports = __revalidate;
