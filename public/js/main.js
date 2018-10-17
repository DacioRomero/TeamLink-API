// public/js/main.js
var comments = document.getElementById("comments")
var commentModal = document.getElementById("commentModal")
var commentForm = commentModal.querySelector("form");

var playerId = commentModal.getAttribute('data-player-id');

commentForm.reset();

comments.addEventListener('click', function (e) {
    var deleteButton = e.target.closest('.deleteComment') || e.target;

    if (deleteButton.classList.contains('deleteComment')) {
        var commentId = deleteButton.getAttribute("data-comment-id")

        axios.delete(`/api/players/${playerId}/comments/${commentId}`)
        .then(function (response) {
            document.getElementById(commentId).parentElement.remove();
        })
        .catch(console.error);
    }
}, false);

commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(e.target);
    var commentObject = {};

    formData.forEach(function (value, key) {
        commentObject[key] = value;
    });

    axios.post(`/api/players/${playerId}/comments`, commentObject)
    .then(function (response) {
        comment = response.data;
        // TODO: Replace with server side rendering?
        comments.innerHTML =
        `<div class="col-4">
            <a class="btn btn-warning deleteComment" data-comment-id="${comment._id}"><i class="fas fa-trash"></i></a>
            <div class="card" id="${comment._id}">
                <div class="card-body px-2">
                    <a href="/players/${comment.playerId}/comments/${comment._id}">
                        <h5 class="card-title">${comment.battletag}</h5>
                    </a>
                    <p class="card-text">${comment.content}</p>
                </div>
            </div>
        </div>
        ${comments.innerHTML}`;

        $(commentModal).modal('hide'); // jQuery required to close modal
        e.target.reset();
    })
    .catch(console.error);
});
