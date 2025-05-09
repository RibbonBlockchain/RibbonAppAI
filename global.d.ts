// types/global.d.ts
export {}; // This makes the file a module

declare global {
  interface Window {
    tiktokEmbed?: {
      lib: {
        init: () => void;
      };
    };
  }
}

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: () => void;
      };
    };
  }
}
