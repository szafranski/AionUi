/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ICssTheme } from '@/common/config/storage.ts';

import {
  defaultThemeCover,
  misakaMikotoCover,
  helloKittyCover,
  retroWindowsCover,
  y2kJpCover,
  retromaObsidianBookCover,
} from './themeCovers.ts';

// Theme CSS loaded as raw strings via Vite ?raw imports
import defaultCss from './presets/default.css?raw';
import misakaMikotoCss from './presets/misaka-mikoto.css?raw';
import helloKittyCss from './presets/hello-kitty.css?raw';
import retroWindowsCss from './presets/retro-windows.css?raw';
import retromaY2kCss from './presets/retroma-y2k.css?raw';
import retromaObsidianBookCss from './presets/retroma-obsidian-book.css?raw';
import discourseHorizonCss from './presets/discourse-horizon.css?raw';
import glitteringInputFieldCss from './presets/glittering-input-field.css?raw';

const cozyAnimalCover =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%2389cfaa%22/%3E%3Cg opacity=%22.28%22 fill=%22%235aaa81%22%3E%3Cpath d=%22M72 48 112 72 76 96z%22/%3E%3Cpath d=%22M502 38 548 60 510 92z%22/%3E%3Cpath d=%22M238 90 286 142 210 132z%22/%3E%3Cpath d=%22M410 130 455 150 416 184z%22/%3E%3C/g%3E%3Cg opacity=%22.34%22 fill=%22%23dce9a8%22%3E%3Cpath d=%22M576 82 612 104 586 134z%22/%3E%3Cpath d=%22M96 268 132 284 102 312z%22/%3E%3C/g%3E%3Cpath d=%22M0 256c42-28 84-28 126 0s84 28 126 0 84-28 126 0 84 28 126 0 84-28 136 0v104H0z%22 fill=%22%2389d4dc%22/%3E%3Cpath d=%22M0 305c44-26 86-26 128 0s84 26 126 0 84-26 126 0 84 26 126 0 82-26 134 0v55H0z%22 fill=%22%232fc1ae%22/%3E%3Crect x=%22144%22 y=%22110%22 width=%22390%22 height=%22146%22 rx=%2228%22 fill=%22%23fffdf4%22 stroke=%22%23887a62%22 stroke-width=%226%22 opacity=%22.94%22/%3E%3Ccircle cx=%22190%22 cy=%22162%22 r=%2222%22 fill=%22%2325c9b8%22/%3E%3Cpath d=%22M182 162h16M190 154v16%22 stroke=%22%23fffdf4%22 stroke-width=%226%22 stroke-linecap=%22round%22/%3E%3Cpath d=%22M450 172c30-28 55-6 46 21-19-10-35-5-46-21z%22 fill=%22%2325c9b8%22 opacity=%22.64%22/%3E%3Cpath d=%22M454 172c15 5 28 7 42 21%22 stroke=%22%23fffdf4%22 stroke-width=%224%22 stroke-linecap=%22round%22 opacity=%22.7%22/%3E%3C/svg%3E';

