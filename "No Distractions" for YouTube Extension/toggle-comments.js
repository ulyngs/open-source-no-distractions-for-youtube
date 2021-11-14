let comments = undefined;

// Wait for page to fully load
document.addEventListener("yt-page-data-updated", function(event) {
    if (!comments) {
        comments = document.querySelector("#comments");
        
        buttonToInsert = ' <button id="toggleComments" type="button">Load comments</button>'
        comments.insertAdjacentHTML('beforebegin', buttonToInsert);

        comments.style.display = "none";

        document.getElementById("toggleComments").addEventListener("click", function(){
            if (comments.style.display === "none") {
                comments.style.display = "block";
                document.getElementById('toggleComments').innerHTML= "Hide comments";
            } else {
                comments.style.display = "none";
                document.getElementById('toggleComments').innerHTML= "Show comments";
            }
        });
    }
});
