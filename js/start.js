// Get all DOM elements at the top
const addQuizButton = document.getElementById('addQuiz');
const quizList = document.querySelector('.quiz-list');
const emptyState = document.querySelector('.empty-state');
const difficultyInputs = document.querySelectorAll('.difficulty-input');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addQuestionBtn = document.getElementById('addQuestionBTN');
const addedQuestionsDiv = document.getElementById('addedQuestions');
const questionsContainer = document.getElementById('questionsContainer');
const addMoreBtn = document.getElementById('addMoreBtn');
const noQuizSelected = document.getElementById('noQuizSelected');
const quizEditSection = document.getElementById('quizEditSection');

// Add this variable to track the currently selected quiz
let currentQuizId = null;
let quizCount = 0;

// Configure Toastr
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-bottom-center",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "maxOpened": 3,          // Maximum number of toasts to show at once
    "newestOnTop": false,    // Show new toasts at the bottom
    "preventDuplicates": true, // Prevent duplicate messages
    "preventOpenDuplicates": true // Prevent duplicates from opening
};

// Optional: Clear all existing toasts before showing a new one
function showToast(type, message) {
    const currentToasts = document.querySelectorAll('#toast-container .toast');
    if (currentToasts.length >= 3) {
        toastr.clear(currentToasts[0]); // Remove the oldest toast
    }
    toastr[type](message);
}

// Load quizzes from Firebase when page loads
document.addEventListener('DOMContentLoaded', loadQuizzes);

async function loadQuizzes() {
    try {
        const snapshot = await db.collection('quizzes').get();
        
        if (!snapshot.empty) {
            emptyState.style.display = 'none';
            snapshot.forEach(doc => {
                createQuizElement(doc.data(), doc.id);
            });
            // Update quiz count
            quizCount = snapshot.size;
        }
    } catch (error) {
        console.error("Error loading quizzes:", error);
        showToast('error', 'Failed to load quizzes. Please refresh the page.');
    }
}

// Function to create a new quiz
async function createQuiz() {
    console.log('Creating quiz...');
    try {
        const quizData = {
            name: `Quiz #${quizCount + 1}`,
            questionsCount: 0,
            difficulty: 'easy', // Default difficulty
            progress: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            questions: []
        };

        console.log('Quiz data:', quizData);

        // Add to Firebase
        const docRef = await db.collection('quizzes').add(quizData);
        console.log('Added to Firebase with ID:', docRef.id);
        
        // Create UI element with the Firebase ID
        const quizElement = createQuizElement(quizData, docRef.id);
        
        // Increment counter
        quizCount++;
        
        // Hide empty state
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        // Automatically select the new quiz
        quizElement.click();

        // Show success notification
        showToast('success', 'Quiz created successfully!');

    } catch (error) {
        console.error("Error creating quiz:", error);
        console.error("Error details:", error.message);
        showToast('error', 'Failed to create quiz. Please try again.');
    }
}

