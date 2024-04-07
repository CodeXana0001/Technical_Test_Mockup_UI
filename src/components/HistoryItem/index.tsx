import React from 'react';
import './index.css';
import CircleCard from "../CircleCard";
import SearchIcon from "../SearchIcon";
import TrashBinIcon from "../TrashBinIcon";

export type HistoryItemProps = {
    id?: string;
    city?: string;
    country?: string;
    searchTime?: string;
}

type HitoryItemComponentProps = {
    item: HistoryItemProps,
    handleItemSearchClick: (item: HistoryItemProps) => Promise<void>;
    handleItemDeleteClick: (item: HistoryItemProps) => void;
}

const HistoryItem: React.FC<HitoryItemComponentProps> = ({item, handleItemSearchClick, handleItemDeleteClick}) => {
    return (
        <div className="Container">
            <p>{item.city}, {item.country}</p>
            <div style={{display:'flex', marginLeft: 150, gap: 10}}>
                <p> {item.searchTime}</p>
                <CircleCard onClick={async () => {await handleItemSearchClick(item)}}>
                    <SearchIcon size={15} color="grey"/>
                </CircleCard>
                <CircleCard onClick={async () => {await handleItemDeleteClick(item)}}>
                    <TrashBinIcon size={15} color="grey"/>
                </CircleCard>
            </div>
        </div>
    )
};

export default HistoryItem;