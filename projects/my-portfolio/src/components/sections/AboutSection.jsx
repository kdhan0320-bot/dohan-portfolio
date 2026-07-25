import { Box, Container, Typography } from '@mui/material';
import RevealOnScroll from '../ui/RevealOnScroll';
import DMark from '../brand/DMark';
import QhdAmbientSignal from '../ui/QhdAmbientSignal';
import QhdSectionIndex from '../ui/QhdSectionIndex';
import { FONT_MONO, HUMAN_SIGNAL, ULTRAWIDE_CONTENT_MAX_WIDTH, HOME_WIDE_MAX_WIDTH } from '../../theme';

// Figma Home 전용 한글 서체(Noto Sans KR). 전역 FONT_SANS(SUIT Variable)는
// Projects·Detail 전용이라 바꾸지 않는다.
const FONT_KR = '"Noto Sans KR", "Pretendard", "Malgun Gothic", sans-serif';
const TABLET_MQ = '@media (min-width:600px)';
const COMPACT_MQ = '@media (min-width:1024px)';
const COMPACT_ONLY_MQ = '@media (min-width:1024px) and (max-width:1439.98px)';
const DESKTOP_MQ = '@media (min-width:1440px)';

/* Home의 유일한 About 섹션(Figma Human Signal Home v8 About 266:53). 별도의
 * /about 페이지는 존재하지 않으며, `/about` 접근은 App.jsx의 <Navigate>를
 * 통해 이 섹션으로 연결된다.
 *
 * Human Signal Phase 4A: 최신 Figma를 다시 확인한 결과 Phase 3C의 정리·연결·
 * 검증 밴드 + Capability Studio(dark 3레인) + 5단계 Working Process는 더 이상
 * 최신안에 없다 — 최신 About은 다음 두 블록뿐이다.
 * 1) Intro — 좌 헤드라인(ABOUT / CAPABILITIES) / 우 origin 배경 카드(BACKGROUND).
 * 2) Skill Matrix — Warm Paper 카드 하나 안에 좌측 소개(CAPABILITIES / VERIFIED)
 *    + 우측 3개 Skill Card(01 UX/UI·그래픽 설계 / 02 반응형 구현 / 03 품질 검증).
 * 섹션 바탕색도 Phase 3C의 Warm Paper에서 Soft White로 바뀌었다(266:53 실측,
 * Origin·Skill Matrix 카드가 그 위의 Warm Paper "종이" 표면으로 대비된다). */

/* 줄 끝 공백은 시각적으로 보이지 않지만 보조기술이 읽는 textContent에서
 * 단어가 붙지 않게 한다(Phase 4B 접근성 재검사에서 발견). */
const ABOUT_HEADLINE = ['제가 할 수 있는 일을, ', '실제 결과물 기준으로 보여드립니다.'];

const ORIGIN_TEXT =
  '생산 현장과 구매관리에서 익힌 기준 확인·누락 방지 습관이 정보 구조, 반응형 구현, 접근성 검증 기준으로 이어졌습니다.';

const SKILL_INTRO_LINES = ['설계하고, ', '구현하고, ', '검증합니다.'];
const SKILL_INTRO_BODY = '숙련도 퍼센트 대신, 결과물에서 확인 가능한 기술과 구현 범위만 적습니다.';

/* 숙련도 %·별점·전문가 표현은 넣지 않는다 — purpose/tools 문구는 Figma
 * Skill Card(318:112/119/126) visible text를 그대로 옮겼다. */
const SKILL_CARDS = [
  {
    index: '01', accent: HUMAN_SIGNAL.mutedSage,
    title: 'UX/UI·그래픽 설계',
    purpose: '정보 위계·사용자 흐름·화면 구조를 설계합니다.',
    tools: ['Figma · Photoshop · Illustrator', 'IA · Auto Layout · Prototype'],
  },
  {
    index: '02', accent: HUMAN_SIGNAL.steelMist,
    title: '반응형 구현',
    purpose: '설계를 여러 화면 폭에서 작동하는 UI로 구현합니다.',
    tools: ['HTML · CSS · JavaScript', 'React'],
  },
  {
    index: '03', accent: HUMAN_SIGNAL.brightOrange,
    title: '품질 검증',
    purpose: '상태·접근성·브라우저·회귀 문제를 확인합니다.',
    tools: ['Playwright · Build/Lint', 'Git'],
  },
];

