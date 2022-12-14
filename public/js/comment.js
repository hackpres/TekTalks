async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('input[name="comment"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id: parseInt(post_id)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.getElementById('#comment-form').style.display = "block";
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);