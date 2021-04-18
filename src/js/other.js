


//page
function turnPage(page){
    var totalPage = $("#totalPage").val();
    if(page>totalPage){
        page = totalPage;
    }
    if(page<1){
        page = 1;
    }
    $("#page").val(page);
    loadDate();
}

function prePage() {
    var page = $("#page").val();
    turnPage(parseInt(page)-1);
}

function nextPage(){
    var page = $("#page").val();
    turnPage(parseInt(page)+1);
}