const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 100,
    // autoHeight: true,
    slidesPerView: 3,
    spaceBetween: 130,
    mousewheel: true,
    grabCursor: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },

    // автослайдинг
    autoplay: {
        // периодичность
        delay: 5000,
        // отключение при взаимодействии
        disableOnInteraction: false,
        // пауза при наведении мыши
        pauseOnMouseEnter: true,
    },

    breakpoints: {
        280: {
            slidesPerView: 1,
        },

        800: {
            slidesPerView: 3,
            spaceBetween: 50,
        },

        1600: {
            spaceBetween: 130,
        },
    },
    // freeMode: true,
    // If we need pagination
    // pagination: {
    //     el: '.swiper-pagination',
    // },

    // Navigation arrows
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});


// Настройка слайдов и взаимодействия с ними
swiper.slides.forEach((slide, index) => {
    // Получаем высоту слайда
    const cardHeight = slide.clientHeight;
    // Устанавливаем явную высоту слайда
    slide.style.height = cardHeight + 'px';

    // дополнительные настройки при наведении курсора
    slide.addEventListener('mouseenter', () => {
        // Остановим автоматическую прокрутку слайдов при наведении курсора
        swiper.autoplay.stop();
    });

    slide.addEventListener('mouseleave', () => {
        // Запустим автоматическую прокрутку слайдов при уходе курсора
        swiper.autoplay.start();
    });

    // настройка клика по слайду
    slide.addEventListener('click', () => {
        // Проверим, отображается ли больше одного слайда
        if (swiper.params.slidesPerView > 1) {
            // Если текущий слайд активен, перейдем на предыдущий слайд
            if (slide.classList.contains('swiper-slide-active')) {
                swiper.slidePrev(300);
            }
            // Если не активен, и индекс не равен 0, перейдем на предыдущий слайд
            else if (index != 0) {
                swiper.slideToLoop(index - 1, 300);
            }
            // Иначе, если индекс равен 0, перейдем на последний слайд
            else {
                swiper.slideToLoop(swiper.slides.length - 1, 300);
            }
        }
    });
});

// Получаем все элементы <details> внутри слайдов
const detailsElements = document.querySelectorAll('.swiper-slide details');

// Добавляем обработчик события toggle каждому элементу <details>
detailsElements.forEach(function (details) {
    // Находим родительский слайд
    const slide = details.closest('.swiper-slide');
    let cardHeight;

    details.addEventListener('toggle', function () {
        // Если слайд найден, обновляем его размер
        if (slide) {
            if (details.open) {
                cardHeight = slide.clientHeight;
                const detailsHeight = slide.querySelector('.card__details').clientHeight;
                slide.style.height = detailsHeight + 'px';
            } else {
                // Восстанавливаем исходную высоту слайда
                slide.style.height = cardHeight + 'px';
            }
        };
    });
});


window.addEventListener('resize', function () {
    swiper.slides.forEach(slide => {
        //Закрываем все детали внутри слайдов 
        const details = slide.querySelector('details');
        if (details) {
            details.removeAttribute('open');
        }

        // Делаем расчет высоты автоматическим
        setTimeout(() => {
            slide.style.height = '';
        }, 30)

        // Установим явную высоту слайда
        setTimeout(() => {
            slide.style.height = slide.clientHeight + 'px';
        }, 30)
    });
});


// Подключение библиотеки Hyphenopoly для разбиения слов на слоги

Hyphenopoly.config({
    require: {
        "en-us": "Supercalifragilisticexpialidocious",
        "ru": "Гидроэлектростанция"
    },

    setup: {
        // Основной язык
        defaultLanguage: "ru",
        // Селекторы для переносов
        selectors: {
            ".header": {}
        }
    },
    paths: {
        "patterndir": "../js/Hyphenopoly/patterns/",
        "maindir": "../js/Hyphenopoly/"
    }
});