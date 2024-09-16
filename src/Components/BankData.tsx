import React, { useEffect, useState, DragEvent } from "react";
import DataCards from "./DataCards";
import Overlay from "./Overlay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { getBankData } from "../Redux/Slice/dataSlice";
import logo from "../Assets/logo-primary.png";

interface BankDataItem {
  image: string;
  title: string;
}

const BankData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bankData } = useSelector((state: any) => state.data);

  const [value, setValue] = useState<BankDataItem[]>(bankData);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [draggedCard, setDraggedCard] = useState<number | null>(null);


  const handleImageClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setOverlayVisible(true);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedCard(index);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedCard === null) return;
    const updatedItems = [...value];
    const draggedItemContent = updatedItems[draggedCard];
    updatedItems.splice(draggedCard, 1);
    updatedItems.splice(index, 0, draggedItemContent);
    setValue(updatedItems);
    setDraggedCard(null);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setSelectedImage(null);
    setSelectedTitle("");
  };

  useEffect(() => {
    const handleEsc = (e: WindowEventMap['keydown']) => {
      if (e.key === "Escape") {
        closeOverlay();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    dispatch(getBankData());
  }, [dispatch]);

  return (
    <>
      <div className="data-section">
        <div className="page-header">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="card-sec">
          <div className="card-sec-data">
            {value.map((item, index) => {
              return (
                <DataCards
                  data={item}
                  key={index}
                  index={index}
                  onClick={() => handleImageClick(item.image, item.title)}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                />
              );
            })}
          </div>
        </div>
      </div>
      {overlayVisible && (
        <Overlay
          image={selectedImage}
          title={selectedTitle}
          onClose={closeOverlay}
        />
      )}
    </>
  );
};

export default BankData;