const cozyAnimalCss = `
/* Cozy Animal - soft game-menu skin with SVG-only decorative imagery. */
:root {
  --cozy-mint: #89cfaa;
  --cozy-mint-deep: #2fc1ae;
  --cozy-cream: #fffdf4;
  --cozy-paper: #fbfaf0;
  --cozy-line: #b7b0a2;
  --cozy-ink: #6f5537;
  --cozy-muted: #8a7b64;
  --cozy-blue: #b7c7e8;
  --cozy-sky: #89d4dc;
  --cozy-shadow: rgba(87, 72, 45, 0.16);
  --cozy-triangles: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22640%22 height=%22420%22 viewBox=%220 0 640 420%22%3E%3Cg opacity=%22.055%22 fill=%22%2359a97d%22%3E%3Cpath d=%22M72 34 126 66 76 104z%22/%3E%3Cpath d=%22M456 52 518 82 468 128z%22/%3E%3Cpath d=%22M256 180 322 250 218 232z%22/%3E%3Cpath d=%22M552 268 608 300 560 340z%22/%3E%3C/g%3E%3Cg opacity=%22.075%22 fill=%22%23dce9a8%22%3E%3Cpath d=%22M168 318 218 344 178 382z%22/%3E%3Cpath d=%22M530 134 582 162 542 204z%22/%3E%3C/g%3E%3C/svg%3E");
  --cozy-leaf: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22 viewBox=%220 0 64 64%22%3E%3Cpath d=%22M12 34c20-23 38-14 42-8-18 1-24 12-42 8z%22 fill=%22%2325c9b8%22/%3E%3Cpath d=%22M16 34c11 0 22-2 34-9%22 stroke=%22%23fffdf4%22 stroke-width=%224%22 stroke-linecap=%22round%22 opacity=%22.7%22/%3E%3C/svg%3E");
  --cozy-waves: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22360%22 height=%22180%22 viewBox=%220 0 360 180%22 preserveAspectRatio=%22none%22%3E%3Cpath d=%22M0 42c36-28 72-28 108 0s72 28 108 0 72-28 144 0v138H0z%22 fill=%22%2389d4dc%22/%3E%3Cpath d=%22M0 98c36-26 72-26 108 0s72 26 108 0 72-26 144 0v82H0z%22 fill=%22%232fc1ae%22/%3E%3C/svg%3E");
  --color-primary: var(--cozy-mint-deep);
  --primary: var(--cozy-mint-deep);
  --brand: var(--cozy-mint-deep);
  --color-bg-1: var(--cozy-mint);
  --bg-1: var(--cozy-mint);
  --color-bg-2: var(--cozy-cream);
  --bg-2: var(--cozy-cream);
  --color-text-1: var(--cozy-ink);
  --text-primary: var(--cozy-ink);
  --color-text-2: var(--cozy-muted);
  --text-secondary: var(--cozy-muted);
  --color-border: var(--cozy-line);
  --border-base: var(--cozy-line);
}

/* AionUi Theme Background Start */
html,
body,
.arco-layout,
.app-shell {
  background-color: var(--cozy-mint);
  background-image: var(--cozy-triangles);
  background-size: 640px 420px;
  background-repeat: repeat;
  background-position: 0 0;
  color: var(--cozy-ink);
}

.layout-content,
.layout-content.bg-1,
.arco-layout-content,
[class*="chat-layout"] .arco-layout-content,
[class*="conversation"] .arco-layout-content {
  background-color: #8fd1ad;
  background-image: none;
}
/* AionUi Theme Background End */

body {
  font-family: "Nunito", "Varela Round", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.layout-sider {
  background-color: #f7f0df;
  background-image:
    linear-gradient(rgba(247, 240, 223, 0.88), rgba(247, 240, 223, 0.88)), var(--cozy-waves);
  background-position:
    0 0,
    left bottom;
  background-repeat: no-repeat;
  background-size:
    100% 100%,
    100% 132px;
  border-right: 1px solid rgba(126, 110, 82, 0.24);
  color: var(--cozy-muted);
}

.layout-sider-header,
.app-titlebar {
  background: rgba(255, 253, 244, 0.88);
  color: var(--cozy-ink);
  border-color: rgba(126, 110, 82, 0.24);
}

.layout-sider-content [class*="active"],
.layout-sider-content .arco-menu-selected,
.layout-sider-content .arco-menu-item:hover {
  background: var(--cozy-blue);
  color: var(--cozy-cream);
  border-radius: 14px;
}

.layout-content > .arco-layout-content,
.layout-content .arco-card,
.layout-content [class*="panel"],
.layout-content [class*="container"] {
  background-color: rgba(255, 253, 244, 0.92);
  background-image: none;
  border-color: var(--cozy-line);
}

.chat-layout-right-sider,
[class*="workspace"],
[class*="preview"] {
  background-color: #f7f0df;
  background-image: none;
}

.arco-card,
.arco-modal,
.arco-drawer,
[class*="message"][class*="assistant"] .message-content,
[class*="message"][class*="ai"] .message-content {
  position: relative;
  background: rgba(255, 253, 244, 0.94);
  border: 2px solid var(--cozy-line);
  border-radius: 18px;
  box-shadow: 0 10px 28px var(--cozy-shadow);
  color: var(--cozy-ink);
}

.arco-btn-primary,
.arco-switch-checked {
  background: var(--cozy-mint-deep);
  border-color: var(--cozy-mint-deep);
  color: var(--cozy-cream);
}

.arco-btn:not(.arco-btn-primary),
.arco-input,
.arco-textarea,
.arco-select-view,
.arco-collapse-item,
.arco-tabs-header-title {
  background: rgba(255, 253, 244, 0.92);
  border-color: var(--cozy-line);
  color: var(--cozy-ink);
}

.arco-collapse-item-header,
.arco-list-item,
.arco-table-tr {
  background: rgba(255, 253, 244, 0.76);
  color: var(--cozy-ink);
}

.arco-collapse-item-header::after,
.arco-card::after,
.chat-layout-header::after {
  content: "";
  display: block;
  width: 28px;
  height: 28px;
  background-image: var(--cozy-leaf);
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.72;
}

.arco-collapse-item-header::after,
.chat-layout-header::after {
  margin-left: auto;
}

.arco-card::after {
  position: absolute;
  right: 14px;
  top: 14px;
  pointer-events: none;
}

[data-theme='dark'] {
  --cozy-mint: #345f50;
  --cozy-mint-deep: #32b8aa;
  --cozy-cream: #252924;
  --cozy-paper: #20241f;
  --cozy-line: #71806f;
  --cozy-ink: #f2ead8;
  --cozy-muted: #c6bda9;
  --cozy-blue: #43577c;
  --cozy-sky: #356d74;
  --cozy-shadow: rgba(0, 0, 0, 0.32);
}
`;

