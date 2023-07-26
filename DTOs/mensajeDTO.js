class MensajeDTO {
  constructor(obj) {
    this.nombre = obj.author.nombre
    this.apellido = obj.author.apellido
    this.edad = obj.author.edad
    this.id = obj.author.id
    this.alias = obj.author.alias
    this.avatar = obj.author.avatar
    this.text = obj.text
  }
  
  datos() {
    return JSON.parse(JSON.stringify(
        {
            author:
            {
                id: this.id,
                alias: this.alias,
            },
            text: this.text
        }
    ))
}
}

export function mensajeDTO(mensaje) {

  return mensaje.map((m) => new MensajeDTO(m).datos())

}