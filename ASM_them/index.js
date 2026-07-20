// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============ MENU FUNCTIONALITY ============
    const menuBtn = document.getElementById('menuBtn');
    const slideMenu = document.getElementById('slideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuBtn && slideMenu && menuOverlay) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('active');
            slideMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });

        menuOverlay.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            slideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });

        // Close menu when clicking a link
        const menuLinks = document.querySelectorAll('.menu-nav a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuBtn.classList.remove('active');
                slideMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        });
    }

    // ============ ABOUT MODAL LIGHTBOX ============
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const aboutModal = document.getElementById('aboutModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlayElem = document.getElementById('modalOverlay');

    if (learnMoreBtn && aboutModal && modalClose && modalOverlayElem) {
        // Open modal
        learnMoreBtn.addEventListener('click', function() {
            aboutModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close modal when clicking X button
        modalClose.addEventListener('click', function() {
            aboutModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close modal when clicking overlay
        modalOverlayElem.addEventListener('click', function() {
            aboutModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close modal when clicking modal links
        const modalLinks = aboutModal.querySelectorAll('a[href^="#"]');
        modalLinks.forEach(link => {
            link.addEventListener('click', function() {
                aboutModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });

        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
                aboutModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    // ============ REVIEWS FUNCTIONALITY ============

    // Star Rating System
    const starRatingContainer = document.querySelector('.star-rating');
    const ratingInput = document.getElementById('rating');

    console.log('Star rating container:', starRatingContainer);
    console.log('Rating input:', ratingInput);

    if (starRatingContainer && ratingInput) {
        const stars = starRatingContainer.querySelectorAll('.star');
        console.log('Found stars:', stars.length);
        
        if (stars.length > 0) {
            // Set initial rating to 5 stars
            stars.forEach(star => {
                star.classList.add('active');
            });
            
            stars.forEach(star => {
                // Click event
                star.addEventListener('click', function() {
                    const rating = this.getAttribute('data-rating');
                    console.log('Clicked star rating:', rating);
                    ratingInput.value = rating;
                    
                    // Update star display
                    stars.forEach(s => {
                        const starRating = parseInt(s.getAttribute('data-rating'));
                        if (starRating <= parseInt(rating)) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
                
                // Hover event
                star.addEventListener('mouseenter', function() {
                    const rating = this.getAttribute('data-rating');
                    stars.forEach(s => {
                        const starRating = parseInt(s.getAttribute('data-rating'));
                        if (starRating <= parseInt(rating)) {
                            s.style.color = '#ffc107';
                        } else {
                            s.style.color = '#ddd';
                        }
                    });
                });
            });

            // Reset stars on mouse leave
            starRatingContainer.addEventListener('mouseleave', function() {
                const currentRating = ratingInput.value;
                stars.forEach(s => {
                    const starRating = parseInt(s.getAttribute('data-rating'));
                    if (starRating <= parseInt(currentRating)) {
                        s.style.color = '#ffc107';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
        }
    } else {
        console.error('Star rating elements not found!');
    }

    // Submit Review Form
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    if (reviewForm && reviewsList) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('reviewName');
            const ratingInputField = document.getElementById('rating');
            const reviewTextInput = document.getElementById('reviewText');
            
            if (!nameInput || !ratingInputField || !reviewTextInput) {
                console.error('Required form elements not found');
                return;
            }
            
            const name = nameInput.value;
            const rating = ratingInputField.value;
            const reviewText = reviewTextInput.value;
            
            // Create star display
            let starsDisplay = '';
            for (let i = 0; i < 5; i++) {
                starsDisplay += i < rating ? '★' : '☆';
            }
            
            // Create new review element
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <div class="review-header">
                    <div class="review-author">
                        <div class="author-avatar">${name.charAt(0).toUpperCase()}</div>
                        <div class="author-info">
                            <h4>${name}</h4>
                            <div class="review-stars">
                                <span>${starsDisplay}</span>
                            </div>
                            <p class="review-date">Just now</p>
                        </div>
                    </div>
                </div>
                <p class="review-content">${reviewText}</p>
                <div class="review-actions">
                    <button class="btn-like"><i class="fa-regular fa-thumbs-up"></i> Like <span class="count">0</span></button>
                    <button class="btn-dislike"><i class="fa-regular fa-thumbs-down"></i> Dislike <span class="count">0</span></button>
                    <button class="btn-reply"><i class="fa-regular fa-comment"></i> Reply</button>
                </div>
                <div class="reply-form-container" style="display: none;">
                    <form class="reply-form">
                        <input type="text" placeholder="Write your reply..." required>
                        <button type="submit" class="btn-submit-reply">Send</button>
                        <button type="button" class="btn-cancel-reply">Cancel</button>
                    </form>
                </div>
            `;
            
            // Add to top of reviews list
            reviewsList.insertBefore(reviewItem, reviewsList.firstChild);
            
            // Reset form
            reviewForm.reset();
            
            // Reset stars to 5
            const starRatingContainer = document.querySelector('.star-rating');
            if (starRatingContainer) {
                const allStars = starRatingContainer.querySelectorAll('.star');
                allStars.forEach(star => star.classList.add('active'));
            }
            ratingInputField.value = '5';
            
            // Add event listeners to new review's buttons
            setupReviewButtons(reviewItem);
            
            // Scroll to new review
            reviewItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show success message
            reviewItem.style.animation = 'fadeInUp 0.5s ease';
        });
    }

    // Like/Dislike/Reply functionality
    function setupReviewButtons(reviewItem) {
        const likeBtn = reviewItem.querySelector('.btn-like');
        const dislikeBtn = reviewItem.querySelector('.btn-dislike');
        const replyBtn = reviewItem.querySelector('.btn-reply');
        const replyFormContainer = reviewItem.querySelector('.reply-form-container');
        const replyForm = reviewItem.querySelector('.reply-form');
        const cancelReplyBtn = reviewItem.querySelector('.btn-cancel-reply');
        
        if (!likeBtn || !dislikeBtn || !replyBtn) return;
        
        // Like button
        likeBtn.addEventListener('click', function() {
            const count = this.querySelector('.count');
            let currentCount = parseInt(count.textContent);
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                count.textContent = currentCount - 1;
            } else {
                this.classList.add('active');
                count.textContent = currentCount + 1;
                
                // Remove dislike if active
                if (dislikeBtn.classList.contains('active')) {
                    dislikeBtn.classList.remove('active');
                    const dislikeCount = dislikeBtn.querySelector('.count');
                    dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
                }
            }
        });
        
        // Dislike button
        dislikeBtn.addEventListener('click', function() {
            const count = this.querySelector('.count');
            let currentCount = parseInt(count.textContent);
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                count.textContent = currentCount - 1;
            } else {
                this.classList.add('active');
                count.textContent = currentCount + 1;
                
                // Remove like if active
                if (likeBtn.classList.contains('active')) {
                    likeBtn.classList.remove('active');
                    const likeCount = likeBtn.querySelector('.count');
                    likeCount.textContent = parseInt(likeCount.textContent) - 1;
                }
            }
        });
        
        // Reply button
        if (replyFormContainer) {
            replyBtn.addEventListener('click', function() {
                replyFormContainer.style.display = replyFormContainer.style.display === 'none' ? 'block' : 'none';
                if (replyFormContainer.style.display === 'block' && replyForm) {
                    const input = replyForm.querySelector('input');
                    if (input) input.focus();
                }
            });
        }
        
        // Cancel reply
        if (cancelReplyBtn && replyFormContainer && replyForm) {
            cancelReplyBtn.addEventListener('click', function() {
                replyFormContainer.style.display = 'none';
                replyForm.reset();
            });
        }
        
        // Submit reply
        if (replyForm) {
            replyForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const input = this.querySelector('input');
                if (!input) return;
                
                const replyText = input.value;
                
                // Create or get replies container
                let repliesContainer = reviewItem.querySelector('.replies-container');
                if (!repliesContainer) {
                    repliesContainer = document.createElement('div');
                    repliesContainer.className = 'replies-container';
                    reviewItem.appendChild(repliesContainer);
                }
                
                // Create reply element
                const replyItem = document.createElement('div');
                replyItem.className = 'reply-item';
                replyItem.innerHTML = `
                    <div class="reply-author">
                        <div class="author-avatar small">U</div>
                        <div>
                            <h5>You</h5>
                            <p class="reply-date">Just now</p>
                        </div>
                    </div>
                    <p class="reply-content">${replyText}</p>
                `;
                
                repliesContainer.appendChild(replyItem);
                
                // Reset and hide form
                replyForm.reset();
                if (replyFormContainer) {
                    replyFormContainer.style.display = 'none';
                }
                
                // Animate new reply
                replyItem.style.animation = 'fadeInUp 0.5s ease';
            });
        }
    }

    // Setup existing review buttons
    document.querySelectorAll('.review-item').forEach(reviewItem => {
        setupReviewButtons(reviewItem);
    });
     var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

}); // End of DOMContentLoaded