import { Box, Typography } from '@mui/material';
import { getCategoryTheme } from '../constants/categoryTheme';

const Line = ({ width = '100%', color = 'rgba(71,85,105,0.20)', height = 5 }) => (
  <Box sx={{ width, height, borderRadius: 4, bgcolor: color }} />
);

const Marker = ({ accent, children }) => (
  <Box sx={{
    minWidth: 22,
    height: 18,
    px: 0.65,
    borderRadius: 1,
    bgcolor: accent,
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.58rem',
    fontWeight: 800,
    lineHeight: 1,
  }}>
    {children}
  </Box>
);

const PortfolioPreview = ({ accent, soft }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '1.45fr 0.8fr', gap: 1, height: '100%' }}>
    <Box sx={{ border: '1px solid', borderColor: soft, borderRadius: 1.25, p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 1 }}>
        <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: accent }} />
        <Line width="42%" color={soft} />
      </Box>
      <Box sx={{ display: 'grid', gap: 0.75 }}>
        <Line width="88%" />
        <Line width="66%" />
        <Line width="78%" />
      </Box>
    </Box>
    <Box sx={{ display: 'grid', alignContent: 'space-between', gap: 0.75 }}>
      <Marker accent={accent}>✓</Marker>
      <Box sx={{ borderLeft: `2px solid ${accent}`, pl: 0.75, py: 0.35 }}>
        <Line width="90%" />
        <Box sx={{ mt: 0.6 }}><Line width="62%" /></Box>
      </Box>
    </Box>
  </Box>
);

const FigmaPreview = ({ accent, soft }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '0.55fr 1.45fr', gap: 1, height: '100%' }}>
    <Box sx={{ borderRight: '1px solid', borderColor: soft, pr: 0.8, display: 'grid', alignContent: 'center', gap: 0.75 }}>
      <Line width="72%" color={soft} />
      <Line width="92%" />
      <Line width="62%" />
    </Box>
    <Box sx={{ position: 'relative', border: '1px solid', borderColor: soft, borderRadius: 1.25, p: 1 }}>
      <Box sx={{ position: 'absolute', top: 8, bottom: 8, left: '50%', borderLeft: `1px dashed ${accent}`, opacity: 0.55 }} />
      <Box sx={{ width: '55%', height: '62%', border: `2px solid ${accent}`, bgcolor: `${accent}0D`, mx: 'auto', mt: 0.45 }} />
      <Box sx={{ position: 'absolute', right: 7, top: 7 }}><Marker accent={accent}>1</Marker></Box>
    </Box>
  </Box>
);

const UxPreview = ({ accent, soft }) => (
  <Box sx={{ position: 'relative', height: '100%' }}>
    <Box sx={{ position: 'absolute', left: '14%', right: '14%', top: '49%', borderTop: `1px solid ${soft}` }} />
    <Box sx={{ position: 'absolute', left: '50%', top: '22%', bottom: '22%', borderLeft: `1px solid ${soft}` }} />
    {[
      { left: '5%', top: '34%', width: '26%' },
      { left: '38%', top: '8%', width: '25%' },
      { left: '38%', top: '60%', width: '25%' },
      { right: '5%', top: '34%', width: '26%' },
    ].map((node, index) => (
      <Box key={index} sx={{
        position: 'absolute',
        ...node,
        height: 28,
        border: '1px solid',
        borderColor: index === 1 ? accent : soft,
        borderRadius: 1,
        bgcolor: index === 1 ? `${accent}0D` : '#fff',
        display: 'grid',
        placeItems: 'center',
      }}>
        <Line width="58%" color={index === 1 ? accent : soft} height={4} />
      </Box>
    ))}
  </Box>
);

