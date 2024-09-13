import React, { useState } from "react";
import Loader from "./Loading/Loader";

interface DataCardProps {
  data: {
    title: string | null;
    image: string;
  };
  onClick: () => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  index: number;
}

const DataCards: React.FC<DataCardProps> = ({
  data,
  onClick,
  handleDragStart,
  handleDragOver,
  handleDrop,
  index,
}) => {

  const [isLoadingImg, setIsLoadingImg] = useState(true);

  return (
    <div
      className="card-data"
      onClick={onClick}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, index)}
    >
      {isLoadingImg && (
        <Loader />
      )}
      <img src={data.image}
        style={{ display: isLoadingImg ? "none" : "block" }}
        onLoad={() => setTimeout(() => setIsLoadingImg(false), 2000)}
        alt="noValue" />
      <h4 className="card-title">{data.title}</h4>
    </div>
  );
};

export default DataCards;
