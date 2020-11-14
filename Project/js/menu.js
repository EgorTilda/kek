let profile = null;

function m1(){
    alert("gfhfjkjfgdsaewq");
    $('.registr-screen').hide();
        $(".first-screen").show();
        $("#new-claim").addClass("active");
}
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

    $('#b_vxod').click( () => {
        $('.top-panel').removeClass('hide');
        $('.bottom-panel').removeClass('hide');
    });

    $("#profile").click( () => {
        hideAllScreens();
        $(".profile-screen").show();
        $("#profile").addClass("active");
        $("#prevbutton").hide();
        if(!profile) {
            //вешает спиннер
            axios.post("https://api-waste.hhos.ru/kek/", JSON.stringify({ type: 'get_profile', token: $.cookie('token'), user_id: $.cookie('user_id')}))
            .then(response => {
                //убираем спиннер
                profile = JSON.parse(response.data.response);
                $('.user_name').text(profile.first_name + profile.last_name);
                $('.user_symbol').text(profile.first_name[1]);
                $('.phone_text').text(profile.phone);
                $('.mail_text').text(profile.mail);
            })
        }
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

