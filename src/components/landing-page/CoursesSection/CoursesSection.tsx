import styles from "./CoursesSection.module.scss";
import { Container } from "@/components/Container/Container";

const CoursesSection = () => {
	return (
		<Container>
			<section className={styles.section}>
				<h2 className={styles.header}>Kursy tańca</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
					massa enim. In est nunc, consequat non sodales a, tempus eget augue.
				</p>

				<div className={styles.container}>
					<div className={styles.adults}>
						<div className={styles.wrapper}>
							<span>Taniec dla dorosłych - odkryj radość ruchu</span>
						</div>
					</div>
					<div className={styles.kids}>
						<div className={styles.wrapper}>
							<span>Przygoda z tańcem dla najmłodyszch</span>
						</div>
					</div>
					<div className={styles.wedding}>
						<div className={styles.wrapper}>
							<span>
								Wyjątkowy pierwszy taniec - indywidualne kursy dla par
							</span>
						</div>
					</div>
				</div>
			</section>
		</Container>
	);
};

export default CoursesSection;
