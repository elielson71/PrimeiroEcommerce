import { useEffect, useMemo, useState } from "react"
//import { useHistory } from "react-router-dom"
import { deleteCategory, deleteCategoryGrupo,
     getOneCategory, getCategory, getCategoryGrupo, 
     postCategory, postCategoryGrupo, putCategory } from "../../Service/Category/CategoryService"

export const useCategory =(id_category)=>{
    const [categorys, setCategory] = useState([])
    const Category = 
  //const history = useHistory()
    useEffect(() => {
        if (id_category === '') {            
          recuperarTodosCategory()
        } else if (id_category !== '') {
          RecuperarOneCategory(parseInt(id_category))
          recuperarCategoryGrupo(parseInt(id_category))
        }
    
    
      }, [id_category])
    
      async function excluirCategory(id) {
        const resp = await deleteCategory(id)
        if (resp.status === 204)
          recuperarTodosCategory()
        else if (resp.status >= 400) {
          alert(`Erro ao excluir!${resp.status}\n ${resp.data.message}`)
        }
        
      }
      //Registrar
      const [descricao, setDescricao] = useState('')
      const [categoria, setCategoria] = useState(0)
      const [preco, setPreco] = useState(0)
      async function handleSubmint() {
    
        if (descricao !== '' ) {
            const data ={
                name_category:descricao,
                price:preco
            }
          let resp
          if (id_category === 'new') {
            data.id_category = undefined
            resp = await postCategory(data)
          } else if (id_category !== 'new' && id_category !== '') {
    
            resp = await putCategory(parseInt(id_category), data)
          } else return
    
          if (resp.status === 201 || resp.status === 204) {
            if (resp.status === 204) {
              alert("Dados Atualizados com Sucesso!")
            }
            //history.push('/category')
          } else if (resp.status === 404) {
            alert('Preco ou Descricao já existe!')
          } else {
            alert('Errro ao cadastrar Category!')
          }
        } else {
          alert('Preencha todos os campos!')
        }
      }
    
    
      async function RecuperarOneCategory(id) {
        const resp = await getOneCategory(id)
        if (resp.status === 200) {
          setDescricao(resp.data[0].descricao)
          //setCategoria(resp.data[0].categoria)
          setPreco(resp.data[0].price)
        }
      }
      const [allCategory, setAllCategory] = useState([])
      async function recuperarTodosCategory() {
        const resp = await getCategory()
        if (resp.status === 200) {
          setCategory(resp.data)
          setAllCategory(resp.data)
        }
      }
    
      const [categorygrupo, setCategorygrupo] = useState([])
      async function recuperarCategoryGrupo(id_category) {
        if (id_category) {
          const resp = await getCategoryGrupo(id_category)
          setCategorygrupo(resp.data)
          
        }
    
      }
      async function excluirCategoryGrupo(id_grupo) {
        const resp = await deleteCategoryGrupo({ id_category, id_grupo })
        if (resp.status===204){
          window.location.reload()
        }else {
            alert('Error ao excluir')
        }
      }
    
      /*const [busca,setBusca]=useState('')
      const filterBusca = useMemo(()=>{
          const lowerBusca = busca.toLocaleLowerCase();
          return allCategory.filter(item=>
              item.descricao.toLocaleLowerCase().includes(lowerBusca)
              )
      },[allCategory,busca])*/
      return {
        
        categorys, setCategory, excluirCategory,
        descricao, setDescricao,
        categoria, setCategoria, preco, setPreco,
        handleSubmint, allCategory,
        categorygrupo, excluirCategoryGrupo,

      }
}
