document.addEventListener('DOMContentLoaded', () => {
    const startQuizButton = document.getElementById('startQuiz');
    const retryQuizButton = document.getElementById('retryQuiz');

    if (startQuizButton) {
        startQuizButton.addEventListener('click', () => {
            window.location.href = 'quiz.html';
        });
    }

    if (retryQuizButton) {
        retryQuizButton.addEventListener('click', () => {
            window.location.href = 'quiz.html';
        });
    }

    // Results page
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');

    if (scoreElement && messageElement) {
        const score = localStorage.getItem('quizScore');
        const totalQuestions = localStorage.getItem('totalQuestions');

        if (score !== null && totalQuestions !== null) {
            scoreElement.textContent = `${score}/${totalQuestions}`;
            const percentage = (score / totalQuestions) * 100;

            if (percentage >= 80) {
                messageElement.textContent = "Excellent job! You're a quiz master!";
            } else if (percentage >= 60) {
                messageElement.textContent = "Good work! Keep it up!";
            } else {
                messageElement.textContent = "Nice try! There's room for improvement.";
            }
        }
    }
});

