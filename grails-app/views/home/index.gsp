<html>
<head>
<meta name="layout" content="main">
</head>
<body>
<main id="taskPage">
		<section id="taskCreation" class="not">
			<form id="taskForm">
				<input type="hidden" name="id" />
				<!-- Ponto 4: Adicionei esse atributo para entrar na serialização do objeto -->
				<input type="hidden" name="completed"/>
				<div>
					<label>Tarefa</label> 
					<input type="text" required="required" name="task" class="large" placeholder="Estudar e programar" maxlength="200" />
				</div>
				<div>
					<label>Finalizar até</label> <input type="date" required="required" name="requiredBy" />
				</div>
				<div>
					<label>Categoria</label> 
					<select name="category">
						<option value="Pessoal">Pessoal</option>
						<option value="Profissional">Profissional</option>
					</select>
				</div>
				<nav>
					<a href="#" id="saveTask">Salvar tarefa</a> <a href="#" id="clearTask">Limpar tarefa</a>
				</nav>
			</form>
		</section>
		<section>
			<table id="tblTasks">
				<colgroup>
					<col width="40%">
					<col width="15%">
					<col width="15%">
					<col width="30%">
				</colgroup>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Deadline</th>
						<th>Categoria</th>
						<th>Ações</th>						
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
			<nav>
				<a href="#" id="btnAddTask">Adicionar tarefa</a>
			</nav>
		</section>
	</main>
	</body>
	</html>