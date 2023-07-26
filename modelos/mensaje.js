export default class Mensaje {

    #id
    #nombre
    #apellido
    #edad
    #alias
    #avatar
    #text

    constructor(obj) {
        this.id = obj.author.id
        this.alias = obj.author.alias
        this.text = obj.text
    }

    get id() {
        return this.#id
    }
    set id(id) {
        if (!id) {
            throw new Error('El id es un campo requerido')
        }
        this.#id = id

    }
    get alias() {
        return this.#alias
    }
    set alias(alias) {
        if(!alias) {
            throw new Error('El alias es un campo requerido')
        }
        this.#alias = alias
    }
    get text() {
        return this.#text
    }
    set text(text) {
        if (!text) {
            throw new Error('El texto es un campo requerido')
        }
        this.#text = text
    }

    datos() {
        return JSON.parse(JSON.stringify(
            {
                author:
                {
                    id: this.#id,
                    alias: this.#alias,
                },
                text: this.#text
            }
        ))
    }
}


