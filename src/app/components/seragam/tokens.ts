/**
 * Token Seragam (Figma: Seragam Dasar, koleksi Semantic dan Primitive, mode 1).
 * Semua nilai di bawah dibaca langsung dari Figma.
 */
export const color = {
  // text
  textDefault: '#323232',   // text/default = Gray/90
  textSubdued: '#727272',   // text/subdued = Gray/60
  textDisabled: '#828282',  // text/disabled = Gray/50
  textInverse: '#FFFFFF',   // text/inverse = White
  // action dan interactive
  actionDefault: '#0954D9', // action/default = Blue/70
  actionHovered: '#0746BD', // action/hovered = Blue/80
  focus: '#2A7EFB',         // interactive/focused = Blue/50
  // surface dan background
  background: '#F9F9F9',    // background/default = Gray/0
  surfaceDefault: '#FFFFFF',// surface/default = White
  surfaceSubdued: '#F1F1F1',// surface/subdued = Gray/5
  surfaceSelected: '#E6F1FF',// surface/selected/default = Blue/5
  surfaceHovered: '#D8D8D8',// surface/hovered = Gray/10
  // border
  borderHigh: '#5E5E5E',    // border/high = Gray/70
  border: '#828282',        // border/default = Gray/50
  borderSubdued: '#ADADAD', // border/subdued = Gray/30
  borderDisabled: '#C7C7C7',// border/disabled = Gray/20
  // status
  critical: '#DF2121',      // border/critical, text/critical = Red/60
  criticalSurface: '#FEEDF2',// surface/critical/default = Red/5
  success: '#268326',       // text/success = Green/60
  successSurface: '#E2F5E0',// surface/success/default = Green/5
  informationalSurface: '#E3F4FC', // surface/informational/default = Cyan/5
  warningText: '#8B5104',   // text/warning = Yellow/70
} as const;

/** Mobile/Action (Figma): Inter 15/22 semibold. */
export const typeAction = { fontSize: '15px', lineHeight: '22px', fontWeight: 600 } as const;
/** Desktop/Body (Figma): Inter 16/24 regular. */
export const typeBody = { fontSize: '16px', lineHeight: '24px' } as const;
export const typeLabel = { fontSize: '14px', lineHeight: '20px' } as const;

export const radius = { control: '4px', card: '8px' } as const;

/** Modal: header Surface/Subdued #F5F5F5 + Border/Subdued #C9CBCF, footer Border/Disabled #D9DBDD, padding 16x20. */
export const modal = { headerBg: '#F5F5F5', headerBorder: '#C9CBCF', footerBorder: '#D9DBDD', paddingY: '16px', paddingX: '20px' } as const;
/** Tabel: header 13/16 semibold kapital, sel 15/22 regular, padding 16, bayangan 0 2px 1px rgba(0,0,0,.05). */
export const table = { headerFont: { fontSize: '13px', lineHeight: '16px', fontWeight: 600 }, cellFont: { fontSize: '15px', lineHeight: '22px', fontWeight: 400 } } as const;
/** Badge: Surface Success #9AE5B9, Warning #FFDFA3, Critical #FFE9EA, Informational #98DAFB, Neutral Subdued #EFEFEF. */
