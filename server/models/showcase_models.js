import {dbClient} from "../db.js"
import { productsModels } from "./products_models.js"
import { timeFix } from "../utils/timefix.js"

class ShowcaseModels {
    async create(name, limit){
        const id = await dbClient.one('INSERT INTO showcases (showcase_name, items_limit) VALUES ($1, $2) RETURNING id', [name, limit])
        return id
    }
    async getAll(limit, offset){
        const getAll = await dbClient.any('SELECT * FROM showcases LIMIT $1 OFFSET $2', [limit, offset])
        const res = []
        for (const item of getAll){
            res.push(
                {
                    ...item,
                    items_limit: `${(await productsModels.getAllSid(item.id)).length}/${item.items_limit}`,
                    updated_at: timeFix(item.updated_at),
                }
            )
        }
        return {
            items: res,
            limit: limit,
            offset: offset,
        }
    }
    async getOne(id){
        const showcase = await dbClient.one('SELECT * FROM showcases WHERE id = $1', [id])
        return showcase
    }
    async update(id, name, limit){
        const updatedId = await dbClient.one('UPDATE showcases SET showcase_name = $1, items_limit = $2, updated_at = NOW() WHERE id = $3 RETURNING id', [name, limit, id])
        return updatedId
    }
    async updateTime(id){
        await dbClient.none('UPDATE showcases SET updated_at = NOW() where id = $1', [id])
    }
    async delete (id){
        await productsModels.deleteAll(id)
        await dbClient.none('DELETE FROM showcases WHERE id = $1', [id])
    }
}

export const showcaseModels = new ShowcaseModels()