/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KIT_API_KEY: string;
  readonly VITE_KIT_FORM_ID: string;
  readonly VITE_KIT_TAG_IDS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.mp4" {
  const value: string;
  export default value;
}
