import { useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import useInViewOnce from '../../hooks/useInViewOnce';
import ActionIcon from '../ui/ActionIcon';
import ThumbnailStage from '../ui/ThumbnailStage';
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
const FEATURED_RAIL_OFFSET = HOME_PROJECT_MAX_WIDTH / 2 + 24;

/* Home Featured Projects — 승인 Figma(Home Desktop 1440 254:3의 261:2, Compact
 * 1024 365:216, Mobile 390 269:102)로 복구한다.
 *
 * Figma 기준(사용자 승인 Home Figma Fidelity Fix 지시서 E):
 * - Featured 전체는 Warm Paper 단일 배경 하나이고, 각 프로젝트는 그 안의 row다.
 *   Soft White/Paper Deep로 번갈아지는 full-bleed 색상 band는 없다(이전
 *   구현의 alternating band를 제거).
 * - row 사이는 얇은 divider 하나로만 구분한다.
 * - 공정봄·JobFlow·설비잇은 공통 ThumbnailStage에 실제 승인 화면을 넣고,
 *   새 browser toolbar나 프로젝트별 임의 비율을 추가하지 않는다.
 * - CTA는 검은 filled 버튼이 아니라 orange text link + arrow("프로젝트 상세
 *   보기", Figma 263:23/264:20/265:65)다. */
const FEATURED_IDS = [
  {
    id: 'gongjeongbom', slug: 'gongjeongbom', displayTitle: '공정봄', stageTone: 'deep',
    media: {
      kind: 'single',
      src: `${BASE}thumbnails/normalized/gongjeongbom-card-1600x1000.png`,
      alt: '공정봄 제조 검사·자동화 B2B 반응형 웹 홈 화면',
    },
  },
  {
    id: 'jobflow', slug: 'jobflow', displayTitle: 'JobFlow', stageTone: 'deep',
    media: { kind: 'single', src: `${BASE}thumbnails/normalized/jobflow-card-1600x1000.png`, alt: '실제 브라우저 실행 화면 · JobFlow Dashboard' },
  },
  {
    id: 'seolbiit', slug: 'seolbiit', displayTitle: '설비잇', stageTone: 'soft',
    media: {
      kind: 'single',
      src: `${BASE}thumbnails/normalized/seolbiit-card-1600x1000.png`,
      alt: '설비잇 현장 점검과 정비 관리 운영 UI',
    },
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

const Stage = ({ block, motionSx }) => (
  <Box data-project-stage={block.id} sx={{ gridArea: 'stage', minWidth: 0, ...motionSx }}>
    <ThumbnailStage
      src={block.media.src}
      sources={block.media.sources}
      alt={block.media.alt}
      loading="eager"
      variant="featured"
      objectFit="contain"
      sx={{ boxShadow: '0px 14px 30px rgba(8,13,20,0.13)' }}
    />
  </Box>
);

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
    ? '"stage top" "stage eyebrow" "stage title" "stage desc" "stage proof" "stage scope" "stage cta" "stage bottom"'
    : '"top stage" "eyebrow stage" "title stage" "desc stage" "proof stage" "scope stage" "cta stage" "bottom stage"';
  // Figma column gap: 72(1440) · 48(1024) · Copy 496/1312, Stage 744/1312(1440);
  // Copy 360/928, Stage 520/928(1024).
  const crossColumns = stageFirst ? '520fr 360fr' : '360fr 520fr';
  const desktopColumns = stageFirst ? '744fr 496fr' : '496fr 744fr';
  const labelColor = HUMAN_SIGNAL.burntOrange;
  const proofItems = (project.cardRole ?? []).slice(0, 2);

  return (
    <Box ref={ref} component="section" data-project-row={block.id} sx={{ position: 'relative' }}>
      <Box
        data-featured-layout="vertical-center"
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
            gridTemplateRows: 'minmax(0, 1fr) repeat(6, auto) minmax(0, 1fr)',
            columnGap: '48px',
            rowGap: 1.5,
          },
          [DESKTOP_MQ]: { gridTemplateColumns: desktopColumns, columnGap: '72px' },
        }}
      >
        <Typography data-featured-copy-item="eyebrow" sx={{ gridArea: 'eyebrow', fontFamily: FONT_MONO, color: labelColor, fontSize: '0.75rem', letterSpacing: '0.04em', ...revealSx(show, skip, 0.08) }}>
          {indexLabel} · {project.categoryLabel}
        </Typography>

        <Typography component="h3" data-featured-copy-item="title" sx={{
          gridArea: 'title', fontFamily: FONT_KR, fontWeight: 700, wordBreak: 'keep-all',
          fontSize: '1.625rem', lineHeight: 1.29, letterSpacing: '-0.02em',
          [COMPACT_MQ]: { fontSize: '1.875rem', letterSpacing: '-0.028px' },
          [DESKTOP_MQ]: { fontSize: '2.25rem', letterSpacing: '-0.034px' },
          color: HUMAN_SIGNAL.inkNavy, ...revealSx(show, skip, 0.08),
        }}>
          {displayTitle}
        </Typography>

        <Typography data-featured-copy-item="description" sx={{
          gridArea: 'desc', fontFamily: FONT_KR, color: HUMAN_SIGNAL.mutedInk, wordBreak: 'keep-all',
          fontSize: '0.9375rem', lineHeight: 1.7,
          [COMPACT_MQ]: { fontSize: '0.875rem' },
          [DESKTOP_MQ]: { fontSize: '1rem' },
          ...revealSx(show, skip, 0.08),
        }}>
          {project.description}
        </Typography>

        {proofItems.length > 0 && (
          <Typography data-featured-copy-item="proof" sx={{
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
          <Typography data-featured-copy-item="scope" sx={{
            gridArea: 'scope', fontFamily: FONT_KR, fontSize: '0.8125rem', lineHeight: 1.6, color: HUMAN_SIGNAL.mutedInk, wordBreak: 'keep-all',
            ...revealSx(show, skip, 0.08),
          }}>
            {project.cardScope}
          </Typography>
        )}

        <Stage block={block} motionSx={revealSx(show, skip, 0)} />

        <Box data-featured-copy-item="cta" sx={{ gridArea: 'cta', alignSelf: 'end', mt: 1, [COMPACT_MQ]: { mt: 0 }, ...revealSx(show, skip, 0.08) }}>
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
    <Box component="section" id="projects" aria-label="프로젝트" data-featured-section="true" sx={{
      position: 'relative', overflow: 'hidden', bgcolor: HUMAN_SIGNAL.warmPaper,
      py: { xs: 7, md: 9 },
      boxSizing: 'border-box',
      [COMPACT_ONLY_MQ]: { pt: '88px', pb: '96px' },
      [DESKTOP_MQ]: { pt: '104px', pb: '120px' },
    }}>
      <QhdAmbientSignal variant="featured-left" sx={{ left: `calc((100vw - ${HOME_WIDE_MAX_WIDTH}px) / 2 - 440px)`, top: 1278 }} />

      <Box
        aria-hidden="true"
        data-featured-signal-rail="true"
        sx={{
          display: 'none', position: 'absolute', zIndex: 1, width: '1px',
          bgcolor: 'rgba(89,99,110,0.34)', pointerEvents: 'none',
          [DESKTOP_MQ]: { display: 'block', left: `calc(50% + ${FEATURED_RAIL_OFFSET}px)`, top: '330px', height: '1540px' },
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
            [DESKTOP_MQ]: {
              display: 'block', left: `calc(50% + ${FEATURED_RAIL_OFFSET - checkpoint.desktopSize / 2}px)`,
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
        <Box data-featured-content-shell="true" sx={{ maxWidth: { xl: HOME_PROJECT_MAX_WIDTH }, mx: 'auto' }}>
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

          <Box data-featured-divider="heading" sx={{ borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`, mb: { xs: 5, md: 6 }, [DESKTOP_MQ]: { mb: '64px' } }} />

          {/* Featured Projects는 Warm Paper 단일 배경 안의 row 3개다 — 이전의
           * Soft White/Paper Deep 번갈이 full-bleed band는 없다. row 사이는
           * 얇은 divider 하나로만 구분한다. */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 6 }, [MOBILE_ONLY_MQ]: { gap: 0 }, [DESKTOP_MQ]: { gap: '64px' } }}>
            {FEATURED_BLOCKS.map((block, i) => (
              <Box key={block.id}>
                {i > 0 && (
                  <Box data-featured-divider={`row-${i}`} sx={{ borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`, mb: { xs: 5, md: 6 }, [DESKTOP_MQ]: { mb: '64px' } }} />
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
