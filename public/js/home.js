

// -----------------    MUGHIR 1ST SLIDER--------------------


// ---------------------  MUGHAIR 2ND SLIDER        ----------------
var swiper = new Swiper(".swiper-container", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    centerSlide: true,
    fade: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    speed: 1000,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 3,
        },
        950: {
            slidesPerView: 5,
        },
    },
});


        // ---------------------------------    BOXES   --------------------------------------------

        const box1 = document.getElementById('H1');

        // 👇️ Change text color on mouseover
        box1.addEventListener('mouseover', function handleMouseOver() {
            box1.style.color = 'red';
            document.getElementById('W1').style.color = 'white';
            document.getElementById('K1').style.color = 'white';
            document.getElementById('ICONG1').style.color = 'white';
        });

        // 👇️ Change text color back on mouseout
        box1.addEventListener('mouseout', function handleMouseOut() {
            box1.style.color = 'black';
            document.getElementById('W1').style.color = 'black'
            document.getElementById('K1').style.color = 'BLACK';
            document.getElementById('ICONG1').style.color = 'black';
        });


        // ---------------------------------------------------------------

        const box2 = document.getElementById('H2');

        // 👇️ Change text color on mouseover
        box2.addEventListener('mouseover', function handleMouseOver() {
            box2.style.color = 'red';
            document.getElementById('W2').style.color = 'white';
            document.getElementById('K2').style.color = 'white';
            document.getElementById('ICONG2').style.color = 'white';
        });

        // 👇️ Change text color back on mouseout
        box2.addEventListener('mouseout', function handleMouseOut() {
            box2.style.color = 'black';
            document.getElementById('W2').style.color = 'black'
            document.getElementById('K2').style.color = 'BLACK';
            document.getElementById('ICONG2').style.color = 'black';
        });

        // --------------------------------------------
        const box3 = document.getElementById('H3');

        // 👇️ Change text color on mouseover
        box3.addEventListener('mouseover', function handleMouseOver() {
            //   box3.style.border = '1px grey';
            document.getElementById('W3').style.color = 'white';
            document.getElementById('K3').style.color = 'white';
            document.getElementById('ICONG3').style.color = 'white';



        });

        // 👇️ Change text color back on mouseout
        box3.addEventListener('mouseout', function handleMouseOut() {
            // box3.style.border = '1px solid black';
            document.getElementById('W3').style.color = 'black'
            document.getElementById('K3').style.color = 'BLACK';
            document.getElementById('ICONG3').style.color = 'black';
        });

        // ---------------------------------    4------------------------------
        const box4 = document.getElementById('H4');

        // 👇️ Change text color on mouseover
        box4.addEventListener('mouseover', function handleMouseOver() {
            box4.style.color = 'red';
            document.getElementById('W4').style.color = 'white';
            document.getElementById('K4').style.color = 'white';
            document.getElementById('ICONG4').style.color = 'white';
        });

        // 👇️ Change text color back on mouseout
        box4.addEventListener('mouseout', function handleMouseOut() {
            box4.style.color = 'black';
            document.getElementById('W4').style.color = 'black'
            document.getElementById('K4').style.color = 'BLACK';
            document.getElementById('ICONG4').style.color = 'black';
        });

        //---------------------------------   5  ----------------
        const box5 = document.getElementById('H5');

        // 👇️ Change text color on mouseover
        box5.addEventListener('mouseover', function handleMouseOver() {
            box5.style.color = 'red';
            document.getElementById('W5').style.color = 'white';
            document.getElementById('K5').style.color = 'white';
            document.getElementById('ICONG5').style.color = 'white';
        });

        // 👇️ Change text color back on mouseout
        box5.addEventListener('mouseout', function handleMouseOut() {
            box5.style.color = 'black';
            document.getElementById('W5').style.color = 'black'
            document.getElementById('K5').style.color = 'BLACK';
            document.getElementById('ICONG5').style.color = 'black';
        });

        //--------------------------    6   --------------------
        const box6 = document.getElementById('H6');

        // 👇️ Change text color on mouseover
        box6.addEventListener('mouseover', function handleMouseOver() {
            box6.style.color = 'red';
            document.getElementById('W6').style.color = 'white';
            document.getElementById('K6').style.color = 'white';
            document.getElementById('ICONG6').style.color = 'white';
        });

        // 👇️ Change text color back on mouseout
        box6.addEventListener('mouseout', function handleMouseOut() {
            box6.style.color = 'black';
            document.getElementById('W6').style.color = 'black'
            document.getElementById('K6').style.color = 'BLACK';
            document.getElementById('ICONG6').style.color = 'black';
        });