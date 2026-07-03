/**
 * 客户端组件初始化/清理的统一接缝。
 *
 * 现状（View Transitions 已禁用）：每个组件只需在首次页面加载时跑一次。
 * 但当未来重新启用 <ClientRouter /> 时：
 *   - `astro:page-load` 触发组件 setup
 *   - `astro:after-swap` 必须把上一页的监听/状态收尾
 *
 * 本模块约定每个组件在 `window.__cleanups__` 中以唯一 key 注册 cleanup。
 * - `withCleanup(key, setup)`：先调用同名旧 cleanup，再执行新 setup 并注册返回的 cleanup。
 * - 大多数情况 inline script 无法 import 模块；此时沿用统一的 guard 模式：
 *     1) 顶部 `if (window.__cleanupX__) { try { window.__cleanupX__(); } catch {} }`
 *     2) 末尾 `window.__cleanupX__ = cleanup`
 *   再在启用 ClientRouter 时改为：`document.addEventListener('astro:after-swap', window.__cleanupX__)`
 *
 * 统一这套模式即可消除历史上散乱的 `dataset.ready` / `window.__cleanup*` / `data-ready` 异构 guard。
 */
export type Cleanup = () => void;

type Registry = Record<string, Cleanup | undefined>;

declare global {
  interface Window {
    __cleanups__?: Registry;
  }
}

function getRegistry(): Registry {
  if (!window.__cleanups__) {
    window.__cleanups__ = {};
  }
  return window.__cleanups__;
}

/**
 * 注册一个需要在页面内执行的组件初始化逻辑。
 * - 会先把同名旧 cleanup 跑掉（保证幂等）。
 * - 返回的 unregister 可在 asto:after-swap 之类场景手动调用。
 *
 * @param key      唯一域，用于隔离组件
 * @param setup    返回 cleanup 或不返回
 */
export function withCleanup(
  key: string,
  setup: () => Cleanup | void,
): void {
  const registry = getRegistry();
  const prev = registry[key];
  if (prev) {
    try {
      prev();
    } catch {
      /* ignore */
    }
    registry[key] = undefined;
  }
  const cleanup = setup() ?? undefined;
  registry[key] = cleanup;
}

/**
 * 在某个 DOM 元素被首次初始化前打标记，避免重复初始化。
 * 主要用于纯 inline script（未被模块包裹）的简单防护。
 */
export function markReady(el: HTMLElement, attr = "data-ready"): boolean {
  if (el.dataset[attr] === "true") return false;
  el.dataset[attr] = "true";
  return true;
}

/**
 * 当 DOM 还在加载时排队 setup，否则立即执行。
 * Astro 内联脚本常需要在 DOMContentLoaded 后才安全操作节点。
 */
export function runOnReady(setup: () => void): void {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
}