const JobPreview = ({ accent, soft }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 1, height: '100%' }}>
    <Box sx={{ border: '1px solid', borderColor: soft, borderRadius: 1.25, p: 1, display: 'grid', gap: 0.7 }}>
      {[72, 88, 62].map((width, index) => (
        <Box key={width} sx={{ display: 'flex', alignItems: 'center', gap: 0.65 }}>
          <Box sx={{
            width: 11,
            height: 11,
            borderRadius: 0.4,
            border: `1px solid ${index === 0 ? accent : soft}`,
            bgcolor: index === 0 ? accent : '#fff',
          }} />
          <Line width={`${width}%`} />
        </Box>
      ))}
    </Box>
    <Box sx={{ display: 'grid', alignContent: 'center', gap: 0.8 }}>
      <Marker accent={accent}>검토</Marker>
      <Line width="82%" color={soft} />
      <Line width="58%" />
    </Box>
  </Box>
);

const CodePreview = ({ accent, soft }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: 1, height: '100%' }}>
    <Box sx={{ border: '1px solid', borderColor: soft, borderRadius: 1.25, p: 1, display: 'grid', alignContent: 'center', gap: 0.75 }}>
      <Line width="54%" color={accent} />
      <Line width="84%" />
      <Line width="68%" />
      <Line width="76%" />
    </Box>
    <Box sx={{ borderLeft: `2px solid ${accent}`, pl: 0.8, display: 'grid', alignContent: 'center', gap: 0.7 }}>
      <Marker accent={accent}>리뷰</Marker>
      <Line width="88%" />
      <Line width="58%" color={soft} />
    </Box>
  </Box>
);

const CommunityPreview = ({ accent, soft }) => (
  <Box sx={{ display: 'grid', gap: 0.8, height: '100%', alignContent: 'center' }}>
    <Box sx={{ width: '78%', border: '1px solid', borderColor: soft, borderRadius: 1.25, p: 0.9, display: 'grid', gap: 0.6 }}>
      <Line width="84%" />
      <Line width="56%" color={soft} />
    </Box>
    <Box sx={{
      width: '72%',
      justifySelf: 'end',
      borderLeft: `2px solid ${accent}`,
      bgcolor: `${accent}0A`,
      borderRadius: 1,
      p: 0.9,
      display: 'flex',
      alignItems: 'center',
      gap: 0.75,
    }}>
      <Marker accent={accent}>2</Marker>
      <Line width="62%" />
    </Box>
  </Box>
);

const PREVIEWS = {
  portfolio: PortfolioPreview,
  figma: FigmaPreview,
  ux: UxPreview,
  job: JobPreview,
  code: CodePreview,
  community: CommunityPreview,
};

const CategoryThumbnail = ({ category, height = 180 }) => {
  const theme = getCategoryTheme(category);
  const Icon = theme.icon;
  const Preview = PREVIEWS[theme.preview] || PortfolioPreview;

  return (
    <Box
      aria-hidden="true"
      sx={{
        width: '100%',
        height,
        flexShrink: 0,
        overflow: 'hidden',
        bgcolor: theme.surface,
        borderBottom: '1px solid',
        borderColor: theme.soft,
        p: { xs: 1.5, sm: 1.75 },
        display: 'grid',
        gridTemplateRows: '32px minmax(0, 1fr)',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        <Box sx={{
          width: 30,
          height: 30,
          borderRadius: 1.25,
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: theme.soft,
          color: theme.accent,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}>
          <Icon aria-hidden="true" sx={{ fontSize: 21 }} />
        </Box>
        <Typography sx={{
          color: '#172033',
          fontWeight: 800,
          fontSize: '0.78rem',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {theme.label}
        </Typography>
      </Box>

      <Box sx={{
        minHeight: 0,
        bgcolor: 'rgba(255,255,255,0.84)',
        border: '1px solid',
        borderColor: theme.soft,
        borderRadius: 1.5,
        p: 1,
      }}>
        <Preview accent={theme.accent} soft={theme.soft} />
      </Box>
    </Box>
  );
};

export default CategoryThumbnail;
