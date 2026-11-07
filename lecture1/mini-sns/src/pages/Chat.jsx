import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Badge,
  Chip,
  IconButton,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import MainLayout from "../components/layout/MainLayout";
import PageHeroHeader from "../components/layout/PageHeroHeader";
import {
  heroChipSx,
  heroSurfaceSx,
  cardShelfSx,
} from "../components/layout/pageHeroStyles";
import { ROUTES } from "../constants/routes";
import { MOCK_ROOMS, MOCK_MESSAGES } from "../constants/chatRooms";

const ChatRoom = ({ room, onBack }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES[room.id] || []);
  const [text, setText] = useState("");

  useEffect(() => {
    setMessages(MOCK_MESSAGES[room.id] || []);
  }, [room.id]);

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "me",
        content: text,
        time: "지금",
        mine: true,
      },
    ]);
    setText("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100dvh - 56px - 76px - env(safe-area-inset-bottom))",
        bgcolor: "#F5F3FF",
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 1,
          py: 1,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <IconButton size="small" onClick={onBack} aria-label="뒤로 가기">
          <ArrowBackIcon />
        </IconButton>
        <Avatar src={room.avatar} sx={{ width: 36, height: 36 }} />
        <Box>
          <Typography variant="body2" fontWeight={700}>
            {room.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {room.type === "group" ? `${room.members}명` : "1:1 채팅"}
          </Typography>
        </Box>
      </Box>

      {/* 메시지 목록 */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent: msg.mine ? "flex-end" : "flex-start",
            }}
          >
            {!msg.mine && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mr: 1, alignSelf: "flex-end", mb: 0.5 }}
              >
                {msg.sender}
              </Typography>
            )}
            <Paper
              elevation={0}
              sx={{
                px: 1.5,
                py: 1,
                maxWidth: "70%",
                bgcolor: msg.mine ? "primary.main" : "background.paper",
                color: msg.mine ? "#fff" : "text.primary",
                borderRadius: msg.mine
                  ? "16px 16px 4px 16px"
                  : "16px 16px 16px 4px",
              }}
            >
              <Typography variant="body2">{msg.content}</Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.7, fontSize: "0.65rem" }}
              >
                {msg.time}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* 입력 */}
      <Box
        sx={{
          p: 1.5,
          pb: "calc(12px + env(safe-area-inset-bottom))",
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
          position: "sticky",
          bottom: 0,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="메시지를 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          slotProps={{
            htmlInput: { "aria-label": "메시지 입력" },
            input: {
              sx: { borderRadius: 3 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={handleSend}
                    aria-label="메시지 전송"
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
};

const Chat = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [selectedRoom, setSelectedRoom] = useState(
    () => MOCK_ROOMS.find((r) => r.id === roomId) || null,
  );

  const markRoomRead = (id) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, unread: 0 } : r)),
    );
  };

  const openRoom = (room) => {
    setSelectedRoom(room);
    markRoomRead(room.id);
  };

  useEffect(() => {
    if (roomId) {
      const room = rooms.find((r) => r.id === roomId);
      if (room) openRoom(room);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleBack = () => {
    setSelectedRoom(null);
    navigate(ROUTES.CHAT);
  };

  if (selectedRoom) {
    return (
      <MainLayout hideGuestBanner>
        <ChatRoom room={selectedRoom} onBack={handleBack} />
      </MainLayout>
    );
  }

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
          title="채팅방"
          subtitle="스터디와 작업 흐름을 이어가는 대화 공간"
          chips={
            <>
              <Chip label="데모 대화" size="small" sx={heroChipSx} />
              <Chip
                label={`읽지 않음 ${rooms.reduce((sum, r) => sum + r.unread, 0)}개`}
                size="small"
                sx={{
                  bgcolor: "rgba(248,113,113,0.22)",
                  color: "#FEE2E2",
                  fontWeight: 600,
                  fontSize: "0.68rem",
                  border: "1px solid rgba(254,226,226,0.3)",
                }}
              />
            </>
          }
          flowLabel="흐름"
          flowText="모임별 채팅방에서 작업 기록을 이어갑니다"
          featureText="채팅 리스트 / 메시지 입력 / 읽지 않음 표시"
        />

        <Box sx={cardShelfSx}>
          <List
            sx={{
              p: 0,
              bgcolor: "background.paper",
              borderRadius: "16px",
              mx: 2,
              overflow: "hidden",
            }}
          >
            {rooms.map((room, idx) => (
              <Box key={room.id}>
                <ListItem
                  onClick={() => openRoom(room)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <ListItemAvatar>
                    <Badge badgeContent={room.unread} color="error" max={9}>
                      <Avatar
                        src={room.avatar}
                        sx={{ width: 48, height: 48 }}
                      />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    slotProps={{ secondary: { component: "div" } }}
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2" fontWeight={700}>
                          {room.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {room.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          sx={{ flex: 1 }}
                        >
                          {room.lastMsg}
                        </Typography>
                        <Chip
                          label={room.type === "group" ? "단체" : "1:1"}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "0.62rem",
                            bgcolor:
                              room.type === "group"
                                ? "secondary.light"
                                : "background.default",
                          }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {idx < rooms.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </Box>
            ))}
          </List>

          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 0.5 }}
            >
              채팅방을 선택해 대화를 시작하세요
            </Typography>
            <Typography variant="caption" color="text.secondary">
              실시간 채팅은 준비 중입니다
            </Typography>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Chat;
