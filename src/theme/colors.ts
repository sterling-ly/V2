// Based mostly on https://github.com/Uniswap/interface/blob/main/src/theme/index.tsx
import { opacify } from './utils'

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F5F6FC',
  gray100: '#E8ECFB',
  gray150: '#D2D9EE',
  gray200: '#B8C0DC',
  gray300: '#98A1C0',
  gray400: '#7780A0',
  gray500: '#5D6785',
  gray600: '#404A67',
  gray650: '#333D59',
  gray700: '#b76165', //background interactive original: #293249
  gray800: '#b76165', //background original: #131A2A ~ buttons and text box and containers; #b76165
  gray900: '#844a5a', //old 0D111C container background; #844a5a
  gray950: '#080B11', //old: 080B11_ NEW: #6e617a ??
  pink200: '#FBA4C0',
  pink300: '#FF6FA3',
  pink400: '#FB118E',
  red300: '#FD766B',
  red400: '#FA2B39',
  red900: '#240800',
  yellow400: '#A08116',
  yellow500: '#866311',
  yellow600: '#5D4204',
  gold200: '#EEB317',
  gold400: '#B17900',
  green200: '#76D191',
  green300: '#40B66B',
  green400: '#209853',
  blue200: '#ADBCFF',
  blue300: '#869EFF',
  blue400: '#634f98', //original: 4C82FB; second button colors
  blue900: '#040E34',
  magenta300: '#FD82FF',
  magentaVibrant: '#FC72FF',
  purple300: '#8440F2',
  purple900: '#1C0337',
  networkEthereum: '#627EEA',
  networkOptimism: '#FF0420',
  networkPolygon: '#A457FF',
  networkArbitrum: '#28A0F0',
  networkBsc: '#F0B90B',
}

type Theme = typeof darkTheme

const commonTheme = {
  white: colors.white,
  black: colors.black,

  chain_1: colors.networkEthereum,
  //chain_3: colors.yellow400,
  //chain_4: colors.pink400,
  chain_5: colors.green400,
  chain_10: colors.networkOptimism,
  chain_137: colors.networkPolygon,
  chain_42: colors.networkArbitrum,
  chain_56: colors.networkBsc,
  chain_420: colors.networkOptimism,
  //chain_42161: colors.networkArbitrum,
  chain_421613: colors.networkArbitrum,
  chain_80001: colors.networkPolygon,
  chain_137_background: colors.purple900,
  chain_10_background: colors.red900,
  chain_42161_background: colors.blue900,
  chain_56_background: colors.networkBsc,
  promotional: colors.magenta300,

  brandedGradient: 'linear-gradient(139.57deg, #FF79C9 4.35%, #FFB8E2 96.44%);',
  promotionalGradient: 'radial-gradient(101.8% 4091.31% at 0% 0%, #4673FA 0%, #9646FA 100%);',

  hoverState: opacify(24, colors.blue200),
  hoverDefault: opacify(8, colors.gray300),
}

