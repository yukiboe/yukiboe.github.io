window.addEventListener('load', function () {
    // --- 1. ローディング演出（フェードアウト付き） ---
    document.body.classList.add('no-scroll');

    setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        if (loader) {
            loader.style.transition = 'opacity 0.5s';
            loader.style.opacity = '0';

            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 500);
        }
    }, 2000);

    // --- 2. ハンバーガーメニュー ---
    var $button = document.querySelector('.toggle-menu-button');
    var $menu = document.querySelector('.header-site-menu');

    if($button) {
        $button.addEventListener('click', function () {
            if ($menu) { // ✅ Null チェックを追加
                $menu.classList.toggle('is-show');
            }
        });
    }

    // --- 3. ドロップダウンメニュー ---
    var menuTriggers = document.querySelectorAll('.menu-trigger');
    menuTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            var parentMenu = this.closest('.menu');
            var isActive = parentMenu.classList.contains('active');
            
            document.querySelectorAll('.menu').forEach(function(menu) {
                if (menu !== parentMenu) menu.classList.remove('active');
            });
            
            parentMenu.classList.toggle('active');
        });
    });

    // --- 4. 検索機能（ボタン押下で実行） ---
    const searchForm = document.getElementById('searchForm');
    const input = document.getElementById('kikakuSearch');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const filter = input.value.toLowerCase();
            const listItems = document.querySelectorAll('.kikaku-list li');
            let totalVisible = 0;

            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(filter)) {
                    item.classList.remove('is-hidden');
                    totalVisible++;
                } else {
                    item.classList.add('is-hidden');
                }
            });

            const sections = document.querySelectorAll('.ikkai');
            sections.forEach(section => {
                const visibleItemsInSection = section.querySelectorAll('.kikaku-list li:not(.is-hidden)');
                const h2 = section.querySelector('h2');
                if (h2) {
                    h2.classList.toggle('is-hidden', visibleItemsInSection.length === 0);
                }
            });

            let noResultMsg = document.getElementById('no-result-message');
            if (totalVisible === 0 && filter !== "") {
                if (!noResultMsg) {
                    noResultMsg = document.createElement('p');
                    noResultMsg.id = 'no-result-message';
                    noResultMsg.innerText = '該当する企画が見つかりませんでした。';
                    const contents = document.querySelector('.kikaku-contents');
                    if (contents) { // ✅ Null チェックを追加
                        contents.appendChild(noResultMsg);
                    }
                }
            } else if (noResultMsg) {
                noResultMsg.remove();
            }
        });
    }
    
    if (input && searchForm) {
        input.addEventListener('input', () => {
            searchForm.dispatchEvent(new Event('submit'));
        });
    }

    // ✅ スケジュール関連のコードを load イベント内に移動
    const allSchedules = {
        1: {
            "music-room": [
                { name: "Oblio Trio Nostalgico", start: "10:30", end: "11:10" },
                { name: "PandA", start: "11:20", end: "11:50" },
                { name: "ナマラメンコイズ", start: "12:00", end: "12:30" },
                { name: "AsRicotta", start: "12:50", end: "13:20" },
                { name: "狂言", start: "13:40", end: "14:40" }
            ],
            "outdoor": [
                { name: "15Hz", start: "09:40", end: "9:50" },
                { name: "アライグマの友情", start: "10:10", end: "10:40" },
                { name: "Queen of YAMATAIKOKU", start: "10:50", end: "11:20" },
                { name: "AsRicotta", start: "11:40", end: "13:00" },
                { name: "うに醤油", start: "14:10", end: "14:20" }
            ],
            "arena": [
                { name: "コーラス部", start: "09:20", end: "10:10" },
                { name: "うばらハーモニー", start: "10:10", end: "10:30" },
                { name: "ASTAクイズ班", start: "11:10", end: "11:40" },
                { name: "演劇部", start: "12:50", end: "13:20" },
                { name: "吹奏楽部", start: "14:00", end: "14:50" }
            ]
        },
        2: {
            "music-room": [ { name: "閉会式", start: "14:00", end: "15:00" } ],
            "outdoor": [ { name: "有志バンド", start: "10:00", end: "12:00" } ],
            "arena": [
                { name: "吹奏楽部", start: "09:20", end: "10:10" },
                { name: "ASTAクイズ班", start: "11:10", end: "11:50" },
                { name: "演劇部", start: "12:30", end: "13:00" },
                { name: "コーラス部", start: "13:30", end: "14:20" }
            ]
        }
    };

    let currentDay = 1;
    let currentVenue = "music-room";

    // --- タブ切り替え関数 ---
    window.switchDay = function(dayNum) {
        currentDay = dayNum;
        document.querySelectorAll('.day-selector .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.id === `btn-day${dayNum}`);
        });
        updateDisplay();
    };

    window.switchVenue = function(venueId) {
        currentVenue = venueId;
        const venueNames = {"music-room":"音楽室", "outdoor":"屋外", "arena":"第1"};
        const targetText = venueNames[venueId];

        const venueTabs = document.querySelectorAll('.tab-menu:not(.day-selector) .tab-btn');
        venueTabs.forEach(btn => {
            btn.classList.toggle('active', btn.innerText.includes(targetText));
        });
        updateDisplay();
    };

    function getVenueFullName(id) {
        const names = {"music-room":"音楽室", "outdoor":"屋外ステージ", "arena":"第1アリーナ"};
        return names[id];
    }

    // --- メイン表示更新 ---
    function updateDisplay() {
        const now = new Date();
        const eventDate = new Date('2026-05-15T00:00:00');
        let currentMinutes;

        if (now < eventDate) {
            currentMinutes = 9 * 60;
        } else {
            currentMinutes = now.getHours() * 60 + now.getMinutes();
        }

        const schedule = allSchedules[currentDay][currentVenue] || [];
        schedule.sort((a, b) => a.start.localeCompare(b.start));

        const venueLabel = document.getElementById('current-venue-label');
        if (venueLabel) { // ✅ Null チェックを追加
            venueLabel.innerText = `${getVenueFullName(currentVenue)} - DAY ${currentDay} LIVE`;
        }

        let tableHtml = "";
        let currentMatch = null;

        schedule.forEach(event => {
            const [sH, sM] = event.start.split(':').map(Number);
            const [eH, eM] = event.end.split(':').map(Number);
            const start = sH * 60 + sM;
            const end = eH * 60 + eM;

            let rowClass = "";
            let status = "待機中";

            if (currentMinutes >= start && currentMinutes < end) {
                rowClass = "row-active";
                status = '<span class="live-dot"></span>上演中';
                currentMatch = { ...event, startMin: start, endMin: end };
            } else if (currentMinutes >= end) {
                status = "終了";
            }

            tableHtml += `<tr class="${rowClass}">
                <td>${event.start}-${event.end}</td>
                <td>${event.name}</td>
                <td>${status}</td>
            </tr>`;
        });

        const timetableBody = document.getElementById('timetable-body');
        if (timetableBody) { // ✅ Null チェックを追加
            timetableBody.innerHTML = tableHtml || '<tr><td colspan="3">予定はありません</td></tr>';
        }

        const titleEl = document.getElementById('current-title');
        const timeRangeEl = document.getElementById('current-time-range');
        const progressBar = document.getElementById('progress-bar');

        if (currentMatch && titleEl && timeRangeEl && progressBar) {
            titleEl.innerText = currentMatch.name;
            timeRangeEl.innerText = `${currentMatch.start} - ${currentMatch.end}`;
            const diff = currentMatch.endMin - currentMatch.startMin;
            const progress = diff > 0 ? ((currentMinutes - currentMatch.startMin) / diff) * 100 : 100;
            progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
        } else if (titleEl && timeRangeEl && progressBar) {
            titleEl.innerText = "公演時間外";
            timeRangeEl.innerText = "--:-- - --:--";
            progressBar.style.width = "0%";
        }
    }

    // 起動処理
    if (document.getElementById('timetable-body')) {
        updateDisplay();
        setInterval(updateDisplay, 30000);
    }
});

// パンフレットのスクロール
function scrollBtn(direction) {
    const viewer = document.getElementById('viewer');
    if (viewer) { // ✅ Null チェックを追加
        const scrollAmount = viewer.clientWidth;
        viewer.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
    }
}
