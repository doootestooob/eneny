document.addEventListener('DOMContentLoaded', function () {
    var slideDownButton = document.querySelector('.slide-down');
    var newBlockElement = document.querySelector('.new-block');

    slideDownButton.addEventListener('click', function () {
        window.scrollTo(0, 800)
    });
});


/* */
let sidebarbtn = document.getElementById('sidebarbtn')
let hideside = document.querySelector('.hideside')
let sidebars = document.querySelector('.sidebars')
var sidebarsID = document.getElementById('sidebarsID')
let scrolladmin = document.querySelector('.scrolladmin')
var loginhidesidebtn = document.getElementById('loginhideside')
var signuphidesidebtn = document.getElementById('signuphideside')

sidebarbtn.addEventListener('click', function (e) {
    hideside.classList.toggle('active')
    sidebars.classList.toggle('active')
    scrolladmin.classList.toggle('active')
    document.getElementById().style.overflow = 'hidden'

})

hideside.addEventListener('click', () => {
    hideside.classList.toggle('active')
    sidebars.classList.toggle('active')
    scrolladmin.classList.toggle('active')
    body.style.overflowY = 'scroll'
})

/* */
function scrollhome() {
    window.scrollTo(0, 0)
}

function scrollmeal() {
    window.scrollTo(0, 800)

}

function scrollforever() {
    window.scrollTo(0, 1950)
}

function scrollus() {
    window.scrollTo(0, 4800)
}


/*切換圖片*/


var nextbtn = document.getElementById("nextbtn");
var prevbtn = document.getElementById("prevbtn");
var containerimgs = document.getElementById("conteinerimgs");

    nextbtn.addEventListener('click', function () {
        containerimgs.scrollLeft += 500;
       
    })
    prevbtn.addEventListener('click', function () {
        containerimgs.scrollLeft -= 500;
    }
    )









   







