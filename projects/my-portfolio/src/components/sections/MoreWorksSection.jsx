import { Box, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ActionIcon from '../ui/ActionIcon';
import ThumbnailStage from '../ui/ThumbnailStage';
import QhdAmbientSignal from '../ui/QhdAmbientSignal';
import QhdSectionIndex from '../ui/QhdSectionIndex';
import { FONT_MONO, HUMAN_SIGNAL, ULTRAWIDE_CONTENT_MAX_WIDTH, HOME_WIDE_MAX_WIDTH } from '../../theme';

const FONT_KR = '"Noto Sans KR", "Pretendard", "Malgun Gothic", sans-serif';
const COMPACT_MQ = '@media (min-width:1024px)';
const DESKTOP_MQ = '@media (min-width:1440px)';

/* Home Selected Works는 승인된 두 항목만 지정 순서로 표시한다. Projects의
 * More Works 공개 플래그에는 BREWSTEP도 포함되므로 두 화면의 구성을 분리한다. */
const HOME_SELECTED_IDS = ['bus-arrival-app', 'ott-service'];
const PUBLISHED_WORKS = HOME_SELECTED_IDS
  .map((id) => ALL_PROJECTS.find((project) => project.id === id))
  .filter(Boolean);

/* Phase 4B 재검토: burntOrange(#A84325, 전역 토큰)는 Paper Deep 위에서 4.30:1로
 * 기준(4.5:1) 미달이라 Phase 2D에서 Ink Navy로 교체했었다. 하지만 최신 Figma
 * "SELECTED WORKS" 라벨(267:56)이 실제로 쓰는 값은 burntOrange가 아니라
 * 별도의 더 어두운 orange `#9E3D22`이고, 이 값은 Paper Deep 위에서 4.78:1로
 * 기준을 통과한다(직접 재계산 확인) — Figma 값을 임의로 Ink Navy로 대체할
 * 이유가 없어져 원래 색으로 되돌린다. */
const ORANGE_ON_PAPER_DEEP = '#9E3D22';

/* 현재 공개 코드·README가 Home Selected Works의 closeout Source of Truth다.
 * Portfolio Figma READY는 구성·문구·자산 확정 후 별도 회차에서 동기화한다. */
const FeatureCard = ({ project }) => {
  const meta = project.categoryLabel || (project.tools ?? []).join(' · ');
  const stack = (project.moreWorksTools ?? project.tools ?? []).join(' · ').toUpperCase();
  return (
    <Box
      sx={{
        display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch', width: '100%',
        height: { xs: 'auto', sm: '300px' },
        minHeight: { xs: '482px', sm: 'unset' },
        gap: '14px', borderRadius: '18px',
        bgcolor: HUMAN_SIGNAL.softWhite,
        p: '18px',
        [COMPACT_MQ]: { gap: '32px', borderRadius: '24px', p: '22px' },
        [DESKTOP_MQ]: { height: '330px', gap: '42px', pl: '26px', pr: '38px', py: '26px' },
        boxShadow: '0px 14px 30px rgba(8,13,20,0.13)',
      }}
    >
      <Box sx={{
        width: { xs: '100%', sm: '46%' }, flexShrink: 0, alignSelf: 'center',
        [COMPACT_MQ]: { width: '430.28px' },
        [DESKTOP_MQ]: { width: '620px' },
      }}>
        <ThumbnailStage
          src={project.thumbnailUrl}
          alt={`${project.title} 대표 화면`}
          loading="eager"
          objectFit="contain"
          sx={{
            height: { xs: '190px' }, aspectRatio: 'auto',
            [COMPACT_MQ]: { height: '192.93px' },
            [DESKTOP_MQ]: { height: '278px' },
          }}
        />
      </Box>

      {/* 정보 영역 — Ink Navy 계열(Soft White 배경) */}
      <Box sx={{
        display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minWidth: 0,
        justifyContent: 'flex-start',
      }}>
        <Typography sx={{ fontFamily: FONT_MONO, fontSize: '0.75rem', letterSpacing: '0.04em', color: HUMAN_SIGNAL.burntOrange }}>
          {meta}
        </Typography>
        <Typography component="h3" sx={{
          fontFamily: FONT_KR, fontWeight: 700, color: HUMAN_SIGNAL.inkNavy,
          fontSize: '1.5rem', lineHeight: 1.3, letterSpacing: '-0.01em',
          [COMPACT_MQ]: { fontSize: '1.6875rem', lineHeight: 1.33 },
          [DESKTOP_MQ]: { fontSize: '1.875rem', lineHeight: 1.33, letterSpacing: '-0.01em' },
        }}>
          {project.title}
        </Typography>
        <Typography sx={{
          fontFamily: FONT_KR, color: HUMAN_SIGNAL.mutedInk, wordBreak: 'keep-all',
          fontSize: '0.875rem', lineHeight: 1.64,
          [DESKTOP_MQ]: { fontSize: '1rem', lineHeight: 1.69 },
        }}>
          {project.description}
        </Typography>
        {stack && (
          <Typography sx={{ fontFamily: FONT_MONO, fontSize: '0.75rem', letterSpacing: '0.04em', color: HUMAN_SIGNAL.inkNavy, mt: 0.5 }}>
            {stack}
          </Typography>
        )}
        {project.moreWorksStatus && (
          <Typography sx={{
            fontFamily: FONT_MONO, fontSize: '0.6875rem', lineHeight: 1.5,
            letterSpacing: '0.04em', color: HUMAN_SIGNAL.mutedInk,
          }}>
            {project.moreWorksStatus}
          </Typography>
        )}
        <Box
          component={RouterLink}
          to="/projects"
          aria-label="전체 프로젝트 페이지로 이동"
          sx={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1,
            alignSelf: 'flex-start', mt: 'auto',
            bgcolor: HUMAN_SIGNAL.inkNavy, color: HUMAN_SIGNAL.softWhite, textDecoration: 'none',
            height: { xs: 54, sm: 52 }, px: 2.5, borderRadius: '14px', width: { xs: '100%', sm: 'auto' },
            fontFamily: FONT_KR, fontWeight: 700, fontSize: '0.875rem',
            transition: 'transform 160ms ease, box-shadow 160ms ease',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 22px rgba(12,20,32,0.28)' },
            '&:focus-visible': { outline: `2px solid ${HUMAN_SIGNAL.burntOrange}`, outlineOffset: '3px' },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
            [DESKTOP_MQ]: { height: 56 },
          }}
        >
          전체 프로젝트 보기 <ActionIcon variant="internal" sx={{ color: HUMAN_SIGNAL.brightOrangeOnDark }} />
        </Box>
      </Box>
    </Box>
  );
};

