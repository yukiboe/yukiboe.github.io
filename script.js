document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navWrapper = document.querySelector(".nav-wrapper");
    const menuMask = document.querySelector(".menu-mask");

    if (!hamburgerMenu || !navWrapper || !menuMask) {
        console.error("必要な要素が見つかりません。クラス名を確認してください。");
        return;
    }

    // メニューを開く
    hamburgerMenu.addEventListener("click", () => {
        navWrapper.classList.toggle("open");
        menuMask.classList.toggle("active");
    });

    // メニューを閉じる
    menuMask.addEventListener("click", () => {
        navWrapper.classList.remove("open");
        menuMask.classList.remove("active");
    });
});