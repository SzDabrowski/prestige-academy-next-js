import NavbarItems from "../../data/NavbarItems.json";
import DropDownNav from "../DropdownNav/DropdownNav";
import { PrestigeLogoIcon } from "../icons/LogoIcon/PrestigeLogoIcon";

import styles from "./NavBar.module.scss";

interface iNavbar {
  isHamburgerOpen: boolean;
}

export const Navbar = ({ isHamburgerOpen }: iNavbar) => {
  return (
    <nav
      className={`${isHamburgerOpen ? styles.mobileOpen : ""} ${
        styles.navbar
      } `}
    >
      <ul>
        {NavbarItems.map((item, index) => (
          <>
            {item.children && (
              <DropDownNav
                title={item.title}
                path={item.path}
                children={item.children}
                isHamburgerOpen={isHamburgerOpen}
              />
            )}

            {!item.children && (
              <li>
                <a href={item.path} className={styles.menuItem}>
                  <span> {item.title}</span>
                </a>
              </li>
            )}
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
