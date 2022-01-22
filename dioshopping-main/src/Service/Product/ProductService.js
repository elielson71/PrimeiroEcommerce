import { api } from '../Api'
export async function getProduct() {
    return await api.get('/api/product')
}

export async function getProductGrupo(id_product) {
    return await api.get(`api/productgrupo/${id_product}`)
}
export async function postProduct(product) {
    const resp = await api.post('/api/product', product)
    return resp
}
export async function postProductGrupo(productGrupo) {
    const resp = await api.post('/api/product/grupo', productGrupo)
    return resp
}

export async function getOneProduct(id_product) {
    return await api.get(`/api/product/${id_product}`)
}

export async function putProduct(id_product, product) {
    return await api.put(`/api/product/${id_product}`, product)
}
export async function deleteProduct(id_product) {
    if (window.confirm('Deseja Realmente excluir Product?')) {
        return (await api.delete(`/api/product/${id_product}`))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}
export async function deleteProductGrupo(productGrupo) {
    if (window.confirm('Deseja Realmente excluir Product?')) {
        return (await api.post(`/api/deleteproductgrupo/`,productGrupo))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}