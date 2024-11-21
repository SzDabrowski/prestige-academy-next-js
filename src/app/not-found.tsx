import styles from "./not-found.module.scss";

const notFound = () => {
  return (
    <main className={styles.container} role="main">
      <div>
        <h1 className={styles.title}> 404 - Nie znaleziono strony </h1>
        <p className={styles.information}>
          Przepraszamy, nie ma takiej strony{" "}
        </p>
      </div>
    </main>
  );
};

export default notFound;
