import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        prebot: {
          cream: '#F5F0E8',
          paper: '#FBF8F2',
          ink: '#241D18',
          brown: '#33271F',
          taupe: '#8B8177',
          line: '#D9D0C5',
        },
      },
      borderRadius: {
        'prebot-card': '1.45rem',
        'prebot-pill': '999px',
      },
      boxShadow: {
        'prebot-shell': '0 28px 70px rgba(71, 57, 44, 0.18)',
        'prebot-soft': '0 14px 35px rgba(55, 43, 33, 0.10)',
      },
      fontFamily: {
        serifbrand: ['Georgia', 'Times New Roman', 'serif'],
        sansui: ['Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
