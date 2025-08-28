import { useEffect, useState } from 'react';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WhatsappFloatingButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open("https://wa.me/553496820404", "_blank"); 
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] shadow-lg
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        flex items-center justify-center
        rounded-[2rem]
        cursor-pointer
        hover:scale-110
        active:scale-95
      `}
      aria-label="Fale no WhatsApp"
    >
      <FontAwesomeIcon
        icon={faWhatsapp}
        className="text-white text-2xl md:text-3xl transition-transform duration-300"
      />
    </button>
  );
};

export default WhatsappFloatingButton;
