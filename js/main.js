const screenWidth = window.innerWidth, screenHeight = window.innerHeight;
var clickedItemCss;

var cardInfo = [
    {
        name: "Dr Example",
        image: "/assets/images/doctor-2.webp",
        position: "Specialties"
    },
    {
        name: "Kamado Tanjiro",
        image: "/assets/images/Tanjiro_Kamado.jpg",
        position: "Demon Slayer"
    },
    {
        name: "Uzumaki Naruto",
        image: "/assets/images/Nprofile2.jpg",
        position: "Hokage"
    },
    {
        name: "Bruce Wayne",
        image: "/assets/images/2feaa346bd96e29c20ccacf92acd7f16.jpg",
        position: "Batman"
    },
    {
        name: "Son Goku",
        image: "/assets/images/goku.jpg",
        position: "Dragonball Collector"
    },
    {
        name: "Kermit the Frog",
        image: "/assets/images/MV5BMTY5MDc0ODkyNV5BMl5BanBnXkFtZTcwODI4ODg3Ng@@._V1_.jpg",
        position: "Comedian"
    },
    {
        name: "Johnny Sins",
        image: "/assets/images/johnny.jpg",
        position: "Gynaecologist (O&G)"
    },
    {
        name: "Fujiwara Takumi",
        image: "/assets/images/initiald.webp",
        position: "Tofu Delivery Guy"
    },
    {
        name: "Donald Trump",
        image: "/assets/images/107051047-16508976492022-04-24t003111z_435393104_rc2btt9ztuel_rtrmadp_0_usa-election-trump.jpeg",
        position: "American"
    },
]

$(() => {
    $(".item-container .message-item").each(function () {
        $(this).attr("data-ori-width", $(this).find("img").width());
        $(this).parent().css({
            "width": `${$(this).find("img").width()}`,
            "height": `${$(this).find("img").height()}`
        });
    });

    $(".item-container .message-item").click(function () {
        centerElement($(this));
    })
})

const centerElement = (el) => {
    const screenWidth = $(window).width();
    const screenHeight = $(window).height();

    const elementWidth = $(el).width();
    const elementHeight = $(el).height();

    console.log(elementWidth, elementHeight);

    const calculatedMemoSize = calMemoSize({
        w: elementWidth,
        h: elementHeight
    });

    const translateX = (screenWidth - calculatedMemoSize.w) / 2 - $(el).offset().left;
    const translateY = (screenHeight - calculatedMemoSize.h) / 2 - $(el).offset().top;

    if ($(el).hasClass("active")) {
        $(el).css({
            "transform": "unset",
            "width": `${$(el).attr("data-ori-width")}px`,
            "height": "auto"
        })
    }
    else {
        $(el).css({
            "transform": `translate(${translateX}px, ${translateY}px)`,
            "width": `${calculatedMemoSize.w}px`,
            "height": `auto`
        })
    }

    el.toggleClass('active');
}

const calMemoSize = (elSize) => {

    var memoSize = getMaxMemoSize();

    console.log("Memo Size: ", memoSize);

    return {
        w: memoSize * elSize.h / elSize.w,
        h: memoSize * elSize.w / elSize.h
    }
}

const getMaxMemoSize = () => {
    var valueToFollow = screenHeight; // default landscape

    screenWidth < screenHeight && (valueToFollow = screenWidth); // then check portrait

    console.log("ValueToFollow: ", valueToFollow);

    const viewPortConditions = [
        { // max is 1920 x 1080
            condition: valueToFollow > 1080,
            value: 700
        },
        {
            condition: valueToFollow > 768 && valueToFollow <= 1080,
            value: 700
        },
        {
            condition: valueToFollow > 600 && valueToFollow <= 768,
            value: 400
        },
        { // default value
            condition: true,
            value: valueToFollow - 50
        }
    ];

    // Find the first condition that evaluates to true and assign the corresponding value
    return viewPortConditions.find(({ condition }) => condition).value;
}

// $(document).ready(function () {
//     $('#click-me').click(function () {
//         var curB = $(this);
//         var dis = $(this).next('#show-me')
//         if ($(dis).is(':hidden')) {
//             $(dis).fadeIn();
//             // $(this).hide();
//         }
//         else
//         {
//             $(dis).fadeOut();
//         }
//     })
// })

var swiper = new Swiper(".mySwiper", {

    //parameters
    slidesPerView: 1,
    loop: false,
    spaceBetween: 30,
    //autoHeight:true, // adjust container height to tallest slide

    breakpoints: {
        1200: {
            slidesPerView: 2.5,
        },
        425: {
            slidesPerView: 1.5,
        },
    },


    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    }
})


