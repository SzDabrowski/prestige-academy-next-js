import { useEffect, useState } from "react";
import styles from "./NotificationBar.module.scss";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { fetchChartData } from "@/lib/contentful/serverActions/chart";
import { TypeChartFields } from "@/types/typeChartSkeleton";

interface ImageProps {
	imagePath: string;
	altText: string;
	width: number;
	height: number;
	isLoading?: boolean;
}

const PopupImage = (props: ImageProps) => {
	if (props.isLoading) {
		return (
			<div className={styles.imageContainer}>
				<div className={styles.wrapper}>
					<div className={styles.ImgWrapper}>
						<div>Ładowanie...</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.imageContainer}>
			<div className={styles.wrapper}>
				<div className={styles.ImgWrapper}>
					<Image
						src={props.imagePath}
						alt={props.altText}
						width={props.width}
						height={props.height}
						sizes="(max-width: 1200px) 100vw, 33vw"
						unoptimized={true}
						quality={100}
						className={styles.img}
					/>
				</div>
			</div>
		</div>
	);
};

const NotificationBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);
	const [chartData, setChartData] = useState<TypeChartFields | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsOpen(true);
		}, 1000);
	}, []);

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const fetchedData = await fetchChartData({
					preview: false,
				});

				// Extract the fields from the first entry in the collection
				if (fetchedData && fetchedData.items && fetchedData.items.length > 0) {
					const fields = fetchedData.items[0].fields;

					if ("grafik" in fields) {
						setChartData(fields as TypeChartFields);
					} else {
						setChartData(null);
					}
				} else {
					setChartData(null);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				setChartData(null);
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, []);

	// Get image URL from the chart data - note the field name is 'grafik'
	const getImageData = () => {
		if (!chartData?.grafik?.fields?.file?.url) {
			return {
				url: "/assets/images/grafik.jpg", // Fallback
				width: 1098,
				height: 406,
			};
		}

		return {
			url: `https:${chartData.grafik.fields.file.url}`,
			width: 1098,
			height: 406,
		};
	};

	const imageData = getImageData();

	return (
		<div className={styles.mainContainer}>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className={styles.messageContainer}
					>
						<p
							onClick={() => {
								setIsImageOpen(true);
							}}
						>
							Kliknij aby zobaczyć aktualny grafik!
						</p>
						<button
							onClick={() => {
								setIsOpen(false);
							}}
						>
							x
						</button>
						<AnimatePresence>
							{isImageOpen && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className=""
									onClick={() => {
										setIsImageOpen(false);
									}}
								>
									<PopupImage
										imagePath={imageData.url}
										altText="grafik"
										width={imageData.width}
										height={imageData.height}
										isLoading={loading}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default NotificationBar;
