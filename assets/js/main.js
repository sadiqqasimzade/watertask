window.onscroll = function () {

    if (document.documentElement.scrollTop > 100) {
        document.getElementById("nav").style.backgroundColor = "white";
        document.querySelectorAll('.navt').forEach(text=>{
            text.style.color="#131129"
        })
    } else {
        document.getElementById("nav").style.backgroundColor = "transparent";
        document.querySelectorAll('.navt').forEach(text=>{
            text.style.color="white"
        })
    }
}
    