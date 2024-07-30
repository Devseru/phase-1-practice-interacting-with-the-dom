document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.querySelector('.comments');

    let counter = 0;
    let timerInterval;
    let isPaused = false;
    const likes = {};

    function updateCounter() {
        counterElement.textContent = counter;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            if (!isPaused) {
                counter++;
                updateCounter();
            }
        }, 1000);
    }

    function togglePause() {
        if (isPaused) {
            isPaused = false;
            startTimer();
            pauseButton.textContent = 'Pause';
            minusButton.disabled = false;
            plusButton.disabled = false;
            heartButton.disabled = false;
            commentInput.disabled = false;
            commentForm.querySelector('button').disabled = false;
        } else {
            isPaused = true;
            clearInterval(timerInterval);
            pauseButton.textContent = 'Resume';
            minusButton.disabled = true;
            plusButton.disabled = true;
            heartButton.disabled = true;
            commentInput.disabled = true;
            commentForm.querySelector('button').disabled = true;
        }
    }

    function handleLike() {
        if (!likes[counter]) {
            likes[counter] = 0;
        }
        likes[counter]++;
        updateLikesList();
    }

    function updateLikesList() {
        likesList.innerHTML = ''; 
        Object.keys(likes).forEach(num => {
            const li = document.createElement('li');
            li.textContent = `${num} has been liked ${likes[num]} times`;
            likesList.appendChild(li);
        });
    }

    function handleComment(e) {
        e.preventDefault();
        const comment = commentInput.value;
        if (comment.trim() !== '') {
            const p = document.createElement('p');
            p.textContent = comment;
            commentsList.appendChild(p);
            commentInput.value = '';
        }
    }

    
    startTimer();

    
    minusButton.addEventListener('click', () => {
        if (!isPaused) {
            counter--;
            updateCounter();
        }
    });

    plusButton.addEventListener('click', () => {
        if (!isPaused) {
            counter++;
            updateCounter();
        }
    });

    heartButton.addEventListener('click', handleLike);
    pauseButton.addEventListener('click', togglePause);
    commentForm.addEventListener('submit', handleComment);
});
