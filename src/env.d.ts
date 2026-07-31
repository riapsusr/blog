/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// 客户端页面脚本的统一 cleanup hook 声明（inline guard 模式的接缝）。
// 各脚本在初始化前调用同名旧 hook，结束时注册新的 cleanup；
// 未来启用 View Transitions 时可在 astro:after-swap 上复用这些 hook。
interface Window {
  __tocCleanup__?: (() => void) | null;
  __cleanupDogLogo__?: () => void;
  __cleanupThemeToggle__?: () => void;
  __cleanupPagefind__?: () => void;
}
