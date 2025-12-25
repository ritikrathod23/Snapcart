import React, { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbChartCircles } from "react-icons/tb";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { MdOutlineLoyalty } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

const drawerWidth = 250;

export default function ResponsiveDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({
    products: false,
    // Add other expandable items here if needed
  });
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleProductsMenu = () => {
    setExpandedItems((prev) => ({
      ...prev,
      products: !prev.products,
    }));
  };

  const menuItems = [
    {
      url: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin",
    },
    {
      type: "expandable",
      label: "Products",
      icon: <TbChartCircles className="text-3xl" />,
      subItems: [
        { url: "Product List", icon: <InboxIcon />, path: "products-list" },
        { url: "Category", icon: <CategoryIcon />, path: "category" },
      ],
    },
    { url: "Orders", icon: <IoMdCart  className="text-2xl"  />, path: "orders" },

    {
      url: "Customers",
      icon: <FiUsers className="text-2xl" />,
      path: "customer",
    },
    {
      url: "Sales",
      icon: <MdOutlineLoyalty className="text-2xl" />,
      path: "sales",
    },
    // ... other items
  ];

  const DrawerContent = (
    <div className="relative w-full h-full">
      <Box
        sx={{ width: drawerWidth }}
        role="presentation"
        onClick={isMobile ? toggleDrawer(false) : undefined}
      >
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === "expandable" ? (
                <>
                  <ListItemButton onClick={toggleProductsMenu}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {expandedItems.products ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={expandedItems.products}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{ pl: 4 }}
                          onClick={() => navigate(subItem.path)}
                          // Add navigation logic here
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          <ListItemText primary={subItem.url} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.url} />
                  </ListItemButton>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </div>
  );

  // Rest of your component remains the same...
  return (
    <>
      {isMobile ? (
        <>
          <IconButton onClick={toggleDrawer(true)}>
            <RxHamburgerMenu className="text-2xl" />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {DrawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: "none", md: "block" },
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              top: "80px",
              height: "calc(100vh - 80px)",
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      )}
    </>
  );
}
