import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from '@mui/icons-material/Store';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import {
     iphone,
     laptops,
     watches,
     clothes,
     accessories,
     game,
     books,
     pcAccesories,
     candles,
     iphon15,
     appleWatch,
     appleTv,
     shirt,
     pencil,
     airpods,
     ipad,
     macbook,
     laptopRiser,
     user,
     users,
     orders,
     category,
     products,
     purchases
     } from "../assets";



const menu = [
    {
      titre: "Home",
      icon: <HomeIcon className='mb-2 h-5 w-5' />,
      href: "/",
      role: "user"
    },
    {
        titre: "Store",
        icon: <StoreIcon className='mb-2 h-5 w-5' />,
        href: "/store",
        role: "seller"
    },
    {
        titre: "Cart",
        icon: <LocalGroceryStoreIcon className='mb-2 h-5 w-5' />,
        href: "/cart",
        role: "user"
    },
];

const accountMenu = [
    {
      titre: "Admin",
      icon: <AdminPanelSettingsIcon className='mb-2 h-5 w-5' />,
      href: "/admin",
      role: "admin"
    },
    {
        titre: "Profile",
        icon: <AccountCircleIcon className='mb-2 h-5 w-5' />,
        href: "/profile",
        role: "user"
    },
];

const socials = [
    {
      titre: "twitter",
      icon: <XIcon className='mt-4 h-5 w-5 hover:text-white' />,
      href: "#",
    },
    {
        titre: "Instagram",
        icon: <InstagramIcon className='mt-4 h-5 w-5 hover:text-white' />,
        href: "#",
    },
    {
        titre: "Facebook",
        icon: <FacebookIcon className='mt-4 h-5 w-5 hover:text-white' />,
        href: "#",
    },

];

const navLinks = [
    {
      id: "home",
      title: "Home",
      href: "/",
    },
    {
      id: "sell",
      title: "Sell",
      href: "/sell",
    },
    {
      id: "shop",
      title: "Shop",
      href: "/shop",
    },
    {
      id: "cart",
      title: "Cart",
      href: "/cart",
    },
  ];

  const categories = [
    {
      title: "Sleek & Powerful: The Ultimate Smartphone Experience",
      title1: "Phone",
      href: "#",
      icon: iphone,
      duration: 1000,
    },
    {
      title: "The Ultimate Workstation: Stay Ahead of the Curve",
      title1: "laptops",
      href: "#",
      icon: laptops,
      duration: 1000,
    },
    {
      title: "Crafted Precision: Timepieces That Define Elegance",
      title1: "Watches",
      href: "#",
      icon: watches,
      duration: 1000,
    },
    {
        title: "Elevate Your Style: Trendy & Comfortable Apparel",
        title1: "Clothes",
        href: "#",
        icon: clothes,
        duration: 1000,
      },
    {
        title: "The Finishing Touch: Must-Have Accessories for You",
        title1: "Accesories",
        href: "#",
        icon: accessories,
        duration: 1000,
      },
    {
      title: "Level Up Your Fun: Top Games for Every Gamer",
      title1: "Games",
      href: "#",
      icon: game,
      duration: 1000,
    },
    {
      title: "Journey Through Pages: Uncover New Worlds",
      title1: "Books",
      href: "#",
      icon: books,
      duration: 1000,
    },
    {
      title: "Upgrade Your Setup: Essential PC Accessories",
      title1: "Pc Accesories",
      href: "#",
      icon: pcAccesories,
      duration: 1000,
    },
];
const country = [
  {
    country: "Morocco",
  },
  {
    country: "Spain",
  },
  {
    country: "Canada",
  },
  {
    country: "United States",
  },
  {
    country: "Germany",
  },
  {
    country: "Holanda",
  },
  {
    country: "France",
  },
  {
    country: "Belgium",
  },
  {
    country: "China",
  },
  {
    country: "Russia",
  },
  {
    country: "Saudi Arabia",
  },
  
];

