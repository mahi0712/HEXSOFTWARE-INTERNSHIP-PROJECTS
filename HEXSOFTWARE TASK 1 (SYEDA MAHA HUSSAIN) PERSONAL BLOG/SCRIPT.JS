document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('nav ul');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));
});

const STORAGE_KEY = 'hex_blog_posts';
function getPosts() { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
function savePosts(posts) { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); }
function addPost(post) { const posts = getPosts(); posts.unshift(post); savePosts(posts); }
function formatDate(iso) { return new Date(iso).toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric'}); }
function excerpt(text, len=110) { return text.length > len ? text.slice(0,len).trim()+'…' : text; }

function renderHomePreview() {
  const grid = document.getElementById('home-post-grid');
  if (!grid) return;
  const posts = getPosts().slice(0,3);
  grid.innerHTML = posts.length ? posts.map(postCardHTML).join('') :
    `<div class="empty-state">No blog posts yet. Head to the Blog page and write the first one!</div>`;
}

function renderBlogList() {
  const grid = document.getElementById('blog-post-grid');
  if (!grid) return;
  const posts = getPosts();
  grid.innerHTML = posts.length ? posts.map(postCardHTML).join('') :
    `<div class="empty-state">No posts yet — use the form above to publish your first blog post.</div>`;
}

function postCardHTML(post) {
  return `<div class="post-card">
    <span class="tag">${escapeHTML(post.category || 'General')}</span>
    <h3>${escapeHTML(post.title)}</h3>
    <p>${escapeHTML(excerpt(post.body))}</p>
    <div class="post-meta"><span>${escapeHTML(post.author || 'Anonymous')}</span><span>${formatDate(post.date)}</span></div>
  </div>`;
}

function escapeHTML(str) { const div = document.createElement('div'); div.textContent = str; return div.innerHTML; }

function initBlogForm() {
  const form = document.getElementById('new-post-form');
  if (!form) return;
  const msg = document.getElementById('post-form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value.trim();
    const author = document.getElementById('post-author').value.trim();
    const category = document.getElementById('post-category').value.trim();
    const body = document.getElementById('post-body').value.trim();
    let valid = validateField('post-title', title.length > 0);
    valid = validateField('post-body', body.length >= 10) && valid;
    if (!valid) return;
    addPost({ title, author, category, body, date: new Date().toISOString() });
    form.reset();
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 3000);
    renderBlogList();
  });
}

function validateField(id, isValid) {
  const field = document.getElementById(id).closest('.field');
  field.classList.toggle('invalid', !isValid);
  return isValid;
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const msg = document.getElementById('contact-form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    let valid = validateField('contact-name', name.length > 0);
    valid = validateField('contact-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && valid;
    valid = validateField('contact-message', message.length >= 10) && valid;
    if (!valid) return;
    form.reset();
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomePreview(); renderBlogList(); initBlogForm(); initContactForm();
});