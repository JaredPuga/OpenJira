import Head from "next/head";
import { Box } from "@mui/material";
import { Navbar, SideBar } from "../ui";

interface Props {
    title?: string;
    children: React.JSX.Element | React.JSX.Element[];
}

export const Layout = ({title = "OpenJira App", children}:Props) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
            <title>{ title }</title>
        </Head>

        <Navbar />
        <SideBar />

        <Box sx={{padding: '10px 20px'}}>
            { children  }
        </Box>

    </Box>
  )
}
