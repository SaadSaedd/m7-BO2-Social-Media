// Copy of the base data that will be extended
let instagramData = JSON.parse(JSON.stringify(baseInstagramData));

// Function to generate a random post (existing function, unchanged)
function generateRandomPost(index) {
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    const randomLikes = Math.floor(Math.random() * 15000) + 50;
    const randomComments = Math.floor(Math.random() * 100) + 1;
    const days = ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "1 week"];
    const randomTimePosted = days[Math.floor(Math.random() * days.length)] + " ago";
    
    return {
        "username": randomUsername,
        "profilePic": `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
        "postImage": `https://picsum.photos/id/${(index % 999) + 10}/600/${Math.floor(Math.random() * 200) + 400}`,
        "likes": {
            "count": randomLikes,
            "likedBy": `${usernames[Math.floor(Math.random() * usernames.length)]} and others`
        },
        "caption": randomCaption,
        "comments": randomComments,
        "timePosted": randomTimePosted
    };
}

// Functions to add more stories and suggestions (unchanged)
function addMoreStories() {
    for (let i = 0; i < 5; i++) {
        const randomUsername = usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000);
        instagramData.stories.push({
            "username": randomUsername,
            "profilePic": `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`
        });
    }
}

function addMoreSuggestions() {
    for (let i = 0; i < 3; i++) {
        const randomUsername = usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000);
        const randomRelation = relations[Math.floor(Math.random() * relations.length)];
        instagramData.suggestions.push({
            "username": randomUsername,
            "relation": randomRelation,
            "profilePic": `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`
        });
    }
}

// Render function that either builds the entire layout or appends posts
function renderInstagramContent(data, isInitial = false) {
    const container = document.getElementById('json-content');
    
    if (isInitial || container.innerHTML === '') {
        // Create the layout with stories, feed, and suggestions on initial load
        const storiesHTML = `
            <div class="stories-container">
                ${data.stories.map(story => `
                    <div class="story">
                        <div class="story-border">
                            <div class="story-avatar" style="background-image: url('${story.profilePic}')"></div>
                        </div>
                        <div class="story-username">${story.username}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        const feedHTML = `
            <div class="feed" id="feed-container">
                ${storiesHTML}
                <!-- Posts will be appended here -->
            </div>
        `;
        
        const suggestionsHTML = `
            <div class="suggestions-sidebar">
                <!-- Profile -->
                <div class="profile-header">
                    <img src="${data.profile.profilePic}" alt="${data.profile.username}" class="profile-pic">
                    <div class="profile-info">
                        <div class="profile-username">${data.profile.username}</div>
                        <div class="profile-name">${data.profile.displayName}</div>
                    </div>
                    <button class="switch-button">Switch</button>
                </div>
                
                <!-- Suggestions -->
                <div class="suggestions-header">
                    <div class="suggestions-title">Suggestions For You</div>
                    <div class="suggestions-see-all">See All</div>
                </div>
                
                ${data.suggestions.map(suggestion => `
                    <div class="suggestion">
                        <div class="suggestion-user">
                            <img src="${suggestion.profilePic}" alt="${suggestion.username}" class="suggestion-avatar">
                            <div class="suggestion-info">
                                <div class="suggestion-username">${suggestion.username}</div>
                                <div class="suggestion-relation">${suggestion.relation}</div>
                            </div>
                        </div>
                        <button class="suggestion-follow">Follow</button>
                    </div>
                `).join('')}
                
                <!-- Footer -->
                <div class="footer">
                    ${data.footer.links.map(link => `<a href="#">${link}</a>`).join('')}
                    <div class="copyright">${data.footer.copyright}</div>
                </div>
            </div>
            
            <!-- Loading indicator -->
            <div id="loading" style="display: none; text-align: center; padding: 20px;">
                <div class="loader"></div>
                <div>Loading more posts...</div>
            </div>
        `;
        
        container.innerHTML = feedHTML + suggestionsHTML;
        
        // Add initial posts (first 5)
        const feedContainer = document.getElementById('feed-container');
        const postsToRender = data.posts.slice(0, 5);
        const postsHTML = renderPostsHTML(postsToRender, 0);
        feedContainer.innerHTML += postsHTML;
    } else {
        // For infinite scroll, only append new posts
        const feedContainer = document.getElementById('feed-container');
        const startIndex = document.querySelectorAll('.post').length;
        const newPosts = data.posts.slice(startIndex, startIndex + 5);
        const postsHTML = renderPostsHTML(newPosts, startIndex);
        feedContainer.insertAdjacentHTML('beforeend', postsHTML);
    }
    
    // Add event listeners for new elements
    addEventListeners();
}

