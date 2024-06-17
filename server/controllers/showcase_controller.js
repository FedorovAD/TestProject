import { showcaseModels } from "../models/showcase_models.js"
import { productsModels } from "../models/products_models.js"

class ShowcaseController {
    async createShowcase(req, res){
        const {name, limit} = req.body
        const id = await showcaseModels.create(name, limit)
        console.log(id)
        res.json(id)
    }
    async getShowcase(req, res){
        const {limit, offset} = req.query
        console.log(limit, offset)
        const limitRaw = limit ? limit : 10;
        const offsetRaw = offset ? offset : 0;
        const getAll = await showcaseModels.getAll(limitRaw, offsetRaw)
        console.log(getAll)
        res.json(getAll)
    }
    async getOneShowcase(req, res){
        const {id} = req.params
        const getOne = await showcaseModels.getOne(id)
        console.log(getOne)
        res.json(getOne)
    }
    async updateShowcase(req, res){
        const {id, name, limit} = req.body
        const updateOne = await showcaseModels.update(id, name, limit)
        console.log(updateOne)
        res.json(updateOne)
    }
    async deleteShowcase(req, res){
        const {id} = req.params
        await showcaseModels.delete(id)
        res.json('Successfully deleted')        
    }
}

export const showcaseController = new ShowcaseController()