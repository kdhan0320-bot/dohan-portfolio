import { Box, Container, Typography } from '@mui/material';
import { PORTFOLIO_PDF_URL, GITHUB_PROFILE_URL, CONTACT_EMAIL } from '../../constants/site';
import { FONT_MONO, HUMAN_SIGNAL, HOME_WIDE_MAX_WIDTH, ULTRAWIDE_CONTENT_MAX_WIDTH } from '../../theme';
import ActionIcon from '../ui/ActionIcon';
import QhdSectionIndex from '../ui/QhdSectionIndex';

const APPLICATION_ROLES = ['UX/UI 웹디자인', '웹퍼블리싱', 'UI 구현'];
const FONT_KR = '"Noto Sans KR", "Pretendard", "Malgun Gothic", sans-serif';
const COMPACT_MQ = '@media (min-width:1024px)';
const DESKTOP_MQ = '@media (min-width:1440px)';

// 사용자 승인: 반복되는 D2 패널을 없애고 Selected Works와 같은 콘텐츠
// 컨테이너·왼쪽 여백을 사용한다. 높이는 내용에 따라 늘어나도록 둔다.
const ContactSection = () => (
  <Box component="section" id="contact" aria-label="연락처" sx={{
    position: 'relative', overflow: 'hidden', bgcolor: HUMAN_SIGNAL.softWhite,
    py: { xs: 7, md: 10 }, borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`,
  }}>
    <Container maxWidth={false} sx={{
      position: 'relative', px: { xs: 3, sm: 6, md: 8 },
      maxWidth: { xl: ULTRAWIDE_CONTENT_MAX_WIDTH + 128 }, mx: 'auto',
      '@media (min-width:1920px)': { maxWidth: HOME_WIDE_MAX_WIDTH, px: 8 },
    }}>
      <Box data-contact-content="true" sx={{ maxWidth: 820, textAlign: 'left' }}>
        <Typography sx={{ fontFamily: FONT_MONO, color: HUMAN_SIGNAL.burntOrange, fontSize: '0.75rem', letterSpacing: '0.06em', mb: 2.5 }}>
          CONTACT
        </Typography>
        <Typography component="h2" sx={{
          fontFamily: FONT_KR, fontWeight: 700, wordBreak: 'keep-all',
          // Figma Contact 제목: Mobile 390(32px/42px) · Compact 1024(42px/52px) ·
          // Desktop 1440(48px/60px).
          fontSize: '32px', lineHeight: '42px', letterSpacing: '-0.015em',
          color: HUMAN_SIGNAL.inkNavy, mb: 2.5,
          [COMPACT_MQ]: { fontSize: '42px', lineHeight: '52px' },
          [DESKTOP_MQ]: { fontSize: '48px', lineHeight: '60px' },
        }}>
          {/* 줄 끝 공백은 시각적으로 보이지 않지만 보조기술 textContent에서
           * 단어가 붙지 않게 한다(Phase 4B 접근성 재검사에서 발견). */}
          <Box component="span" sx={{ display: 'block' }}>함께 일할 기회를 </Box>
          <Box component="span" sx={{ display: 'block' }}>찾고 있습니다.</Box>
        </Typography>
        <Typography sx={{
          fontFamily: FONT_KR,
          color: HUMAN_SIGNAL.inkText, fontSize: { xs: '0.9375rem', md: '1rem' }, lineHeight: 1.65, mb: { xs: 3.5, md: 4.5 }, maxWidth: { xs: '100%', md: 680 }, wordBreak: 'keep-all',
        }}>
          복잡한 정보를 정리하고, Figma 설계부터 반응형 UI 구현과 검증까지 연결합니다.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', gap: 1.5, mb: 3, alignItems: { sm: 'center' } }}>
          {/* Mail — light plane에서 눈에 띄어야 하므로 Ink Navy 채움 버튼으로 반전
           * (이전 dark 페이지에서는 Soft White 채움만으로 충분히 튀었다). */}
          <Box
            component="a"
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="이메일 보내기"
            sx={{
              bgcolor: HUMAN_SIGNAL.inkNavy, color: HUMAN_SIGNAL.softWhite, height: 60, px: 3.5, minWidth: 208,
              width: { xs: '100%', sm: 'auto' },
              borderRadius: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              textDecoration: 'none', fontFamily: FONT_KR, fontWeight: 700, fontSize: '1.0625rem', whiteSpace: 'nowrap',
              transition: 'transform 180ms ease, box-shadow 180ms ease',
              boxShadow: '0 14px 30px rgba(12,20,32,0.22)',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 16px 34px rgba(12,20,32,0.3)' },
              '&:active': { transform: 'translateY(0)' },
              '&:focus-visible': { outline: `2px solid ${HUMAN_SIGNAL.burntOrange}`, outlineOffset: '3px', opacity: 1, transform: 'none' },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
            }}
          >
            메일 보내기 <ActionIcon variant="internal" sx={{ color: HUMAN_SIGNAL.brightOrangeOnDark, fontSize: '1.15rem' }} />
          </Box>
          <Box
            component="a"
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 프로필 새 탭에서 열기"
            sx={{
              bgcolor: 'transparent', color: HUMAN_SIGNAL.inkNavy, border: `1px solid ${HUMAN_SIGNAL.paperDeep}`, height: 48, px: 2.25, minWidth: 156,
              width: { xs: '100%', sm: 'auto' },
              borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              textDecoration: 'none', fontFamily: FONT_KR, fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap',
              transition: 'border-color 180ms ease, color 180ms ease',
              '&:hover': { borderColor: HUMAN_SIGNAL.inkNavy, color: HUMAN_SIGNAL.burntOrange },
              '&:focus-visible': { outline: `2px solid ${HUMAN_SIGNAL.burntOrange}`, outlineOffset: '3px', opacity: 1 },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            }}
          >
            GitHub 보기 <ActionIcon variant="external" sx={{ color: HUMAN_SIGNAL.burntOrange }} />
          </Box>
          {PORTFOLIO_PDF_URL && (
            <Box
              component="a"
              href={PORTFOLIO_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PDF 포트폴리오 새 탭에서 열기"
              sx={{
                bgcolor: 'transparent', color: HUMAN_SIGNAL.inkNavy, border: `1px solid ${HUMAN_SIGNAL.paperDeep}`, height: 48, px: 2.25, minWidth: 156,
                width: { xs: '100%', sm: 'auto' },
                borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap',
                transition: 'border-color 180ms ease, color 180ms ease',
                '&:hover': { borderColor: HUMAN_SIGNAL.inkNavy, color: HUMAN_SIGNAL.burntOrange },
                '&:focus-visible': { outline: `2px solid ${HUMAN_SIGNAL.burntOrange}`, outlineOffset: '3px', opacity: 1 },
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            >
              PDF 포트폴리오 <ActionIcon variant="download" sx={{ color: HUMAN_SIGNAL.burntOrange }} />
            </Box>
          )}
        </Box>

        <Box sx={{ mt: { xs: 1, md: 1.5 }, pt: 2.5, borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}` }}>
          <Typography sx={{ fontFamily: FONT_MONO, fontSize: '0.75rem', letterSpacing: '0.06em', color: HUMAN_SIGNAL.burntOrange, mb: 1 }}>
            지원 분야
          </Typography>
          <Typography sx={{ fontFamily: FONT_KR, fontSize: { xs: '0.9375rem', md: '1rem' }, color: HUMAN_SIGNAL.inkNavy, lineHeight: 1.6, wordBreak: 'keep-all' }}>
            {APPLICATION_ROLES.join(' · ')}
          </Typography>
        </Box>
      </Box>
      <Box component="footer" sx={{
        mt: { xs: 5, md: 6 }, pt: 3,
        borderTop: `1px solid ${HUMAN_SIGNAL.paperDeep}`,
        display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 1.5,
      }}>
        <Typography sx={{
          fontFamily: FONT_MONO, color: HUMAN_SIGNAL.mutedInk,
          fontSize: '0.6875rem', lineHeight: 1.8, letterSpacing: '0.04em',
        }}>
          DOHAN KIM · HUMAN SIGNAL / {new Date().getFullYear()} PORTFOLIO
        </Typography>
        <Typography sx={{
          fontFamily: FONT_MONO, color: HUMAN_SIGNAL.deepSage,
          fontSize: '0.6875rem', lineHeight: 1.8, letterSpacing: '0.04em',
        }}>
          OPEN TO WORK · UX/UI &amp; WEB PUBLISHING
        </Typography>
      </Box>
    </Container>
    <QhdSectionIndex id="contact" index="04" label="CONTACT / NEXT" side="right" indexTop={-5} labelTop={173} indexOffset={218} labelOffset={148} />
  </Box>
);

export default ContactSection;
