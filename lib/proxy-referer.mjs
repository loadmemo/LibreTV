// 仅用于绕过已知防盗链域名，匹配时返回注入的合法 Referer；未匹配返回 undefined（调用方不设 Referer 头，保持原行为）
const HOTLINK_REFERERS = new Map([
  ['doubanio.com', 'https://movie.douban.com/'],
]);

export function getOutboundReferer(targetUrl) {
  if (typeof targetUrl !== 'string') return undefined;
  try {
    const host = new URL(targetUrl).hostname.toLowerCase();
    for (const [suffix, referer] of HOTLINK_REFERERS) {
      if (host === suffix || host.endsWith('.' + suffix)) {
        return referer;
      }
    }
  } catch {}
  return undefined;
}
