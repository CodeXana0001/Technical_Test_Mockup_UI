import React, {ReactNode, useState} from 'react';
import './index.css';

interface ClickableCardProps {
    size?: number,
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    children?: ReactNode;
}

const CircleCard: React.FC<ClickableCardProps> = ({
    size= 30,
    onClick,
    children
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleHover = () => {
        setIsHovered(!isClicked); // Only apply hover effect if the card is not clicked
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsClicked(!isClicked);
        onClick && onClick(e); // Call onClick prop if provided
    };

    return (
        <div
            className={`clickable-card ${isHovered ? 'hover' : ''} ${isClicked ? 'clicked' : ''}`}
            style={{height: size, width: size}}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

export default CircleCard;
