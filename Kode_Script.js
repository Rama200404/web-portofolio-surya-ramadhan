// =========================================================
// SURYA RAMADHAN — PORTFOLIO JAVASCRIPT
// UPDATED:
// - Dark / Light mode
// - Project slideshow
// - Maximum 20 project images
// - Thumbnail navigation
// - Full image modal
// - Keyboard navigation
// - Touch / Swipe support
// =========================================================


/* =========================================================
   PROJECT IMAGE CONFIGURATION
=========================================================

   MASUKKAN MAKSIMAL 20 FOTO DI BAGIAN INI.

   Contoh:

   "projek-1.jpg"
   "projek-2.jpg"
   "projek-3.jpg"

   dst.

   Kalau belum punya 20 foto, cukup masukkan foto yang sudah ada.

========================================================= */

const projectImages = [

    "project.png",
    "dokumentasi_login.png",
    "dokumentasi_homepage.png",
    "dokumentasi_faq.png",
    "dokumentasi_pengaduan.png",
    "dokumentasi_status_pengaduan.png",
    "dokumentasi_req_email.png",
    "dokumentasi_status_reqemail.png",
    "dokumentasi_rating.png",
    "alur_email.png",
    "alur_info_alat.png",
    "alur_rating.png"

];


/* =========================================================
   PROJECT SLIDER STATE
========================================================= */

let currentProjectSlide = 0;


/* =========================================================
   TOUCH / SWIPE STATE
========================================================= */

let projectTouchStartX = 0;
let projectTouchEndX = 0;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggleButton =
        document.getElementById('theme-toggle');

    const themeIcon =
        themeToggleButton
            ? themeToggleButton.querySelector('i')
            : null;


    let currentTheme = 'light';


    try {

        currentTheme =
            localStorage.getItem('theme') || 'light';

    } catch (error) {

        currentTheme = 'light';

    }


    /* =====================================================
       APPLY INITIAL THEME
    ===================================================== */

    if (currentTheme === 'dark') {

        document.documentElement.setAttribute(
            'data-theme',
            'dark'
        );

        if (themeIcon) {

            themeIcon.className =
                'fa-solid fa-sun';

        }

    } else {

        document.documentElement.removeAttribute(
            'data-theme'
        );

        if (themeIcon) {

            themeIcon.className =
                'fa-solid fa-moon';

        }

    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    if (themeToggleButton) {

        themeToggleButton.addEventListener(
            'click',
            () => {

                const activeTheme =
                    document.documentElement.getAttribute(
                        'data-theme'
                    );


                if (activeTheme === 'dark') {

                    document.documentElement.removeAttribute(
                        'data-theme'
                    );


                    try {

                        localStorage.setItem(
                            'theme',
                            'light'
                        );

                    } catch (error) {

                        // Local storage tidak tersedia.
                        // Tema tetap berhasil diubah.

                    }


                    if (themeIcon) {

                        themeIcon.className =
                            'fa-solid fa-moon';

                    }

                } else {

                    document.documentElement.setAttribute(
                        'data-theme',
                        'dark'
                    );


                    try {

                        localStorage.setItem(
                            'theme',
                            'dark'
                        );

                    } catch (error) {

                        // Local storage tidak tersedia.
                        // Tema tetap berhasil diubah.

                    }


                    if (themeIcon) {

                        themeIcon.className =
                            'fa-solid fa-sun';

                    }

                }

            }
        );

    }


    /* =====================================================
       INITIALIZE PROJECT SLIDER
    ===================================================== */

    initializeProjectSlider();


    /* =====================================================
       INITIALIZE TOUCH / SWIPE
    ===================================================== */

    initializeProjectTouch();


    /* =====================================================
       ESCAPE + KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        'keydown',
        event => {

            const modal =
                document.getElementById(
                    'fullCertModal'
                );


            const modalIsOpen =
                modal &&
                (
                    modal.style.display === 'flex' ||
                    modal.classList.contains('active') ||
                    modal.classList.contains('show')
                );


            /* =================================================
               ESC = CLOSE MODAL
            ================================================= */

            if (event.key === 'Escape') {

                if (modalIsOpen) {

                    closeFullCert();

                }

                return;

            }


            /* =================================================
               KEYBOARD SLIDER
            ================================================= */

            if (!modalIsOpen) {

                if (event.key === 'ArrowLeft') {

                    changeProjectSlide(-1);

                }


                if (event.key === 'ArrowRight') {

                    changeProjectSlide(1);

                }

            }

        }
    );


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    const fullCertModal =
        document.getElementById(
            'fullCertModal'
        );


    if (fullCertModal) {

        fullCertModal.addEventListener(
            'click',
            event => {

                if (
                    event.target ===
                    fullCertModal
                ) {

                    closeFullCert();

                }

            }
        );

    }

});


