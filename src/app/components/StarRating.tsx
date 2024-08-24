// components/StarRating.tsx
import React from 'react';
import ReactStars from 'react-stars';

type StarRatingProps = {
    rating: number;
    onRate?: (rate: number) => void;
    readOnly?: boolean;
    size?: number;
    color?: string;
    activeColor?: string;
    isHalf?: boolean
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, readOnly = false, size = 24, color = "#ddd", activeColor = "#ffd700", isHalf = false }) => {
    return (
        <ReactStars
            count={5}
            value={rating}
            onChange={onRate}
            size={size}
            color2={activeColor} // Active color for stars
            color1={color} // Inactive color for stars
            edit={!readOnly} // Control whether stars are editable
            half={isHalf}
        />
    );
};

export default StarRating;
