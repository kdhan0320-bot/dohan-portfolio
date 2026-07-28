import { useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import useInViewOnce from '../../hooks/useInViewOnce';
import ActionIcon from '../ui/ActionIcon';
import QhdAmbientSignal from '../ui/QhdAmbientSignal';
import QhdSectionIndex from '../ui/QhdSectionIndex';
import { FONT_MONO, HUMAN_SIGNAL, ULTRAWIDE_CONTENT_MAX_WIDTH, HOME_WIDE_MAX_WIDTH, HOME_PROJECT_MAX_WIDTH } from '../../theme';

// Figma Home 화면 전용 한글 서체(Noto Sans KR) — 전역 FONT_SANS(SUIT Variable,
// Projects·Detail 전용)는 바꾸지 않는다.
const FONT_KR = '"Noto Sans KR", "Pretendard", "Malgun Gothic", sans-serif';
const BASE = import.meta.env.BASE_URL;
const MOBILE_ONLY_MQ = '@media (max-width:599.98px)';
const COMPACT_MQ = '@media (min-width:1024px)';
const COMPACT_ONLY_MQ = '@media (min-width:1024px) and (max-width:1439.95px)';
const DESKTOP_MQ = '@media (min-width:1440px)';
const MOBILE_STAGE_HEIGHTS = {
  jobflow: '226px',
  'bus-arrival-app': '286px',
  'feedback-hub': '230px',
};

/* Home Featured Projects — 승인 Figma(Home Desktop 1440 254:3의 261:2, Compact
 * 1024 365:216, Mobile 390 269:102)로 복구한다.
 *
 * Figma 기준(사용자 승인 Home Figma Fidelity Fix 지시서 E):
 * - Featured 전체는 Warm Paper 단일 배경 하나이고, 각 프로젝트는 그 안의 row다.
 *   Soft White/Paper Deep로 번갈아지는 full-bleed 색상 band는 없다(이전
 *   구현의 alternating band를 제거).
 * - row 사이는 얇은 divider 하나로만 구분한다.
 * - JobFlow(263:2)의 Stage는 실제 화면을 680×425(1440 기준)로 그대로 inset하고
 *   가짜 browser toolbar row가 없다 — 이전 구현이 모든 프로젝트에 공통으로 씌우던
 *   3-dot 상단 바를 JobFlow에서는 제거한다.
 * - 울산 버스 도착정보(264:12)는 public/detail의 Figma Prototype 중
 *   HOME·SEARCH·ROUTE에 대응하는 3개(01-home/02-search/04-route-detail)를
 *   좌·우 작게, 중앙 크게 배치한다.
 * - Portfolio Feedback Hub(265:42)는 Soft White stage 안에 실제 화면을
 *   media frame에 contain하고, sage Signal Block·orange Signal Dot 구조를
 *   유지한다 — 실제 화면이 stage 전체를 지배하지 않게 한다.
 * - CTA는 검은 filled 버튼이 아니라 orange text link + arrow("프로젝트 상세
 *   보기", Figma 263:23/264:20/265:65)다. */
const FEATURED_IDS = [
  {
    id: 'jobflow', slug: 'jobflow', displayTitle: 'JobFlow', stageTone: 'deep',
    media: { kind: 'single', src: `${BASE}detail/jobflow-dashboard-1440.png`, alt: '실제 브라우저 실행 화면 · JobFlow Dashboard' },
  },
  {
    id: 'bus-arrival-app', slug: 'bus-arrival', displayTitle: '울산 버스 도착정보', stageTone: 'deep',
    media: {
      kind: 'triple', label: 'HOME · SEARCH · ROUTE',
      items: [
        { src: `${BASE}detail/bus-arrival-01-home.png`, alt: '울산 버스 도착정보 Figma Prototype · Home' },
        { src: `${BASE}detail/bus-arrival-02-search.png`, alt: '울산 버스 도착정보 Figma Prototype · Search' },
        { src: `${BASE}detail/bus-arrival-04-route-detail.png`, alt: '울산 버스 도착정보 Figma Prototype · Route Detail' },
      ],
    },
  },
  {
    id: 'feedback-hub', slug: 'feedback-hub', displayTitle: 'Portfolio Feedback Hub', stageTone: 'soft',
    media: { kind: 'single', src: `${BASE}detail/feedback-list-1440.png`, alt: '실제 Portfolio Feedback Hub 화면' },
  },
];

const FEATURED_BLOCKS = FEATURED_IDS
  .map((ref) => {
    const project = ALL_PROJECTS.find((p) => p.id === ref.id);
    return project ? { ...ref, project } : null;
  })
  .filter(Boolean);

/* Page Motion Rules(171:25) Featured Projects: duration 약 0.55s, 이미지이
 * 먼저(0ms) 16px 이하로 opacity+이동, copy가 80ms 뒤를 따른다. review 캡처
 * 모드에서는 애니메이션 없이 즉시 최종 상태, reduced-motion도 즉시 최종
 * 상태(index.css 전역 규칙이 duration을 0.01ms로 강제). */
const isReviewCapture =
  (typeof window !== 'undefined' && window.__PORTFOLIO_REVIEW_MODE__ === true) ||
  (typeof document !== 'undefined' && document.documentElement?.getAttribute('data-review-mode') === 'true');

const revealSx = (show, skip, delay) => ({
  opacity: show ? 1 : 0,
  transform: show ? 'translateY(0)' : { xs: 'translateY(9px)', lg: 'translateY(16px)' },
  transition: skip ? 'none' : `opacity 0.55s ease-out ${delay}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
});

/* Stage — 프로젝트별 실제 화면을 Figma Stage 프레임 안에 배치한다. JobFlow는
 * chrome 없이 실제 화면을 직접 inset하고(Figma 330:104), Bus Arrival은 실제
 * 모바일 화면 3개를 Media/Slot/Mobile 비율(190:360)로, Feedback Hub는 실제
 * 화면을 Soft White media frame에 contain한다(Figma 265:43). */
const Stage = ({ block, indexLabel, motionSx }) => {
  const { media, stageTone } = block;
  const dark = stageTone === 'deep';

  return (
    <Box
      data-project-stage={block.id}
      sx={{
        gridArea: 'stage', position: 'relative', width: '100%', minWidth: 0,
        aspectRatio: '342 / 226',
        borderRadius: '20px',
        [MOBILE_ONLY_MQ]: { aspectRatio: 'auto', height: MOBILE_STAGE_HEIGHTS[block.id] },
        [COMPACT_MQ]: { aspectRatio: 'auto', height: '430px', borderRadius: '24px' },
        [DESKTOP_MQ]: { height: '500px', borderRadius: '28px' },
        overflow: 'hidden',
        bgcolor: dark ? HUMAN_SIGNAL.deepHarbor : HUMAN_SIGNAL.softWhite,
        border: dark ? 'none' : `1px solid ${HUMAN_SIGNAL.paperDeep}`,
        boxShadow: '0px 14px 30px rgba(8,13,20,0.13)',
        ...motionSx,
      }}
    >
      {/* 대형 ghost index — 순수 장식 */}
      <Typography
        aria-hidden="true"
        sx={{
          position: 'absolute', left: { xs: 14, sm: 22 }, bottom: { xs: -10, sm: -18 },
          fontFamily: FONT_KR, fontWeight: 700, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          fontSize: { xs: '3.25rem', sm: '4.5rem' }, [DESKTOP_MQ]: { fontSize: '7rem' },
          color: dark ? HUMAN_SIGNAL.softWhite : HUMAN_SIGNAL.inkNavy, opacity: 0.06,
        }}
      >
        {indexLabel}
      </Typography>
      {/* signal node — Figma "Visual / Signal Node" */}
      <Box aria-hidden="true" sx={{
        position: 'absolute', top: { xs: 12, sm: 18 }, right: { xs: 14, sm: 26 },
        width: 10, height: 10, borderRadius: '50%', bgcolor: HUMAN_SIGNAL.brightOrange,
      }} />

      {media.kind === 'single' && (
        <Box sx={{
          position: 'absolute', left: '5.5%', top: '7.5%', width: '89%', height: '85%',
          overflow: 'hidden', borderRadius: '14px', [COMPACT_MQ]: { borderRadius: '18px' },
          boxShadow: '0px 12px 24px rgba(0,0,0,0.15)',
        }}>
          <Box
            component="img" src={media.src} alt={media.alt} loading="eager"
            sx={{
              width: '100%', height: '100%', display: 'block',
              // feedback-list-1440.png(세로로 긴 목록 화면)을 contain으로 넣으면
              // stage 안에서 거의 보이지 않을 만큼 작아진다(실측 확인) — 실제
              // 화면이 눈에 보이도록 cover + top으로 상단 UI를 잘라 보여준다.
              objectFit: 'cover', objectPosition: 'top',
              bgcolor: HUMAN_SIGNAL.softWhite,
            }}
          />
        </Box>
      )}

      {media.kind === 'triple' && (
        <>
          <Box sx={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: { xs: 1, sm: 1.5 }, px: { xs: 2, sm: 3 },
          }}>
            {media.items.map((item, i) => (
              <Box
                key={item.src}
                sx={{
                  position: 'relative', overflow: 'hidden', borderRadius: '16px',
                  bgcolor: HUMAN_SIGNAL.softWhite, border: `1px solid ${HUMAN_SIGNAL.paperDeep}`,
                  boxShadow: '0px 12px 24px rgba(0,0,0,0.15)', aspectRatio: '190 / 360',
                  width: i === 1 ? { xs: '30%', sm: '25%' } : { xs: '24%', sm: '18%' },
                  transform: i === 1 ? { xs: 'translateY(-3%)', sm: 'translateY(-4%)' } : 'none',
                  zIndex: i === 1 ? 1 : 0,
                }}
              >
                <Box component="img" src={item.src} alt={item.alt} loading="eager"
                  sx={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
              </Box>
            ))}
          </Box>
          <Typography aria-hidden="true" sx={{
            position: 'absolute', left: '50%', bottom: { xs: 10, sm: 16 }, transform: 'translateX(-50%)',
            fontFamily: FONT_MONO, fontSize: { xs: '0.5625rem', sm: '0.75rem' }, letterSpacing: '0.04em',
            color: HUMAN_SIGNAL.softWhite, whiteSpace: 'nowrap',
          }}>
            {media.label}
          </Typography>
        </>
      )}

      {stageTone === 'soft' && (
        <>
          <Box aria-hidden="true" sx={{
            position: 'absolute', right: { xs: '6%', sm: '9%' }, bottom: { xs: '10%', sm: '14%' },
            width: { xs: 64, sm: 96, md: 118 }, height: { xs: 34, sm: 48, md: 60 },
            borderRadius: '18px', bgcolor: HUMAN_SIGNAL.mutedSage,
          }} />
          <Box aria-hidden="true" sx={{
            position: 'absolute', right: { xs: '11%', sm: '15.5%' }, bottom: { xs: '15%', sm: '19%' },
            width: { xs: 8, sm: 11, md: 14 }, height: { xs: 8, sm: 11, md: 14 }, borderRadius: '50%',
            bgcolor: HUMAN_SIGNAL.brightOrange,
          }} />
        </>
      )}
    </Box>
  );
};

/* 390~1024: copy summary(eyebrow/title/desc) → 실제 화면 → PROOF/ACTUAL SCOPE
 * → CTA 순서. DOM 순서는 모든 breakpoint에서 index/type → title → description
 * → PROOF → ACTUAL SCOPE → stage → CTA로 고정하고(접근성 읽기 순서),
 * grid-template-areas로만 시각 위치를 바꾼다. */
const ProjectBlock = ({ block, index }) => {
  const { project, slug, displayTitle } = block;
  const stageFirst = index % 2 === 0;
  const indexLabel = String(index + 1).padStart(2, '0');

  const prefersReduced = useRef(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );
  const [ref, isVisible] = useInViewOnce(0.15);
  const show = isReviewCapture || prefersReduced.current || isVisible;
  const skip = isReviewCapture || prefersReduced.current;

  const stackedAreas = '"eyebrow" "title" "desc" "stage" "proof" "scope" "cta"';
  const crossAreas = stageFirst
    ? '"stage eyebrow" "stage title" "stage desc" "stage proof" "stage scope" "stage cta"'
    : '"eyebrow stage" "title stage" "desc stage" "proof stage" "scope stage" "cta stage"';
  // Figma column gap: 72(1440) · 48(1024) · Copy 496/1312, Stage 744/1312(1440);
  // Copy 360/928, Stage 520/928(1024).
  const crossColumns = stageFirst ? '520fr 360fr' : '360fr 520fr';
  const desktopColumns = stageFirst ? '744fr 496fr' : '496fr 744fr';
  const labelColor = HUMAN_SIGNAL.burntOrange;
  const proofItems = (project.cardRole ?? []).slice(0, 2);

  return (
    <Box ref={ref} component="section" data-project-row={block.id} sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateAreas: stackedAreas,
          gridTemplateColumns: '1fr',
          rowGap: 3,
          [MOBILE_ONLY_MQ]: { rowGap: 2 },
          [COMPACT_MQ]: {
            gridTemplateAreas: crossAreas,
            gridTemplateColumns: crossColumns,
            gridTemplateRows: 'auto auto 1fr auto auto auto',
            columnGap: '48px',
            rowGap: 1.5,
          },
          [DESKTOP_MQ]: { gridTemplateColumns: desktopColumns, columnGap: '72px' },
        }}
      >
        <Typography sx={{ gridArea: 'eyebrow', fontFamily: FONT_MONO, color: labelColor, fontSize: '0.75rem', letterSpacing: '0.04em', ...revealSx(show, skip, 0.08) }}>
          {indexLabel} · {project.categoryLabel}
        </Typography>

        <Typography component="h3" sx={{
          gridArea: 'title', fontFamily: FONT_KR, fontWeight: 700, wordBreak: 'keep-all',
          fontSize: '1.625rem', lineHeight: 1.29, letterSpacing: '-0.02em',
          [COMPACT_MQ]: { fontSize: '1.875rem', letterSpacing: '-0.028px' },
          [DESKTOP_MQ]: { fontSize: '2.25rem', letterSpacing: '-0.034px' },
          color: HUMAN_SIGNAL.inkNavy, ...revealSx(show, skip, 0.08),
        }}>
          {displayTitle}
        </Typography>

        <Typography sx={{
          gridArea: 'desc', fontFamily: FONT_KR, color: HUMAN_SIGNAL.mutedInk, wordBreak: 'keep-all',
          fontSize: '0.9375rem', lineHeight: 1.7,
          [COMPACT_MQ]: { fontSize: '0.875rem' },
          [DESKTOP_MQ]: { fontSize: '1rem' },
          ...revealSx(show, skip, 0.08),
        }}>
          {project.description}
        </Typography>

        {proofItems.length > 0 && (
          <Typography sx={{
            gridArea: 'proof', fontFamily: FONT_KR, fontSize: '0.875rem', lineHeight: 1.6, color: HUMAN_SIGNAL.inkNavy, wordBreak: 'keep-all',
            pt: 1.75, borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`, ...revealSx(show, skip, 0.08),
          }}>
            <Box component="span" sx={{ fontFamily: FONT_MONO, fontWeight: 700, color: HUMAN_SIGNAL.deepSage, fontSize: '0.75rem', letterSpacing: '0.04em', mr: 1 }}>
              핵심 역량
            </Box>
            {proofItems.join(' · ')}
          </Typography>
        )}

        {project.cardScope && (
          <Typography sx={{
            gridArea: 'scope', fontFamily: FONT_KR, fontSize: '0.8125rem', lineHeight: 1.6, color: HUMAN_SIGNAL.mutedInk, wordBreak: 'keep-all',
            ...revealSx(show, skip, 0.08),
          }}>
            {project.cardScope}
          </Typography>
        )}

        <Stage block={block} indexLabel={indexLabel} motionSx={revealSx(show, skip, 0)} />

        <Box sx={{ gridArea: 'cta', alignSelf: 'end', mt: 1, [COMPACT_MQ]: { mt: 0 }, ...revealSx(show, skip, 0.08) }}>
          {/* Figma "Link / 프로젝트 상세 보기"(263:23 등): 검은 filled 버튼이
           * 아니라 orange text link + arrow다. */}
          <Box
            component={RouterLink}
            to={`/projects/${slug}`}
            aria-label={`${displayTitle} 상세 보기`}
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              color: HUMAN_SIGNAL.burntOrange, textDecoration: 'none',
              fontFamily: FONT_KR, fontWeight: 700, fontSize: '0.875rem',
              minHeight: 44, cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
              '&:focus-visible': { outline: `2px solid ${HUMAN_SIGNAL.burntOrange}`, outlineOffset: '3px', borderRadius: '4px' },
            }}
          >
            프로젝트 상세 보기 <ActionIcon variant="internal" sx={{ color: HUMAN_SIGNAL.burntOrange, fontSize: '1.125rem' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ProjectsSection = () => {
  return (
    <Box component="section" id="projects" aria-label="프로젝트" sx={{
      position: 'relative', overflow: 'hidden', bgcolor: HUMAN_SIGNAL.warmPaper,
      py: { xs: 7, md: 9 },
      boxSizing: 'border-box',
      [MOBILE_ONLY_MQ]: { height: '2298px' },
      [COMPACT_ONLY_MQ]: { height: '1935px', pt: '88px', pb: '96px' },
      [DESKTOP_MQ]: { height: '2301px', pt: '104px', pb: '120px' },
    }}>
      <QhdAmbientSignal variant="featured-left" sx={{ left: `calc((100vw - ${HOME_WIDE_MAX_WIDTH}px) / 2 - 440px)`, top: 1278 }} />

      <Box
        aria-hidden="true"
        data-featured-signal-rail="true"
        sx={{
          display: 'none', position: 'absolute', zIndex: 1, width: '1px',
          bgcolor: 'rgba(89,99,110,0.34)', pointerEvents: 'none',
          [COMPACT_ONLY_MQ]: { display: 'block', left: 'calc(100% - 50px)', top: '300px', height: '1270px' },
          [DESKTOP_MQ]: { display: 'block', left: 'calc(50% + 642px)', top: '330px', height: '1540px' },
        }}
      />
      {[
        { index: 0, compactTop: 390, desktopTop: 430, compactSize: 10, desktopSize: 10 },
        { index: 1, compactTop: 866, desktopTop: 1010, compactSize: 10, desktopSize: 10 },
        { index: 2, compactTop: 1342, desktopTop: 1588, compactSize: 12, desktopSize: 12 },
      ].map((checkpoint) => (
        <Box
          key={checkpoint.index}
          aria-hidden="true"
          data-featured-checkpoint={checkpoint.index + 1}
          sx={{
            display: 'none', position: 'absolute', zIndex: 2, borderRadius: '50%',
            bgcolor: checkpoint.index === 2 ? HUMAN_SIGNAL.brightOrange : HUMAN_SIGNAL.mutedSage,
            border: `2px solid ${HUMAN_SIGNAL.warmPaper}`,
            boxShadow: '0 0 0 1px rgba(89,99,110,0.34)',
            pointerEvents: 'none',
            [COMPACT_ONLY_MQ]: {
              display: 'block', left: 'calc(100% - 55px)', top: `${checkpoint.compactTop}px`,
              width: `${checkpoint.compactSize}px`, height: `${checkpoint.compactSize}px`,
            },
            [DESKTOP_MQ]: {
              display: 'block', left: `calc(50% + ${checkpoint.index === 2 ? 636 : 637}px)`,
              top: `${checkpoint.desktopTop}px`,
              width: `${checkpoint.desktopSize}px`, height: `${checkpoint.desktopSize}px`,
            },
          }}
        />
      ))}

      <Container
        maxWidth={false}
        sx={{
          px: { xs: 3, sm: 6, md: 8 }, maxWidth: { xl: ULTRAWIDE_CONTENT_MAX_WIDTH + 128 }, mx: 'auto',
          [COMPACT_ONLY_MQ]: { px: '48px' },
          '@media (min-width:1920px)': { maxWidth: HOME_WIDE_MAX_WIDTH, px: 8 },
        }}
      >
        <Box sx={{ maxWidth: { xl: HOME_PROJECT_MAX_WIDTH }, mx: 'auto' }}>
          <Box
            data-featured-heading="true"
            sx={{
              mb: 5,
              [COMPACT_MQ]: {
                display: 'grid', gridTemplateColumns: '1fr 300px', columnGap: '48px',
                alignItems: 'end', height: '170px', mb: '48px',
              },
              [DESKTOP_MQ]: {
                gridTemplateColumns: '1fr 420px', columnGap: '72px',
                height: '190px', mb: '64px',
              },
            }}
          >
            <Box>
              <Typography sx={{ fontFamily: FONT_MONO, color: HUMAN_SIGNAL.burntOrange, fontSize: '0.75rem', letterSpacing: '0.06em', mb: 2 }}>
                FEATURED PROJECTS
              </Typography>
              <Typography component="h2" sx={{
                fontFamily: FONT_KR, fontWeight: 700, wordBreak: 'keep-all',
                fontSize: '1.875rem', lineHeight: 1.33, letterSpacing: '-0.016em',
                color: HUMAN_SIGNAL.inkNavy, mb: 1.5,
                [COMPACT_MQ]: { fontSize: '2.625rem', lineHeight: 1.24, mb: 0 },
                [DESKTOP_MQ]: { fontSize: '3rem', lineHeight: 1.25, maxWidth: 760 },
              }}>
                <Box component="span" sx={{ display: 'block' }}>서로 다른 문제를, </Box>
                <Box component="span" sx={{ display: 'block' }}>같은 기준으로 풀었습니다.</Box>
              </Typography>
            </Box>
            <Typography sx={{
              fontFamily: FONT_KR, color: HUMAN_SIGNAL.mutedInk, wordBreak: 'keep-all',
              fontSize: '0.9375rem', lineHeight: 1.67,
              [COMPACT_MQ]: { fontSize: '0.875rem' },
              [DESKTOP_MQ]: { fontSize: '1rem' },
            }}>
              <Box component="span" sx={{ display: 'block' }}>각 프로젝트의 화면·역할·구현 범위를 </Box>
              <Box component="span" sx={{ display: 'block' }}>같은 기준으로 비교할 수 있게 정리했습니다.</Box>
            </Typography>
          </Box>

          <Box sx={{ borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`, mb: { xs: 5, md: 6 }, [DESKTOP_MQ]: { mb: '64px' } }} />

          {/* Featured Projects는 Warm Paper 단일 배경 안의 row 3개다 — 이전의
           * Soft White/Paper Deep 번갈이 full-bleed band는 없다. row 사이는
           * 얇은 divider 하나로만 구분한다. */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 6 }, [MOBILE_ONLY_MQ]: { gap: 0 }, [DESKTOP_MQ]: { gap: '64px' } }}>
            {FEATURED_BLOCKS.map((block, i) => (
              <Box key={block.id}>
                {i > 0 && (
                  <Box sx={{ borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`, mb: { xs: 5, md: 6 }, [DESKTOP_MQ]: { mb: '64px' } }} />
                )}
                <ProjectBlock block={block} index={i} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <QhdSectionIndex id="featured" index="02" label="FEATURED / EVIDENCE" side="right" indexTop={1619} labelTop={1779} indexOffset={218} labelOffset={148} />
    </Box>
  );
};

export default ProjectsSection;