/* =========================================================
   INITIALIZE PROJECT SLIDER
========================================================= */

function initializeProjectSlider() {

    const imageElement =
        document.getElementById(
            'projectSlideImage'
        );

    const totalElement =
        document.getElementById(
            'projectTotalNumber'
        );

    const thumbnailContainer =
        document.getElementById(
            'projectThumbnails'
        );


    if (
        !imageElement ||
        !totalElement ||
        !thumbnailContainer
    ) {

        return;

    }


    /* =====================================================
       LIMIT IMAGE TO MAXIMUM 20
    ===================================================== */

    const limitedImages =
        projectImages.slice(0, 20);


    if (limitedImages.length === 0) {

        return;

    }


    /* =====================================================
       TOTAL IMAGE
    ===================================================== */

    totalElement.innerText =
        limitedImages.length;


    /* =====================================================
       SET FIRST IMAGE
    ===================================================== */

    currentProjectSlide = 0;


    updateProjectSlide();


    /* =====================================================
       CREATE THUMBNAILS
    ===================================================== */

    thumbnailContainer.innerHTML = '';


    limitedImages.forEach(
        (imageSrc, index) => {

            const thumbnail =
                document.createElement('button');


            thumbnail.type =
                'button';


            thumbnail.className =
                'project-thumbnail';


            if (index === 0) {

                thumbnail.classList.add(
                    'active'
                );

            }


            thumbnail.setAttribute(
                'aria-label',
                `Lihat foto proyek ${index + 1}`
            );


            thumbnail.innerHTML = `

                <img
                    src="${imageSrc}"
                    alt="Thumbnail proyek ${index + 1}"
                    onerror="this.style.opacity='0.25'"
                >

                <span class="project-thumbnail-number">
                    ${index + 1}
                </span>

            `;


            thumbnail.addEventListener(
                'click',
                () => {

                    goToProjectSlide(index);

                }
            );


            thumbnailContainer.appendChild(
                thumbnail
            );

        }
    );

}


/* =========================================================
   UPDATE PROJECT SLIDE
========================================================= */

function updateProjectSlide() {

    const imageElement =
        document.getElementById(
            'projectSlideImage'
        );

    const currentNumberElement =
        document.getElementById(
            'projectCurrentNumber'
        );

    const totalNumberElement =
        document.getElementById(
            'projectTotalNumber'
        );

    const progressBar =
        document.getElementById(
            'projectProgressBar'
        );

    const slideInfo =
        document.getElementById(
            'projectSlideInfo'
        );

    const thumbnails =
        document.querySelectorAll(
            '.project-thumbnail'
        );


    if (!imageElement) {

        return;

    }


    /* =====================================================
       TOTAL IMAGE
    ===================================================== */

    const totalImages =
        Math.min(
            projectImages.length,
            20
        );


    if (totalImages === 0) {

        return;

    }


    /* =====================================================
       PREVENT INVALID INDEX
    ===================================================== */

    if (
        currentProjectSlide < 0
    ) {

        currentProjectSlide =
            totalImages - 1;

    }


    if (
        currentProjectSlide >= totalImages
    ) {

        currentProjectSlide = 0;

    }


    /* =====================================================
       IMAGE
    ===================================================== */

    const currentImage =
        projectImages[
            currentProjectSlide
        ];


    imageElement.src =
        currentImage;


    imageElement.alt =
        `Dokumentasi Proyek ${currentProjectSlide + 1}`;


    /* =====================================================
       NUMBER
    ===================================================== */

    if (currentNumberElement) {

        currentNumberElement.innerText =
            currentProjectSlide + 1;

    }


    if (totalNumberElement) {

        totalNumberElement.innerText =
            totalImages;

    }


    /* =====================================================
       SLIDE INFO
    ===================================================== */

    if (slideInfo) {

        slideInfo.innerText =
            `Foto ${currentProjectSlide + 1} dari ${totalImages}`;

    }


    /* =====================================================
       PROGRESS BAR
    ===================================================== */

    if (progressBar) {

        const percentage =
            (
                (currentProjectSlide + 1)
                /
                totalImages
            ) * 100;


        progressBar.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       ACTIVE THUMBNAIL
    ===================================================== */

    thumbnails.forEach(
        (thumbnail, index) => {

            thumbnail.classList.toggle(
                'active',
                index === currentProjectSlide
            );

        }
    );


    /* =====================================================
       AUTO SCROLL ACTIVE THUMBNAIL
    ===================================================== */

    const activeThumbnail =
        document.querySelector(
            '.project-thumbnail.active'
        );


    if (activeThumbnail) {

        activeThumbnail.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });

    }

}


