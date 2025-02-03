const inputTitle = document.querySelector('.input-title');
const inputContent = document.querySelector('.input-content');
const addTasks = document.querySelector('.add-task-btn');
const taskTitle = document.querySelector('.title');
const taskContent = document.querySelector('.description');
const taskId = document.querySelector('.task-id');
// console.log(inputTitle)
// console.log(inputContent)
// console.log(addTasks)
// console.log(taskTitle)
// console.log(taskContent)
// console.log(taskId)
// console.log(removeBtn)




const getInputValue = async (e) => {
    if (inputTitle) {  
        const inputValue = inputTitle.value;
        if(!inputValue){
            alert("Please enter both values before trying to add anything");
            
        }
        console.log(inputValue);
    } else {
        console.error("Element with class 'input-title' not found!");
    }
};
function getEvents (){
    getInputValue();
   getInputContent()
;}

if (addTasks) {
    addTasks.addEventListener('click', getEvents);
} else {
    console.error("Element with class 'add-task-btn' not found!");
}


const getInputContent =  () =>{
    if(inputContent){
        const inputContentValue = inputContent.value
        if(!inputContentValue){
            alert("Please enter both values before trying to add anything");
            
        }
        console.log(inputContentValue)
    }
}


const removeBtns = document.querySelectorAll('.btn-container'); 

const removeTaskItems = (e) => {
    const removeTaskBtn = e.target; 
    if (removeTaskBtn.parentElement && removeTaskBtn.parentElement.parentElement.parentElement) {
        removeTaskBtn.parentElement.parentElement.parentElement.remove();
    }
};

removeBtns.forEach((btn) => {
    btn.addEventListener('click', removeTaskItems);
});

    