/**
 * 默认主题 ID / Default theme ID
 * 用于标识默认主题（无自定义 CSS）/ Used to identify the default theme (no custom CSS)
 */
export const DEFAULT_THEME_ID = 'default-theme';

/**
 * 预设 CSS 主题列表 / Preset CSS themes list
 * 这些主题是内置的，用户可以直接选择使用 / These themes are built-in and can be directly used by users
 */
export const PRESET_THEMES: ICssTheme[] = [
  {
    id: DEFAULT_THEME_ID,
    name: 'Default',
    is_preset: true,
    cover: defaultThemeCover,
    css: defaultCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'misaka-mikoto-theme',
    name: 'Misaka Mikoto Theme',
    is_preset: true,
    cover: misakaMikotoCover,
    css: misakaMikotoCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'hello-kitty',
    name: 'Hello Kitty',
    is_preset: true,
    cover: helloKittyCover,
    css: helloKittyCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'retro-windows',
    name: 'Retro Windows',
    is_preset: true,
    cover: retroWindowsCover,
    css: retroWindowsCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'retroma-y2k-jp-v42-pure',
    name: 'Y2K电子账本 by 椰树女王',
    is_preset: true,
    cover: y2kJpCover,
    css: retromaY2kCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'retroma-obsidian-book',
    name: 'Retroma Obsidian Book',
    is_preset: true,
    cover: retromaObsidianBookCover,
    css: retromaObsidianBookCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'discourse-horizon',
    name: 'Discourse Horizon',
    is_preset: true,
    css: discourseHorizonCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'glittering-input-field',
    name: 'Glittering Input Field',
    is_preset: true,
    css: glitteringInputFieldCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 'cozy-animal',
    name: 'Cozy Animal',
    is_preset: true,
    cover: cozyAnimalCover,
    css: cozyAnimalCss,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
];
