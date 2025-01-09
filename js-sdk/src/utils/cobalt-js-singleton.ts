import { Cobalt } from "@cobaltio/cobalt-js";

class CobaltJsSingleton {
  private static instance: Cobalt | null = null;

  private constructor() {}

  public static initialize(token: string): void {
    if (!CobaltJsSingleton.instance) {
      CobaltJsSingleton.instance = new Cobalt({
        token,
        baseUrl: "https://api.gocobalt.io",
      });
    }
  }

  public static getInstance(): Cobalt {
    if (!CobaltJsSingleton.instance) {
      throw new Error(
        "CobaltJsSingleton is not initialized. Call `initialize` first."
      );
    }
    return CobaltJsSingleton.instance;
  }
}

export default CobaltJsSingleton;
