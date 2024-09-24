const board = document.getElementById('board');
        const status = document.getElementById('status');
        const resetButton = document.getElementById('reset');
        const undoButton = document.getElementById('undo');
        const aiMoveButton = document.getElementById('ai-move');
        const scoreX = document.getElementById('score-x');
        const scoreO = document.getElementById('score-o');
        const scoreDraw = document.getElementById('score-draw');
        const timerDisplay = document.getElementById('timer');
        const startTimerButton = document.getElementById('start-timer');
        const stopTimerButton = document.getElementById('stop-timer');
        const resetTimerButton = document.getElementById('reset-timer');
        const playerXInput = document.getElementById('player-x');
        const playerOInput = document.getElementById('player-o');
        const playerXName = document.getElementById('player-x-name');
        const playerOName = document.getElementById('player-o-name');
        const resetScoreButton = document.getElementById('reset-score');
        const languageSelects = document.querySelectorAll('.language-select');
        const settingsButton = document.querySelector('.settings-button');
        const settingsModal = document.getElementById('settingsModal');
        const closeButton = document.querySelector('.close');
        const colorSchemeSelect = document.getElementById('colorScheme');
        const fontSelect = document.getElementById('font');

        let currentPlayer = 'X';
        let gameState = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        let moveHistory = [];
        let scores = { X: 0, O: 0, Draw: 0 };
        let startTime;
        let timerInterval;
        let elapsedTime = 0;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Localization
        const translations = {
            en: {
                title: "Ultimate Tic-Tac-Toe",
                created_by: "Created by:",
                github_link: "VoxDroid",
                start_game: "Start Game",
                settings: "Settings",
                start_timer: "Start Timer",
                stop_timer: "Stop Timer",
                reset_timer: "Reset Timer",
                draws: "Draws",
                undo: "Undo",
                new_game: "New Game",
                ai_move: "AI Move",
                reset_score: "Reset Score",
                color_scheme: "Color Scheme:",
                default: "Default",
                dark: "Dark",
                light: "Light",
                colorful: "Colorful",
                font: "Font:",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "Player X's turn",
                player_o_turn: "Player O's turn",
                player_x_wins: "Player X wins!",
                player_o_wins: "Player O wins!",
                draw: "It's a draw!",
                game_over: "Game over - No chance to win!"
            },
            zh: {
                title: "终极井字游戏",
                created_by: "创建者：",
                github_link: "VoxDroid",
                start_game: "开始游戏",
                settings: "设置",
                start_timer: "开始计时",
                stop_timer: "停止计时",
                reset_timer: "重置计时",
                draws: "平局",
                undo: "撤销",
                new_game: "新游戏",
                ai_move: "AI移动",
                reset_score: "重置分数",
                color_scheme: "配色方案：",
                default: "默认",
                dark: "暗色",
                light: "亮色",
                colorful: "多彩",
                font: "字体：",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "玩家X的回合",
                player_o_turn: "玩家O的回合",
                player_x_wins: "玩家X获胜！",
                player_o_wins: "玩家O获胜！",
                draw: "平局！",
                game_over: "游戏结束 - 无法获胜！"
            },
            ja: {
                title: "究極の三目並べ",
                created_by: "制作：",
                github_link: "ボクス・ドロイド",
                start_game: "ゲーム開始",
                settings: "設定",
                start_timer: "タイマー開始",
                stop_timer: "タイマー停止",
                reset_timer: "タイマーリセット",
                draws: "引き分け",
                undo: "元に戻す",
                new_game: "新しいゲーム",
                ai_move: "AI移動",
                reset_score: "スコアリセット",
                color_scheme: "カラースキーム：",
                default: "デフォルト",
                dark: "ダーク",
                light: "ライト",
                colorful: "カラフル",
                font: "フォント：",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "プレイヤーXのターン",
                player_o_turn: "プレイヤーOのターン",
                player_x_wins: "プレイヤーXの勝利！",
                player_o_wins: "プレイヤーOの勝利！",
                draw: "引き分けです！",
                game_over: "ゲーム終了 - 勝利のチャンスなし！"
            },
            ko: {
                title: "궁극의 틱택토",
                created_by: "제작자:",
                github_link: "VoxDroid",
                start_game: "게임 시작",
                settings: "설정",
                start_timer: "타이머 시작",
                stop_timer: "타이머 정지",
                reset_timer: "타이머 리셋",
                draws: "무승부",
                undo: "되돌리기",
                new_game: "새 게임",
                ai_move: "AI 이동",
                reset_score: "점수 리셋",
                color_scheme: "색상 테마:",
                default: "기본",
                dark: "다크",
                light: "라이트",
                colorful: "컬러풀",
                font: "글꼴:",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "플레이어 X의 차례",
                player_o_turn: "플레이어 O의 차례",
                player_x_wins: "플레이어 X 승리!",
                player_o_wins: "플레이어 O 승리!",
                draw: "무승부입니다!",
                game_over: "게임 종료 - 승리 기회 없음!"
            },
            ru: {
                title: "Ультимативные крестики-нолики",
                created_by: "Создано:",
                github_link: "VoxDroid",
                start_game: "Начать игру",
                settings: "Настройки",
                start_timer: "Запустить таймер",
                stop_timer: "Остановить таймер",
                reset_timer: "Сбросить таймер",
                draws: "Ничьи",
                undo: "Отменить",
                new_game: "Новая игра",
                ai_move: "Ход ИИ",
                reset_score: "Сбросить счет",
                color_scheme: "Цветовая схема:",
                default: "По умолчанию",
                dark: "Темная",
                light: "Светлая",
                colorful: "Красочная",
                font: "Шрифт:",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "Ход игрока X",
                player_o_turn: "Ход игрока O",
                player_x_wins: "Игрок X победил!",
                player_o_wins: "Игрок O победил!",
                draw: "Ничья!",
                game_over: "Игра окончена - нет шансов на победу!"
            },
            es: {
                title: "Tres en Raya Definitivo",
                created_by: "Creado por:",
                github_link: "VoxDroid",
                start_game: "Iniciar Juego",
                settings: "Ajustes",
                start_timer: "Iniciar Temporizador",
                stop_timer: "Detener Temporizador",
                reset_timer: "Reiniciar Temporizador",
                draws: "Empates",
                undo: "Deshacer",
                new_game: "Nuevo Juego",
                ai_move: "Movimiento IA",
                reset_score: "Reiniciar Puntuación",
                color_scheme: "Esquema de Color:",
                default: "Predeterminado",
                dark: "Oscuro",
                light: "Claro",
                colorful: "Colorido",
                font: "Fuente:",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "Turno del Jugador X",
                player_o_turn: "Turno del Jugador O",
                player_x_wins: "¡El Jugador X gana!",
                player_o_wins: "¡El Jugador O gana!",
                draw: "¡Es un empate!",
                game_over: "Juego terminado - ¡No hay posibilidad de ganar!"
            },
            fr: {
                title: "Morpion Ultime",
                created_by: "Créé par :",
                github_link: "VoxDroid",
                start_game: "Commencer le Jeu",
                settings: "Paramètres",
                start_timer: "Démarrer le Chrono",
                stop_timer: "Arrêter le Chrono",
                reset_timer: "Réinitialiser le Chrono",
                draws: "Matchs Nuls",
                undo: "Annuler",
                new_game: "Nouvelle Partie",
                ai_move: "Coup de l'IA",
                reset_score: "Réinitialiser le Score",
                color_scheme: "Thème de Couleur :",
                default: "Par Défaut",
                dark: "Sombre",
                light: "Clair",
                colorful: "Coloré",
                font: "Police :",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "Tour du Joueur X",
                player_o_turn: "Tour du Joueur O",
                player_x_wins: "Le Joueur X gagne !",
                player_o_wins: "Le Joueur O gagne !",
                draw: "C'est un match nul !",
                game_over: "Partie terminée - Aucune chance de gagner !"
            },
            de: {
                title: "Ultimatives Tic-Tac-Toe",
                created_by: "Erstellt von:",
                github_link: "VoxDroid",
                start_game: "Spiel Starten",
                settings: "Einstellungen",
                start_timer: "Timer Starten",
                stop_timer: "Timer Stoppen",
                reset_timer: "Timer Zurücksetzen",
                draws: "Unentschieden",
                undo: "Rückgängig",
                new_game: "Neues Spiel",
                ai_move: "KI-Zug",
                reset_score: "Punktestand Zurücksetzen",
                color_scheme: "Farbschema:",
                default: "Standard",
                dark: "Dunkel",
                light: "Hell",
                colorful: "Bunt",
                font: "Schriftart:",
                poppins: "Poppins",
                roboto: "Roboto",
                open_sans: "Open Sans",
                player_x_turn: "Spieler X ist am Zug",
                player_o_turn: "Spieler O ist am Zug",
                player_x_wins: "Spieler X gewinnt!",
                player_o_wins: "Spieler O gewinnt!",
                draw: "Unentschieden!",
                game_over: "Spiel vorbei - Keine Chance zu gewinnen!"
            }
        };

        let currentLanguage = 'en';

        function updateLanguage(lang) {
            currentLanguage = lang;
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                element.textContent = translations[lang][key] || key;
            });
            updatePlayerNames();
            updateGameStatus();
        }

        languageSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                updateLanguage(e.target.value);
                localStorage.setItem('language', e.target.value);
            });
        });

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-index', i);
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }

        function handleCellClick(e) {
            const clickedCell = e.target;
            const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

            if (gameState[cellIndex] !== '' || !gameActive) return;

            gameState[cellIndex] = currentPlayer;
            clickedCell.classList.add(currentPlayer.toLowerCase());
            clickedCell.setAttribute('data-symbol', currentPlayer);
            moveHistory.push(cellIndex);
            checkResult();
        }

        function checkResult() {
            let roundWon = false;
            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    roundWon = true;
                    document.querySelectorAll('.cell')[a].classList.add('winner');
                    document.querySelectorAll('.cell')[b].classList.add('winner');
                    document.querySelectorAll('.cell')[c].classList.add('winner');
                    break;
                }
            }

            if (roundWon) {
                status.textContent = translations[currentLanguage][currentPlayer === 'X' ? 'player_x_wins' : 'player_o_wins'];
                gameActive = false;
                scores[currentPlayer]++;
                updateScoreDisplay();
                stopTimer();
                celebrateWin();
                return;
            }

            if (!gameState.includes('')) {
                status.textContent = translations[currentLanguage]['draw'];
                gameActive = false;
                scores.Draw++;
                updateScoreDisplay();
                stopTimer();
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateGameStatus();

            if (!canWin()) {
                gameActive = false;
                status.textContent = translations[currentLanguage]['game_over'];
                stopTimer();
            }
        }

        function updateGameStatus() {
            status.textContent = translations[currentLanguage][currentPlayer === 'X' ? 'player_x_turn' : 'player_o_turn'];
        }

        function canWin() {
            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (
                    (gameState[a] === gameState[b] && gameState[c] === '') ||
                    (gameState[a] === gameState[c] && gameState[b] === '') ||
                    (gameState[b] === gameState[c] && gameState[a] === '')
                ) {
                    return true;
                }
            }
            return false;
        }

        function resetGame() {
            currentPlayer = 'X';
            gameState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            moveHistory = [];
            updateGameStatus();
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('x', 'o', 'winner');
                cell.removeAttribute('data-symbol');
            });
            resetTimer();
        }

        function undoMove() {
            if (moveHistory.length === 0 || !gameActive) return;
            
            const lastMove = moveHistory.pop();
            gameState[lastMove] = '';
            const cell = document.querySelector(`.cell[data-index="${lastMove}"]`);
            cell.classList.remove('x', 'o');
            cell.removeAttribute('data-symbol');
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateGameStatus();
        }

        function updateScoreDisplay() {
            scoreX.textContent = scores.X;
            scoreO.textContent = scores.O;
            scoreDraw.textContent = scores.Draw;
        }

        function aiMove() {
            if (!gameActive) return;

            const emptyCells = gameState.reduce((acc, cell, index) => {
                if (cell === '') acc.push(index);
                return acc;
            }, []);

            if (emptyCells.length > 0) {
                const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
                cell.click();
            }
        }

        function startTimer() {
            if (!timerInterval) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(updateTimer, 1000);
            }
        }

        function stopTimer() {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        function resetTimer() {
            stopTimer();
            elapsedTime = 0;
            updateTimerDisplay();
        }

        function updateTimer() {
            elapsedTime = Date.now() - startTime;
            updateTimerDisplay();
        }

        function updateTimerDisplay() {
            const totalSeconds = Math.floor(elapsedTime / 1000);
            const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const seconds = (totalSeconds % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
        }

        function celebrateWin() {
            for (let i = 0; i < 50; i++) {
                createConfetti();
            }
        }

        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.backgroundColor = getRandomColor();
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }

        function getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r},${g},${b})`;
        }

        function updatePlayerNames() {
            playerXName.textContent = playerXInput.value || translations[currentLanguage]['player_x'];
            playerOName.textContent = playerOInput.value || translations[currentLanguage]['player_o'];
            updateGameStatus();
        }

        function resetScore() {
            scores = { X: 0, O: 0, Draw: 0 };
            updateScoreDisplay();
        }

        // Landing screen and background animation
        const landingScreen = document.querySelector('.landing-screen');
        const startGameBtn = document.querySelector('.start-game-btn');
        const loadingAnimation = document.querySelector('.loading-animation');
        const backgroundAnimation = document.querySelector('.background-animation');

        startGameBtn.addEventListener('click', () => {
            loadingAnimation.style.display = 'block';
            startGameBtn.style.display = 'none';
            setTimeout(() => {
                landingScreen.style.opacity = '0';
                setTimeout(() => {
                    landingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        });

        function createBubbles() {
            for (let i = 0; i < 20; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                bubble.style.left = `${Math.random() * 100}%`;
                bubble.style.top = `${Math.random() * 100}%`;
                bubble.style.width = `${Math.random() * 100 + 50}px`;
                bubble.style.height = bubble.style.width;
                bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
                bubble.style.animationDelay = `${Math.random() * 5}s`;
                backgroundAnimation.appendChild(bubble);
            }
        }

        createBubbles();

        // Settings modal
        settingsButton.onclick = function() {
            settingsModal.style.display = "block";
        }

        closeButton.onclick = function() {
            settingsModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == settingsModal) {
                settingsModal.style.display = "none";
            }
        }

        // Color scheme
        colorSchemeSelect.addEventListener('change', (e) => {
            const scheme = e.target.value;
            document.documentElement.setAttribute('data-color-scheme', scheme);
            localStorage.setItem('colorScheme', scheme);
        });

        // Font
        fontSelect.addEventListener('change', (e) => {
            const font = e.target.value;
            document.body.style.fontFamily = font;
            localStorage.setItem('font', font);
        });

        // Load saved settings
        function loadSavedSettings() {
            const savedLanguage = localStorage.getItem('language') || 'en';
            const savedColorScheme = localStorage.getItem('colorScheme') || 'default';
            const savedFont = localStorage.getItem('font') || 'Poppins';

            updateLanguage(savedLanguage);
            languageSelects.forEach(select => select.value = savedLanguage);
            
            document.documentElement.setAttribute('data-color-scheme', savedColorScheme);
            colorSchemeSelect.value = savedColorScheme;

            document.body.style.fontFamily = savedFont;
            fontSelect.value = savedFont;
        }

        loadSavedSettings();

        resetButton.addEventListener('click', resetGame);
        undoButton.addEventListener('click', undoMove);
        aiMoveButton.addEventListener('click', aiMove);
        startTimerButton.addEventListener('click', startTimer);
        stopTimerButton.addEventListener('click', stopTimer);
        resetTimerButton.addEventListener('click', resetTimer);
        playerXInput.addEventListener('input', updatePlayerNames);
        playerOInput.addEventListener('input', updatePlayerNames);
        resetScoreButton.addEventListener('click', resetScore);

        createBoard();
        resetGame();