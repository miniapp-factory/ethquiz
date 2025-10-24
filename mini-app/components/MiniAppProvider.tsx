import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MiniAppSDK, Context } from "@farcaster/miniapp-sdk";

interface MiniAppContext {
  sdk: MiniAppSDK;
  context: Context.MiniAppContext | undefined;
  isInMiniApp: boolean | undefined;
}

const defaultSettings: MiniAppContext = {
  sdk: new MiniAppSDK(),
  context: undefined,
  isInMiniApp: undefined,
};

const MiniAppContext = createContext<MiniAppContext>(defaultSettings);

export function MiniAppProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<MiniAppContext>(defaultSettings);

  useEffect(() => {
    const ready = async () => {
      await Promise.all([
        context.sdk.context.then((ctx) =>
          setContext((old) => ({ ...old, context: ctx }))
        ),
        context.sdk.isInMiniApp().then((inMiniApp) =>
          setContext((old) => ({ ...old, isInMiniApp: inMiniApp }))
        ),
      ]);
    };
    ready();
  }, []);

  return (
    <MiniAppContext.Provider value={context}>{children}</MiniAppContext.Provider>
  );
}

export function useMiniApp() {
  return useContext(MiniAppContext);
}
