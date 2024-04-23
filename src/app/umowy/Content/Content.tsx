import styles from "./Content.module.scss";

import { Table } from "../Table/Table";

export const Content = () => {
  return (
    <main className={styles.main}>
      <section className={styles.titleSection}>
        <h1>Umowy dla dzieci oraz uczestników zajęć:</h1>
      </section>
      <section className={styles.tableSection}>
        <Table />
      </section>
    </main>
  );
};
