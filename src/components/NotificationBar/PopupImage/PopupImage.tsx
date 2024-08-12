import Image from "next/image";

interface Props {
  imagePath: string;
}

const PopupImage = () => {
  return (
    <div className="">
      <Image
        src="/assets/images/adults.png"
        alt="adults"
        width={0}
        height={0}
        sizes="80vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default PopupImage;
