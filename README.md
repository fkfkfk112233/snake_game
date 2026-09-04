# 🐍 Snake Game V1

一個使用原生 **HTML、CSS、JavaScript 與 Canvas API** 製作的 Snake Game。

本專案以原生 JavaScript 開發，不使用 React、Vue 等前端框架，主要用來練習：

* JavaScript ES Modules
* State Management
* Event Handling
* Game Loop
* Canvas Rendering
* Responsive Web Design
* Keyboard / Touch Input

---

## ✨ V1 功能

### 🎮 遊戲功能

* 普通模式
* 無敵模式
* Board Size

  * 20 × 20
  * 30 × 30
  * 40 × 40
* 遊戲速度

  * 慢
  * 普通
  * 快
* Snake 移動與成長
* 食物隨機生成
* 食物不會生成在蛇身上
* 撞牆判定
* Snake 自我碰撞判定
* Score 計分
* Game Over
* 再玩一次
* 回首頁
* 無敵模式可手動離開遊戲

### 🖥️ 操作功能

* Desktop 鍵盤方向鍵操作
* Mobile 觸控操作
* Mobile Button 操作
* Swipe 操作
* Mobile / Desktop Responsive Layout

### 🖼️ UI 功能

* Home
* Game
* Settings
* Game Over
* 不同畫面之間的切換
* 遊戲分數即時更新
* Mobile Control 顯示 / 隱藏控制

---

## 🛠️ 使用技術

| 技術          | 用途                     |
| ----------- | ---------------------- |
| HTML5       | 網頁結構                   |
| CSS3        | UI 與 Responsive Layout |
| JavaScript  | 遊戲邏輯                   |
| ES Modules  | JavaScript 模組化         |
| Canvas API  | Snake、Food、Grid 繪製     |
| Live Server | 本地開發伺服器                |

---

## 📁 專案結構

```text
snake_game/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   ├── home.css
│   ├── game.css
│   ├── setting.css
│   └── mobile.css
│
└── js/
    │
    ├── main.js
    │
    ├── state/
    │   └── gameState.js
    │
    ├── game/
    │   ├── snake.js
    │   ├── food.js
    │   ├── collision.js
    │   └── gameLoop.js
    │
    ├── input/
    │   ├── inputManager.js
    │   ├── keyboardInput.js
    │   └── touchInput.js
    │
    ├── device/
    │   └── deviceDetector.js
    │
    └── ui/
        ├── screenManager.js
        ├── gameRenderer.js
        └── mobileControls.js
```

---

## 🧩 程式架構

本專案將遊戲拆分成不同模組，每個模組負責不同工作。

```text
                         main.js
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ↓             ↓             ↓
           Input          Game           UI
              │             │             │
              └─────────────┼─────────────┘
                            ↓
                       Game State
                            │
                            ↓
                        Game Loop
                            │
             ┌──────────────┼──────────────┐
             ↓              ↓              ↓
           Snake           Food         Collision
             │              │              │
             └──────────────┼──────────────┘
                            ↓
                         Renderer
                            ↓
                          Canvas
```

### State

`gameState.js`

集中管理遊戲目前的狀態，例如：

* 目前畫面
* 遊戲模式
* Board Size
* 遊戲速度
* Snake
* Food
* Direction
* Score

---

### Game

`game/`

負責核心遊戲邏輯。

| 模組             | 負責內容        |
| -------------- | ----------- |
| `snake.js`     | Snake 移動與成長 |
| `food.js`      | Food 生成     |
| `collision.js` | 碰撞判定        |
| `gameLoop.js`  | 遊戲更新循環      |

---

### Input

`input/`

負責玩家輸入。

| 模組                 | 負責內容             |
| ------------------ | ---------------- |
| `inputManager.js`  | 管理 Input 初始化     |
| `keyboardInput.js` | 鍵盤方向控制           |
| `touchInput.js`    | Touch / Swipe 控制 |

---

### Device

`device/`

負責判斷目前裝置類型。

```text
Desktop
   ↓
Keyboard Input

Mobile
   ↓
Button / Swipe Input
```

---

### UI

`ui/`

負責畫面與 Canvas Rendering。

| 模組                  | 負責內容                                  |
| ------------------- | ------------------------------------- |
| `screenManager.js`  | Home / Game / Settings / Game Over 切換 |
| `gameRenderer.js`   | Canvas 繪製與分數更新                        |
| `mobileControls.js` | Mobile 控制按鈕                           |

---

## 🔄 遊戲流程

```text
Home
 │
 │ 選擇遊戲設定
 ↓
Start Game
 │
 ↓
Initialize Game
 │
 ↓
Game Loop
 │
 ├── 計算 Snake 下一個位置
 │
 ├── Collision Check
 │
 ├── 更新 Snake
 │
 ├── 更新 Food
 │
 └── Render Canvas
 │
 ↓
Game Over
 │
 ├── Retry
 │
 └── Home
```

---

## ▶️ 執行方式

https://fkfkfk112233.github.io/snake_game/

進入 Home 後：

1. 選擇遊戲模式
2. 選擇 Board Size
3. 選擇遊戲速度
4. Mobile 裝置可選擇 Button / Swipe 操作
5. 點擊「開始遊戲」

---

## 🎮 操作方式

### Desktop

| 按鍵 | 功能 |
| -- | -- |
| ↑  | 向上 |
| ↓  | 向下 |
| ←  | 向左 |
| →  | 向右 |

### Mobile

支援兩種操作方式：

#### Button

使用畫面上的方向按鈕控制 Snake。

#### Swipe

在遊戲區域滑動：

```text
↑ Swipe Up
↓ Swipe Down
← Swipe Left
→ Swipe Right
```

---

## 🎯 Game Mode

### Normal Mode

正常 Snake Game 規則。

* 撞牆 → Game Over
* 撞到自己 → Game Over

### Invincible Mode

提供較自由的遊戲模式。

* 撞牆不會 Game Over
* 自我碰撞不會 Game Over
* 玩家可以手動離開遊戲

---

## 📱 Responsive Design

本專案提供基本 Responsive Design。

Desktop 與 Mobile 會根據裝置調整：

* Board Size
* Canvas 顯示方式
* Mobile Controls
* UI Layout

---

## 📌 V1 開發重點

V1 主要完成 Snake Game 的核心架構與基本遊戲功能。

目前已完成：

* Game State
* Game Loop
* Snake Movement
* Food System
* Collision Detection
* Score System
* Game Over
* Screen Management
* Canvas Rendering
* Keyboard Input
* Touch / Swipe Input
* Mobile Controls
* Responsive UI

---

## 🚀 Future Development

後續版本可以考慮加入：

* Pause / Resume
* High Score
* LocalStorage
* Sound Effects
* Background Music
* Snake Skin
* Food Skin
* 更多 Game Mode
* Difficulty System
* Game Statistics
* 排行榜
* Backend API
* 使用者帳號與遊戲紀錄

---

## 📚 Project Purpose

本專案主要作為 JavaScript 與前端遊戲開發練習。

透過 Snake Game 實際練習：

```text
JavaScript
    ↓
ES Modules
    ↓
State Management
    ↓
Event Handling
    ↓
Game Loop
    ↓
Collision Detection
    ↓
Canvas Rendering
    ↓
Responsive UI
```

並以模組化方式逐步建立可維護、可擴充的前端專案架構。