/* =========================================================
   NEXT / PREVIOUS SLIDE
========================================================= */

function changeProjectSlide(direction) {

    const totalImages =
        Math.min(
            projectImages.length,
            20
        );


    if (totalImages === 0) {

        return;

    }


    currentProjectSlide +=
        direction;


    /* =====================================================
       LOOP TO FIRST IMAGE
    ===================================================== */

    if (
        currentProjectSlide >=
        totalImages
    ) {

        currentProjectSlide = 0;

    }


    /* =====================================================
       LOOP TO LAST IMAGE
    ===================================================== */

    if (
        currentProjectSlide < 0
    ) {

        currentProjectSlide =
            totalImages - 1;

    }


    updateProjectSlide();

}


/* =========================================================
   GO TO SPECIFIC SLIDE
========================================================= */

function goToProjectSlide(index) {

    const totalImages =
        Math.min(
            projectImages.length,
            20
        );


    if (
        index < 0 ||
        index >= totalImages
    ) {

        return;

    }


    currentProjectSlide =
        index;


    updateProjectSlide();

}


/* =========================================================
   OPEN CURRENT PROJECT IMAGE
========================================================= */

function openCurrentProjectImage() {

    const totalImages =
        Math.min(
            projectImages.length,
            20
        );


    if (totalImages === 0) {

        return;

    }


    if (
        currentProjectSlide < 0 ||
        currentProjectSlide >= totalImages
    ) {

        currentProjectSlide = 0;

    }


    const imageSrc =
        projectImages[
            currentProjectSlide
        ];


    if (!imageSrc) {

        return;

    }


    const title =
        `Dokumentasi Proyek — Foto ${currentProjectSlide + 1}`;


    viewFullCert(
        imageSrc,
        title
    );

}


/* =========================================================
   PROJECT IMAGE ERROR HANDLER
========================================================= */

function handleProjectImageError(imageElement) {

    if (!imageElement) {

        return;

    }


    imageElement.onerror =
        null;


    imageElement.src =
        'https://via.placeholder.com/1200x700?text=Upload+Foto+Proyek';

}


/* =========================================================
   GLOBAL MODAL / FULL IMAGE PREVIEW
========================================================= */

