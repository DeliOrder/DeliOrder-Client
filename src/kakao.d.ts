interface KakaoAuth {
  authorize(options: { redirectUri: string }): void;
}

interface Kakao {
  Auth: KakaoAuth;
  isInitialized(): boolean;
  init(key: string): void;
}

interface Window {
  Kakao: Kakao;
}
