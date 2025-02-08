// importando o fastify
import { fastify } from 'fastify'
//importando database memory
import { DatabaseMemory } from './database-memory.js'
// criando nosso servidor

const server = fastify()
// criando o database
const database = new DatabaseMemory()
//criando um livro
server.post('/equipamento', (request, reply) => {
    // acessando dados do corpo (desestrytyrado)
    const {titulo, preco, modelo, serie, prefixo, fabricante} = request.body

    database.create({
        titulo: titulo,
        preco: preco,
        modelo: modelo,
        serie: serie,
        prefixo: prefixo,
        fabricante: fabricante
    })
    // retornando o status da rota
    return reply.status(201).send()
})
//ler livros cadastrados
server.get('/equipamentos', (request) => {
    //pagando a busca
    const search = request.query.search
    // acessando database
    const equipamentos = database.list(search)
    // retornando equipamentos
    return equipamentos
})
//atualizar livro, lembre-se de passar o Route Parameter
server.put('/equipamentos/:id', (request, reply) => {
    // return "Atualizar!"
    //passando id do equipamentos
    const equipamentoId = request.params.id
    // passando restante dos atributos
    const {titulo, preco, modelo, serie, prefixo, fabricante} = request.body
    const equipamento = database.update(equipamentoId, {
        titulo: titulo,
        preco: preco,
        modelo: modelo,
        serie: serie,
        prefixo: prefixo,
        fabricante: fabricante
    })
    // sucesso sem conteudo
    return reply.status(204).send()
})

server.patch('/equipamentos/:id', (request, reply) => {
    const equipamentoId = request.params.id;
    const update = request.body;

    const Equipamento = database.getById(equipamentoId);
    if (!Equipamento) {
        return reply.status(404).send({ message: 'Equipment not found'});

    }
    const EquipamentoUp = {...Equipamento, ...update};

    database.update(equipamentoId, EquipamentoUp);

    return reply.status(204).send();
})

// apagar um livro, lembre-se de passar o Route Parameter
server.delete('/equipamentos/:id', (request, reply) => {
    // passando Id do equipamento
    const equipamentoId = request.params.id
    //deletando livro
    database.delete(equipamentoId)
    // retornando status de sucesso em branco
    return reply.status(204).send()
})
server.listen({
    port: 3333,
})