import NavbarItems from "../../data/NavbarItems.json";
import DropDownNav from "../DropdownNav/DropdownNav";

import styles from "./NavBar.module.scss";

interface iNavbar {
  isHamburgerOpen: boolean;
}

const Navbar = ({ isHamburgerOpen }: iNavbar) => {
  return (
    <nav
      className={`${isHamburgerOpen ? styles.mobileOpen : ""} ${
        styles.navbar
      } `}
    >
      <ul>
        {NavbarItems.map((item, index) => (
          <div key={index}>
            {item.children && (
              <DropDownNav
                title={item.title}
                path={item.path}
                childrenData={item.children}
                isHamburgerOpen={isHamburgerOpen}
              />
            )}

            {!item.children && (
              <li key={`${item.title}-${index}`}>
                <a href={item.path} className={styles.menuItem}>
                  <span> {item.title}</span>
                </a>
              </li>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
