 document.addEventListener("DOMContentLoaded", function() {
            const links = document.querySelectorAll('.navbar a');
            links.forEach(link => {
                link.addEventListener('click', function(event) {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
                        event.preventDefault();
                        const targetId = href.substring(1);
                        const targetSection = document.getElementById(targetId);
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });