import Joi from 'joi'

const validar = producto => {
    const productoSchema = Joi.object({
        nombre: Joi.string().alphanum().required(),
        precio: Joi.number().min(0).max(99999),
        stock: Joi.number().integer().min(0).max(999)
    })

    const { error } = productoSchema.validate(producto)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}

export default {
    validar
}
