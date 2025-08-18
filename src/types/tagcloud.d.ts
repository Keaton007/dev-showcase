declare module 'tagcloud' {
  interface TagCloudOptions {
    radius?: number;
    maxSpeed?: string;
    initSpeed?: string;
    keep?: boolean;
    useHTML?: boolean;
  }

  interface TagCloudInstance {
    pause?: () => void;
    resume?: () => void;
    destroy?: () => void;
  }

  function TagCloud(
    element: HTMLElement,
    texts: string[],
    options?: TagCloudOptions
  ): TagCloudInstance;

  export = TagCloud;
} 