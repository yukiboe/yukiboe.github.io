











window.addEventListener('load', function () {
    // --- 1. ローディング演出（フェードアウト付き） ---
    // 1. ページ読み込み開始時にスクロールを禁止
    document.body.classList.add('no-scroll');

    // 2. 2秒後（2000ミリ秒後）に実行
    setTimeout(() => {
        // ローディング画面を消す
        const loader = document.getElementById('loader-wrapper');
        if (loader) {
            loader.style.transition = 'opacity 0.5s';
            loader.style.opacity = '0';

            setTimeout(() => {
                loader.style.display = 'none';
                // 3. スクロール禁止を解除
                document.body.classList.remove('no-scroll');
            }, 500); // フェードアウトの時間分待ってから完全に消す
        }
    }, 2000); // ここで「2秒間」を指定



    // --- 2. ハンバーガーメニュー ---
    var $button = document.querySelector('.toggle-menu-button');
    var $menu = document.querySelector('.header-site-menu');

    if($button) {
        $button.addEventListener('click', function () {
            $menu.classList.toggle('is-show');
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
});

// --- 4. 検索機能（ボタン押下で実行） ---
    const searchForm = document.getElementById('searchForm');
    const input = document.getElementById('kikakuSearch');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); // ページのリロードを防ぐ

            const filter = input.value.toLowerCase();
            const listItems = document.querySelectorAll('.kikaku-list li');
            let totalVisible = 0;

            // 企画の絞り込み実行
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(filter)) {
                    item.classList.remove('is-hidden');
                    totalVisible++;
                } else {
                    item.classList.add('is-hidden');
                }
            });

            // 階数見出しの連動
            const sections = document.querySelectorAll('.ikkai');
            sections.forEach(section => {
                const visibleItemsInSection = section.querySelectorAll('.kikaku-list li:not(.is-hidden)');
                const h2 = section.querySelector('h2');
                if (h2) {
                    h2.classList.toggle('is-hidden', visibleItemsInSection.length === 0);
                }
            });

            // メッセージ処理
            let noResultMsg = document.getElementById('no-result-message');
            if (totalVisible === 0 && filter !== "") {
                if (!noResultMsg) {
                    noResultMsg = document.createElement('p');
                    noResultMsg.id = 'no-result-message';
                    noResultMsg.innerText = '該当する企画が見つかりませんでした。';
                    document.querySelector('.kikaku-contents').appendChild(noResultMsg);
                }
            } else if (noResultMsg) {
                noResultMsg.remove();
            }
        });
    }
    
    // 入力中にリアルタイムで検索を実行（要素が存在する場合のみ）
    if (input && searchForm) {
        input.addEventListener('input', () => {
            searchForm.dispatchEvent(new Event('submit'));
        });
    }

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
            { name: "15Hz", start: "09:30", end: "9:50" },
            { name: "アライグマの友情", start: "10:10", end: "10:40" },
            { name: "Queen of YAMATAIKOKU", start: "10:50", end: "11:20" },
            { name: "AsRicotta", start: "11:40", end: "13:00" },
            { name: "うに醤油", start: "13:10", end: "13:20" },
            { name: "とげたんパレード", start: "13:30", end: "14:00" },
            { name: "うに醤油", start: "14:10", end: "14:20" }
        ],
        "arena": [
            { name: "コーラス部", start: "09:20", end: "10:10" },
            { name: "うばらハーモニー", start: "10:10", end: "10:30" },
            { name: "ASTAクイズ班", start: "11:10", end: "11:50" },
            { name: "演劇部", start: "12:50", end: "13:20" },
            { name: "吹奏楽部", start: "14:00", end: "14:50" }
        ]
    },
    2: {
        "music-room": [ 
            { name: "15Hz", start: "9:10", end: "9:30" }, 
            { name: "Oblio Trio Nostalgico", start: "10:10", end: "10:50" }, 
            { name: "AsRicotta", start: "11:00", end: "11:40" }, 
            { name: "狂言", start: "12:10", end: "13:10" }, 
            { name: "Queen Of YAMATAIKOKU", start: "13:30", end: "14:00" }, 
            { name: "うに醤油", start: "14:10", end: "14:20" } 
            
            
    
                       
                      
                      ],
        "outdoor": [ 
            { name: "ビンゴ大会", start: "9:10", end: "9:50" },
            { name: "うに醤油", start: "10:00", end: "10:10" },
            { name: "のど自慢大会", start: "10:20", end: "11:00" },
            { name: "PandA", start: "11:10", end: "11:40" },
            { name: "AsRicotta", start: "12:00", end: "13:20" },
            { name: "ナマラメンコイズ", start: "13:30", end: "14:00" },
            { name: "ステージフィナーレ", start: "14:20", end: "14:50" }
                   ],
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
    // 会場タブのactive切り替え（ボタン内のテキストで判定）
    const venueNames = {"music-room":"音楽室", "outdoor":"屋外", "arena":"第1"};
    const targetText = venueNames[venueId];

    // .day-selector 以外の tab-btn を対象にする
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
    // 2026年5月15日を基準
    const eventDate = new Date('2026-05-15T00:00:00');
    let currentMinutes;

    if (now < eventDate) {
        currentMinutes = 9 * 60; // 開催前は9:00として表示
    } else {
        currentMinutes = now.getHours() * 60 + now.getMinutes();
    }

    const schedule = allSchedules[currentDay][currentVenue] || [];
    
    // 時間順にソート（データがバラバラでも大丈夫なように）
    schedule.sort((a, b) => a.start.localeCompare(b.start));

    document.getElementById('current-venue-label').innerText = `${getVenueFullName(currentVenue)} - DAY ${currentDay} LIVE`;

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

    document.getElementById('timetable-body').innerHTML = tableHtml || '<tr><td colspan="3">予定はありません</td></tr>';

    // 進行中カードの更新
    const titleEl = document.getElementById('current-title');
    const timeRangeEl = document.getElementById('current-time-range');
    const progressBar = document.getElementById('progress-bar');

    if (currentMatch) {
        titleEl.innerText = currentMatch.name;
        timeRangeEl.innerText = `${currentMatch.start} - ${currentMatch.end}`;
        const diff = currentMatch.endMin - currentMatch.startMin;
        const progress = diff > 0 ? ((currentMinutes - currentMatch.startMin) / diff) * 100 : 100;
        progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
    } else {
        titleEl.innerText = "公演時間外";
        timeRangeEl.innerText = "--:-- - --:--";
        progressBar.style.width = "0%";
    }
}

// 起動処理
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('timetable-body')) {
        updateDisplay();
        setInterval(updateDisplay, 30000); // 30秒ごとに更新
    }
});




//パンフレットのスクロール
function scrollBtn(direction) {
  const viewer = document.getElementById('viewer');
  // 画像1枚分の幅を取得
  const scrollAmount = viewer.clientWidth;
  
  // 現在の位置から左右にスクロール
  viewer.scrollBy({
    left: scrollAmount * direction,
    behavior: 'smooth'
  });
}