const AboutSection = () => {
  return (
    <Box
      component="section"
      id="about"
      aria-label="소개"
      sx={{
        position: 'relative', overflow: 'hidden', bgcolor: HUMAN_SIGNAL.softWhite,
        pt: { xs: '64px', md: 13 }, pb: { xs: '72px', md: 14 },
        [COMPACT_ONLY_MQ]: { pt: '88px', pb: '96px' },
      }}
    >
      {/* QHD(1920+) 전용 외곽 신호 — Figma 432:313, About 콘텐츠보다 강하지 않게 저대비.
       * top:260은 Figma About Right(432:313) section-relative 실측값(y=1120, About
       * section 시작 860 기준 1120-860=260). About section 자체가 위치 기준(relative)이라
       * Hero처럼 Header 오프셋 보정이 필요 없다. */}
      <QhdAmbientSignal variant="about-right" sx={{ right: `calc((100vw - ${HOME_WIDE_MAX_WIDTH}px) / 2 - 470px)`, top: 260 }} />
      <QhdSectionIndex id="about" index="01" label="ABOUT / CAPABILITIES" side="left" indexTop={220} labelTop={380} indexOffset={502} labelOffset={434} />

      <Container
        maxWidth={false}
        sx={{
          px: { xs: 3, sm: 6, md: 8 },
          maxWidth: { xl: ULTRAWIDE_CONTENT_MAX_WIDTH + 128 },
          mx: 'auto', position: 'relative',
          [COMPACT_ONLY_MQ]: { px: '48px' },
          '@media (min-width:1920px)': { maxWidth: HOME_WIDE_MAX_WIDTH, px: 8 },
        }}
      >
        {/* Intro — 좌 헤드라인 / 우 origin 배경 카드(Warm Paper) */}
        <Box sx={{
          display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0,58fr) minmax(0,38fr)' },
          columnGap: { md: 6 }, rowGap: { xs: 4, md: 0 }, alignItems: 'end',
          [COMPACT_ONLY_MQ]: {
            gridTemplateColumns: '590px 306px',
            columnGap: '32px',
            height: '190px',
          },
          [DESKTOP_MQ]: {
            gridTemplateColumns: '780px 440px',
            columnGap: '92px',
            height: '210px',
          },
        }}>
          <Box>
            <Typography sx={{ fontFamily: FONT_MONO, color: HUMAN_SIGNAL.burntOrange, fontSize: '0.75rem', letterSpacing: '0.06em', mb: { xs: 4, md: 3 } }}>
              ABOUT / CAPABILITIES
            </Typography>
            <RevealOnScroll y={14} duration={0.45}>
              <Typography
                component="h2"
                sx={{
                  fontFamily: FONT_KR, fontWeight: 700,
                  // Figma About 제목: Mobile 390(30px/40px) · Compact 1024(37px/47px) ·
                  // Desktop 1440(44px/56px).
                  fontSize: '30px', lineHeight: '40px', letterSpacing: '-0.015em',
                  color: HUMAN_SIGNAL.inkNavy,
                  [COMPACT_MQ]: { fontSize: '37px', lineHeight: '47px' },
                  [DESKTOP_MQ]: { fontSize: '44px', lineHeight: '56px' },
                }}
              >
                {ABOUT_HEADLINE.map((line) => (
                  <Box key={line} component="span" sx={{ display: 'block' }}>{line}</Box>
                ))}
              </Typography>
            </RevealOnScroll>
          </Box>

          <RevealOnScroll y={14} duration={0.45} delay={0.08}>
            <Box sx={{
              bgcolor: HUMAN_SIGNAL.warmPaper, borderRadius: '18px',
              px: { xs: 2.5, md: 3 }, py: { xs: 2.5, md: 2.75 },
              [DESKTOP_MQ]: { height: '160px' },
            }}>
              <Typography sx={{
                fontFamily: FONT_MONO, color: HUMAN_SIGNAL.burntOrange, fontSize: '0.75rem',
                letterSpacing: '0.04em', mb: 1.25,
              }}>
                BACKGROUND / WHY I WORK THIS WAY
              </Typography>
              <Typography sx={{
                fontFamily: FONT_KR,
                color: HUMAN_SIGNAL.inkNavy, fontWeight: 450,
                fontSize: { xs: '0.9375rem', md: '1rem' }, lineHeight: 1.7,
              }}>
                {ORIGIN_TEXT}
              </Typography>
            </Box>
          </RevealOnScroll>
        </Box>

        {/* Skill Matrix — Warm Paper 카드 하나(좌 소개 + 우 Skill Card 3개) */}
        <RevealOnScroll
          y={16}
          duration={0.45}
          delay={0.14}
          sx={{
            mt: { xs: 4, md: 8 },
            [COMPACT_ONLY_MQ]: { mt: '48px' },
            [DESKTOP_MQ]: { mt: '56px' },
          }}
        >
          <Box data-skill-matrix="true" sx={{
            position: 'relative', overflow: 'hidden',
            bgcolor: HUMAN_SIGNAL.warmPaper, border: `1px solid ${HUMAN_SIGNAL.paperDeep}`, borderRadius: '22px',
            width: '100%', height: '650px', p: 0,
            display: 'block',
            [TABLET_MQ]: {
              height: 'auto', p: 4, borderRadius: '28px',
              display: 'grid', gridTemplateColumns: '1fr', rowGap: 4,
            },
            '@media (min-width:900px)': {
              p: 4.5, gridTemplateColumns: 'minmax(0,240px) 1fr',
              columnGap: 5, rowGap: 0,
            },
            [COMPACT_ONLY_MQ]: {
              height: '340px',
              p: '23px',
              gridTemplateColumns: '202px 654px',
              columnGap: '24px',
            },
            [DESKTOP_MQ]: { height: '380px' },
          }}>
            {/* 좌측 — CAPABILITIES / VERIFIED 소개. D2 watermark는 배경 장식용. */}
            <Box sx={{ position: 'static', minWidth: 0, [TABLET_MQ]: { position: 'relative' } }}>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute', left: { xs: -12, md: 0 }, bottom: { xs: -20, md: -10 },
                  width: 160, height: 160, opacity: 0.08, pointerEvents: 'none',
                  display: { xs: 'none', sm: 'block' },
                  [COMPACT_ONLY_MQ]: {
                    left: '22px', top: '126px', bottom: 'auto', width: 150, height: 150,
                  },
                }}
              >
                <DMark size="100%" tone="onLight" sx={{ width: '100%', height: '100%' }} />
              </Box>
              <Typography sx={{
                fontFamily: FONT_MONO, color: HUMAN_SIGNAL.burntOrange,
                position: 'absolute', left: '21px', top: '23px', width: '180px', height: '14px',
                fontSize: '11.5px', lineHeight: '18px', letterSpacing: '0.012em', m: 0,
                [TABLET_MQ]: {
                  position: 'relative', left: 'auto', top: 'auto', width: 'auto', height: 'auto',
                  fontSize: '0.75rem', lineHeight: 'normal', letterSpacing: '0.06em', mb: 1.5,
                },
                [COMPACT_ONLY_MQ]: {
                  position: 'absolute', left: 0, top: 0, width: '180px', height: '16px',
                  fontSize: '12px', lineHeight: '18px', letterSpacing: 'normal', mb: 0,
                },
              }}>
                CAPABILITIES / VERIFIED
              </Typography>
              <Typography sx={{
                fontFamily: FONT_KR, fontWeight: 700,
                // Figma Skill Matrix 제목: Mobile 390(21px/30px) · Compact 1024(26px/34px) ·
                // Desktop 1440(31px/40px).
                position: 'absolute', left: '17px', top: '49px', width: '306px', height: '60px',
                fontSize: '21px', lineHeight: '30px',
                color: HUMAN_SIGNAL.inkNavy, m: 0,
                [TABLET_MQ]: {
                  position: 'relative', left: 'auto', top: 'auto', width: 'auto', height: 'auto', mb: 1.75,
                },
                [COMPACT_MQ]: { fontSize: '26px', lineHeight: '34px' },
                [DESKTOP_MQ]: { fontSize: '31px', lineHeight: '40px' },
                [COMPACT_ONLY_MQ]: {
                  position: 'absolute', left: 0, top: '34px', width: '190px', height: '108px', mb: 0,
                },
              }}>
                {SKILL_INTRO_LINES.map((line, index) => (
                  <Box
                    key={line}
                    component="span"
                    sx={{ display: index === 2 ? 'block' : 'inline', [TABLET_MQ]: { display: 'block' } }}
                  >
                    {line}
                  </Box>
                ))}
              </Typography>
              <Typography sx={{
                fontFamily: FONT_KR, color: HUMAN_SIGNAL.mutedInk,
                position: 'absolute', left: '17px', top: '115px', width: '306px', height: '44px',
                fontSize: '13px', lineHeight: '22px', m: 0,
                [TABLET_MQ]: {
                  position: 'relative', left: 'auto', top: 'auto', width: 'auto', height: 'auto',
                  fontSize: '0.875rem', lineHeight: 1.6, maxWidth: 280,
                },
                [COMPACT_ONLY_MQ]: {
                  position: 'absolute', left: 0, top: '184px', width: '190px', height: '52px',
                  fontSize: '13px', lineHeight: '22px', maxWidth: 'none',
                },
              }}>
                {SKILL_INTRO_BODY}
              </Typography>
            </Box>

            {/* 우측 — Skill Card 3개. 카드 외곽 크기·제목 영역·설명 기준선·divider·
             * tools 시작점을 3개 카드가 반응형별로 동일하게 통일한다(동일 grid). */}
            <Box sx={{
              position: 'absolute', left: '17px', top: '175px', width: '306px',
              display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'repeat(3, 144px)', gap: '18px',
              [TABLET_MQ]: {
                position: 'static', width: 'auto',
                gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'none', gap: 2,
              },
              '@media (min-width:900px)': { gridTemplateColumns: 'repeat(3, 1fr)', gap: 2.5 },
              [COMPACT_ONLY_MQ]: {
                gridTemplateColumns: 'repeat(3, 202px)', gap: '24px',
              },
            }}>
              {SKILL_CARDS.map((card) => (
                <Box
                  key={card.index}
                  data-skill-card={card.index}
                  sx={{
                    position: 'relative', bgcolor: HUMAN_SIGNAL.softWhite, border: `1px solid ${HUMAN_SIGNAL.paperDeep}`,
                    borderRadius: '18px', p: 0, display: 'block', overflow: 'hidden',
                    width: '306px', height: '144px',
                    [TABLET_MQ]: {
                      borderRadius: '22px', p: 2.5, display: 'flex', flexDirection: 'column',
                      overflow: 'visible', width: 'auto', height: 'auto',
                    },
                    '@media (min-width:900px)': { p: 2.75, minHeight: 300 },
                    [COMPACT_ONLY_MQ]: {
                      borderRadius: '20px', p: 0, display: 'block', overflow: 'hidden',
                      width: '202px', height: '292px', minHeight: 0,
                    },
                  }}
                >
                  <Typography
                    aria-hidden="true"
                    sx={{
                      fontFamily: FONT_MONO, fontWeight: 700, color: HUMAN_SIGNAL.inkNavy, opacity: 0.28,
                      position: 'absolute', left: '15px', top: '11px', width: '56px', height: '40px',
                      fontSize: '34px', lineHeight: '40px', m: 0,
                      [TABLET_MQ]: {
                        position: 'relative', left: 'auto', top: 'auto', width: 'auto', height: 'auto',
                        opacity: 0.22, fontSize: '2.25rem', lineHeight: 1, mb: 1.5,
                      },
                      '@media (min-width:900px)': { fontSize: '2.75rem' },
                      [COMPACT_ONLY_MQ]: {
                        position: 'absolute', left: '19px', top: '13px', width: '100px', height: '64px',
                        fontSize: '44px', lineHeight: '30px', mb: 0,
                      },
                    }}
                  >
                    {card.index}
                  </Typography>
                  <Box aria-hidden="true" sx={{
                    position: 'absolute', left: '71px', top: '19px',
                    width: 4, height: 104, borderRadius: '2px', bgcolor: card.accent,
                    [TABLET_MQ]: {
                      position: 'relative', left: 'auto', top: 'auto', width: 48, height: 4, mb: 2,
                    },
                    [COMPACT_ONLY_MQ]: {
                      position: 'absolute', left: '17px', top: '79px', width: '44px', height: '4px', mb: 0,
                    },
                  }} />
                  <Typography sx={{
                    position: 'absolute', left: '89px', top: '15px', width: '196px', height: '28px',
                    fontFamily: FONT_KR, fontWeight: 700, fontSize: '20px', lineHeight: '28px',
                    color: HUMAN_SIGNAL.inkNavy, m: 0, wordBreak: 'keep-all',
                    [TABLET_MQ]: {
                      position: 'relative', left: 'auto', top: 'auto', width: 'auto', height: 'auto',
                      fontSize: '1.25rem', lineHeight: 'normal', mb: 1,
                    },
                    [COMPACT_ONLY_MQ]: {
                      position: 'absolute', left: '19px', top: '107px', width: '166px', height: '54px',
                      fontSize: card.index === '01' ? '20px' : '22px',
                      lineHeight: card.index === '01' ? '27px' : '30px',
                      mb: 0,
                    },
                  }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{
                    position: 'absolute', left: '89px', top: '49px', width: '196px', height: '42px',
                    fontFamily: FONT_KR, fontWeight: 500, fontSize: '13px', color: HUMAN_SIGNAL.inkText,
                    lineHeight: '20px', wordBreak: 'keep-all', m: 0,
                    [TABLET_MQ]: {
                      position: 'relative', left: 'auto', top: 'auto', width: 'auto', height: 'auto',
                      fontSize: '0.875rem', lineHeight: 1.6, mb: 'auto',
                    },
                    [COMPACT_ONLY_MQ]: {
                      position: 'absolute', left: '19px', top: '173px', width: '166px', height: '44px',
                      fontSize: '13px', lineHeight: '22px', mb: 0,
                    },
                  }}>
                    {card.purpose}
                  </Typography>
                  <Box sx={{
                    position: 'absolute', left: '89px', top: '93px', width: '196px',
                    [TABLET_MQ]: {
                      position: 'relative', left: 'auto', top: 'auto', width: 'auto',
                      borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`, mt: 2.5, pt: 1.5,
                    },
                    [COMPACT_ONLY_MQ]: {
                      position: 'absolute', left: '17px', top: '225px', width: '166px',
                      mt: 0, pt: '15px',
                    },
                  }}>
                    {card.tools.map((line) => (
                      <Typography key={line} sx={{
                        fontFamily: FONT_KR, fontSize: '11.5px', color: HUMAN_SIGNAL.mutedInk,
                        lineHeight: '20px', wordBreak: 'keep-all',
                        [TABLET_MQ]: { fontSize: '0.75rem', lineHeight: 1.65 },
                        [COMPACT_ONLY_MQ]: { fontSize: '11.5px', lineHeight: '20px', letterSpacing: '-0.1px' },
                      }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </RevealOnScroll>
      </Container>
    </Box>
  );
};

export default AboutSection;
