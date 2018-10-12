$(document).ready(function () {

    var x = 0;
    var s = "";

    console.log("hello");



    var theForm = $("#theForm"); // document.getElementById("theForm");
    theForm.hide(); //.hidden = true;

    var button = $("#buyButton");
    //button.addEventListener("click", function () {
    button.on("click", function () {
        console.log("Buying Item");
    });

    var productInfo = $(".product-props li"); //document.getElementsByClassName("product-props");
    productInfo.on("click", function myfunction() {
        console.log("You clicked on " + $(this).text());
    });

    var $loginToggle = $("#loginToggle");
    var $popupForm = $(".popup-form");

    $loginToggle.on("click", function () {
        $popupForm.fadeToggle(1000);
    });

});
