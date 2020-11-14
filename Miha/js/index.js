
let latOfAccident;
let lngOfAccident;
let autocomplete;
let object_data = {
    autoN: 5,
    email: 5,
    pos: {

    },

};

function initMap() {
    // The location of Uluru
    const uluru = { lat: 54.7, lng: 39.7 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    var request = {
        query: 'Museum of Contemporary Art Australia',
        fields: ['geometry', 'name', 'formatted_address'],
    };

    var service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        /*  draggable:true,
          droppable:true,*/
    });
    map.addListener('click', function (event) {
        map.setCenter(event.latLng);
        marker.setPosition(event.latLng);
        latOfAccident = event.latLng.lat;
        lngOfAccident = event.latLng.lng;
        map.setZoom(15);
        $("#placeMe").removeClass("checked");

    });
    /*
    marker.addListener("dragend",function(e){
        map.setCenter(e.latLng);
    marker.setPosition(e.latLng);
    latOfAccident=e.latLng.lat;
    lngOfAccident=e.latLng.lng;
    });*/
    //TODO Продумать интерфейс покрасивее
    function createMarker(place) {
        const marker1 = new google.maps.Marker({
            map,
            position: place.geometry.location,
        });
        google.maps.event.addListener(marker1, "click", () => {
            infowindow.setContent(place.name);
            infowindow.open(map);
        });
    }

    let placeMe = document.getElementById("placeMe");
    google.maps.event.addDomListener(placeMe, 'click', function () {

        function success(position) {
            let latitude;
            let longitude;
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            map.setCenter(new google.maps.LatLng(latitude, longitude));
            marker.setPosition(new google.maps.LatLng(latitude, longitude));
            map.setZoom(15);
            latOfAccident = latitude;
            lngOfAccident = longitude;

        }
        let options = {
            enableHighAccuracy: true,

        };
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
        $("#placeMe").addClass("checked");
    });
}
$(document).ready(function () {
    
    $('#b_vxod').click(function(){
       // obj.first_name=$('#name2').val();
//obj.last_name=$('#sname2').val();
let obj={

}
obj.email=$('#email2').val();
obj.password=$('#password2').val();
//obj.phone=$('#phone2').val();
obj.request_type="signin";

axios.post("https://api-waste.hhos.ru/kek/", JSON.stringify({params:obj, type:"auth"}))
                .then(response => {
                console.log(response);
    
$.cookie('token', response.data.response.token);
$.cookie('user_id',response.data.response.user_id);


                })
                .catch(error => {
                console.log(error);
                })
    });
    $('#b_rega').click(function(){
        let obj={

        }
        obj.first_name=$('#name').val();
 obj.last_name=$('#sname').val();
 obj.email=$('#email').val();
 obj.password=$('#password').val();
 obj.phone=$('#phone').val();
 obj.request_type="signup";
 
 axios.post("https://api-waste.hhos.ru/kek/", JSON.stringify({params:obj, type:"auth"}))
                 .then(response => {
                 console.log(response);
     
 $.cookie('token', response.data.response);
 $.cookie('user_id',response.data.user_id);
 
 
                 })
                 .catch(error => {
                 console.log(error);
                 })
     });


    

    $(".registr-screen_header").on('click',function(){
        alert();
        $('.vxod').hide();
        $('.rega').hide();
       $(` .${$(this).attr('id')}`).show();

    });
    function addfiles(input) {


        if (input.files && input.files[0]) {
            var reader = new FileReader();
            let length = input.files.length;
            let i = 0;
            m();

            reader.onload = function (e) {

                $('.data_photo_container').append(`<div class="imgs" id="blan${i + 1}"> </div> `);
                $(".imgs:last").css('backgroundImage', `url(${e.target.result})`);
                i++;
                if (i < length) {
                    m();
                }



            }
            function m() {
                reader.readAsDataURL(input.files[i]);

            }




        }

    }
    $('#imgInp').on('change', function () {
        addfiles(this);
    });
    $("#data").validate({
        rules: {
            name: {
                required: true,

            },
            phone: {

                number: true,
                minlength: 10,
                maxlength: 11,
            },
            autoN: {
                required: true,
                minlength: 8,
                maxlength: 8,
            },
            email: {
                email: true,
                required: true,
            }


        },
        messages: {
            name: {
                required: "Введите ФИО",

            },
            phone: {

                number: "Введите корректный номер",
                minlength: "Введите корректный номер",
                maxlength: "Введите корректный номер",
            },
            autoN: {
                required: "Введите номер машины",
                minlength: 'Это некорректный номер',
                maxlength: 'Это некорректный номер',
            },
            email: {
                email: "Введите корректный  email",
                required: "Введите email",
            }


        }
    });
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return !(this.optional(element) || re.test(value));
        },
        "Введите корректный номер"
    );



    $(".next").on('click', function () {
        let is_Valid = true;
        let r=true;
        $("input:visible").each(function () {
            if($(this).parent().parent().hasClass('vxod')||$(this).parent().parent().hasClass('rega')){
                r=false;
            }
            else{
            if ($(this).attr('id') == "autoN") {
                $(this).rules("add", { regex: `/\w\d\d\d\w\w\d\d/i` });
            }
            is_Valid = $(this).valid();
        }

        });
        if (is_Valid&&r) {
            if ($(this).parent().hasClass('data_geo')) {


                object_data.type = 'Плохо стоит';
                object_data.autoN = $("#autoN").val();
                
                object_data.pos.lat = 39;
                object_data.pos.lng = 57;
                object_data.description = 'rrff';
                let formData = new FormData();
                console.log($('#imgInp').files);

                $('#imgInp').files.each(element => {
                formData.append("uploads",element );
                console.log(element);
                });
                axios.post("https://api-waste.hhos.ru/kek/?type=loadImages", formData)
                .then(res => {
                let s = JSON.stringify({ type: "new_request", params: object_data, photos: res.data.response });
                axios.post("https://api-waste.hhos.ru/kek/", s)
                .then(response => {
                console.log(response);
                })
                .catch(error => {
                console.log(error);
                })
                })
                





            }
            else {
                $(this).parent().hide();
                $(this).parent().next().show();

            }

        }
    });





});
function successfy(data) {


    let answer = {
        success: true || false,
        response: "OK" || error.id, msg,
    }

}

