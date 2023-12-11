export const generateID = (): string => {
    if (typeof window !== 'undefined' && window.URL && window.URL.createObjectURL) {
      return window.URL.createObjectURL(new Blob([])).slice(-36);
    } else {
      return 'fallback-id';
    }
  };
  
  export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));