package tasks.grails

class HomeController {

    def index() { }

    def add() {
    	
    }

    def list(){
    	render(contentType: "text/json") {
    		Categoria.findAll().collect() {[it.id, it.descricao]}
    	}
    }
}
