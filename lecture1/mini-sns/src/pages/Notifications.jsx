import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MainLayout from "../components/layout/MainLayout";
import PageHeroHeader from "../components/layout/PageHeroHeader";
import {
  heroChipSx,
  heroSurfaceSx,
  cardShelfSx,
} from "../components/layout/pageHeroStyles";
import { NOTIFICATION_TYPE_CONFIG as TYPE_CONFIG } from "../constants/notifications";
import { useNotifications } from "../hooks/useNotifications";

const Notifications = () => {
  const { notifications, unreadCount, markAllRead, markRead } =
    useNotifications();

  return (
    <MainLayout>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100%",
          ...heroSurfaceSx,
        }}
      >
        <PageHeroHeader
          title="활동 알림"
          subtitle="댓글, 좋아요, 모임 소식을 확인하세요"
          action={
            unreadCount > 0 && (
              <IconButton
                size="small"
                onClick={markAllRead}
                aria-label="모두 읽음으로 표시"
                sx={{ color: "#E0E7FF" }}
              >
                <DoneAllIcon fontSize="small" />
              </IconButton>
            )
          }
          chips={
            <>
              {unreadCount > 0 && (
                <Chip
                  label={`새 알림 ${unreadCount}개`}
                  size="small"
                  sx={{
                    bgcolor: "error.main",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    height: 20,
                  }}
                />
              )}
              <Chip label="모임 소식" size="small" sx={heroChipSx} />
            </>
          }
          flowLabel="흐름"
          flowText="피드 반응과 모임 업데이트를 빠르게 확인합니다"
          featureText="읽지 않음 / 반응 알림 / 모임 업데이트"
        />

        <Box sx={cardShelfSx}>
          {/* 알림 목록 */}
          <List
            sx={{
              p: 0,
              bgcolor: "background.paper",
              borderRadius: "16px",
              mx: 2,
              overflow: "hidden",
            }}
          >
            {notifications.map((notif, idx) => {
              const config = TYPE_CONFIG[notif.type];
              return (
                <Box key={notif.id}>
                  <ListItem
                    onClick={() => markRead(notif.id)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      bgcolor: notif.read
                        ? "background.paper"
                        : "rgba(99,102,241,0.06)",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "action.hover" },
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItemAvatar sx={{ mt: 0.5, minWidth: 56 }}>
                      <Box sx={{ position: "relative", width: 44, height: 44 }}>
                        <Avatar
                          src={notif.avatar}
                          sx={{ width: 44, height: 44 }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: -2,
                            right: -2,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            bgcolor: config.bg,
                            border: "2px solid #fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: config.color,
                          }}
                        >
                          {config.icon}
                        </Box>
                      </Box>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Box>
                          <Typography
                            component="span"
                            variant="body2"
                            fontWeight={700}
                          >
                            {notif.user}
                          </Typography>
                          <Typography component="span" variant="body2">
                            {" "}
                            {notif.content}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {notif.time}
                        </Typography>
                      }
                    />

                    {notif.postImage && (
                      <Box
                        component="img"
                        src={notif.postImage}
                        alt="관련 게시물 이미지"
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 1,
                          objectFit: "cover",
                          ml: 1,
                          flexShrink: 0,
                        }}
                      />
                    )}

                    {!notif.read && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          ml: 1,
                          mt: 2,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </ListItem>
                  {idx < notifications.length - 1 && <Divider />}
                </Box>
              );
            })}
          </List>

          {notifications.length === 0 && (
            <Box sx={{ textAlign: "center", pt: 8, px: 3 }}>
              <Typography variant="h3" gutterBottom>
                알림이 없어요 🔔
              </Typography>
              <Typography variant="body2" color="text.secondary">
                새로운 알림이 오면 여기에 표시됩니다.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Notifications;
