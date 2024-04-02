import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  PencilCircle,
  Image,
  Note,
  Keyboard,
  Info,
} from "phosphor-react";

import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import ThemeDialog from "./ThemeDialog";
function Settings() {
  const theme = useTheme();
  const [openTheme, setOpenTheme] = useState(false);

  const handleOpenTheme = () => {
    setOpenTheme(true);
  };

  const handleCloseTheme = () => {
    setOpenTheme(false);
  };
  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: handleOpenTheme,
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick:()=>{},
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* {Left Panel} */}
        <Box
          sx={{
            overflowY: "scroll",
            height: "100vh",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow:"0px 0px 2px rgba(0,0,0,0.25)"
          }}
        >
            <Stack p={4} spacing={5}>
                {/* {Header} */}
                <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    <IconButton>
                        <CaretLeft size={24} color="#4B4B4B"/>
                    </IconButton>
                    <Typography variant="h5">
                        Settings
                    </Typography>
                </Stack>
                {/* {Profile} */}
                <Stack direction={"row"} spacing={3}>
                    <Avatar sx={{width:56,height:56}} src={faker.image.avatar()} alt={faker.name.fullName()}/>
                    <Stack spacing={0.5}>
                        <Typography variant="article">{faker.name.fullName()}</Typography>
                        <Typography variant="body2">
                            {faker.random.words()}
                        </Typography>
                    </Stack>
                </Stack>
                {/* {List of Options} */}
                <Stack spacing={4}>
                  {list.map(({ key, icon, title, onclick }) => {
                    return (
                      <>
                        <Stack
                          onClick={onclick}
                          sx={{ cursor: "pointer" }}
                          spacing={2}
                        >
                          <Stack alignItems={"center"} direction="row" spacing={2}>
                            {icon}
                            <Typography variant="body2">{title}</Typography>
                          </Stack>
                          {key !== 7 && <Divider />}
                        </Stack>
                      </>
                    );
                  })}
                </Stack>
          </Stack>
        </Box>
        {/* {Right Panel} */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        ></Box>
      </Stack>
      {openTheme && (
        <ThemeDialog open={openTheme} handleClose={handleCloseTheme} />
      )}
    </>
  );
}

export default Settings;
