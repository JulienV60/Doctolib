import react from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <>
      <hr />
      <br />
      <br />
      <Image
        src="/logoDoctolib.png"
        width={200}
        height={100}
        alt="logoDoctolib"
      />
      <br />
      Copyright © 2022 Doctolib, tous droits réservés. Julien.V, Kevin, Gringe,
      Julien.F, Baptiste
      <br />
    </>
  );
};
export default Footer;
