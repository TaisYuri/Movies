import api from "./api";

export async function ConexionApi(link: string, response,  setLoading:(load: boolean) => void, page: string='1'){
  setLoading(true)
    await api
    .get(`${link}?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=pt-BR&page=${page}`)
    .then(response)
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    })
    .finally(() => {setLoading(false)})
  }