const MoreWorksSection = () => {
  const count = PUBLISHED_WORKS.length;
  if (count === 0) return null;

  return (
    <Box component="section" aria-label="더 많은 작업물" sx={{
      position: 'relative', overflowX: 'hidden', bgcolor: HUMAN_SIGNAL.paperDeep,
      py: { xs: 7, md: 10 }, boxSizing: 'border-box',
      '@media (max-width:599.98px)': { minHeight: '1300px' },
      [COMPACT_MQ]: { minHeight: '1010px', pt: '88px', pb: '96px' },
      [DESKTOP_MQ]: { minHeight: '1096px', pt: '96px', pb: '104px' },
    }}>
      <QhdAmbientSignal variant="selected-right" sx={{ right: `calc((100vw - ${HOME_WIDE_MAX_WIDTH}px) / 2 - 440px)`, top: -123 }} />
      <QhdSectionIndex id="selected" index="03" label="SELECTED / RANGE" side="left" indexTop={117} labelTop={277} indexOffset={502} labelOffset={434} />

      <Container
        maxWidth={false}
        sx={{
          px: { xs: 3, sm: 6, md: 8 }, maxWidth: { xl: ULTRAWIDE_CONTENT_MAX_WIDTH + 128 }, mx: 'auto',
          '@media (min-width:1920px)': { maxWidth: HOME_WIDE_MAX_WIDTH, px: 8 },
        }}
      >
        <Box
          data-selected-heading="true"
          sx={{
            maxWidth: 640, mb: 4,
            [COMPACT_MQ]: {
              display: 'grid', gridTemplateColumns: '1fr 300px', columnGap: '48px',
              alignItems: 'end', maxWidth: 'none', height: '138px', mb: '40px',
            },
            [DESKTOP_MQ]: {
              gridTemplateColumns: '1fr 420px', columnGap: '72px',
              height: '144px', mb: '48px',
            },
          }}
        >
          <Box>
            <Typography sx={{
              fontFamily: FONT_MONO, color: ORANGE_ON_PAPER_DEEP,
              fontSize: '0.75rem', letterSpacing: '0.06em', mb: 2,
              [COMPACT_MQ]: { mb: '14px' },
              [DESKTOP_MQ]: { mb: 0.5 },
            }}>
              SELECTED WORKS
            </Typography>
            <Typography component="h2" sx={{
              fontFamily: FONT_KR, fontWeight: 700, wordBreak: 'keep-all',
              // Figma Selected 제목: Mobile 390(28px/38px) · Compact 1024(42px/52px) · Desktop 1440(48px/60px).
              fontSize: '1.75rem', lineHeight: '38px', letterSpacing: '-0.014em',
              color: HUMAN_SIGNAL.inkNavy, mb: 1.5,
              [COMPACT_MQ]: { fontSize: '42px', lineHeight: '52px', mb: 0 },
              [DESKTOP_MQ]: { fontSize: '48px', lineHeight: '60px' },
            }}>
              <Box component="span" sx={{ display: 'block' }}>다른 작업도, </Box>
              <Box component="span" sx={{ display: 'block' }}>같은 기준으로 정리했습니다.</Box>
            </Typography>
          </Box>
          {/* Phase 4B: mutedInk(#59636E)는 이 섹션 배경 Paper Deep 위에서 대비가
           * 기준(4.5:1) 미달로 확인됐다(자동 검사) — 더 어두운 inkText로 바꾼다. */}
          <Typography sx={{
            fontFamily: FONT_KR, color: HUMAN_SIGNAL.inkText, wordBreak: 'keep-all',
            fontSize: '0.875rem', lineHeight: 1.64,
            [DESKTOP_MQ]: { fontSize: '1rem', lineHeight: 1.69 },
          }}>
            <Box component="span" sx={{ display: 'block' }}>모바일 Prototype과 반응형 퍼블리싱 작업을 </Box>
            <Box component="span" sx={{ display: 'block' }}>같은 기준으로 소개합니다.</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {PUBLISHED_WORKS.map((project) => <FeatureCard key={project.id} project={project} />)}
        </Box>
      </Container>
    </Box>
  );
};

export default MoreWorksSection;
