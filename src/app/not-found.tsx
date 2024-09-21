import styles from "./not-found.module.scss";

const notFound = () => {
  return (
    <div className={styles.containter}>
      <div className="">
        <h1 className={styles.title}> 404 - Nie znaleziono strony </h1>
        <p className={styles.information}>
          Przepraszamy, nie ma takiej strony{" "}
        </p>
      </div>
    </div>
  );
};

export default notFound;
