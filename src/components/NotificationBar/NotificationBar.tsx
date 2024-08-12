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
        <Image
          src={props.imagePath}
          alt={props.altText}
          width={0}
          height={0}
          sizes="80vw"
          style={{ width: "100%", height: "auto", maxWidth: "80vw" }}
        />
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
