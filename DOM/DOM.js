// Імпорт необхідних модулів
import { sett } from './setting.js';
import { LEVEL1 } from './Game/CLASS/level1.js';
import { LEVEL2 } from './Game/CLASS/level2.js';
import { LEVEL3 } from './Game/CLASS/level3.js';
import { Observer } from './Game/CLASS/observer.js';
import { restartGame } from './Game/gamemode.js';
import { stopGame } from './Game/gamemode.js';
// Отримання елементів DOM
const settingsMenu = document.getElementById('settings-menu');
const aboutMenu = document.getElementById('about-menu');
const menu = document.getElementById('main');
const levelMenu = document.getElementById('multiplayer-menu');
const game = document.getElementById('game');
const settingsBtn = document.getElementById('settings-btn');
const closeBtn = document.getElementById('back-btn');
const closeBtn1 = document.getElementById('back-btn2');
const closeBtn2 = document.getElementById('back-btn3');
const closeBtn3 = document.getElementById("back-btn4");
const aboutsBtn = document.getElementById('about-btn');
const levelBtn = document.getElementById('level-btn');
const level1Btn = document.getElementById('level1');
const level2Btn = document.getElementById('level2');
const level3Btn = document.getElementById('level3');
// Показати меню налаштувань
settingsBtn.addEventListener('click', () => {
    settingsMenu.style.display = 'block';
    menu.style.display = 'none';
    sett();
});
// Сховати меню налаштувань
closeBtn.addEventListener('click', () => {
    closeMenu(settingsMenu, menu);
});
// Показати меню "Про гру"
aboutsBtn.addEventListener('click', () => {
    aboutMenu.style.display = 'block';
    menu.style.display = 'none';
});
// Сховати меню "Про гру"
closeBtn1.addEventListener('click', () => {
    closeMenu(aboutMenu, menu);
});
// Сховати меню рівнів гри
closeBtn2.addEventListener('click', () => {
    closeMenu(levelMenu, menu);
});
// Сховати гру при виході з рівнів
closeBtn3.addEventListener('click', () => {
    closeMenu(game, levelMenu);
    stopGame();
});
//Для закривання меню
function closeMenu(menu, menuToDisplay) {
    menu.style.display = 'none';
    menuToDisplay.style.display = 'block';
}
// Створення об'єктів рівнів
const level1 = new LEVEL1();
const level2 = new LEVEL2();
const level3 = new LEVEL3();
// Створення об'єкта спостерігача
const observer = new Observer();
observer.addObserver(level1);
observer.addObserver(level2);
observer.addObserver(level3);
// Експорт змінної, що вказує на стан гри
export var gameRunning = 1;
// Обробник кліку на кнопку рівнів
levelBtn.addEventListener('click', ()=> {
    levelMenu.style.display = 'block';
    menu.style.display = 'none';
});
// Обробник кліку на кнопку рівня 1
level1Btn.addEventListener('click', () => {
    game.style.display = 'block';
    levelMenu.style.display = 'none';
    if(gameRunning === 0){   
        gameRunning = 1;
    } // Повторно встановлюєм
    level1.score = 0;
    restartGame(observer, 0); // Перезапуск гри з рівня 0
});
// Обробник кліку на кнопку рівня 2
level2Btn.addEventListener('click', () => {
    game.style.display = 'block';
    levelMenu.style.display = 'none';
    if(gameRunning === 0){
        gameRunning = 1;
    } // Повторно встановлюємо флаг gameRunning
    level2.score = 0;
    restartGame(observer, 1); // Перезапуск гри з рівня 1
});    
// Обробник кліку на кнопку рівня 3
level3Btn.addEventListener('click', () => {
    game.style.display = 'block';
    levelMenu.style.display = 'none';
    if(gameRunning === 0){
        gameRunning = 1;
    } // Повторно встановлюємо флаг gameRunningl
    level3.score = 0;
    restartGame(observer, 2); // Перезапуск гри з рівня 2
});
// Обробник кліку на кнопку закриття гри
closeBtn3.addEventListener('click', () => {
    closeMenu(game, levelMenu);
    gameRunning = stopGame();
});