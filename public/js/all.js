function addUser(){

	window.location.href = '/customers/add';
}
function cancelAdd(){

    window.location.href = '/customers';
}

function allblocks(){

    window.location.href = '/allblocks';
}

var t1 = true;
function openNav() {

    if (t1) {
        document.getElementById("mySidenav").style.width = "200px";
        document.getElementById("header").style.marginLeft = "200px";
        document.getElementById("header").style.width = "87%";
        document.getElementById("datatable").style.marginLeft = "200px";
      //  document.getElementById("logo").style.paddingRight = "200px";
        t1 = false;
    }
    else
    {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("header").style.marginLeft = "0";
        document.getElementById("datatable").style.marginLeft = "0";
        document.getElementById("logo").style.paddingRight= "5px";
        document.getElementById("header").style.width = "99%";
        t1 = true;
    }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("header").style.marginLeft = "0";
    document.getElementById("datatable").style.marginLeft = "0";
    document.getElementById("logo").style.paddingRight= "0";
}

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});

/*

function blocksclick() {
    alert("123")
    document.getElementById("4").set= "";
    document.getElementById("1").style.backgroundColor =  "#FFA500";
    document.getElementById("2").style.backgroundColor = "";
    document.getElementById("3").style.backgroundColor = "";
    document.getElementById("4").style.backgroundColor= "";
}

function processingclick() {
    document.getElementById("1").style.backgroundColor =  "";
    document.getElementById("2").style.backgroundColor = "";
    document.getElementById("3").style.backgroundColor = "#FFA500 !important";
    document.getElementById("4").style.backgroundColor= "";
}
function chequesclick() {
    document.getElementById("1").style.backgroundColor =  "";
    document.getElementById("2").style.backgroundColor = "";
    document.getElementById("3").style.backgroundColor = "#FFA500 !important";
    document.getElementById("4").style.backgroundColor= "";
}
function transectionsclick() {
    document.getElementById("1").style.backgroundColor =  "";
    document.getElementById("2").style.backgroundColor = "";
    document.getElementById("3").style.backgroundColor = "";
    document.getElementById("4").style.backgroundColor= "#FFA500 !important";
}
*/
