package tasks.grails

class Tasks {

    static constraints = {
    }

    String task

    Boolean completed = 0

    Date requiredBy

    Categoria category

    static belongsTo = Categoria
  

}
