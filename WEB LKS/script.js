let comments = JSON.parse(localStorage.getItem('comments')) || [];
let commentId = comments.length ? comments[comments.length - 1].id + 1 : 0;
let username = localStorage.getItem('username');

if (!username) {
    window.location.href = 'login.html';
}

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('username');
    window.location.href = 'login.html';
});

function renderComments() {
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.id = `comment-${comment.id}`;

        const commentContent = document.createElement('p');
        commentContent.textContent = comment.content;

        const usernameDisplay = document.createElement('strong');
        usernameDisplay.textContent = `Oleh : ${comment.username}`;

        const commentActions = document.createElement('div');
        commentActions.className = 'comment-actions';

        const likeBtn = document.createElement('button');
        likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        const likeCount = document.createElement('span');
        likeCount.textContent = comment.likes;
        likeBtn.appendChild(likeCount);
        likeBtn.onclick = () => likeComment(comment.id);

        const dislikeBtn = document.createElement('button');
        dislikeBtn.innerHTML = '<i class="fas fa-thumbs-down"></i>';
        const dislikeCount = document.createElement('span');
        dislikeCount.textContent = comment.dislikes;
        dislikeBtn.appendChild(dislikeCount);
        dislikeBtn.onclick = () => dislikeComment(comment.id);

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => editComment(comment.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.onclick = () => deleteComment(comment.id);

        if (comment.username !== username) {
            deleteBtn.disabled = true;
            editBtn.disabled = true;
        }

        commentActions.appendChild(likeBtn);
        commentActions.appendChild(dislikeBtn);
        commentActions.appendChild(editBtn);
        commentActions.appendChild(deleteBtn);

        commentItem.appendChild(usernameDisplay);
        commentItem.appendChild(commentContent);
        commentItem.appendChild(commentActions);
        commentList.appendChild(commentItem);
    });
}

function addComment() {
    const commentText = document.getElementById('comment-input').value.trim();
    if (!commentText) {
        alert('Komentar tidak boleh kosong!');
        return;
    }

    const newComment = {
        id: commentId++,
        username: username,
        content: commentText,
        likes: 0,
        dislikes: 0,
    };

    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
    document.getElementById('comment-input').value = '';
    renderComments();
}

function likeComment(id) {
    const comment = comments.find(c => c.id === id);
    if (comment) {
        comment.likes = comment.likes === 0 ? 1 : 0;
        comment.dislikes = 0;
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    }
}

function dislikeComment(id) {
    const comment = comments.find(c => c.id === id);
    if (comment) {
        comment.dislikes = comment.dislikes === 0 ? 1 : 0;
        comment.likes = 0;
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    }
}

function editComment(id) {
    const comment = comments.find(c => c.id === id);
    if (comment) {
        const newContent = prompt("Edit komentar Anda:", comment.content);
        if (newContent !== null && newContent.trim() !== '') {
            comment.content = newContent.trim();
            localStorage.setItem('comments', JSON.stringify(comments));
            renderComments();
        }
    }
}

function deleteComment(id) {
    const comment = comments.find(c => c.id === id);
    if (comment && comment.username === username) {
        if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
            comments = comments.filter(c => c.id !== id);
            localStorage.setItem('comments', JSON.stringify(comments));
            renderComments();
        }
    } else {
        alert("Anda tidak bisa menghapus komentar orang lain!");
    }
}

document.addEventListener('DOMContentLoaded', renderComments);
