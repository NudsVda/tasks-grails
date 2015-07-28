<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Tarefas</title>
<asset:stylesheet src="02-tasks.css"/>
<g:layoutHead/>
</head>
<body>
	<header>
		<span>Lista de Tarefas</span>
	</header>
	<g:layoutBody/>
	
	
	<footer>Você tem <span id="taskCount">0</span> tarefas</footer>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<asset:javascript src="jquery.validate.min.js"/>
<asset:javascript src="date.js"/>
<asset:javascript src="jquery.tmpl.min.js"/>
<asset:javascript src="jquery-serialization.js"/>
<asset:javascript src="tasks-controller.js"/>


<script id="taskRow" type="text/x-jQuery-tmpl">
<tr id="{{= id }}">
	<td>{{= task }}</td>
	<td><time datetime="{{= requiredBy }}"> ${requiredBy}</time></td>
	<td>${category}</td>
	<td>
		<nav>
			<a href="#" class="editRow" data-task-id="{{= id }}">Editar</a>
			<a href="#" class="completedRow" data-task-id="{{= id }}">Completar</a>
			<a href="#" class="deleteRow" data-task-id="{{= id }}">Deletar</a>
		</nav>
	</td>
</tr>
</script>

<asset:javascript src="tasks-storage.js"/>

<script>
$(document).ready(function() {
		tasksController.init($('#taskPage'), function() {
			tasksController.loadTasks();
		});	
		//tasksController.init($('#taskPage'));
		//tasksController.loadTasks();
	});
</script>

</html>



