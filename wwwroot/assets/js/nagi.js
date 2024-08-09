window.RenderNav = {
    select: (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    },

    on: (type, el, listener, all = false) => {
        let selectElem = RenderNav.select(el, all);
        if (selectElem) {
            if (all) {
                selectElem.forEach(e => e.addEventListener(type, listener));
            } else {
                selectElem.addEventListener(type, listener);
            }
        }
    },

    scrollto: (el) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    handleNavClick: function (e) {
        let section = RenderNav.select(this.hash);
        if (section) {
            e.preventDefault();
            let logo = RenderNav.select('#logo-top');
            let home = RenderNav.select('#home');
            let sections = RenderNav.select('section', true);
            let navLinks = RenderNav.select('#navbar .nav-link', true);
            navLinks.forEach((item) => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            if (this.hash == '#home') {
                home.classList.remove('nav-top');
                logo.classList.remove('nav-top');
                sections.forEach((item) => {
                    item.classList.remove('section-show');
                });
                return;
            }
            if (!home.classList.contains('nav-top')) {
                home.classList.add('nav-top');
                logo.classList.add('nav-top');
                setTimeout(function () {
                    sections.forEach((item) => {
                        item.classList.remove('section-show');
                    });
                    section.classList.add('section-show');
                }, 350);
            } else {
                sections.forEach((item) => {
                    item.classList.remove('section-show');
                });
                section.classList.add('section-show');
            }
            RenderNav.scrollto(this.hash);
        }
    },
    
    initialize: function () {
        RenderNav.on('click', '#navbar .nav-link', RenderNav.handleNavClick, true);

        if (window.location.hash) {
            let initial_nav = RenderNav.select(window.location.hash);
            if (initial_nav) {
                let logo = RenderNav.select('#logo-top');
                let home = RenderNav.select('#home');
                let navLinks = RenderNav.select('#navbar .nav-link', true);
                home.classList.add('nav-top');
                logo.classList.add('nav-top');
                navLinks.forEach((item) => {
                    if (item.getAttribute('href') == window.location.hash) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
                setTimeout(function () {
                    initial_nav.classList.add('section-show');
                }, 350);
                RenderNav.scrollto(window.location.hash);
            }
        }
    }
};

window.RenderTheme = {
    initialize: function () {
        const query = window.matchMedia("(prefers-color-scheme: dark)");
        const themePreference = localStorage.getItem("theme");
        let active = query.matches;
        if (themePreference === "dark") {
            active = true;
        }
        if (themePreference === "light") {
            active = false;
        }
        this.setDarkMode(active);
        query.addListener(e => this.setDarkMode(e.matches));
        const toggleButton = document.querySelector(".theme-toggle");
        toggleButton.addEventListener("click", this.toggleDarkMode.bind(this));
    },
    setDarkMode: function (active = false) {
        const wrapper = document.querySelector(":root");
        const toggleButton = document.querySelector(".theme-toggle");
        const toggleClassName = "theme-toggle--toggled";

        if (active) {
            wrapper.setAttribute("data-theme", "dark");
            toggleButton.classList.remove(toggleClassName);
            localStorage.setItem("theme", "dark");
        } else {
            wrapper.setAttribute("data-theme", "light");
            toggleButton.classList.add(toggleClassName);
            localStorage.setItem("theme", "light");
        }
    },
    toggleDarkMode: function () {
        const theme = document.querySelector(":root").getAttribute("data-theme");
        this.setDarkMode(theme === "light");
    },
};

window.RenderSlider = {
    sliders: [],
    select: (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    },
    initialize: function () {
        let sliderElements = this.select('.card-whiskey-slider', true);
        this.sliders = sliderElements.map(el => new Slider(el));
    }
};

class Slider {
    constructor(element) {
        this.slider = element;
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velX = 0;
        this.momentumID = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.slider.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.slider.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.slider.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.slider.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.slider.addEventListener('wheel', this.handleWheel.bind(this));
    }

    handleMouseDown(e) {
        this.isDown = true;
        this.slider.classList.add('active');
        this.startX = e.pageX - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
        this.cancelMomentumTracking();
    }

    handleMouseLeave() {
        this.isDown = false;
        this.slider.classList.remove('active');
    }

    handleMouseUp() {
        this.isDown = false;
        this.slider.classList.remove('active');
        this.beginMomentumTracking();
    }

    handleMouseMove(e) {
        if (!this.isDown) return;
        const x = e.pageX - this.slider.offsetLeft;
        const walk = (x - this.startX);
        const prevScrollLeft = this.slider.scrollLeft;
        this.slider.scrollLeft = this.scrollLeft - walk;
        this.velX = this.slider.scrollLeft - prevScrollLeft;
    }

    handleWheel(e) {
        this.cancelMomentumTracking();
        e.preventDefault();
        window.requestAnimationFrame(() => {
            this.slider.scrollTo({
                top: 0,
                left: this.slider.scrollLeft + (e.deltaY * 2),
                behavior: "smooth"
            });
        });
    }

    beginMomentumTracking() {
        this.cancelMomentumTracking();
        this.momentumID = requestAnimationFrame(this.momentumLoop.bind(this));
    }

    cancelMomentumTracking() {
        cancelAnimationFrame(this.momentumID);
    }

    momentumLoop() {
        this.slider.scrollLeft += this.velX * 2;
        this.velX *= 0.95;
        if (Math.abs(this.velX) > 0.5) {
            this.momentumID = requestAnimationFrame(this.momentumLoop.bind(this));
        }
    }
}