const productCategory = [
  {
    id:'Phone',
    category: "Phone",
    href: "#",
    icon: iphone,
    duration: 1000,
  },
  {
    id:'laptops',
    category: "laptops",
    href: "#",
    icon: laptops,
    duration: 1000,
  },
  {
    id:'Watches',
    category: "Watches",
    href: "#",
    icon: watches,
    duration: 1000,
  },
  {
    id:'Clothes',
    category: "Clothes",
      href: "#",
      icon: clothes,
      duration: 1000,
    },
  {
    id:'Accesories',
    category: "Accesories",
      href: "#",
      icon: accessories,
      duration: 1000,
    },
  {
    id:'Games',
    category: "Games",
    href: "#",
    icon: game,
    duration: 1000,
  },
  {
    id:'Books',
    category: "Books",
    href: "#",
    icon: books,
    duration: 1000,
  },
  {
    id:'pcAccesories',
    category: "Pc Accesories",
    href: "#",
    icon: pcAccesories,
    duration: 1000,
  },
  {
    id:'candles',
    category: "Candles",
    href: "#",
    icon: candles,
    duration: 1000,
  },
];

const sort = [
  {
    id:"1",
    name: "latest",
    href: "#",
  },
  {
    id: "2",
    name: "oldest",
    href: "#",
  },

];
const product = [
  {
    id: "1",
    name: "iphon15",
    price: 20,
    category: "Phone",
    href: "1",
    icon: iphon15,
    date: '2023-01-01',
    qte: 0,
  },
  {
    id: "2",
    name: "appleWatch",
    price: 20,
    category: "Watches",
    href: "2",
    icon: appleWatch,
    date: '2023-01-01',
    qte: 0,

  },
  {
    id: "3",
    name: "appleTv",
    price: 20,
    category: "Phone",
    href: "3",
    icon: appleTv,
    date: '2023-01-10',
    qte: 0,

  },
  {
    id: "4",
    name: "shirt",
    price: 20,
    category: "Clothes",
    href: "4",
    icon: shirt,
    date: '2023-01-01',
    qte: 0,

  },
  {
    id: "5",
    name: "pencil",
    price: 20,
    category: "Pc Accesories",
    href: "5",
    icon: pencil,
    date: '2023-01-01',
    qte: 0,

  },

  {
    id: "6",
    name: "airpods",
    price: 20,
    category: "Pc Accesories",
    href: "6",
    icon: airpods,
    date: '2023-01-01',
    qte: 0,

  },
  {
    id: "7",
    name: "ipad",
    price: 20,
    category: "Phone",
    href: "7",
    icon: ipad,
    date: '2023-01-11',
    qte: 0,

  },
  {
    id: "8",
    name: "lamicall",
    price: 20,
    category: "Pc Accesories",
    href: "8",
    icon: laptopRiser,
    date: '2023-01-01',
    qte: 0,

  },
  {
    id: "9",
    name: "macbook",
    price: 20,
    category: "laptops",
    href: "9",
    icon: macbook,
    date: '2023-01-01',
    qte: 0,

  },

];

const iconsAd = [
  {
    icon: user,
    text: "Personal Information",
    section: "personalInformation",
    dropdown: null,
  },
  {
    icon: users,
    text: "Users",
    section: "users",
    userRole: "admin",
    dropdown: [
      { text: "Users", section: "usersTable" },
      { text: "Admins", section: "adminsTable" },
      { text: "Sellers", section: "sellersTable" },
    ],
  },
  {
    icon: orders,
    text: "Orders",
    section: "orders",
    dropdown: null,
  },
  {
    icon: category,
    text: "Category",
    section: "category",
    dropdown: null,
  },
  {
    icon: products,
    text: "Products",
    section: "products",
    dropdown: null,
  },

];

const iconsUs = [
  {
    icon: user,
    text: "Personal Information",
    section: "personalInformation",
  },
  {
    icon: purchases,
    text: "My Purchases",
    section: "purchases",
  },
  {
    icon: orders,
    text: "My orders",
    section: "myOrders",
  },

];
const client =[
  {
    name: 'Akram',
    email: 'akram@gmail.com',
    role: 'admin',
  },
  {
    name: 'Moussa',
    email: 'moussa@gmail.com',
    role: 'user',
  }
];

const role = [
  {
    role: 'Buyer',
  },
  {
    role: 'seller',
  },
]



export { menu, accountMenu, socials, navLinks, categories, country, productCategory, sort, product, iconsAd, iconsUs, client, role };