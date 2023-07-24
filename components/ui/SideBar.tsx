import { useContext } from "react";
import { Box, Drawer, List, Typography, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material"
import InboxOutLinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutLineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { UIContext } from "@/context/ui";

const menuItems: string[] = [
    'Inbox',
    'Starred',
    'Send email',
    'Drafts'
]

export const SideBar = () => {

    const { sideMenuOpen, closeSideMenu } = useContext( UIContext )

  return (
    <Drawer
        anchor="left"
        open={sideMenuOpen}
        onClose={closeSideMenu}
    >

        <Box sx={{width: '250px'}}>
            <Box sx={{padding: '5px 10px'}}>
                <Typography variant="h4">Menú</Typography>
            </Box>

            <List>
                {
                    menuItems.map((item, index) => 
                        <ListItemButton key={item}>
                            <ListItemIcon>
                                {
                                    index % 2 === 0 ? <InboxOutLinedIcon /> : <MailOutLineOutlinedIcon />
                                }
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    )
                }
            </List>
            <Divider />
            <List>
                {
                    menuItems.map((item, index) => 
                        <ListItemButton key={item}>
                            <ListItemIcon>
                                {
                                    index % 2 === 0 ? <InboxOutLinedIcon /> : <MailOutLineOutlinedIcon />
                                }
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}