// Function to add a question to a quiz
async function addQuestion() {
    if (!currentQuizId) {
        showToast('error', 'Please select a quiz first');
        return;
    }

    const questionGroups = questionsContainer.querySelectorAll('.question-group');
    const questions = [];
    let hasEmptyFields = false;

    questionGroups.forEach((group) => {
        const questionText = group.querySelector('.question-input').value.trim();
        const answerText = group.querySelector('.answer-input').value.trim();

        if (!questionText || !answerText) {
            hasEmptyFields = true;
            return;
        }

        questions.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            question: questionText,
            answer: answerText,
            createdAt: new Date().toISOString()
        });
    });

    if (hasEmptyFields) {
        showToast('error', 'Please fill in all questions and answers');
        return;
    }

    if (questions.length === 0) {
        showToast('error', 'Please add at least one question');
        return;
    }

    try {
        const quizRef = db.collection('quizzes').doc(currentQuizId);
        
        // Replace all questions instead of appending
        await quizRef.update({
            questions: questions,
            questionsCount: questions.length,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Update UI
        await loadQuestions(currentQuizId);
        updateQuestionCount(currentQuizId, questions.length);

        showToast('success', 'Questions saved successfully!');

    } catch (error) {
        console.error("Error saving questions:", error);
        showToast('error', 'Failed to save questions. Please try again.');
    }
}

// Function to update quiz display with new question
function updateQuizDisplay(quizId, questionData) {
    const quizElement = document.querySelector(`[data-quiz-id="${quizId}"]`);
    if (!quizElement) return;

    const addedQuestionsDiv = document.getElementById('addedQuestions');
    const questionElement = document.createElement('div');
    questionElement.className = 'slide';
    questionElement.innerHTML = `
        <p class="questionDisplay">${questionData.question}</p>
        <p class="answerDisplay">${questionData.answer}</p>
        <button class="disButton" onclick="deleteQuestion('${quizId}', '${questionData.id}')">Delete</button>
    `;

    addedQuestionsDiv.appendChild(questionElement);
    showSlide(addedQuestionsDiv.children.length - 1);
}

// Function to update question count in UI
function updateQuestionCount(quizId, count) {
    const quizElement = document.querySelector(`[data-quiz-id="${quizId}"]`);
    if (quizElement) {
        const questionsCountElement = quizElement.querySelector('.questions-count');
        questionsCountElement.textContent = `${count} Questions`;
    }
}

// Function to delete a question
async function deleteQuestion(quizId, questionId) {
    try {
        const quizRef = db.collection('quizzes').doc(quizId);
        const quizDoc = await quizRef.get();
        const quizData = quizDoc.data();

        const updatedQuestions = quizData.questions.filter(q => q.id !== questionId);
        
        await quizRef.update({
            questions: updatedQuestions,
            questionsCount: updatedQuestions.length
        });

        // Update UI
        loadQuestions(quizId);
        updateQuestionCount(quizId, updatedQuestions.length);

        showToast('success', 'Question deleted successfully!');

    } catch (error) {
        console.error("Error deleting question:", error);
        showToast('error', 'Failed to delete question. Please try again.');
    }
}

// Function to load questions for a quiz
async function loadQuestions(quizId) {
    addedQuestionsDiv.innerHTML = ''; // Clear existing questions

    try {
        const quizDoc = await db.collection('quizzes').doc(quizId).get();
        if (!quizDoc.exists) {
            console.error("Quiz not found");
            showToast('error', 'Quiz not found');
            return;
        }

        const quizData = quizDoc.data();
        const questions = quizData.questions || [];

        if (questions.length === 0) {
            addedQuestionsDiv.innerHTML = '<p class="text-center text-muted mt-4">No questions added yet</p>';
            return;
        }

        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'slide';
            questionElement.style.display = index === 0 ? 'block' : 'none';
            questionElement.innerHTML = `
                <div class="question-set">
                    <div class="question-header mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="question-number">Question ${index + 1} of ${questions.length}</span>
                            <div class="question-nav">
                                ${questions.length > 1 ? `
                                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="showSlide(${index - 1})" ${index === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="showSlide(${index + 1})" ${index === questions.length - 1 ? 'disabled' : ''}>
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>

                    <div class="card question-card mb-3">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-question-circle text-primary me-2"></i>
                                <h6 class="mb-0">Question</h6>
                            </div>
                            <p class="card-text">${question.question}</p>
                        </div>
                    </div>

                    <div class="card answer-card mb-3">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-lightbulb text-success me-2"></i>
                                <h6 class="mb-0">Answer</h6>
                            </div>
                            <p class="card-text">${question.answer}</p>
                        </div>
                    </div>

                    <div class="text-end">
                        <button class="btn btn-outline-danger" onclick="deleteQuestion('${quizId}', '${question.id}')">
                            <i class="fas fa-trash-alt me-2"></i>Delete Question
                        </button>
                    </div>
                </div>
            `;
            addedQuestionsDiv.appendChild(questionElement);
        });

    } catch (error) {
        console.error("Error loading questions:", error);
        showToast('error', 'Failed to load questions');
    }
}

// Function to clear form
function clearForm() {
    difficultyInputs.forEach(input => input.checked = false);
    questionsContainer.innerHTML = '';
    addQuestionInput(); // Add one empty question input
}

// Function to create quiz element
function createQuizElement(quizData, quizId) {
    const quizElement = document.createElement('div');
    quizElement.className = 'quiz-item p-3 mb-3 bg-white rounded-4';
    quizElement.dataset.quizId = quizId; // Store Firebase ID
    
    quizElement.innerHTML = `
        <div class="quiz-content">
            <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="d-flex align-items-center gap-2">
                    <div class="quiz-icon">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <div class="quiz-info">
                        <span class="quiz-name">${quizData.name}</span>
                        <input type="text" class="form-control form-control-sm edit-name-input" style="display: none;">
                        <div class="quiz-meta">
                            <span class="questions-count">${quizData.questionsCount} Questions</span>
                            <span class="difficulty-badge">${quizData.difficulty}</span>
                        </div>
                    </div>
                </div>
                <div class="quiz-actions">
                    <button class="btn btn-sm btn-play me-2 play-btn" title="Play Quiz">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn btn-sm btn-edit me-2 edit-name-btn" title="Edit Name">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-delete delete-btn" title="Delete Quiz">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="progress" style="height: 4px;">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${quizData.progress}%"></div>
            </div>
        </div>
    `;

    // Add event listeners
    setupQuizEventListeners(quizElement, quizId);

    // Add click handler for the entire quiz item
    quizElement.addEventListener('click', async () => {
        // If this quiz is already selected, unselect it
        if (currentQuizId === quizId) {
            quizElement.classList.remove('active-quiz');
            currentQuizId = null;
            noQuizSelected.style.display = 'block';
            quizEditSection.style.display = 'none';
            return;
        }
        
        // Remove active class from all quizzes
        document.querySelectorAll('.quiz-item').forEach(item => {
            item.classList.remove('active-quiz');
        });
        
        // Add active class to selected quiz
        quizElement.classList.add('active-quiz');
        
        // Set current quiz ID
        currentQuizId = quizId;
        
        // Hide no quiz message and show edit section
        noQuizSelected.style.display = 'none';
        quizEditSection.style.display = 'block';
        
        // Load questions for this quiz
        await loadQuestions(quizId);
        
        // Update difficulty radio based on quiz's difficulty
        const difficultyInput = document.getElementById(quizData.difficulty);
        if (difficultyInput) {
            difficultyInput.checked = true;
        }

        // Load questions into input fields
        await loadQuestionsIntoInputs(quizId);
    });

    // Add to DOM
    quizList.appendChild(quizElement);
    return quizElement;
}

// Setup event listeners for quiz actions
function setupQuizEventListeners(quizElement, quizId) {
    const deleteBtn = quizElement.querySelector('.delete-btn');
    const editNameBtn = quizElement.querySelector('.edit-name-btn');
    const quizName = quizElement.querySelector('.quiz-name');
    const editNameInput = quizElement.querySelector('.edit-name-input');
    const playBtn = quizElement.querySelector('.play-btn');

    // Delete quiz
    deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation(); // Prevent quiz selection when deleting
        try {
            await db.collection('quizzes').doc(quizId).delete();
            quizElement.remove();
            
            if (document.querySelectorAll('.quiz-item').length === 0) {
                emptyState.style.display = 'block';
                quizCount = 0;
            }

            // If the deleted quiz was selected, show the no quiz message
            if (currentQuizId === quizId) {
                currentQuizId = null;
                noQuizSelected.style.display = 'block';
                quizEditSection.style.display = 'none';
            }

            showToast('success', 'Quiz deleted successfully!');
        } catch (error) {
            console.error("Error deleting quiz:", error);
            showToast('error', 'Failed to delete quiz. Please try again.');
        }
    });

    // Edit quiz name
    editNameBtn.addEventListener('click', () => {
        if (editNameInput.style.display === 'none') {
            editNameInput.style.display = 'block';
            quizName.style.display = 'none';
            editNameInput.value = quizName.textContent;
            editNameInput.focus();
        } else {
            updateQuizName();
        }
    });

    editNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateQuizName();
        }
    });

    // Function to update quiz name in Firebase and UI
    async function updateQuizName() {
        const newName = editNameInput.value.trim();
        if (newName) {
            try {
                await db.collection('quizzes').doc(quizId).update({
                    name: newName
                });
                quizName.textContent = newName;
                editNameInput.style.display = 'none';
                quizName.style.display = 'block';
                showToast('success', 'Quiz name updated successfully!');
            } catch (error) {
                console.error("Error updating quiz name:", error);
                showToast('error', 'Failed to update quiz name. Please try again.');
            }
        }
    }

    // Play quiz
    playBtn.addEventListener('click', () => {
        console.log(`Playing quiz ${quizId}`);
        // Add your play functionality here
    });

    // Add difficulty change handler
    difficultyInputs.forEach(input => {
        input.addEventListener('change', async () => {
            try {
                await db.collection('quizzes').doc(quizId).update({
                    difficulty: input.id
                });
                
                const difficultyBadge = quizElement.querySelector('.difficulty-badge');
                difficultyBadge.textContent = input.id;
                
                showToast('success', 'Difficulty updated successfully!');
            } catch (error) {
                console.error("Error updating difficulty:", error);
                showToast('error', 'Failed to update difficulty');
            }
        });
    });
}

// Function to show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

// Export the deleteQuestion function for global access
window.deleteQuestion = deleteQuestion;

// Add click event listener to the Add Quiz button
addQuizButton.addEventListener('click', () => {
    console.log('Add Quiz button clicked');
    createQuiz();
});

// Add event listener for the "Add Another Question" button
addMoreBtn.addEventListener('click', addQuestionInput);

// Function to add new question input fields
function addQuestionInput() {
    const questionCount = questionsContainer.children.length + 1;
    const questionGroup = document.createElement('div');
    questionGroup.className = 'question-group mb-3';
    questionGroup.innerHTML = `
        <div class="d-flex align-items-center justify-content-between mb-2">
            <h6 class="question-number mb-0">Question ${questionCount}</h6>
            ${questionCount > 1 ? `
                <button class="btn btn-sm btn-outline-danger remove-question" title="Remove Question">
                    <i class="fas fa-times"></i>
                </button>
            ` : ''}
        </div>
        <div class="mb-3">
            <label class="form-label text-muted small">Question</label>
            <textarea class="form-control question-input" placeholder="Type your question here..." rows="3"></textarea>
        </div>
        <div>
            <label class="form-label text-muted small">Answer</label>
            <input type="text" class="form-control answer-input" placeholder="Type the answer here...">
        </div>
    `;

    // Add remove functionality
    const removeBtn = questionGroup.querySelector('.remove-question');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            questionGroup.remove();
            updateQuestionNumbers();
        });
    }

    questionsContainer.appendChild(questionGroup);
}

// Function to update question numbers
function updateQuestionNumbers() {
    const questionGroups = questionsContainer.querySelectorAll('.question-group');
    questionGroups.forEach((group, index) => {
        const numberElement = group.querySelector('.question-number');
        numberElement.textContent = `Question ${index + 1}`;
        
        // Update remove button visibility
        const removeBtn = group.querySelector('.remove-question')?.parentElement;
        if (removeBtn) {
            removeBtn.style.display = index === 0 ? 'none' : 'block';
        }
    });
}

// Call addQuestionInput once when the page loads to show the first question input
document.addEventListener('DOMContentLoaded', () => {
    addQuestionInput();
    
    // Add event listener for Save Questions button
    addQuestionBtn.addEventListener('click', () => {
        addQuestion(); // Call without quizId parameter since we're using currentQuizId
    });
});

// Add this new function to load questions into inputs
async function loadQuestionsIntoInputs(quizId) {
    try {
        const quizDoc = await db.collection('quizzes').doc(quizId).get();
        const quizData = quizDoc.data();
        const questions = quizData.questions || [];

        // Clear existing inputs
        questionsContainer.innerHTML = '';

        if (questions.length === 0) {
            // Add one empty input if there are no questions
            addQuestionInput();
            return;
        }

        // Add inputs for each question
        questions.forEach((question, index) => {
            const questionGroup = document.createElement('div');
            questionGroup.className = 'question-group mb-3';
            questionGroup.innerHTML = `
                <div class="d-flex align-items-center justify-content-between mb-2">
                    <h6 class="question-number mb-0">Question ${index + 1}</h6>
                    ${index > 0 ? `
                        <button class="btn btn-sm btn-outline-danger remove-question" title="Remove Question">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
                <div class="mb-3">
                    <label class="form-label text-muted small">Question</label>
                    <textarea class="form-control question-input" placeholder="Type your question here..." rows="3">${question.question}</textarea>
                </div>
                <div>
                    <label class="form-label text-muted small">Answer</label>
                    <input type="text" class="form-control answer-input" placeholder="Type the answer here..." value="${question.answer}">
                </div>
            `;

            // Add remove functionality
            const removeBtn = questionGroup.querySelector('.remove-question');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    questionGroup.remove();
                    updateQuestionNumbers();
                });
            }

            questionsContainer.appendChild(questionGroup);
        });

    } catch (error) {
        console.error("Error loading questions into inputs:", error);
        showToast('error', 'Failed to load questions into form');
    }
}
