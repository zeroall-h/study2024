module.exports = {
  presets: [
    '@babel/preset-env', // 최신 JavaScript 문법을 구버전 JavaScript로 변환
  ],
  plugins: [
    '@babel/plugin-proposal-private-methods', // 프라이빗 메서드 지원
    '@babel/plugin-proposal-private-fields', // 프라이빗 필드 지원
  ],
};
