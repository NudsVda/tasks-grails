package tasks.grails

class CategoriaController {
    static scaffold = true
    

	def list(){
    	render(contentType: "text/json") {
    		Categoria.findAll()
    	}
    }

}