// Function to generate posts HTML
function renderPostsHTML(posts, startIndex) {
    return posts.map((post, index) => {
        const postIndex = startIndex + index;
        return `
            <div class="post fade-in" id="post-${postIndex}" data-post-id="${postIndex}">
                <div class="post-header">
                    <div class="post-user">
                        <img src="${post.profilePic}" alt="${post.username}" class="post-avatar">
                        <div class="post-username">${post.username}</div>
                    </div>
                    <div class="post-options">...</div>
                </div>
                <div class="post-image-container">
                    <img src="${post.postImage}" alt="Post" class="post-image">
                    <div class="post-navigation">
                        <div class="nav-arrow">◀</div>
                        <div class="nav-arrow">▶</div>
                    </div>
                </div>
                <div class="post-actions">
                    <div class="post-action heart">❤️</div>
                    <div class="post-action">💬</div>
                    <div class="post-action">📤</div>
                    <div class="post-action bookmark">🔖</div>
                </div>
                <div class="post-likes">${post.likes.count.toLocaleString()} likes</div>
                <div class="post-caption">
                    <span>${post.username}</span> ${post.caption}
                    <span class="more-link">more</span>
                </div>
                <div class="post-comments">View all ${post.comments} comments</div>
                <div class="post-time">${post.timePosted}</div>
                <div class="slider">
                    <div class="slider-dot active"></div>
                    <div class="slider-dot"></div>
                    <div class="slider-dot"></div>
                </div>
                <div class="post-comment-box">
                    <input type="text" placeholder="Add a comment..." class="post-comment-input">
                    <button class="post-comment-button">Post</button>
                </div>
            </div>
        `;
    }).join('');
}

