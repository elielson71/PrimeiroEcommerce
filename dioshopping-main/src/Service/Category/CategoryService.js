import { api } from '../Api'
export async function getCategory() {
    return await api.get('/api/category')
}

export async function getCategoryGrupo(id_category) {
    return await api.get(`api/categorygrupo/${id_category}`)
}
export async function postCategory(category) {
    const resp = await api.post('/api/category', category)
    return resp
}
export async function postCategoryGrupo(categoryGrupo) {
    const resp = await api.post('/api/category/grupo', categoryGrupo)
    return resp
}

export async function getOneCategory(id_category) {
    return await api.get(`/api/category/${id_category}`)
}

export async function putCategory(id_category, category) {
    return await api.put(`/api/category/${id_category}`, category)
}
export async function deleteCategory(id_category) {
    if (window.confirm('Deseja Realmente excluir Category?')) {
        return (await api.delete(`/api/category/${id_category}`))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}
export async function deleteCategoryGrupo(categoryGrupo) {
    if (window.confirm('Deseja Realmente excluir Category?')) {
        return (await api.post(`/api/deletecategorygrupo/`,categoryGrupo))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}