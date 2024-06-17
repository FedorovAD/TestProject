import {dbClient} from "../db.js"
import { timeFix } from "../utils/timefix.js"
import { showcaseModels } from "./showcase_models.js"
import { ApiError } from "../routes/apiError.js"

class ProductsModels {
    async create(sid, name, price, amount){
        const id = await dbClient.one('INSERT INTO products (showcase_id, item_name, price, amount) VALUES ($1, $2, $3, $4) RETURNING id', [sid, name, price, amount])
        await showcaseModels.updateTime(sid)
        return id
    }
    async getAllSid(sid){
        const getAllSid = await dbClient.any('SELECT * FROM products WHERE showcase_id = $1', [sid])
        return getAllSid
    }
    async getAll(){
        const getAll = await dbClient.many('SELECT * FROM products')
        const res = []
        for (const item of getAll){
            res.push(
                {
                    ...item,
                    created_at: timeFix(item.created_at),
                    updated_at: timeFix(item.updated_at),
                }
            )
        }
        return res
    }
    async getOne(id){
        const product = await dbClient.one('SELECT * FROM products WHERE id = $1', [id])
        return product
    }
    async update(id, sid, name, price, amount){
        console.log(sid)
        const updatedId = await dbClient.one('UPDATE products SET showcase_id = $1, item_name = $2, price = $3, amount = $4, updated_at = NOW() WHERE id = $5 RETURNING id', [sid, name, price, amount, id])
        return updatedId
    }
    async delete (id){
        const isDeleted = await dbClient.any('DELETE FROM products WHERE id = $1 RETURNING id', [id])
        console.log(isDeleted)
        if (isDeleted.length == 0){
            throw new ApiError(404, 'Not found')
        }
    }
    async deleteAll (sid){
        await dbClient.none('DELETE FROM products WHERE showcase_id = $1', [sid])
    }
}

export const productsModels = new ProductsModels()