$(document).ready(function () {
    var selectedHspt = "";
    var selectedSpclt = "";
    var HsptListCnt = $('.card-listing').children('.card-listing-card').length;
    var filterUsed = false;
    var mdlIdx;
    var selctedName = "";

    // var filterLoopCnt = 0;
    // for (i = 0; i < HsptListCnt; i++) {
    //     if ($(".card-listing .card-listing-card:eq(" + i + ")").css("display") != "none") {
    //         filterLoopCnt += 1
    //     }
    // }

    $(".checkModal2").on('click', function () {
        dcs = $(this).closest('.doc-card-sec');
        dc = dcs.find('.doc-card');
        mdlIdx = dc.index($(this).parent('.doc-card'));
        // mdlIdx = $(this).parent(".doc-card").index();
        console.log(mdlIdx);

        $('#demoModal2 .card-info .mdl-img').attr("src", cardInfo[mdlIdx].image);
        $('#demoModal2 .card-info .card-info-desc .card-name').text(cardInfo[mdlIdx].name);
        $('#demoModal2 .card-info .card-info-desc .card-pos').text(cardInfo[mdlIdx].position);
    })

    //name
    $('#doctor-name').on('change',function(){
        selctedName = $('#doctor-name option:selected').text();
        console.log(selctedName);

        for(i=0;i<HsptListCnt;i++){
            tempN = $(".card-listing .card-listing-card:eq("+i+") .clc-desc-name").text();

            if(selctedName != tempN){
                $(".card-listing .card-listing-card:eq("+i+")").hide()
                $(".card-listing .card-listing-card:eq("+i+")").addClass('hide-card');
                $(".card-listing .card-listing-card:eq("+i+")").removeClass('show-card');
            }
            else{
                $(".card-listing .card-listing-card:eq("+i+")").show()
                console.log(i + " show " + selctedName);
            }
        }
    })

    //hospital
    $("#hospital").on('change', function () {
        selectedHspt = $("#hospital option:selected").text();
        console.log(selectedHspt);

        if (selectedSpclt == "") {
            for (i = 0; i < HsptListCnt; i++) {

                temp = $(".card-listing .card-listing-card:eq(" + i + ") .clc-desc-hspt").text().split("\n");
                tempHspt1 = temp[0];

                if (selectedHspt != tempHspt1) {
                    $(".card-listing .card-listing-card:eq(" + i + ")").hide();
                    $(".card-listing .card-listing-card:eq(" + i + ")").addClass('hide-card');
                    $(".card-listing .card-listing-card:eq(" + i + ")").removeClass('show-card');
                }
                else {
                    $(".card-listing .card-listing-card:eq(" + i + ")").show();
                    console.log(i + " show");
                }
            }
        }
        else {

            console.log('selectedHspt = ' + selectedHspt);
            console.log('selectedSpclt = ' + selectedSpclt);
            selectedSpclt = $("#specialties option:selected").text();

            for (i = 0; i < HsptListCnt; i++) {

                if (selectedHspt == tempHspt1 && selectedSpclt == tempSpclt1) {
                    $(".card-listing .card-listing-card:eq(" + i + ")").show();
                    console.log(i + " show");
                }
                else {
                    $(".card-listing .card-listing-card:eq(" + i + ")").hide();
                }
            }
        }
    })

    //specialties
    $("#specialties").on('change', function () {
        selectedSpclt = $("#specialties option:selected").text();
        console.log(selectedSpclt);
        if (selectedHspt == "") {

            for (i = 0; i < HsptListCnt; i++) {

                tempSpclt1 = $(".card-listing .card-listing-card:eq(" + i + ") .clc-desc-spclt").text();
                console.log(i + tempSpclt1);

                if (selectedSpclt != tempSpclt1) {
                    $(".card-listing .card-listing-card:eq(" + i + ")").hide();
                    $(".card-listing .card-listing-card:eq(" + i + ")").addClass('hide-card');
                    $(".card-listing .card-listing-card:eq(" + i + ")").removeClass('show-card');
                    console.log(i + " hide");
                }
                else {
                    $(".card-listing .card-listing-card:eq(" + i + ")").show();
                    console.log(i + " show");
                }
            }
        }
        else {
            console.log('selectedHspt = ' + selectedHspt);
            console.log('selectedSpclt = ' + selectedSpclt);
            for (i = 0; i < HsptListCnt; i++) {
                temp = $(".card-listing .card-listing-card:eq(" + i + ") .clc-desc-hspt").text().split("\n");
                tempHspt1 = temp[0];
                tempSpclt1 = $(".card-listing .card-listing-card:eq(" + i + ") .clc-desc-spclt").text();

                if (selectedHspt == tempHspt1 && selectedSpclt == tempSpclt1) {
                    $(".card-listing .card-listing-card:eq(" + i + ")").show();
                    console.log(i + " show");
                }
                else {
                    $(".card-listing .card-listing-card:eq(" + i + ")").hide();
                }
            }
        }
    })
})

// filterLoopCnt=0;
// for (i = 0; i < HsptListCnt; i++) {
//     if ($(".card-listing .card-listing-card:eq(" + i + ")").css("display") != "none") {
//         filterLoopCnt += 1
//     }
// }
// console.log(filterLoopCnt);