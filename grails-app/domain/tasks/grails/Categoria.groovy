package tasks.grails

class Categoria {

    static constraints = {
    	descricao(unique: true)
    }

    String descricao

}
