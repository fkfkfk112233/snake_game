# 🐍 Snake Game V1

一個使用原生 HTML、CSS、JavaScript 與 Canvas 製作的 Snake Game。

V1 主要目標是練習 JavaScript 的模組化、State 管理、事件處理、Game Loop 與 Canvas 繪圖。

## ✨ 功能

- 普通模式
- 無敵模式
- Board Size：20 × 20、30 × 30、40 × 40
- 遊戲速度：慢、普通、快
- 鍵盤方向控制
- Snake 移動與成長
- 食物隨機生成，且不會生成在蛇身上
- 撞牆與自我碰撞判定
- Score 計分
- Game Over
- 再玩一次
- 回首頁
- 無敵模式可手動「離開遊戲」
- Responsive Canvas 基本支援
- 多畫面切換：Home / Game / Settings / Game Over

## 🛠️ 技術

- HTML5
- CSS3
- JavaScript ES Modules
- Canvas API
- Live Server

本專案不使用 React、Vue 等前端框架。

## 📁 專案結構

```text
snake-game/
├── index.html
├── css/
│   ├── style.css
│   ├── home.css
│   ├── game.css
│   └── setting.css
└── js/
    ├── main.js
    ├── state/
    │   └── gameState.js
    ├── game/
    │   ├── snake.js
    │   ├── food.js
    │   ├── collision.js
    │   ├── input.js
    │   └── gameLoop.js
    └── ui/
        ├── screenManager.js
        └── gameRenderer.js
```

## 🧩 架構概念

遊戲以 State 作為主要資料來源：

```text
Input
  ↓
Game State
  ↓
Game Loop
  ↓
Snake / Food / Collision
  ↓
Game State
  ↓
Renderer
  ↓
Canvas
```

不同功能拆分到不同模組，讓遊戲邏輯、輸入、碰撞與 UI 渲染各自負責自己的工作。

## ▶️ 執行方式

1. 使用 VS Code 開啟專案。
2. 使用 Live Server 啟動 `index.html`。
3. 在首頁選擇遊戲模式與 Board Size。
4. 點擊「開始遊戲」。
5. 使用鍵盤方向鍵控制 Snake。

## 🎮 操作

| 操作 | 功能 |
|---|---|
| ↑ | 向上 |
| ↓ | 向下 |
| ← | 向左 |
| → | 向右 |

## 📌 V1 狀態

V1 已完成核心遊戲功能與基本 UI。

後續 V2 可加入：

- Pause
- 手機觸控操作
- High Score / LocalStorage
- 音效
- 更多遊戲模式
- 遊戲統計
