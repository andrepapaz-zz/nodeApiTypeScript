import { ICRUDService } from "./ICRUDService";
import { Produto } from "../model/Produto";
import ProdutoSchema from "../schema/ProdutoSchema";

export class ProdutoService implements ICRUDService<Produto, String>{
    
    constructor() {

    }

    listAll(): Promise<Produto[]> {
        return new Promise<Produto[]>((resolve, reject) => {

            ProdutoSchema.find()
                .then(produtosData => {
                    resolve(
                        produtosData
                            .map(produtoData => produtoData.toJSON())
                            .map(prodJson => new Produto(prodJson.cod, prodJson.nome, prodJson.descricao, prodJson.valor, prodJson.image))
                    )
                });

        });
    }

    getOne(id: String): Promise<Produto | null> {
        return new Promise<Produto | null>((resolve, reject) => {

            ProdutoSchema.findOne({ cod: id })
                .then(produtoData => {
                    if (!produtoData) {
                        resolve(null)
                    } else {
                        return produtoData.toJSON()
                    }
                })
                .then(prodJson => prodJson && resolve(new Produto(prodJson.cod, prodJson.nome, prodJson.descricao, prodJson.valor, prodJson.image)));

        });
    }

    create(obj: Produto): Promise<Produto> {
        throw new Error("Method not implemented.");
    }

    update(obj: Produto): Promise<Produto> {
        throw new Error("Method not implemented.");
    }

    delete(id: String): Promise<void> {
        throw new Error("Method not implemented.");
    }

}