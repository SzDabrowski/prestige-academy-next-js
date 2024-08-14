import { useEffect, useState } from "react";
import styles from "./NotificationBar.module.scss";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

interface ImageProps {
  imagePath: string;
  altText: string;
}

const PopupImage = (props: ImageProps) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.wrapper}>
        <div className={styles.ImgWrapper}>
          <Image
            src={props.imagePath}
            alt={props.altText}
            width={1098}
            height={406}
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

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }, []);

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
                console.log(isOpen);
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
                    imagePath="/assets/images/grafik.jpg"
                    altText="grafik"
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
