import React from "react";

interface OverlayProps {
  image: any;
  onClose: () => void;
  title: string | null
}

const Overlay: React.FC<OverlayProps> = ({ image, title, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Overlay" />
        <h4 className="overlay-title">{title}</h4>
      </div>
    </div>
  );
};

export default Overlay;
