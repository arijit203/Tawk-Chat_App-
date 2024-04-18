import { Box, Stack,Avatar,Badge, Typography, IconButton, Divider, TextField, InputAdornment } from '@mui/material'
import React, { useRef } from 'react'
import {styled} from "@mui/material/styles"
import {faker} from "@faker-js/faker"
import { CaretDown, LinkSimple, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from 'phosphor-react';
import {useTheme} from "@mui/material/styles"
import Message from './Message';
import Timeline from './MsgTypes';
import { dispatch } from '../../redux/store';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleBarStyle } from '../Scrollbar';


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: "12px",
      paddingBottom: "12px",
    }
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
function Conversation() {
    const theme = useTheme();
    const dispatch=useDispatch();
    const messageListRef = useRef(null);
    // const {conversations} = useSelector((state) => state.conversation.direct_chat);
    const { conversations, current_messages } = useSelector(
      (state) => state.conversation.direct_chat
    );
    useEffect(() => {
      // Scroll to the bottom of the message list when new messages are added
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_messages]);
  

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
  const openConversationMenu = Boolean(conversationMenuAnchorEl);
  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };
  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };
  console.log("Name:",conversations[0].name)
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,}}>
        {/* Chat Header */}
        <Box  p={3.5} sx={{height:100,width:"100%",maxWidth: "100vw",
        backgroundColor:theme.palette.mode==="Light"?"#fff":theme.palette.background.default, boxShadow:"0px 0px 2px rgba(0,0,0,0.25)", alignItems: "center", justifyContent: "center"}}>
        
        <Stack onClick={()=>{
          dispatch(ToggleSidebar());
        }} direction="row" spacing={2} >
          {" "}
           
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"

            >
              <Avatar alt={conversations?.name} src={faker.image.avatar()} />
            </StyledBadge>
            <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"} sx={{width:"100%" ,height:"100%"}}>

            <Stack spacing={0.2}>
            <Typography variant="subtitle2">
                {conversations[0]?.name}
              </Typography>              
              <Typography variant="caption">Online</Typography>

            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <IconButton>
                    <VideoCamera />
                </IconButton>
                <IconButton>
                    <Phone/>
                </IconButton>
                <IconButton>
                    <MagnifyingGlass />
                </IconButton>
                <Divider orientation='vertical' flexItem/>
                <IconButton>
                    <CaretDown />
                </IconButton>
            </Stack>
        </Stack>
           
          
        </Stack>
    
        </Box>
        {/* Chat Msg */}
        <Box
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",

          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
          <Conversation menu={true} isMobile={isMobile} />
        </SimpleBarStyle>
      </Box>
        
        {/* Chat Footer */}
        <Box p={3.5} sx={{height:100,width:"100%",maxWidth: "100vw",
        backgroundColor:theme.palette.mode==="Light"?"#fff":theme.palette.background.default, boxShadow:"0px 0px 2px rgba(0,0,0,0.25)", alignItems: "center", justifyContent: "center"}}>
        {/* <Box p={2} sx={{  width: "100%",maxWidth: "100vw", position: "absolute", bottom: 0 ,backgroundColor:"#F8FAFF", boxShadow:"0px 0px 2px rgba(0,0,0,0.25)", alignItems: "center", justifyContent: "center"}} > */}
        {/* Footer content goes here */}
        
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <StyledInput fullWidth placeholder='Write a message...' variant="filled" InputProps={{
                disableUnderline: true,
                startAdornment:<InputAdornment>
                    <IconButton>
                        <LinkSimple />
                    </IconButton>
                </InputAdornment>,
                endAdornment:<InputAdornment>
                <IconButton>
                    <Smiley />
                </IconButton>
            </InputAdornment>
                
                }} />
                <Box sx={{height:48,width:48,backgroundColor:theme.palette.primary.main,borderRadius:1.5}}>
                    <Stack sx={{height:"100%",width:"100%"}} alignItems={"center"} justifyContent={"center"} >
                        <IconButton>
                            <PaperPlaneTilt color="#fff"/>
                        </IconButton>
                    </Stack>
                    
                </Box>
            </Stack>
      </Box>
    </Stack>
  )
}

export default Conversation