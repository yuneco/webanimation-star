/**
 * 遅延を管理できるタイマー
 */
export class Timer {
  private id: number | undefined;
  private lastTime: number;
  onrun: ((delay: number) => void) | undefined = undefined;

  /** タイマーを生成します。初期状態は停止です。開始するにはstartを呼びます */
  constructor() {
    this.id = undefined;
    this.lastTime = 0;
  }

  /** タイマーを開始します。すでに開始済みの場合は一度停止してから再度指定のパラメータで開始します */
  start(fps: number) {
    if (this.id) {
      this.stop();
    }
    const interval = 1000 / fps;
    const onFire = () => {
      const actualInterval = Date.now() - this.lastTime;
      this.lastTime = Date.now();
      const delay = actualInterval / interval;
      this.onrun?.(delay);
    };
    this.id = setInterval(onFire, interval);
  }

  /** タイマーを停止します。すでに停止している場合は何もしません */
  stop() {
    clearTimeout(this.id);
    this.id = undefined;
  }
}
