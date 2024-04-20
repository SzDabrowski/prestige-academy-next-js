import styles from "./AboutUs.module.scss";
import { Container } from "@/components/Container/Container";

import aboutUsData from "@/data/aboutUs.json";

const AboutUs = () => {
	return (
		<Container>
			<section className={styles.section}>
				<div className={styles.textContent}>
					<span>O nas i</span>
					<h3>O naszej akademii tańca</h3>
					<p>{aboutUsData.summary.desc_1}</p>
					<p>{aboutUsData.summary.desc_2}</p>
					<div className={styles.quote}>
						<p>{aboutUsData.summary.quote}</p>
						<p className={styles.signed}>{aboutUsData.summary.quote_sign}</p>
					</div>
					<div className={styles.card}></div>
				</div>
				<div className={styles.flexGroup}>
					<div className={styles.person}>
						<div className={`${styles.avatar} ${styles.krystian}`}></div>
						<div className={styles.personText}>
							<span className={styles.name}>Krystian</span>
							<span className={styles.info}>{aboutUsData.krystian.desc}</span>
						</div>
					</div>

					<div className={styles.person}>
						<div className={`${styles.avatar} ${styles.greta}`}></div>
						<div className={styles.personText}>
							<span className={styles.name}>Greta</span>
							<span className={styles.info}>{aboutUsData.Greta.desc}</span>
						</div>
					</div>

					<div className={styles.person}>
						<div className={`${styles.avatar} ${styles.szymon}`}></div>
						<div className={styles.personText}>
							<span className={styles.name}>Szymon</span>
							<span className={styles.info}>{aboutUsData.Szymon.desc}</span>
						</div>
					</div>
				</div>
			</section>
		</Container>
	);
};

export default AboutUs;
