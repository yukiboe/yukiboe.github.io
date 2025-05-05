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
        hamburgerMenu.classList.remove("active"); // ボタンの状態をリセット
    });

    const header = document.querySelector(".page-header");
    const main = document.querySelector("main");

    if (header && main) {
        // ヘッダーの高さを取得
        const headerHeight = header.offsetHeight;

        // ヘッダーの高さ分だけmain要素に余白を追加
        main.style.marginTop = `${headerHeight}px`;

        // ウィンドウサイズが変更されたときにも再計算
        window.addEventListener("resize", () => {
            const updatedHeaderHeight = header.offsetHeight;
            main.style.marginTop = `${updatedHeaderHeight}px`;
        });
    } else {
        console.error("ヘッダーまたはmain要素が見つかりません。");
    }

    const day1Btn = document.getElementById("day1-btn");
    const day2Btn = document.getElementById("day2-btn");
    const day1Img = document.getElementById("day1-img");
    const day2Img = document.getElementById("day2-img");

    day1Btn.addEventListener("click", () => {
        day1Btn.classList.add("active");
        day2Btn.classList.remove("active");
        day1Img.classList.add("visible");
        day1Img.classList.remove("hidden");
        day2Img.classList.add("hidden");
        day2Img.classList.remove("visible");
    });

    day2Btn.addEventListener("click", () => {
        day2Btn.classList.add("active");
        day1Btn.classList.remove("active");
        day2Img.classList.add("visible");
        day2Img.classList.remove("hidden");
        day1Img.classList.add("hidden");
        day1Img.classList.remove("visible");
    });
});