import { Box } from '@mui/material';
import { FONT_MONO, FONT_SANS, HOME_WIDE_MAX_WIDTH, QHD_DECORATION_MIN_WIDTH, SECTION_SIGNAL_TONES } from '../../theme';

/* Home 01–04는 layout="section"으로 숫자와 설명을 하나의 세로 묶음으로
 * 만든다. 네 섹션 모두 같은 top·gap·가운데 정렬을 쓰며, 중앙 콘텐츠 바깥의
 * 좌/우 여백 안에서만 배치한다. 별도 숫자/설명 좌표는 사용하지 않는다.
 * Projects 01–03도 같은 묶음을 쓰고 실제 콘텐츠 폭과 배경 tone만 전달한다.
 * 표시 기준은 원형 장식과 같은 QHD_DECORATION_MIN_WIDTH(2480px)다. */
const QHD_MQ = `@media (min-width:${QHD_DECORATION_MIN_WIDTH}px)`;

const horizontalFor = (side, offset) =>
  side === 'left'
    ? `calc(50% - 720px - ${offset}px)`
    : `calc(50% + 720px + ${offset}px)`;

const QhdSectionIndex = ({
  id, index, label, side, indexTop, labelTop, indexOffset, labelOffset,
  layout = 'legacy',
  tone = 'light', contentWidth = HOME_WIDE_MAX_WIDTH,
  indexColor = SECTION_SIGNAL_TONES[tone].indexColor,
  indexFontSize = '170px',
  indexOpacity = SECTION_SIGNAL_TONES[tone].indexOpacity,
  labelOpacity = 1,
}) => layout === 'section' ? (
  <Box
    aria-hidden="true"
    data-qhd-index-group={id}
    sx={{
      display: 'none',
      [QHD_MQ]: { display: 'flex' },
      position: 'absolute', top: 104, [side]: 0,
      width: `calc((100% - ${contentWidth}px) / 2)`,
      boxSizing: 'border-box', px: 3,
      flexDirection: 'column', alignItems: 'center', gap: '12px',
      textAlign: 'center', pointerEvents: 'none', userSelect: 'none',
    }}
  >
    <Box data-qhd-index={index} sx={{
      fontFamily: FONT_SANS, fontWeight: 700, fontSize: indexFontSize,
      fontVariantNumeric: 'tabular-nums', lineHeight: 1,
      color: indexColor, opacity: indexOpacity, whiteSpace: 'nowrap',
    }}>
      {index}
    </Box>
    <Box data-qhd-index-label={id} sx={{
      fontFamily: FONT_MONO, fontWeight: 600, fontSize: '12px', lineHeight: 1.5,
      color: SECTION_SIGNAL_TONES[tone].labelColor, opacity: labelOpacity, whiteSpace: 'nowrap',
    }}>
      {label}
    </Box>
  </Box>
) : (
  <Box
    aria-hidden="true"
    sx={{
      display: 'none',
      [QHD_MQ]: { display: 'block' },
      position: 'absolute', inset: 0, overflow: 'hidden',
      pointerEvents: 'none', userSelect: 'none',
    }}
  >
    <Box
      data-qhd-index={index}
      sx={{
        position: 'absolute', top: indexTop, left: horizontalFor(side, indexOffset),
        fontFamily: FONT_SANS, fontWeight: 700, fontSize: indexFontSize, lineHeight: 1,
        color: indexColor, opacity: indexOpacity, whiteSpace: 'nowrap',
      }}
    >
      {index}
    </Box>
    <Box
      data-qhd-index-label={id}
      sx={{
        position: 'absolute', top: labelTop, left: horizontalFor(side, labelOffset),
        fontFamily: FONT_MONO, fontWeight: 600, fontSize: '12px',
        color: SECTION_SIGNAL_TONES[tone].labelColor, opacity: labelOpacity, whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Box>
  </Box>
);

export default QhdSectionIndex;
