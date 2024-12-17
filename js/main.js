document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        title: document.getElementById('title-screen'),
        thankYou: document.getElementById('thank-you-screen'),
        gallery: document.getElementById('gallery-screen')
    };

    screens.thankYou.style.opacity = '0';
    screens.gallery.style.opacity = '0';
    screens.thankYou.querySelector('.message').style.opacity = '0';

    const galleryHeader = screens.gallery.querySelector('.gallery-header');
    const galleryContainer = screens.gallery.querySelector('.gallery-container');
    galleryHeader.style.opacity = '0';
    galleryContainer.style.opacity = '0';

    setTimeout(() => {
        const titleElements = screens.title.getElementsByTagName('*');
        // Fade in all title elements at once
        for (let element of titleElements) {
            element.style.opacity = '1';
        }

        // Original fade out sequence
        setTimeout(() => {
            // Fade out title content
            for (let element of titleElements) {
                element.style.opacity = '0';
            }

            // First wait for title content to fade out
            setTimeout(() => {
                // Then change background and lower z-index of title screen
                screens.title.style.backgroundColor = 'white';
                screens.title.style.zIndex = '1';
                
                setTimeout(() => {
                    screens.thankYou.style.opacity = '1';
                    
                    // Show message
                    const message = screens.thankYou.querySelector('.message');
                    void message.offsetWidth;
                    message.style.opacity = '1';

                    // Transition to gallery after 3 seconds
                    setTimeout(() => {
                        // Fade out thank you message first
                        message.style.opacity = '0';
                        
                        setTimeout(() => {
                            // Then fade out thank you screen
                            screens.thankYou.style.opacity = '0';
                            
                            // Wait for fade out to complete before changing z-index and fading in gallery
                            setTimeout(() => {
                                screens.thankYou.style.zIndex = '1';
                                screens.gallery.style.zIndex = '3';
                                screens.gallery.style.opacity = '1';
                                
                                // Fade in gallery elements sequentially
                                setTimeout(() => {
                                    galleryHeader.style.opacity = '1';
                                    setTimeout(() => {
                                        galleryContainer.style.opacity = '1';
                                        document.body.style.overflow = 'auto';
                                    }, 500);
                                }, 500);
                            }, 700);
                        }, 700);
                    }, 4000);
                }, 2000);
            }, 1000);
        }, 4000);
    }, 1000);


    function loadGalleryImages() {
        const galleryContainer = document.querySelector('.gallery-container');
        const imageCount = 30;
        
        for (let i = 1; i <= imageCount; i++) {
            const img = document.createElement('img');
            img.src = `images/${i}.jpeg`; 
            img.alt = `Art piece ${i}`;
            
            img.addEventListener('load', () => {
                setTimeout(() => {
                    img.style.opacity = '1';
                }, i * 500); 
            });
            
            galleryContainer.appendChild(img);
        }
    }

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadGalleryImages();
                galleryObserver.disconnect();
            }
        });
    });

    galleryObserver.observe(document.querySelector('.gallery-container'));
});