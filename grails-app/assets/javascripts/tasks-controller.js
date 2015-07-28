tasksController = function() {
	
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}
	
	var taskPage;
	var initialised = false;   
	
	return {		
		init : function(page, callback) {
			if (initialised) {
				callback()
			} else {
				if(!initialised) {
					taskPage = page;
					storageEngine.init(function() {
						storageEngine.initObjectStore('task', function() {
							callback();
						}, errorLogger) 
					}, errorLogger);
				
				$(taskPage).find( '[required="required"]' ).prev('label').append( '<span>*</span>').children( 'span').addClass('required');
				
				$(taskPage).find('tbody tr:even').addClass( 'even');
				
				$(taskPage).find( '#btnAddTask' ).click( function(evt) {
					evt.preventDefault();
					$(taskPage ).find('#taskCreation' ).removeClass( 'not');
				});
				
				$(taskPage).find('tbody tr' ).click(function(evt) {
					$(evt.target ).closest('td').siblings( ).andSelf( ).toggleClass( 'rowHighlight');
				});
				
				$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', 
				function(evt) { 					
					storageEngine.delete('task', $(evt.target).data().taskId, 
					function() {
						$(evt.target).parents('tr').remove(); 
						//ExercÃ­cio 1. limpa a lista e roda o loadTask novamente
						$(taskPage).find('#tblTasks tbody').empty();
						tasksController.loadTasks();
					}, errorLogger);
				});		
				
				//Ponto 4: criado para adicionar o completed ao storage, pega o id, procura a tarefa e dÃ¡ um save
				$(taskPage).find('#tblTasks tbody').on('click', '.completedRow', 
				function(evt) { 					
					storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
						task.completed = 1;
						console.log = task;
						storageEngine.save('task', task, function() {
							$(taskPage).find('#tblTasks tbody').empty();
							tasksController.loadTasks();
							$(':input').val('');
							$(taskPage).find('#taskCreation').addClass('not');
						}, errorLogger);
					}, errorLogger);
				});	
				
				$(taskPage).find('#tblTasks tbody').on('click', '.editRow', 
				function(evt) { 
					$(taskPage).find('#taskCreation').removeClass('not');
					storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
						$(taskPage).find('form').fromObject(task);
					}, errorLogger);
				}
				);
				
				//Ponto 2: Adicionado comportamento ao clearTask, percorre o form resetando os campos
				$(taskPage).find('#clearTask').click(function(evt) {
					evt.preventDefault();
					$('#taskForm').each (function(){
						this.reset();	
					});
				});
				
				$(taskPage).find('#saveTask').click(function(evt) {
					evt.preventDefault();
					if ($(taskPage).find('form').valid()) {
						var task = $(taskPage).find('form').toObject();		
						storageEngine.save('task', task, function() {
							$(taskPage).find('#tblTasks tbody').empty();
							tasksController.loadTasks();
							$(':input').val('');
							$(taskPage).find('#taskCreation').addClass('not');
						}, errorLogger);
					}
				});
				initialised = true;
				}
			}
    	},
		loadTasks : function() {
			storageEngine.findAll('task', 
			function(tasks) {
				// Ponto 5: sort da lista que vem do banco ordenando por data
				tasks.sort(function(a, b){
				if (a.requiredBy < b.requiredBy)
					return -1;
				if (a.requiredBy > b.requiredBy)
					return 1;
				return 0;
				});
				var i = 0;
				$.each(tasks, function(index, task) {
					$('#taskRow').tmpl(task ).appendTo( $(taskPage ).find( '#tblTasks tbody'));
					// Ponto 3: Usando o datejs.com comparando as datas adiciono a classe, alterei o tmpl da taskRow para cada linha ter um id para facilitar a inclusÃ£o
					var classId = "#"+task.id;
					switch (Date.today().compareTo(Date.parse(task.requiredBy))) {
						case 1: //tarefa que passou do prazo
							$(classId).addClass('overdue');
							break;
						case 0: //tarefa prÃ³xima do prazo
							$(classId).addClass('warning');
							break;
					}
					// Ponto 4: tarefas completadas
					if (task.completed){
						$(classId).addClass('taskCompleted'); //adicionando classe 
						$(classId + ' .editRow').hide(); //escondendo o botÃ£o de editar
						$(classId + ' .completedRow').hide(); //escondendo o botÃ£o de completar
					} else {
						i++; //Ponto 4, contar somente as tarefas nÃ£o completadas
					}
				});
				//Ponto 1. Coloquei um contador, entÃ£o na contagem das linhas eu verifico quantas tem e atualizo o #taskCount
				$('#taskCount').empty();
				$('#taskCount').append(i);
			}, 
			errorLogger);
		}
	}
}();