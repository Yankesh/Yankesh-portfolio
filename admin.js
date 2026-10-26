const ADMIN_USERNAME = 'yankeshmry@gmail.com';
const ADMIN_PASSWORD = 'Yankesh@890';
const CONTENT_KEY = 'portfolioContent';
const CURRENT_RESUME_FILE = 'resume.pdf?v=20261026';
const CURRENT_ABOUT = "Hi, I'm Yankesh, a full-stack developer who likes turning ideas into products that actually run in production.\n\nI'm a Computer Science Engineering student (batch of 2027), and most of what I know comes from building things. My main project, SecondHand, is a peer-to-peer marketplace built with React, Node.js, Express and MongoDB. I deployed it on Vercel and Render with a GitHub Actions CI/CD pipeline. I also built an AI customer support chatbot that runs locally on an open-source LLM, with a Python backend and a React frontend.\n\nAs an AI Research Intern at Ethara AI, I worked on evaluating LLM outputs. That taught me how AI behaves in the real world, not just in demos. I now bring that into the apps I build.\n\nOutside of coursework, I'm exploring cybersecurity and OSINT, which helps me write safer, more thoughtful code. I've also solved 100+ DSA problems and work comfortably with Git, Docker, Postman and AWS basics.\n\nI'm currently looking for fresher Web Developer / Full-Stack roles. Let's connect!";

const defaultContent = {
    about: CURRENT_ABOUT,
    resume: { title: 'Yankesh - Resume', subtitle: 'Full Stack Developer | Backend Enthusiast', updated: 'October 2026', file: 'resume.pdf?v=20261026' },
    certificates: [
        { file: 'Coursera datascience.pdf', title: 'Data Science Certification', issuer: 'Coursera', date: 'January 2025', type: 'pdf' },
        { file: 'Flipkart-SCOA---Warehousing_Yankesh-G-_243.pdf', title: 'Flipkart Supply Chain Optimization', issuer: 'Flipkart', date: 'December 2024', type: 'pdf' },
        { file: 'google gemini.pdf', title: 'Google Gemini Certification', issuer: 'Google', date: 'December 2024', type: 'pdf' },
        { file: 'infosys cloud computing.pdf', title: 'Infosys Cloud Computing', issuer: 'Infosys', date: 'November 2024', type: 'pdf' },
        { file: 'ISRO 2.pdf', title: 'ISRO Certification', issuer: 'ISRO', date: 'October 2024', type: 'pdf' },
        { file: 'oracle generative ai eCertificate.pdf', title: 'Oracle Generative AI', issuer: 'Oracle', date: 'September 2024', type: 'pdf' }
    ]
};

const authPanel = document.getElementById('authPanel');
const editorPanel = document.getElementById('editorPanel');
const authMessage = document.getElementById('authMessage');
const editorMessage = document.getElementById('editorMessage');
const certificatesEditor = document.getElementById('certificatesEditor');

function showMessage(element, message, isError = false) {
    element.textContent = message;
    element.style.color = isError ? '#c53030' : '';
}

function readContent() {
    const content = JSON.parse(localStorage.getItem(CONTENT_KEY) || JSON.stringify(defaultContent));
    content.about = CURRENT_ABOUT;
    if (!content.resume) content.resume = {};
    if (content.resume.file !== CURRENT_RESUME_FILE) {
        content.resume.file = CURRENT_RESUME_FILE;
        localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    }
    return content;
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        if (!file) return resolve('');
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function addCertificateRow(certificate = {}) {
    const row = document.createElement('div');
    row.className = 'certificate-editor';
    row.innerHTML = `
        <label>Title</label><input class="certificate-title" value="${certificate.title || ''}" required>
        <label>Issuer</label><input class="certificate-issuer" value="${certificate.issuer || ''}" required>
        <label>Date</label><input class="certificate-date" value="${certificate.date || ''}" required>
        <label>PDF file</label><input class="certificate-file" type="file" accept="application/pdf">
        <input class="certificate-url" type="hidden" value="${certificate.file || ''}">
        <button class="remove-certificate" type="button">Remove certificate</button>
    `;
    row.querySelector('.remove-certificate').addEventListener('click', () => row.remove());
    certificatesEditor.appendChild(row);
}

function loadEditor() {
    const content = readContent();
    document.getElementById('aboutText').value = content.about || defaultContent.about;
    document.getElementById('resumeTitle').value = content.resume.title;
    document.getElementById('resumeSubtitle').value = content.resume.subtitle;
    document.getElementById('resumeUpdated').value = content.resume.updated;
    certificatesEditor.innerHTML = '';
    content.certificates.forEach(addCertificateRow);
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        showMessage(authMessage, 'Incorrect username or password.', true);
        return;
    }
    sessionStorage.setItem('portfolioAdmin', 'true');
    authPanel.classList.add('is-hidden');
    editorPanel.classList.remove('is-hidden');
    document.getElementById('signedInEmail').textContent = ADMIN_USERNAME;
    loadEditor();
});

document.getElementById('addCertificate').addEventListener('click', () => addCertificateRow());
document.getElementById('logoutButton').addEventListener('click', () => {
    sessionStorage.removeItem('portfolioAdmin');
    window.location.reload();
});

document.getElementById('portfolioForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const oldContent = readContent();
    const resumeFile = await fileToDataUrl(document.getElementById('resumeFile').files[0]);
    const certificates = [];
    for (const row of certificatesEditor.querySelectorAll('.certificate-editor')) {
        const newFile = await fileToDataUrl(row.querySelector('.certificate-file').files[0]);
        certificates.push({
            title: row.querySelector('.certificate-title').value.trim(),
            issuer: row.querySelector('.certificate-issuer').value.trim(),
            date: row.querySelector('.certificate-date').value.trim(),
            file: newFile || row.querySelector('.certificate-url').value,
            type: 'pdf'
        });
    }
    localStorage.setItem(CONTENT_KEY, JSON.stringify({
        about: document.getElementById('aboutText').value.trim(),
        resume: {
            title: document.getElementById('resumeTitle').value.trim(),
            subtitle: document.getElementById('resumeSubtitle').value.trim(),
            updated: document.getElementById('resumeUpdated').value.trim(),
            file: resumeFile || oldContent.resume.file
        },
        certificates
    }));
    showMessage(editorMessage, 'Saved in this browser. Refresh the portfolio to see the changes.');
});

if (sessionStorage.getItem('portfolioAdmin') === 'true') {
    authPanel.classList.add('is-hidden');
    editorPanel.classList.remove('is-hidden');
    document.getElementById('signedInEmail').textContent = ADMIN_USERNAME;
    loadEditor();
}