function viewFullCert(
    imageSrc,
    titleText
) {

    const fullModal =
        document.getElementById(
            'fullCertModal'
        );

    const fullImg =
        document.getElementById(
            'fullCertImg'
        );

    const fullTitle =
        document.getElementById(
            'fullCertTitle'
        );

    const downloadBtn =
        document.getElementById(
            'downloadCertBtn'
        );


    if (
        !fullModal ||
        !fullImg ||
        !fullTitle
    ) {

        return;

    }


    /* =====================================================
       VALIDATE IMAGE
    ===================================================== */

    if (!imageSrc) {

        return;

    }


    /* =====================================================
       SET IMAGE
    ===================================================== */

    fullImg.src =
        imageSrc;


    fullImg.alt =
        titleText || 'Dokumentasi Full';


    fullTitle.innerText =
        titleText || 'Dokumentasi Full';


    /* =====================================================
       DOWNLOAD / OPEN ORIGINAL IMAGE
    ===================================================== */

    if (downloadBtn) {

        downloadBtn.href =
            imageSrc;

        downloadBtn.setAttribute(
            'download',
            ''
        );

    }


    /* =====================================================
       SHOW MODAL
    ===================================================== */

    fullModal.style.display =
        'flex';


    fullModal.classList.add(
        'active'
    );


    fullModal.setAttribute(
        'aria-hidden',
        'false'
    );


    /* =====================================================
       LOCK BODY SCROLL
    ===================================================== */

    document.body.style.overflow =
        'hidden';

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeFullCert() {

    const fullModal =
        document.getElementById(
            'fullCertModal'
        );


    if (!fullModal) {

        return;

    }


    /* =====================================================
       HIDE MODAL
    ===================================================== */

    fullModal.style.display =
        'none';


    fullModal.classList.remove(
        'active'
    );


    fullModal.classList.remove(
        'show'
    );


    fullModal.setAttribute(
        'aria-hidden',
        'true'
    );


    /* =====================================================
       RESTORE BODY SCROLL
    ===================================================== */

    document.body.style.overflow =
        '';


    /* =====================================================
       CLEAR IMAGE
    ===================================================== */

    const fullImg =
        document.getElementById(
            'fullCertImg'
        );


    if (fullImg) {

        setTimeout(
            () => {

                if (
                    fullModal.style.display ===
                    'none'
                ) {

                    fullImg.src =
                        '';

                }

            },
            200
        );

    }

}


/* =========================================================
   INITIALIZE PROJECT TOUCH / SWIPE
========================================================= */

function initializeProjectTouch() {

    const projectSlider =
        document.querySelector(
            '.project-slider'
        );


    if (!projectSlider) {

        return;

    }


    projectSlider.addEventListener(
        'touchstart',
        event => {

            if (
                !event.changedTouches ||
                !event.changedTouches[0]
            ) {

                return;

            }


            projectTouchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    projectSlider.addEventListener(
        'touchend',
        event => {

            if (
                !event.changedTouches ||
                !event.changedTouches[0]
            ) {

                return;

            }


            projectTouchEndX =
                event.changedTouches[0].screenX;


            handleProjectSwipe();

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   HANDLE PROJECT SWIPE
========================================================= */

function handleProjectSwipe() {

    const swipeDistance =
        projectTouchEndX -
        projectTouchStartX;


    const minimumSwipe =
        45;


    if (
        Math.abs(swipeDistance) <
        minimumSwipe
    ) {

        return;

    }


    /* =====================================================
       SWIPE LEFT = NEXT
    ===================================================== */

    if (
        swipeDistance < 0
    ) {

        changeProjectSlide(1);

    }


    /* =====================================================
       SWIPE RIGHT = PREVIOUS
    ===================================================== */

    else {

        changeProjectSlide(-1);

    }

}


/* =========================================================
   CV MODAL
   TAMBAHAN UNTUK MENYESUAIKAN DENGAN HTML
========================================================= */


/* =========================================================
   OPEN CV MODAL
========================================================= */

function openCVModal() {

    const cvModal =
        document.getElementById(
            'cvModal'
        );


    if (!cvModal) {

        return;

    }


    /* =====================================================
       SHOW CV MODAL
    ===================================================== */

    cvModal.style.display =
        'flex';


    cvModal.classList.add(
        'active'
    );


    cvModal.setAttribute(
        'aria-hidden',
        'false'
    );


    /* =====================================================
       LOCK BODY SCROLL
    ===================================================== */

    document.body.style.overflow =
        'hidden';

}


/* =========================================================
   CLOSE CV MODAL
========================================================= */

function closeCVModal() {

    const cvModal =
        document.getElementById(
            'cvModal'
        );


    if (!cvModal) {

        return;

    }


    /* =====================================================
       HIDE CV MODAL
    ===================================================== */

    cvModal.style.display =
        'none';


    cvModal.classList.remove(
        'active'
    );


    cvModal.classList.remove(
        'show'
    );


    cvModal.setAttribute(
        'aria-hidden',
        'true'
    );


    /* =====================================================
       RESTORE BODY SCROLL
    ===================================================== */

    document.body.style.overflow =
        '';

}


/* =========================================================
   CV MODAL CLICK OUTSIDE
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const cvModal =
            document.getElementById(
                'cvModal'
            );


        if (!cvModal) {

            return;

        }


        cvModal.addEventListener(
            'click',
            event => {

                if (
                    event.target ===
                    cvModal
                ) {

                    closeCVModal();

                }

            }
        );

    }
);


/* =========================================================
   CV MODAL KEYBOARD
========================================================= */

document.addEventListener(
    'keydown',
    event => {

        if (
            event.key !== 'Escape'
        ) {

            return;

        }


        const cvModal =
            document.getElementById(
                'cvModal'
            );


        if (!cvModal) {

            return;

        }


        const cvModalIsOpen =
            cvModal.style.display === 'flex' ||
            cvModal.classList.contains('active') ||
            cvModal.classList.contains('show');


        if (
            cvModalIsOpen
        ) {

            closeCVModal();

        }

    }
);