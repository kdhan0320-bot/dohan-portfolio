import { Box } from '@mui/material';
import { HUMAN_SIGNAL } from '../../theme';

const ThumbnailStage = ({
  src,
  sources,
  alt,
  loading = 'lazy',
  variant = 'default',
  objectFit = 'cover',
  sx,
}) => {
  const isFeatured = variant === 'featured';

  return (
    <Box
      data-thumbnail-stage="true"
      data-thumbnail-variant={variant}
      sx={{
        width: '100%',
        aspectRatio: '16 / 10',
        boxSizing: 'border-box',
        p: isFeatured ? { xs: '14px', md: '16px' } : 0,
        borderRadius: { xs: '18px', md: '20px' },
        bgcolor: HUMAN_SIGNAL.deepHarbor,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      {src ? (
        <picture
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            overflow: 'hidden',
            borderRadius: isFeatured ? '12px' : 0,
          }}
        >
          {sources?.mobile && <source media="(max-width: 599.98px)" srcSet={sources.mobile} />}
          {sources?.tablet && <source media="(max-width: 899.98px)" srcSet={sources.tablet} />}
          {sources?.compact && <source media="(max-width: 1199.98px)" srcSet={sources.compact} />}
          <Box
            component="img"
            src={src}
            alt={alt}
            loading={loading}
            sx={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit,
              objectPosition: 'center',
              bgcolor: isFeatured ? HUMAN_SIGNAL.deepHarbor : undefined,
            }}
          />
        </picture>
      ) : null}
    </Box>
  );
};

export default ThumbnailStage;
