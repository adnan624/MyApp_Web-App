// Fallback stub — Metro resolves .native.ts, webpack resolves .web.ts
// This file is never executed in practice
const showPlatformAlert = (title: string, message: string): void => {
  console.log(`[Alert] ${title}: ${message}`);
};

export default showPlatformAlert;
