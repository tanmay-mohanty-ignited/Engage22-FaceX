/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
import AddCriminal from "views/Dashboard/AddCriminal.js";
import EditCriminal from "views/Dashboard/EditCriminal.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import Image from "views/Dashboard/Image.js";
import Video from "views/Dashboard/Video.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  VideoIcon,
  ImageIcon,
} from "components/Icons/Icons";

import { Search2Icon, AddIcon, ArrowUpIcon } from "@chakra-ui/icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Search a Criminal",
    rtlName: "لوحة القيادة",
    icon: <Search2Icon color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/edit-criminal/:id",
    name: "Edit a Criminal",
    rtlName: "لوحة القيادة",
    icon: <Search2Icon color='inherit' />,
    component: EditCriminal,
    layout: "/admin",
  },
  {
    path: "/add-criminal",
    name: "Add a Criminal",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    component: AddCriminal,
    layout: "/admin",
  },
  // {
  //   path: "/rtl-support-page",
  //   name: "<Insert>",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color='inherit' />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  {
    name: "DETECT CRIMINALS",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/image-detection",
        name: "Check in Image",
        rtlName: "لوحة القيادة",
        icon: <ImageIcon color='inherit' />,
        secondaryNavbar: true,
        component: Image,
        layout: "/admin",
      },
      {
        path: "/video-detection",
        name: "Check in Video",
        rtlName: "لوحة القيادة",
        icon: <VideoIcon color='inherit' />,
        component: Video,
        layout: "/admin",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <ArrowUpIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
