import { Container } from "@/components/Container/Container";
import { MenuItem } from "@/types/headerTypes";

const menuitems: MenuItem[] = [
  {
    title: "Oferta",
    path: "/pricing",
  },
  {
    title: "O nas",
    path: "/about",
  },
  {
    title: "Kursy",
    path: "/courses",
    children: [
      { title: "Dorośli", path: "/" },
      { title: "Seniorzy", path: "#" },
      { title: "Pierwszy Taniec", path: "#" },
    ],
  },
  {
    title: "Kontakt",
    path: "/contact",
  },
];

const LandingHeader = () => {
  return (
    <header>
      <Container></Container>
    </header>
  );
};

export default LandingHeader;
