const URL = "https://teachablemachine.withgoogle.com/models/AGonIRDjb/";

let model, maxPredictions;

// Elements
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const imagePreview = document.getElementById('image-preview');
const imagePreviewContainer = document.getElementById('image-preview-container');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const labelContainerElement = document.getElementById('label-container');
const retryBtn = document.getElementById('retry-btn');
const themeBtn = document.getElementById('theme-btn');

// Load the image model
async function init() {
    // Only init if we are on the animal test page (elements exist)
    if (!uploadArea) return;

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Model loaded successfully");
    } catch (e) {
        console.error("Failed to load model", e);
    }
}

// Theme logic
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
if (themeBtn) {
    updateThemeButton(currentTheme);
    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeButton(theme);
    });
}

function updateThemeButton(theme) {
    if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? '🌞 라이트 모드' : '🌙 다크 모드';
    }
}

// Animal Test logic (only runs if elements exist)
if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--accent-color)";
        uploadArea.style.backgroundColor = "rgba(77, 171, 247, 0.1)";
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = "var(--border-color)";
        uploadArea.style.backgroundColor = "transparent";
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--border-color)";
        uploadArea.style.backgroundColor = "transparent";
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    function handleFileUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';
            uploadArea.style.display = 'none';
            predict();
        };
        reader.readAsDataURL(file);
    }

    async function predict() {
        loading.style.display = 'block';
        resultContainer.style.display = 'none';
        retryBtn.style.display = 'none';

        if (!model) await init();

        const prediction = await model.predict(imagePreview);
        prediction.sort((a, b) => b.probability - a.probability);

        const topResult = prediction[0];
        let animalEmoji = "";
        if (topResult.className === "강아지") animalEmoji = "🐶";
        else if (topResult.className === "고양이") animalEmoji = "🐱";

        resultTitle.innerText = `${animalEmoji} 당신은 ${topResult.className}상입니다!`;

        labelContainerElement.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i];
            const percentage = (classPrediction.probability * 100).toFixed(0);
            
            const wrapper = document.createElement('div');
            wrapper.className = 'result-bar-wrapper';
            wrapper.innerHTML = `
                <div class="label-text">
                    <span>${classPrediction.className}</span>
                    <span>${percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            labelContainerElement.appendChild(wrapper);
        }

        loading.style.display = 'none';
        resultContainer.style.display = 'block';
        retryBtn.style.display = 'inline-block';
    }

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            uploadArea.style.display = 'block';
            imagePreviewContainer.style.display = 'none';
            resultContainer.style.display = 'none';
            retryBtn.style.display = 'none';
            fileInput.value = '';
        });
    }

    // Pre-load model if on animal test page
    init();
}
