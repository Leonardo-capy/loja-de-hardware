import {randomUUID} from "node:crypto"
export class DatabaseMemory {
    #equipamentos = new Map()
    getById(ID){
        return this.#equipamentos.get(ID)
    }
    //criando equipamento
    create(equipamento){
        const equipamentoId = randomUUID()
        this.#equipamentos.set(equipamentoId, equipamento)
    }
    // Atualizar equipamento
    update(id, livro){
        this.#equipamentos.set(id, livro)
    }
    list(search) {
        return Array.from(this.#equipamentos.entries()).map((equipamentoArray) => {
            // primeira posição
            const id = equipamentoArray[0]
            // segunda posição
            const data = equipamentoArray[1]

            return{
                id,
                ...data,
            }
        })
        // retornando apenas resultados da pesquisa
        .filter(equipamento => {
            if (search) {
                return equipamento.titulo.includes(search)
            }
            return true
        })
    }
    delete(id){
        this.#equipamentos.delete(id)
    }
}