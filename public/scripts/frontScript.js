var searchInput = document.getElementById('search-input');
var clearButton = document.querySelector('#search-clear')
// Search bar clear input
searchInput.addEventListener('keypress', clearInput);
// clear input function
function clearInput(e){
    if(e.type = "keypress"){
        var input  = searchInput.value;
        if(input != ''){
            clearButton.style.display = 'block';
        } else{
            clearButton.style.display = 'none';
        }
    }
}

clearButton.addEventListener("click", function(){
    searchInput.value = '';
    clearButton.style.display = 'none'
})
   

// if(searchInput.value != ""){
//     document.querySelector('#search-clear').style.display = "block";
//     document.querySelector('#search-clear').addEventListener('click', function(){
//         searchInput == " ";
//     })
// } else{
//     document.querySelector('#search-clear').style.display = "none";
// }

