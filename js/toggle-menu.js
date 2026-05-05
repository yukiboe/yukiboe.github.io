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
    1: { // 1日目のデータ
        "music-room": [
            
            { name: "1日目：15Hz", start: "9:40", end: "10:00" },
            { name: "1日目：アライグマの友情", start: "10:20", end: "10:30" },
            { name: "1日目：Queen of YAMATAIKOKU", start: "11:00", end: "11:20" },
            { name: "1日目：ダンス", start: "11:50", end: "13:00" },
            { name: "1日目：うに醤油", start: "13:20", end: "13:30" },
            { name: "1日目：とげたんパレード", start: "10:00", end: "11:00" },
            { name: "1日目：うに醤油", start: "12:00", end: "13:30" },

        ],
        "outdoor": [
            

            { name: "1日目：演劇部「夏空」", start: "09:30", end: "11:30" },
            { name: "1日目：チアリーディング", start: "13:00", end: "14:00" },
            { name: "1日目：演劇部「夏空」", start: "09:30", end: "11:30" },
            { name: "1日目：チアリーディング", start: "13:00", end: "14:00" },
            

        ],
        "arena": [

            { name: "1日目：コーラス部", start: "09:20", end: "10:10" },
            { name: "1日目：うばらハーモニー", start: "10:10", end: "10:30" },
            { name: "1日目：ASTAクイズ班", start: "11:10", end: "11:40" },
            { name: "1日目：演劇部", start: "12:50", end: "13:20" },
            { name: "1日目：吹奏楽部", start: "14:00", end: "14:50" },



        ]
    },
    2: { // 2日目のデータ（ここを自由に編集してください）
        "music-room": [
            { name: "2日目：閉会式", start: "14:00", end: "15:00" }



        ],
        "outdoor": [
            { name: "2日目：有志バンド", start: "10:00", end: "12:00" }
        ],
        "arena": [

            { name: "2日目：吹奏楽部", start: "09:20", end: "10:10" },
            { name: "2日目：ASTAクイズ班", start: "11:10", end: "11:50" },
            { name: "2日目：演劇部", start: "12:30", end: "13:00" },
            { name: "2日目：コーラス部", start: "13:30", end: "14:20" }


        ]
    }
};

let currentDay = 1; // 現在の日数
let currentVenue = "music-room";


function switchDay(dayNum) {
    currentDay = dayNum;

    // 日程タブの見た目切り替え
    document.querySelectorAll('.day-selector .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-day${dayNum}`).classList.add('active');

    updateDisplay();
}

function switchVenue(venueId) {
    currentVenue = venueId;

    // 会場タブのみを対象にする（日選タブのactiveを維持）
    const venueTabs = document.querySelectorAll('.venue-selector .tab-btn');
    venueTabs.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.includes(getVenueName(venueId).substring(0,2))) {
            btn.classList.add('active');
        }
    });

    updateDisplay();
}

function getVenueName(id) {
    const names = {"music-room":"音楽室", "outdoor":"屋外ステージ", "arena":"第1アリーナ"};
    return names[id];
}

function updateDisplay() {
    const now = new Date();

    // 開催日（2026年5月15日）の0:00を基準
    const eventDate = new Date('2026-05-15T00:00:00');

    let currentMinutes;

    // 今日が開催日より前の場合は、開催日の午前9時を使う（公開準備中用）
    if (now < eventDate) {
        currentMinutes = 9 * 60;  // 540分（9:00）
    } else {
        // 開催日以降は、実際の時刻を使う
        currentMinutes = now.getHours() * 60 + now.getMinutes();
    }

    // 日数と会場の両方を指定してスケジュールを取得
    const schedule = allSchedules[currentDay][currentVenue];

    document.getElementById('current-venue-label').innerText = `${getVenueName(currentVenue)} - DAY ${currentDay} LIVE`;

    let tableHtml = "";
    let currentMatch = null;

    schedule.forEach(event => {
        const [sH, sM] = event.start.split(':').map(Number);
        const [eH, eM] = event.end.split(':').map(Number);
        const start = sH * 60 + sM;
        const end = eH * 60 + eM;

        let rowClass = "";
        let status = "待機中";

        // 開始時間と終了時間が同じ（0分イベント）の場合は、その時点で上演中とする
        if (start === end) {
            if (currentMinutes === start) {
                rowClass = "row-active";
                status = '<span class="live-dot"></span>上演中';
                currentMatch = { ...event, startMin: start, endMin: end };
            } else if (currentMinutes < start) {
                status = "待機中";
            } else {
                status = "終了";
            }
        } else if (currentMinutes >= start && currentMinutes < end) {
            rowClass = "row-active";
            status = '<span class="live-dot"></span>上演中';
            currentMatch = { ...event, startMin: start, endMin: end };
        } else if (currentMinutes >= end) {
            status = "終了";
        }

        tableHtml += `<tr class="${rowClass}"><td>${event.start}-${event.end}</td><td>${event.name}</td><td>${status}</td></tr>`;
    });

    document.getElementById('timetable-body').innerHTML = tableHtml;

    if (currentMatch) {
        document.getElementById('current-title').innerText = currentMatch.name;
        document.getElementById('current-time-range').innerText = `${currentMatch.start} - ${currentMatch.end}`;
        const progress = ((currentMinutes - currentMatch.startMin) / (currentMatch.endMin - currentMatch.startMin)) * 100;
        document.getElementById('progress-bar').style.width = progress + "%";
    } else {
        document.getElementById('current-title').innerText = "公演時間外";
        document.getElementById('current-time-range').innerText = "--:-- - --:--";
        document.getElementById('progress-bar').style.width = "0%";
    }
}

// 実行（タイムテーブル要素が存在する場合のみ）
const currentVenueLabel = document.getElementById('current-venue-label');
if (currentVenueLabel) {
    updateDisplay();
    setInterval(updateDisplay, 30000);
}

