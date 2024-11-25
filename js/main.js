(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
    // Get the current page URL path
    const currentPath = window.location.pathname;

    // Highlight the corresponding navbar item
    if (currentPath.includes("blogs.html")) {
        // If on blogs.html, set the active class to the Blog link
        document.getElementById("blogLink").classList.add("active");
    } else if (currentPath.includes("index.html")) {
        // If on index.html, you can set the active class on the Home or another section
        document.getElementById("homeLink").classList.add("active");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Function to update active section on scroll
    const sections = document.querySelectorAll("section"); // Get all sections
    const navLinks = document.querySelectorAll(".nav-item"); // Get all navbar links

    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = sectionId;
            }
        });

        // Remove active class from all nav links
        navLinks.forEach((link) => {
            link.classList.remove("active");
        });

        // Add active class to the corresponding nav link
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-item[href*="${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Get the current page URL path
    const currentPath = window.location.pathname;

    // Highlight the corresponding navbar item
    if (currentPath.includes("blogs.html")) {
        // If on blogs.html, set the active class to the Blog link
        document.getElementById("blogLink").classList.add("active");
    } else if (currentPath.includes("index.html")) {
        // If on index.html, you can set the active class on the Home or another section
        document.getElementById("homeLink").classList.add("active");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // Fetch the blogs JSON
    fetch("data/blogs.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON data
        })
        .then(blogs => {
            const container = document.getElementById("blog-container");
            const loadMoreButton = document.getElementById("load-more-btn");

            let currentIndex = 0;
            const blogsPerPage = 6;

            // Check if the current page is the homepage (index.html) or blogs.html
            const isHomePage = window.location.pathname.includes("index.html");
            const isBlogPage = window.location.pathname.includes("blogs.html");

            if (isHomePage) {
                // Homepage: Display only the latest 3 blogs
                blogs.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (latest first)
                const latestBlogs = blogs.slice(0, 3); // Get only the top 3 blogs

                // Populate the blog grid with the latest 3 blogs
                latestBlogs.forEach((blog, index) => {
                    const blogHTML = `
                        <div class="col-lg-4 mb-5">
                            <div class="position-relative mb-4">
                                <img class="img-fluid rounded w-100" src="${blog.image}" alt="${blog.title}">
                                <div class="blog-date">
                                    <h4 class="font-weight-bold mb-n1">${blog.date.split(" ")[0]}</h4>
                                    <small class="text-white text-uppercase">${blog.date.split(" ")[1]}</small>
                                </div>
                            </div>
                            <h5 class="font-weight-medium mb-4">${blog.title}</h5>
                            <button class="btn btn-sm btn-outline-primary py-2 read-more-btn" data-index="${index}">Read More</button>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', blogHTML); // Append without replacing existing content
                });

                // Only show "See More" button if there are more than 3 blogs
                if (blogs.length > 3) {
                    const seeMoreButton = `
                        <div class="col-12 text-center">
                            <a href="blogs.html" class="btn btn-outline-primary py-2">See More</a>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', seeMoreButton); // Append "See More" button
                }

            } else if (isBlogPage) {
                // "See More" page: Display all blogs with pagination (initially 6 blogs)
                // Function to display blogs in the container
                function displayBlogs(startIndex) {
                    const endIndex = startIndex + blogsPerPage;
                    const blogsToDisplay = blogs.slice(startIndex, endIndex);

                    // Add the blogs to the page
                    blogsToDisplay.forEach((blog, index) => {
                        const blogHTML = `
                            <div class="col-lg-4 mb-5">
                                <div class="position-relative mb-4">
                                    <img class="img-fluid rounded w-100" src="${blog.image}" alt="${blog.title}">
                                    <div class="blog-date">
                                        <h4 class="font-weight-bold mb-n1">${blog.date.split(" ")[0]}</h4>
                                        <small class="text-white text-uppercase">${blog.date.split(" ")[1]}</small>
                                    </div>
                                </div>
                                <h5 class="font-weight-medium mb-4">${blog.title}</h5>
                                <button class="btn btn-sm btn-outline-primary py-2 read-more-btn" data-index="${index}">Read More</button>
                            </div>
                        `;
                        container.insertAdjacentHTML('beforeend', blogHTML); // Append without replacing existing content
                    });
                }

                // Initially display the first 6 blogs
                displayBlogs(currentIndex);
                currentIndex += blogsPerPage;

                // Handle "Load More" functionality
                loadMoreButton.addEventListener("click", () => {
                    displayBlogs(currentIndex);
                    currentIndex += blogsPerPage;

                    // If there are no more blogs to load, hide the "Load More" button
                    if (currentIndex >= blogs.length) {
                        loadMoreButton.style.display = "none";
                    }
                });
            }

            // Use event delegation to handle clicks on "Read More" buttons for both pages
            container.addEventListener("click", (event) => {
                if (event.target && event.target.classList.contains("read-more-btn")) {
                    const index = event.target.dataset.index;
                    const blog = blogs[index];

                    // Update modal content with title, date, and content
                    document.getElementById("blogModalTitle").textContent = blog.title;
                    document.getElementById("blogModalDate").textContent = blog.date; // Set the date
                    document.getElementById("blogModalImage").src = blog.image;
                    document.getElementById("blogModalContent").innerHTML = blog.content; // Allow HTML content

                    // Ensure the title and date are on separate lines in the modal
                    document.getElementById("blogModalDate").style.display = "block";
                    document.getElementById("blogModalTitle").style.display = "block";

                    // Show the modal
                    $("#blogModal").modal("show");
                }
            });
        })
        .catch(error => console.error("Error fetching JSON:", error));
});



document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = sectionId;
            }
        });

        // Remove active class from all nav links
        navLinks.forEach((link) => {
            link.classList.remove("active");
        });

        // Add active class to the corresponding nav link
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-item[href*="${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
});

