$(document).ready(function(){
    $("#claims").click( () => {
        hideAllScreens();
        $(".claims-screen").show();
        $("#claims").addClass("active");
        $("#prevbutton").hide();
    });

    $("#new-claim").click( () => {
        hideAllScreens();
        $(".first-screen").show();
        $("#new-claim").addClass("active");
        $("#prevbutton").hide();
    });
    $("#prevbutton").click( () => {
        let x = $("[class^=data]:visible");
        alert('sgdft');
        $("[class^='data']:visible").hide();
        if(x.hasClass('data_photo')){
            $('.data-main').show();
        }
        else {
            x.prev().show();
        }
    });

    $("#profile").click( () => {
        hideAllScreens();
        $(".profile-screen").show();
        $("#profile").addClass("active");
        $("#prevbutton").hide();
    });

    const hideAllScreens = () => {
        $(".screen").hide();
        $(".menu_item").removeClass("active");
    };

    hideAllScreens();
    $('#add-claim').click( () => {
        hideAllScreens();
        $("#data").show();
        $("#prevbutton").show();
        $("#new-claim").addClass("active");
    });
    $('#goToClaims').click( () => {
        hideAllScreens();
        $(".claims-screen").show();
        $("#new-claim").removeClass("active");
        $("#claims").addClass("active");
    });
});