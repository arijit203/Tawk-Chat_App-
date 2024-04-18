import {faker} from "@faker-js/faker"
import { Box, IconButton, Typography,Stack ,InputBase, Button, Divider, Avatar} from '@mui/material'
import {styled,alpha,useTheme} from "@mui/material/styles"
import Badge from '@mui/material/Badge';
import { SelectConversation} from "../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
  };
  
// const ChatElement = ({ id,name, msg,time,online,unread }) => {
//     const theme = useTheme();
//     const dispatch=useDispatch();
//     const handleClick = () => {
//       console.log("ChatElement clicked");
//       dispatch(SelectConversation({ room_id: id }));
//       window.location.reload();
//   };
//     return (
//       <Box sx={{
//         width: "100%",
//         borderRadius: 1,
//         backgroundColor:theme.palette.mode==="light"?"#fff":theme.palette.background.default,

//       }} p={2}
        
//       onClick={handleClick}
//       >
//         <Stack
//         direction="row"
//         alignItems={"center"}
//         justifyContent="space-between"
//       >
//         <Stack direction="row" spacing={2}>
//           {" "}
//           {online ? (
//             <StyledBadge
//               overlap="circular"
//               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//               variant="dot"
//             >
//               <Avatar alt={name} src={faker.image.avatar()} />
//             </StyledBadge>
//           ) : (
//             <Avatar alt={name} src={faker.image.avatar()} />
//           )}
//           <Stack spacing={0.3}>
//             <Typography variant="subtitle2">{name}</Typography>
//             <Typography variant="caption">{truncateText(msg,25)}</Typography>
//           </Stack>
//         </Stack>
//         <Stack spacing={2} alignItems={"center"}>
//           <Typography sx={{ fontWeight: 600 }} variant="caption">
//             {time}
//           </Typography>
//           <Badge
//             className="unread-count"
//             color="primary"
//             badgeContent={unread}
//           />
//         </Stack>
//       </Stack>
  
//       </Box>
//     );
//   }

const ChatElement = ({ img, name, msg, time, unread, online, id }) => {
  const dispatch = useDispatch();
  const {room_id} = useSelector((state) => state.app);
  const selectedChatId = room_id?.toString();

  let isSelected = selectedChatId === id;
  console.log("isSelected:",isSelected)
  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <StyledChatBox
      onClick={() => {
        console.log("Clicked***********");
        dispatch(SelectConversation({room_id: id}));
      }}
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{truncateText(msg, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={unread}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

  export default ChatElement;