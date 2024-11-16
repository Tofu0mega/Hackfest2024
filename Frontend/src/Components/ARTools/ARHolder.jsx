import React, { useState, useEffect } from 'react';
import EarringsAR from './EarringsAR';
import GlassesAR from './GlassesAR';
import NecklaceAR from './NecklaceAR';

import { useParams } from 'react-router-dom';

export default function ARHolder() {
    const [AssetType, setAssetType] = useState();
    const { productId } = useParams();
    const [FilterURL, setFilterURL] = useState();

    useEffect(() => {
        fetch(`http://localhost:3000/product/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched data:", data); // Log the fetched data
                setAssetType(data.itemType);
                setFilterURL(data.filterImage);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }, [productId]);

    return (
        <div>
            {AssetType === 'Earrings' && <EarringsAR Asset={FilterURL} />}
            {AssetType === 'Glasses' && <GlassesAR Asset={FilterURL} />}
            {AssetType === 'Necklace' && <NecklaceAR Asset={FilterURL} />}
        </div>
    );
}
