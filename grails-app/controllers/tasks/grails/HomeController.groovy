package tasks.grails

class HomeController {

    def index() { 
    	[categorias: Categoria.findAll()]
    }

    def add() {
    	
    }

    def list(){
    		def map = [:]
    		Tasks.findAll().each(){
    			map[] = [id: it.id, task: it.task, requiredBy: it.requiredBy, completed: it.completed, category: it.category.descricao]
    		}
    	render(contentType: "text/json") {
    		map
    	}
    }
}
