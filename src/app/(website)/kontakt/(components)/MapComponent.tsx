export const MapComponent = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.27463232874!2d15.021540100000001!3d53.3383399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4700b9132185f2f1%3A0xd5a5032fce1b620b!2sAkademia%20Ta%C5%84ca%20Prestige%20Dance!5e0!3m2!1spl!2spl!4v1711479614050!5m2!1spl!2spl"
      width="100%"
      height="450"
      style={{ border: "0" }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default MapComponent;
