import React, { useEffect, useState } from 'react';
import colors from '../styles/_settings.scss';

const PercentChange = ({ percent }) => {
    const [color, setColor] = useState();

    useEffect(() => {
        if (percent !== undefined && percent !== null) {
            if (percent >= 0) {
                setColor(colors.green1);
            } else {
                setColor(colors.red1);
            }
        } else {
            setColor(colors.white1);
        }
    }, [percent]);

    return (
        <p className='percent-change-container' style={{ color }}>
            {percent !== undefined && percent !== null ? percent.toFixed(1) + "%" : "-"}
        </p>
    );
};

export default PercentChange;