export const darkTheme = {
  ...commonTheme,

  userThemeColor: colors.magentaVibrant,

  background: colors.gray800, //fixed
  backgroundBackdrop: colors.gray950,
  backgroundSurface: colors.gray900, //fixed
  backgroundModule: colors.gray800, //fixed
  backgroundInteractive: colors.gray700, //fixed
  backgroundFloating: opacify(12, colors.black),
  backgroundOutline: opacify(24, colors.gray300),
  backgroundScrim: opacify(72, colors.gray900), //fixed
  backgroundScrolledSurface: opacify(72, colors.gray900), //fixed

  textPrimary: colors.white, //
  textSecondary: colors.gray300,
  textTertiary: colors.gray500,

  accentAction: colors.blue400, //fixed
  accentActive: colors.blue400, //fixed
  accentSuccess: colors.green200, //fixed
  accentWarning: colors.gold200, //fixed
  accentFailure: colors.red300, //fixed
  accentCritical: colors.red300, //fixed

  accentActionSoft: opacify(24, colors.blue400), //fixed
  accentActiveSoft: opacify(24, colors.blue400), //fixed
  accentSuccessSoft: opacify(24, colors.green400), //fixed
  accentWarningSoft: opacify(24, colors.gold200), //fixed
  accentFailureSoft: opacify(12, colors.red300), //fixed

  accentTextDarkPrimary: opacify(80, colors.white),
  accentTextDarkSecondary: opacify(60, colors.gray300),
  accentTextDarkTertiary: opacify(24, colors.gray500),

  accentTextLightPrimary: colors.gray50,
  accentTextLightSecondary: opacify(72, colors.gray50),
  accentTextLightTertiary: opacify(12, colors.gray50),

  deepShadow: '12px 16px 24px rgba(0, 0, 0, 0.24), 12px 8px 12px rgba(0, 0, 0, 0.24), 4px 4px 8px rgba(0, 0, 0, 0.32);',
  shallowShadow: '4px 4px 10px rgba(0, 0, 0, 0.24), 2px 2px 4px rgba(0, 0, 0, 0.12), 1px 2px 2px rgba(0, 0, 0, 0.12);',

  networkDefaultShadow: `0px 40px 120px ${opacify(16, colors.blue400)}`,

  stateOverlayHover: opacify(8, colors.gray300),
  stateOverlayPressed: opacify(24, colors.gray200),

  searchBackground: `rgba(255,255,255,0.07)`,
  searchOutline: `rgba(255,255,255,0.07)`,
}

export const lightTheme: Theme = {
  ...commonTheme,

  userThemeColor: colors.magentaVibrant,

  background: '#faf9fa', //INTENTIONALLY OFF THEME TO GIVE WHITE BG A SOFTER VISUAL
  backgroundBackdrop: colors.white,
  backgroundSurface: colors.white,
  backgroundModule: colors.gray50,
  backgroundInteractive: colors.gray100,
  backgroundFloating: opacify(8, colors.gray700),
  backgroundOutline: colors.gray150,
  backgroundScrim: opacify(60, colors.gray900),
  backgroundScrolledSurface: opacify(72, colors.white),

  textPrimary: colors.gray900,
  textSecondary: colors.gray400,
  textTertiary: colors.gray300,

  accentAction: colors.pink400,
  accentActive: colors.blue400,
  accentSuccess: colors.green300,
  accentWarning: colors.gold400,
  accentFailure: colors.red400,
  accentCritical: colors.red400,

  accentActionSoft: opacify(12, colors.pink400),
  accentActiveSoft: opacify(24, colors.blue400),
  accentSuccessSoft: opacify(24, colors.green300),
  accentWarningSoft: opacify(24, colors.gold400),
  accentFailureSoft: opacify(12, colors.red400),

  accentTextDarkPrimary: opacify(80, colors.gray900),
  accentTextDarkSecondary: opacify(60, colors.gray900),
  accentTextDarkTertiary: opacify(24, colors.gray900),

  accentTextLightPrimary: colors.gray50,
  accentTextLightSecondary: opacify(72, colors.gray50),
  accentTextLightTertiary: opacify(12, colors.gray50),

  deepShadow:
    '8px 12px 20px rgba(51, 53, 72, 0.04), 4px 6px 12px rgba(51, 53, 72, 0.02), 4px 4px 8px rgba(51, 53, 72, 0.04);',
  shallowShadow:
    '6px 6px 10px rgba(51, 53, 72, 0.01), 2px 2px 6px rgba(51, 53, 72, 0.02), 1px 2px 2px rgba(51, 53, 72, 0.02);',

  networkDefaultShadow: `0px 40px 120px ${opacify(12, colors.pink400)}`,

  stateOverlayHover: opacify(8, colors.gray300),
  stateOverlayPressed: opacify(24, colors.gray200),

  searchBackground: opacify(4, colors.white),
  searchOutline: opacify(1, colors.black),
}