// Function to add event listeners to new elements
function addEventListeners() {
    // Follow/Following toggle
    document.querySelectorAll('.suggestion-follow').forEach(button => {
        if (!button.hasAttribute('listener')) {
            button.setAttribute('listener', 'true');
            button.addEventListener('click', function() {
                this.textContent = this.textContent === 'Follow' ? 'Following' : 'Follow';
                this.style.color = this.textContent === 'Following' ? '#262626' : '#0095f6';
            });
        }
    });
    
    // Like/Unlike toggle
    document.querySelectorAll('.post-action.heart').forEach(action => {
        if (!action.hasAttribute('listener')) {
            action.setAttribute('listener', 'true');
            action.addEventListener('click', function() {
                if (this.textContent === '❤️') {
                    this.textContent = '♡';
                    const likesElement = this.closest('.post').querySelector('.post-likes');
                    const currentLikes = parseInt(likesElement.textContent.replace(/,/g, ''));
                    likesElement.textContent = (currentLikes - 1).toLocaleString() + ' likes';
                } else {
                    this.textContent = '❤️';
                    const likesElement = this.closest('.post').querySelector('.post-likes');
                    const currentLikes = parseInt(likesElement.textContent.replace(/,/g, ''));
                    likesElement.textContent = (currentLikes + 1).toLocaleString() + ' likes';
                }
            });
        }
    });

    // Bookmark toggle
    document.querySelectorAll('.post-action.bookmark').forEach(action => {
        if (!action.hasAttribute('listener')) {
            action.setAttribute('listener', 'true');
            action.addEventListener('click', function() {
                this.textContent = this.textContent === '🔖' ? '📑' : '🔖';
            });
        }
    });
    
    // Comment input functionality
    document.querySelectorAll('.post-comment-input').forEach(input => {
        if (!input.hasAttribute('listener')) {
            input.setAttribute('listener', 'true');
            input.addEventListener('input', function() {
                const button = this.nextElementSibling;
                button.style.opacity = this.value.trim() ? '1' : '0.3';
            });
        }
    });

    // Post comment functionality
    document.querySelectorAll('.post-comment-button').forEach(button => {
        if (!button.hasAttribute('listener')) {
            button.setAttribute('listener', 'true');
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const commentText = input.value.trim();
                
                if (commentText) {
                    input.value = '';
                    button.style.opacity = '0.3';
                    const commentsElement = this.closest('.post').querySelector('.post-comments');
                    const currentCount = parseInt(commentsElement.textContent.match(/\d+/)[0]);
                    commentsElement.textContent = `View all ${currentCount + 1} comments`;
                    showToast('Comment posted!');
                }
            });
        }
    });

    // Navigation arrows functionality
    document.querySelectorAll('.nav-arrow').forEach(arrow => {
        if (!arrow.hasAttribute('listener')) {
            arrow.setAttribute('listener', 'true');
            arrow.addEventListener('click', function() {
                const sliderDots = this.closest('.post').querySelectorAll('.slider-dot');
                const currentActive = this.closest('.post').querySelector('.slider-dot.active');
                const currentIndex = Array.from(sliderDots).indexOf(currentActive);
                let nextIndex;
                if (this.textContent === '▶') {
                    nextIndex = (currentIndex + 1) % sliderDots.length;
                } else {
                    nextIndex = (currentIndex - 1 + sliderDots.length) % sliderDots.length;
                }
                currentActive.classList.remove('active');
                sliderDots[nextIndex].classList.add('active');
            });
        }
    });
}

// Toast notification function for posting comments
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '20px';
        toast.style.zIndex = '1000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-in-out';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Infinite scroll related variables and function
let isLoading = false;
let scrollThrottle = null;

function loadMoreContent() {
    if (isLoading) return;
    isLoading = true;
    
    const loader = document.getElementById('loading');
    if (loader) loader.style.display = 'block';
    
    // Simulate loading delay (e.g., API call)
    setTimeout(() => {
        // Append 5 new fake posts
        for (let i = 0; i < 5; i++) {
            instagramData.posts.push(generateRandomPost(instagramData.posts.length + i));
        }
        
        if (loader) loader.style.display = 'none';
        renderInstagramContent(instagramData, false);
        isLoading = false;
    }, 1500);
}

// Initialization function to set up initial content and listeners
function initializeContent() {
    addMoreStories();
    addMoreSuggestions();
    
    // Add 5 initial posts
    for (let i = 0; i < 5; i++) {
        instagramData.posts.push(generateRandomPost(i + 1));
    }
    
    // Append CSS for animations and loader
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .loader {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleElement);
    
    renderInstagramContent(instagramData, true);
    
    // Create loading element if not already present
    if (!document.getElementById('loading')) {
        const loadingElement = document.createElement('div');
        loadingElement.id = 'loading';
        loadingElement.style.display = 'none';
        loadingElement.style.textAlign = 'center';
        loadingElement.style.padding = '20px';
        loadingElement.innerHTML = `
            <div class="loader"></div>
            <div>Loading more posts...</div>
        `;
        document.getElementById('json-content').appendChild(loadingElement);
    }
}

// Throttled scroll event to check if we need to load more posts
window.addEventListener('scroll', function() {
    if (scrollThrottle) {
        clearTimeout(scrollThrottle);
    }
    scrollThrottle = setTimeout(function() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Load more content if user scrolled near the bottom
        if (scrollY + windowHeight >= documentHeight - 300 && !isLoading) {
            loadMoreContent();
        }
    }, 200);
});

// Start application once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContent();
});
