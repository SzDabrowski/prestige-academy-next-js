import styles from "./Content.module.scss";

import { Table } from "../Table/Table";

export const Content = () => {
	return (
		<div className="">
			<section className={styles.titleSection}>
				<h1>Umowy dla dzieci oraz uczestników zajęć:</h1>
			</section>
			<main className={styles.main}>
				<section className={styles.tableSection}>
					<Table />
				</section>
			</main>
		</div>
	);
};
