const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
inputBox.onkeyup = () =>{
  let userData = inputBox.value;//перенос значения из value input в переменную
  if(userData.trim() != 0){//проверка на пробелы в строке
    addBtn.classList.add('active');//добавление класса active
  }else{
    addBtn.classList.remove('active');//удаление класса active
  }
}
showTasks()
addBtn.onclick = () => {
  let userData = inputBox.value;//перенос значения из value input в переменную
  let getLocalStorage = localStorage.getItem("New Todo");//получение данных из localstorage, но так как мы пытаемся воспользоваться не сущ. ключом, то он его просто создаёт, а так как в новом ключе нет значений, то он просто передаёт в getLocalStorage = null
  if(getLocalStorage == null){//если localStorage = null
    listArr = [];//если localStorage = null то создать пустой массив
  }else{
    listArr = JSON.parse(getLocalStorage);//иначе конвертация json в js object
  }
  listArr.push(userData);//добавить в массив данные из input.value
  localStorage.setItem("New Todo", JSON.stringify(listArr));//добавление в localstorage ключа:значение(New Todo: преобразованного масива с inputvalue в JSON)
  showTasks();
  addBtn.classList.remove('active')
}

function showTasks(){
  let getLocalStorage = localStorage.getItem("New Todo");
  if(getLocalStorage == null){
    listArr = [];
  }else{
    listArr = JSON.parse(getLocalStorage);
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length;
  if(listArr.length > 0){
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = '';
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index});"><i class="fas fa-times"></i></span></li>`
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

deleteAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}
