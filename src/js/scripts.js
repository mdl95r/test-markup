document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.js-burger-btn'),
        mobMenu = document.querySelector('.js-mob-menu'),
        menuLev2 = document.querySelectorAll('.js-submenu'),
        menuLev3 = document.querySelectorAll('.dropdown-menu__content'),
        menuItems = document.querySelectorAll('.js-dropdown-menu.header__list-link_dropdown'),
        backBtnLev2 = document.querySelectorAll('.js-lev2-back-btn'),
        backBtnLev3 = document.querySelectorAll('.js-lev3-back-btn'),
        subMenu3Items = document.querySelectorAll('.js-menu-lev3'),
        newsSlider = document.querySelector('.news-block .swiper-container'),
        hero = document.querySelector('.hero-block'),
        carsSubmenu = document.querySelectorAll('.js-submenu[data-menu-lev-2="0"] .js-menu-lev3'),
        closeSubMenuBtn = document.querySelectorAll('.js-close-submenu-btn');

    burgerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('header__burger-btn_active');
        if (burgerBtn.classList.contains('header__burger-btn_active')) {
            mobMenu.classList.add('header__mob-menu_active');
        } else {
            mobMenu.classList.remove('header__mob-menu_active');
            hideAllSubmenu();
        }
    })

    const hideAllSubmenu = () => {
        const dropDownMenuItemHidden = document.querySelector('.dropdown-menu__dropdown-menu-items.dropdown-menu__dropdown-menu-items_hidden');
        menuLev2.forEach((item) => {
            if (item.classList.contains('dropdown-menu_active')) {
                item.classList.remove('dropdown-menu_active');
                removeHover();
            }
        })
        menuLev3.forEach((item) => {
            if (item.classList.contains('dropdown-menu__content_active')) {
                item.classList.remove('dropdown-menu__content_active');
                dropDownMenuItemHidden.classList.remove('dropdown-menu__dropdown-menu-items_hidden');
            }
        })
    }

    window.addEventListener('resize', () => {
        burgerBtn.classList.remove('header__burger-btn_active');
        mobMenu.classList.remove('header__mob-menu_active');
        hideAllSubmenu();
    })

    menuItems.forEach((item) => {
        const idMenu = item.dataset.menuItem;
        item.addEventListener('click', function (e) {
            e.preventDefault();
            hideAllSubmenu();
            hideAllMenu();
            this.classList.add('header__list-link_active');
            showSubmenuLev2(idMenu);
        })
    })

    const removeHover = () => {
        menuItems.forEach((item) => {
            item.classList.remove('header__list-link_active');
        })
    }

    const showSubmenuLev2 = (id) => {
        const currentSubmenu = document.querySelector(`.js-submenu[data-menu-lev-2='${id}']`);
        currentSubmenu.classList.add('dropdown-menu_active');
    }

    const showSubmenuLev3 = (id) => {
        const hideMenuLev2 = document.querySelector('.js-submenu.dropdown-menu_active');
        hideMenuLev2.querySelector('.dropdown-menu__dropdown-menu-items').classList.add('dropdown-menu__dropdown-menu-items_hidden');
        const currentSubmenu = document.querySelector(`.dropdown-menu_active .dropdown-menu__menu-lev-3 .dropdown-menu__content[data-submenu-lev3='${id}']`);

        menuLev3.forEach((item) => {
            if (item.classList.contains('dropdown-menu__content_active')) {
                item.classList.remove('dropdown-menu__content_active');
            }
        })

        currentSubmenu.classList.add('dropdown-menu__content_active');
    }

    backBtnLev2.forEach((item) => {
        item.addEventListener('click', () => {
            const currentActiveSubmenu = document.querySelector('.js-submenu.dropdown-menu_active');
            currentActiveSubmenu.classList.remove('dropdown-menu_active');
            removeHover();
        })
    })

    backBtnLev3.forEach((item) => {
        item.addEventListener('click', () => {
            item.closest('.dropdown-menu__content.dropdown-menu__content_active').classList.remove('dropdown-menu__content_active');
            item.closest('.dropdown-menu__dropdown-menu-items.dropdown-menu__dropdown-menu-items_hidden').classList.remove('dropdown-menu__dropdown-menu-items_hidden');
        })
    })

    closeSubMenuBtn.forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelector('.js-submenu.dropdown-menu_active').classList.remove('dropdown-menu_active');
            document.querySelector('.js-dropdown-menu.header__list-link_active').classList.remove('header__list-link_active');
        })
    })

    const hideAllMenu = () => {
        menuItems.forEach((item) => {
            item.classList.remove('header__list-link_active');
        })
    }

    document.addEventListener('click', (e) => {
        const trg = e.target
        const submenuActive = document.querySelector('.js-submenu.dropdown-menu_active');
        if (submenuActive) {
            if (!trg.closest('.js-submenu') && !trg.classList.contains('js-dropdown-menu')) {
                submenuActive.classList.remove('dropdown-menu_active');
                removeHover();
            }
        }
    })

    if (hero) {
        new Swiper('.hero-block .swiper-container', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            // autoplay: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                renderBullet: (index, className) => `<span class=${className}>${(index + 1)}</span>`
            },
        })
    }

    const heroBtnDown = document.querySelector('.js-hero-down');
    if (heroBtnDown) {
        heroBtnDown.addEventListener('click', function () {
            const chooseCarOffset = document.querySelector('.car-stock-block').offsetTop;
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: chooseCarOffset - headerHeight,
                behavior: 'smooth',
            })
        })
    }
    const triggerFixedNavbar = document.querySelectorAll('.js-fixed-sidebar-trigger');

    triggerFixedNavbar.forEach((item) => {
        item.addEventListener('mouseover', function (e) {
            e.target.closest('.js-fixed-sidebar-trigger').querySelector('.js-fixed-sidebar-hidden').classList.add('fixed-sidebar__hidden-part_show')
        })
        item.addEventListener('mouseout', (e) => {
            e.target.closest('.js-fixed-sidebar-trigger').querySelector('.js-fixed-sidebar-hidden').classList.remove('fixed-sidebar__hidden-part_show')
        })
    })

    if (newsSlider) {
        const breakpoint = window.matchMedia('(min-width: 992px)')

        let newsSlider;
        const breakpointChecker = () => {
            if (breakpoint.matches) {
                if (newsSlider !== undefined) {
                    newsSlider.destroy(true, true);
                }
            } else {
                enableSwiper();
            }
        };

        const enableSwiper = () => {
            newsSlider = new Swiper('.news-block .swiper-container', {
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 1000,
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
            });
        };

        breakpoint.addListener(breakpointChecker)

        breakpointChecker();
    }

    if (window.matchMedia('(max-width: 1200px)').matches) {
        subMenu3Items.forEach((item) => {
            const idMenu = item.dataset.menuLev3;
            item.addEventListener('click', (e) => {
                e.preventDefault();
                showSubmenuLev3(idMenu);
            })
        })
    }

    carsSubmenu.forEach(item => {
        const idMenu = item.dataset.menuLev3;
        item.addEventListener('mouseover', () => {
            showSubmenuLev3(idMenu);
        })
    })
})
