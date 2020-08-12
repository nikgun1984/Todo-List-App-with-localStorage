
const form = document.querySelector("#my-form"),
      textBox = document.querySelector('input[type="text"]'),
      ol = document.createElement('ol'),
      //get the data(objects) from localStorage and save it to list, if storage is empty create list
      data = JSON.parse(localStorage.getItem('ol')) || [];
//append ordered list
document.body.append(ol);
let id = 0;
// to populate the page with earlier todos
if(data.length){
    for(let i=0;i<data.length;i++){
        let item = data[i];
        id = +item.id;
        addItems(id,item.value,item.done,document.createElement('li'));
    }
}
//events that remove or cross todos
ol.addEventListener('click',function(e){
    let item = e.target.parentElement;
    if(e.target.classList.value==='done'){
        if(item.getAttribute('data-done')=="true"){
            item.classList.remove('line-thru');
            toggleTodo(false,item);
            e.target.innerText = "Done";
        }else{
            item.classList.add('line-thru');
            toggleTodo(true,item);
            e.target.innerText = "Undo";
        }
        localStorage.setItem('ol',JSON.stringify(data));
    } else if (e.target.classList.value==='remove'){
        item.remove();
        for(let i=0;i<data.length;i++){
            if(data[i].id ===item.getAttribute('data-id')){
                data.splice(i,1);
            }
        }
        localStorage.setItem('ol',JSON.stringify(data));
    }
});
//submit new todo
form.addEventListener('submit',function(e){
    e.preventDefault();
    id++;
    createDo(id,textBox.value,false,document.createElement('li'));
});
// add a new/ previous todo to the page
function addItems(id,value,complete,li){
    const done = document.createElement('button');
    const remove = document.createElement('button');
    done.classList.add('done');
    remove.classList.add('remove');
    li.setAttribute('data-id', id);
    li.setAttribute('data-value', value);
    li.setAttribute('data-done', complete);
    li.innerHTML = `<span>${value}</span>`;
    done.innerText = "Done";
    remove.innerText = "Remove";
    if(li.getAttribute('data-done')=="true"){
        li.classList.add('line-thru');
        done.innerText = "Undo";
    }
    li.append(done,remove);
    ol.appendChild(li);
}
//add items to our list of objects and update our localStorage
function createDo(id,value,complete,li){
    addItems(id,value,complete,li);
    data.push(li.dataset);
    localStorage.setItem("ol",JSON.stringify(data));
    form.reset();
}
//toggle between crossing todo vs undo crossing todo item
function toggleTodo(bool, item){
    item.setAttribute('data-done',bool);
    for(let i=0;i<data.length;i++){
        if(data[i].id ===item.getAttribute('data-id')){
            data[i].done = bool;
        }
    }
}


