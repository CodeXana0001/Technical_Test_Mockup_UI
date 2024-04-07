import React from 'react';

const TrashBinIcon = ({ size = 24, color = 'currentColor', ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
            {...rest}
        >
            <path d="M3 6h3v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6h3V4H3v2zm4-4h10v2H7V2zm6 14H8v-8h4v8zm4-6h-2V8h2v4z" />
        </svg>
    );
};

export default TrashBinIcon;