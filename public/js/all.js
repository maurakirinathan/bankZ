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
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("header").style.marginLeft = "300px";
        document.getElementById("datatable").style.marginLeft = "300px";
        document.getElementById("logo").style.paddingRight = "300px";
        t1 = false;
    }
    else
    {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("header").style.marginLeft = "0";
        document.getElementById("datatable").style.marginLeft = "0";
        document.getElementById("logo").style.paddingRight= "0";
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
