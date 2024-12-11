import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmptyState from "@/app/(marketing)/components/empty-state";
import { MessageWidgetProps } from "@/app/(kita)/lib/types";
import CustomBadge from "./Badge";
import { SelectMessage } from "@/app/db/schema";
import { ExtendedMessage } from "@/app/(kita)/lib/types";

const emptyProfilePic = () => {
  return (
    <span className="inline-block size-10 overflow-hidden rounded-full bg-gray-100">
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="size-full text-gray-300"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

const BlankPaperIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto h-12 w-12 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};

const DiscussionBoardWidget: React.FC<MessageWidgetProps> = ({ messages }) => {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: "#FFFFFF",
        border: 1,
        borderColor: "#EAEFF0",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 700, ml: 1 }}>
            💬 Discussion Board
          </Typography>
        </Box>
        <Box>
          <Button
            disableElevation
            sx={{ color: "#74759A", fontSize: "14px" }}
            startIcon={<AddIcon />}
          >
            New Discussion
          </Button>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        {messages.length === 0 ? (
          <EmptyState
            icon={<BlankPaperIcon />}
            title="No Discussions Yet"
            text="Get started by creating a new discussion"
            buttonText="New Discussion"
          />
        ) : (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {messages.map((message: ExtendedMessage) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    {message.profilePicture ? (
                      <Avatar
                        alt={message.profilePicture}
                        src={message.profilePicture}
                      />
                    ) : (
                      emptyProfilePic()
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${message.firstName} ${message.lastName}`}
                    secondary={
                      <>
                        <CustomBadge text={message.className} />
                        {"    (" + message.createdAt + ")"}
                        <br />
                        {message.content}
                      </>
                    }
                  />
                </ListItem>
              </>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default DiscussionBoardWidget;
