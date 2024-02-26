import NavbarItems from "../../../Data/NavbarItems.json";

import styles from "./NavBar.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        {NavbarItems.map((item, index) => (
          <>
            {/* {item.children && (
          <DropDownNav
            title={item.title}
            path={item.path}
            children={item.children}
          />
        )} */}

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
