import storage from "../../Service/firebase";
import { useEffect, useMemo, useState } from "react"
//import { useHistory } from "react-router-dom"
import {
  deleteProduct, deleteProductGrupo,
  getOneProduct, getProduct, getProductGrupo,
  postProduct, postProductGrupo, putProduct
} from "../../Service/Product/ProductService"
import { useCategory } from "../Category/useCategory"

export const useProduct = (id_product) => {
  const [products, setProduct] = useState([])
  const { allCategory } = useCategory('')
  const [image, setImage] = useState('')
  //const history = useHistory()
  useEffect(() => {
    if (id_product === '') {
      recuperarTodosProduct()
    } else if (id_product !== '') {
      RecuperarOneProduct(parseInt(id_product))
      recuperarProductGrupo(parseInt(id_product))
    }


  }, [id_product])

  async function excluirProduct(id) {
    const resp = await deleteProduct(id)
    if (resp.status === 204)
      recuperarTodosProduct()
    else if (resp.status >= 400) {
      alert(`Erro ao excluir!${resp.status}\n ${resp.data.message}`)
    }

  }
  //Registrar
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState(0)
  const [id_category, setId_category] = useState('')
  async function handleSubmint() {
    let file = {}
    const upload = storage.ref().child('upload/files/' + image.name)
    if (upload) {
      await upload.put(image)
      await upload.getMetadata().then(function (metadados) {
        file = { originalname: metadados.name, mimetype: metadados.contentType }
      })
      await upload.getDownloadURL().then(function (url) {
        file['path'] = 'bob' + url
      })
    }

    if (descricao !== '') {
      const data = {
        name_product: descricao,
        price: preco,
        category: id_category,
        image: file
      }
      let resp
      if (id_product === 'new') {
        data.id_product = undefined
        resp = await postProduct(data)
      } else if (id_product !== 'new' && id_product !== '') {

        resp = await putProduct(parseInt(id_product), data)
      } else return

      if (resp.status === 201 || resp.status === 204) {
        if (resp.status === 204) {
          alert("Dados Atualizados com Sucesso!")
        }
        //history.push('/product')
      } else if (resp.status === 404) {
        alert('Preco ou Descricao já existe!')
      } else {
        alert('Errro ao cadastrar Product!')
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }


  async function RecuperarOneProduct(id) {
    const resp = await getOneProduct(id)
    if (resp.status === 200) {
      setDescricao(resp.data[0].descricao)
      //setCategoria(resp.data[0].categoria)
      setPreco(resp.data[0].price)
    }
  }
  const [allProduct, setAllProduct] = useState([])
  async function recuperarTodosProduct() {
    const resp = await getProduct()
    if (resp.status === 200) {
      setProduct(resp.data)
      setAllProduct(resp.data)
    }
  }

  const [productgrupo, setProductgrupo] = useState([])
  async function recuperarProductGrupo(id_product) {
    if (id_product) {
      const resp = await getProductGrupo(id_product)
      setProductgrupo(resp.data)

    }

  }
  async function excluirProductGrupo(id_grupo) {
    const resp = await deleteProductGrupo({ id_product, id_grupo })
    if (resp.status === 204) {
      window.location.reload()
    } else {
      alert('Error ao excluir')
    }
  }

  /*const [busca,setBusca]=useState('')
  const filterBusca = useMemo(()=>{
      const lowerBusca = busca.toLocaleLowerCase();
      return allProduct.filter(item=>
          item.descricao.toLocaleLowerCase().includes(lowerBusca)
          )
  },[allProduct,busca])*/
  return {

    products, setProduct, excluirProduct,
    descricao, setDescricao, preco, setPreco,
    handleSubmint, allProduct,
    productgrupo, excluirProductGrupo, allCategory,
    id_category, setId_category, image, setImage

  }
}
