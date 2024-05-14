import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { MoreVert, Send, ArrowBackIos } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Button,
  ListItemButton,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import Doodles from "../../assets/jpg/doodles.jpg";
import moment from "moment";

import { customerLoginPath } from "../../const/path";
import useChatData from "../../components/customer/common/useChatData";
import axios from "axios";
import { BASE_URL } from "../../const/APIS";

const CustomerChat = () => {
  const navigate = useNavigate();
  const { token, currentUser } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const [onlineUser, setOnlineUser] = useState(false);
  const closeMenu = () => setAnchorEl(null);
  // const [action, setAction] = useState("");
  const chatContainerRef = useRef(null);
  const {
    chats,
    currentChat,
    setCurrentChat,
    chatMessages,
    newMessage,
    setNewMessage,
    handleSend,
    onlineUsers,
  } = useChatData();

  if (!token) {
    return <Navigate to={customerLoginPath} />;
  }

  const checkOnlineStatus = (chat) => {
    console.log(chat, "dfdsfds");
    const chatMember = chat?.members[0]?.business?._id;
    console.log(chatMember);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    console.log(online, "dfdfd");
    return online ? true : false;
  };

  useEffect(() => {
    if (currentChat) {
      setOnlineUser(checkOnlineStatus(currentChat));
    }
  }, [currentChat, onlineUsers]);

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      containerId: "chatContainer", // Replace 'chatContainer' with the actual id of your chat container
      duration: 0, // Optional duration of the scroll animation in milliseconds
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, newMessage]);

  const StyledContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh", // Make the container take full height
    overflowY: "auto",
    // position: "relative", // Make the container relative for the sticky header
  }));

  console.log(currentChat, "currentchat");

  // const sendComplaintStatus = async () => {
  //   if (
  //     action === "resolved" ||
  //     action === "unresolved" ||
  //     action === "reopened"
  //   ) {
  //     try {
  //       const response = await axios.put(
  //         `${BASE_URL}complaints/${currentChat.members[0]?.complaintId?._id}`,
  //         { action: action },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  return (
    <Grid container spacing={2} className="tw-h-[100vh] tw-mt-0">
      {/* Left Column*/}

      <Grid
        item
        xs={12}
        sm={4.5}
        md={3.5}
        className="tw-bg-white scrollable-div tw-h-full tw-py-0"
      >
        <div className="tw-flex tw-justify-between tw-items-center tw-px-4 tw-py-2 tw-bg-[#F5F7FA] ">
          <Button
            className="tw-flex tw-items-center tw-focus:outline-none"
            onClick={() => {
              navigate("/customer/home");
              window.location.reload();
            }}
          >
            <ArrowBackIos className="tw-text-green-500" />
          </Button>
          <Typography variant="h6" className="tw-text-gray-700 tw-font-medium">
            Chats
          </Typography>
        </div>
        <Divider />
        <div className="tw-flex tw-flex-col tw-px-3 tw-mt-2 tw-bg-white tw-overflow-hidden">
          <List dense className="tw-p-0">
            {chats.map((chat) => (
              <div
                onClick={(e) => {
                  setCurrentChat(chat);
                  setOnlineUser(checkOnlineStatus(chat));
                }}
                key={chat._id}
              >
                {chat.members.map((member) => (
                  <ListItemButton
                    key={member.business?.businessName}
                    className="tw-px-4 tw-py-2 hover:tw-bg-white tw-bg-[#F5F7FA]"
                    sx={{ borderBottom: 2, borderColor: "#15803d" }}
                  >
                    <ListItemIcon className="tw-mr-3">
                      <Avatar
                        src={member.customer?.picturePath}
                        alt={member.business?.businessName}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography className="tw-font-bold">
                          {member.business?.businessName}
                        </Typography>
                      }
                      secondary={
                        <Typography className="tw-text-gray-400 tw-text-sm">
                          <span>Complaint:</span>
                          <span
                            className={`tw-ml-1 ${
                              member.complaintId?.complaintStatus === "resolved"
                                ? "tw-text-green-500"
                                : member.complaintId?.complaintStatus ===
                                  "unresolved"
                                ? "tw-text-red-500"
                                : member.complaintId?.complaintStatus ===
                                  "pending"
                                ? "tw-text-yellow-500"
                                : "tw-text-blue-500" // Color for 'Reopened'
                            }`}
                          >
                            {`${member.complaintId?.complaintStatus
                              .charAt(0)
                              .toUpperCase()}${member.complaintId?.complaintStatus
                              .slice(1)
                              .toLowerCase()}`}{" "}
                          </span>
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </div>
            ))}
          </List>
        </div>

        <Typography className="tw-text-gray-600 tw-text-sm tw-py-[.6rem] tw-flex tw-justify-center">
          Your Complaint Chats
        </Typography>
      </Grid>

      {/*Right Column  */}
      <Grid item xs={12} sm={7.5} md={8.5} className="tw-px-0 tw-pt-0">
        {currentChat !== null ? (
          <StyledContainer>
            <div className="tw-flex tw-justify-between tw-items-center tw-px-4 tw-py-2 tw-bg-[#F5F7FA] tw-sticky tw-top-0 tw-z-10">
              {currentChat.members?.map((member, index) => (
                <Box className="tw-flex tw-items-center" key={index}>
                  <Avatar
                    alt={member.business?.businessName}
                    src={member.business?.businessLogoPath}
                    className="tw-mr-3"
                  />
                  <Box className="tw-flex tw-flex-col tw-gap-[.1rem]">
                    <Typography
                      variant="h6"
                      className="tw-text-gray-700 tw-font-medium"
                    >
                      {member.business?.businessName}
                    </Typography>
                    {onlineUser ? (
                      <Typography className="tw-text-green-500 tw-font-bold tw-text-sm">
                        Online
                      </Typography>
                    ) : (
                      <Typography className="tw-text-gray-400 tw-font-bold tw-text-sm">
                        Offline
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
              {/* <Box>
                <IconButton onClick={openMenu}>
                  <MoreVert />
                </IconButton>
                <Menu
                  id="menu-basic"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={closeMenu}
                  sx={{ marginTop: "2rem", marginLeft: "71rem" }}
                >
                  <MenuItem
                    value="resolved"
                    onClick={() => {
                      setAction("resolved");
                      sendComplaintStatus();
                      closeMenu();
                    }}
                  >
                    Complaint Resolved
                  </MenuItem>
                  <MenuItem
                    value="reopened"
                    onClick={() => {
                      setAction("reopened");
                      sendComplaintStatus();
                      closeMenu();
                    }}
                  >
                    Complaint Reopen
                  </MenuItem>
                  <MenuItem
                    value="unresolved"
                    onClick={() => {
                      setAction("unresolved");
                      sendComplaintStatus();
                      closeMenu();
                    }}
                  >
                    Complaint Unresolved
                  </MenuItem>
                </Menu>
              </Box> */}
            </div>

            <Box
              className="tw-flex tw-flex-col tw-grow tw-mb-11 tw-overflow-y-auto tw-relative tw-bg-cover tw-bg-no-repeat tw-bg-center //tw-bg-[#fefce8]"
              style={{ backgroundImage: `url(${Doodles})` }}
              id="chatContainer"
            >
              <div className="overlay tw-p-6 tw-grid tw-grid-cols-1">
                {chatMessages.map((chatMessage) => (
                  <Box>
                    {chatMessage.senderId != currentUser._id ? (
                      <Box className="tw-py-3 tw-relative tw-z-[2] last">
                        <Box className="tw-flex">
                          <Box className="tw-relative tw-w-12 tw-h-12 tw-shrink-0 tw-rounded-full tw-overflow-hidden tw-object-cover">
                            <img
                              className="tw-w-full tw-h-full tw-object-cover"
                              width="48"
                              height="48"
                              src={
                                currentChat.members[0]?.business
                                  ?.businessLogoPath
                              }
                              alt="Avatar"
                            />
                          </Box>
                          <Box className="tw-pl-3">
                            <Box className="tw-flex tw-items-center tw-mb-3">
                              <span className="tw-font-bold tw-text-white">
                                {currentChat.members[0]?.business?.businessName}
                              </span>
                              <span className="tw-text-sm tw-text-white //tw-text-gray-400 tw-shrink-0 tw-ml-2">
                                {moment
                                  .utc(chatMessage.createdAt)
                                  .local()
                                  .format("MMMM Do YYYY, h:mm a")}
                              </span>
                            </Box>
                            <Box className="tw-flex tw-flex-col tw-gap-3 tw-items-start">
                              <Box className="tw-max-w-md tw-p-4 tw-rounded-2xl tw-overflow-hidden tw-rounded-tl-none tw-bg-[#F5F7FA]">
                                {chatMessage.message}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box className="tw-py-3 last">
                        <Box className="tw-flex tw-justify-end">
                          <Box className="tw-pr-3">
                            <Box className="tw-flex tw-items-center tw-mb-3 tw-flex-row-reverse">
                              <span className="tw-font-bold tw-text-white">
                                {currentChat.members[0]?.customer?.firstName}{" "}
                                {currentChat.members[0]?.customer?.lastName}
                              </span>
                              <span className="tw-text-sm tw-text-white //tw-text-gray-400  tw-shrink-0 tw-mr-2">
                                {moment
                                  .utc(chatMessage.createdAt)
                                  .local()
                                  .format("MMMM Do YYYY, h:mm a")}
                              </span>
                            </Box>
                            <Box className="tw-flex tw-flex-col tw-gap-3 tw-items-end">
                              <Box className="tw-max-w-md tw-p-4 tw-rounded-2xl tw-overflow-hidden tw-rounded-tr-none  tw-bg-green-700  tw-text-white">
                                {chatMessage.message}
                              </Box>
                            </Box>
                          </Box>
                          <Box className="tw-relative tw-w-12 tw-h-12 tw-shrink-0">
                            <img
                              className="tw-w-full tw-h-full tw-rounded-full tw-overflow-hidden tw-object-cover"
                              width="48"
                              height="48"
                              src={
                                currentChat.members[0]?.customer?.picturePath
                              }
                              alt="Avatar"
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
              </div>
            </Box>
            {(currentChat?.members[0]?.complaintId?.complaintStatus ===
              "pending" ||
              currentChat?.members[0]?.complaintId?.complaintStatus ===
                "reopened") && (
              <div className="tw-fixed tw-bottom-0 tw-z-30 tw-w-[110%] md:tw-w-full tw-bg-[#F5F7FA] tw-flex tw-items-center tw-pl-[1.6rem] tw-pr-2 md:tw-px-5 tw-py-[.55rem]">
                <input
                  id="outlined-multiline-static"
                  placeholder="Type a message..."
                  multiline
                  rows={1}
                  autoFocus={true}
                  value={newMessage}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNewMessage(e.target.value);
                  }}
                  className="tw-w-[90%] md:tw-w-[67%] tw-mr-1 tw-px-2 tw-py-2 tw-rounded-md focus:tw-outline-green-700 tw-text-base"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  className="tw-w-[2%] md:tw-w-[5%]"
                  onClick={handleSend}
                >
                  <Send />
                </Button>
              </div>
            )}
          </StyledContainer>
        ) : (
          <div className="tw-flex tw-justify-center tw-items-center tw-h-[100vh] tw-bg-[#F5F7FA]">
            <Typography
              variant="h6"
              className="tw-text-gray-700 tw-font-medium"
            >
              Select a chat to view messages
            </Typography>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default CustomerChat;
