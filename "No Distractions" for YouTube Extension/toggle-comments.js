/* Cookie functionality by https://www.w3schools.com/js/js_cookies.asp */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let comments = undefined;
let originalStyle = undefined;

// Wait for page to fully load
document.addEventListener("yt-page-data-updated", function(event) {
    if (!comments) {
        comments = document.querySelector("#comments");
        originalStyle = comments.style.display;
        comments.insertAdjacentHTML('beforebegin', ' <button id="toggleComments" type="button">Toggle comments</button>');

        if (getCookie("comments-hidden") == 1) {
            comments.style.display = "none";
        }

        document.getElementById("toggleComments").addEventListener("click", function(){
            if (comments.style.display === "none") {
                comments.style.display = originalStyle;
                setCookie('comments-hidden', 0, 365);
            } else {
                comments.style.display = "none";
                setCookie('comments-hidden', 1, 365);
            }
        });
    }

 

});
