import React, { useState } from "react";
import {
  Drawer,
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Collapse,
  // Checkbox
} from "@mui/material";
import { Slider } from "@material-tailwind/react";

import { Checkbox } from "@material-tailwind/react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDrawer } from "../contextApi/DrawerContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import StraightenIcon from "@mui/icons-material/Straighten";
import useGetFilteredOptions from "../Hooks/useGetFilteredOptions";
import { useSearchParams } from "react-router-dom";

const drawerWidth = 250;

export default function ResponsiveDrawer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: options } = useGetFilteredOptions();
  // useGetFilteredProducts(searchParams);
  const isMobile = useMediaQuery("(max-width:768px)");
  const { isOpen, toggleDrawer } = useDrawer();

  const [filerPrice, setFilterPrice] = useState({
    value: 100,
    price: 10000,
  });

 const debounceUpdate = (() => {
  let timeout;
  return (priceValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("pPrice", priceValue);
        return params;
      });
    }, 500);
  };
})();

  const handleSlider = (e) => {
    const sliderValue = Math.floor(e.target.value * 100);
    setFilterPrice({ value: e.target.value, price: sliderValue });
    debounceUpdate(sliderValue);

    
  };

  const handleCheckBtn = (e, key) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      let paramKey =
        key === "brands"
          ? "pBrand"
          : key === "colors"
          ? "pColor"
          : key === "sizes"
          ? "pSize"
          : null;

      if (!paramKey) return params;

      // Get existing values
      let current = params.get(paramKey)?.split(",") || [];

      if (checked) {
        // ADD value
        current.push(value);
      } else {
        // REMOVE value
        current = current.filter((v) => v !== value);
      }

      if (current.length === 0) {
        params.delete(paramKey); // remove from URL if empty
      } else {
        params.set(paramKey, current.join(",")); // update list
      }
      return params;
    });
  };

  const DrawerContent = (
    <div className="relative w-full h-full">
      <Box
        sx={{ width: drawerWidth }}
        role="presentation"
        onClick={isMobile ? () => toggleDrawer(false) : undefined}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton className="text-md font-bold  px-4">
              <span className="text-gray-800 tracking-wider ">FILTER</span>
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <div className=" py-4  px-4">
            <Slider
              size="sm"
              onChange={(e) => handleSlider(e)}
              defaultValue={filerPrice.value}
            />
            <div className="flex justify-between py-2 text-sm text-gray-600">
              <span>100</span>
              <span>{filerPrice.price}</span>
            </div>
          </div>

          {Object.entries(options || {}).map(([key, values]) => (
            <div key={key}>
              <div className="text-md font-bold text-gray-800 px-4 capitalize">
                {key}
                {values &&
                  values.map((name, idx) => (
                    <div key={idx} className="flex items-center px-2">
                      <Checkbox
                        onClick={(e) => handleCheckBtn(e, key)}
                        value={name}
                        id="ripple-on"
                        label={name}
                        ripple={true}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </List>
      </Box>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={() => toggleDrawer(false)} // ✅ now using boolean param
        >
          {DrawerContent}
        </Drawer>
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
              top: "140px",
              height: "calc(100vh - 140px)",
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      )}
    </>
  );
}
