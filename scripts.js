document.addEventListener('DOMContentLoaded', function () {
    const factContainers = document.querySelectorAll('.fact-container');

    const navbar = document.querySelector('.navbar-container');
    const sticky = navbar.offsetTop;

    window.addEventListener('scroll', function () {
        factContainers.forEach(factContainer => {
            const factPosition = factContainer.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            const factData = factContainer.querySelector('.fact-data');
            const factCaption = factContainer.querySelector('.fact-caption');

            if (factPosition < screenPosition && !factData.dataset.animated) {
                animateNumber(factData, factContainer);
            }

            if (factPosition < screenPosition && !factCaption.dataset.animated) {
                animateCaption(factCaption);
            }
        });

        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
            document.body.classList.add("sticky-nav");
        } else {
            navbar.classList.remove("sticky");
            document.body.classList.remove("sticky-nav");
        }
    });

    function animateNumber(element, container) {
        let count = 0;
        const target = parseFloat(element.getAttribute('data-number'));
        const isInteger = Number.isInteger(target);
        const speed = 200;

        const updateCount = () => {
            const increment = target / speed;

            if (count >= target) {
                if (container.classList.contains('last-fact') && target >= 10) {
                    element.textContent = '10+';
                } else {
                    element.textContent = isInteger ? Math.round(target) : target.toFixed(1);
                }
            } else {
                count += increment;

                element.textContent = isInteger ? Math.round(count) : count.toFixed(1);

                requestAnimationFrame(updateCount);
            }
        };

        updateCount();
        element.style.opacity = '1';
        element.dataset.animated = true;
    }

    function animateCaption(element) {
        let opacity = 0;
        const targetOpacity = 1;
        const speed = 0.02;

        const updateOpacity = () => {
            if (opacity >= targetOpacity) {
                element.style.opacity = targetOpacity;
            } else {
                opacity += speed;
                element.style.opacity = opacity;
                requestAnimationFrame(updateOpacity);
            }
        };

        updateOpacity();
        element.dataset.animated = true;
    }

    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var slides = document.querySelectorAll('.slide');

        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].classList.add('active');

        var activeSlide = slides[slideIndex - 1];
        activeSlide.style.opacity = 0;
        var fadeInterval = setInterval(function () {
            var opacity = parseFloat(activeSlide.style.opacity) || 0;
            if (opacity >= 1) {
                clearInterval(fadeInterval);
            } else {
                opacity += 0.1;
                activeSlide.style.opacity = opacity;
            }
        }, 50);

        setTimeout(showSlides, 8000);
    }

    const form = document.getElementById("admission-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const program = document.getElementById("program").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!isValidName(name)) {
            showError("name-error", "Please enter a valid name.");
            return;
        }

        if (!isValidEmail(email)) {
            showError("email-error", "Please enter a valid email address.");
            return;
        }

        if (!isValidPhone(phone)) {
            showError("phone-error", "Please enter a valid phone number.");
            return;
        }

        if (program === "") {
            showError("program-error", "Please select a program.");
            return;
        }

        const formData = {
            name: name,
            email: email,
            phone: phone,
            program: program,
            message: message
        };

        console.log("Form data:", formData);

        form.reset();
    });

    function isValidName(name) {
        return /^[A-Za-z\s]+$/.test(name);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
    
});