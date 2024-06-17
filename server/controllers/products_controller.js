import { productsModels } from "../models/products_models.js"
import { showcaseModels } from "../models/showcase_models.js"
import { ApiError } from "../routes/apiError.js"
import { z } from "zod"

const schemeCreate = z.object({
    sid: z.number().positive().finite().int(),
    name: z.string().min(1),
    price: z.number().nonnegative().finite().int(),
    amount: z.number().nonnegative().finite().int(),
})

const schemeUpdate = z.object({
    id: z.number().positive().finite().int(),
    sid: z.number().positive().finite().int(),
    name: z.string().min(1),
    price: z.number().nonnegative().finite().int(),
    amount: z.number().nonnegative().finite().int(),
})

const schemeDelete = z.object({
    id: z.number().positive().finite().int(),
})


function testInput(body, scheme){
    const smth = scheme.safeParse(body)
    if (!smth.success){
        throw new ApiError(400, "Bad request")
    }
}

class ProductsController {
    async createProducts(req, res){
        console.log(req.body)
        const test = testInput(req.body, schemeCreate)
        const {sid, name, price, amount} = req.body
        const maxAmount = await showcaseModels.getOne(sid)
        const currentAmount = await productsModels.getAllSid(sid)
        if (currentAmount.length >= maxAmount.items_limit){
            throw new ApiError(400, 'Showcase is full')
        }
        const id = await productsModels.create(sid, name, price, amount) 
        console.log(id)
        res.json(id)
    }
    async getProducts(req, res){
        const getAll = await productsModels.getAll()
        console.log(getAll)
        res.json(getAll)
    }
    async getOneProduct(req, res){
        const {id} = req.params
        const getOne = await productsModels.getOne(id)
        console.log(getOne)
        res.json(getOne)
    }
    async updateProduct(req, res){
        const test = testInput(req.body, schemeUpdate)
        const {id, sid, name, price, amount} = req.body
        const maxAmount = await showcaseModels.getOne(sid)
        const currentAmount = await productsModels.getAllSid(sid)
        if (currentAmount.length >= maxAmount.items_limit){
            throw new ApiError(400, 'Showcase is full')
        }
        const updateOne = await productsModels.update(id, sid, name, price, amount)
        console.log(updateOne)
        res.json(updateOne)
    }
    async deleteProduct(req, res){
        const testId = {
            id: parseInt(req.params.id)
        }    
        const test = testInput(testId, schemeDelete)
        const {id} = req.params
        await productsModels.delete(id)
        res.json('Successfully deleted')        
    }
}

export const productsController = new ProductsController()