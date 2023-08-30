import React from 'react';
import './Header.css';
import emergencyIcon from '../icons/emergencyIcon.png';
import listIcon from '../icons/listIcon.png';
import mapIcon from '../icons/mapIcon.png';

function Header({ onViewChange }) {
    return (
        <div className="header-container">
            <div className='title-container'>
                <img src={emergencyIcon} alt="emergencyIcon" />
                <h1 className="header-title">119monitoring</h1>
            </div>

            <div className="view-selector">
                <button className="view-button" onClick={() => onViewChange('list')}>
                    <img src={listIcon} alt="listIcon" />
                    <span>목록</span>
                </button>
                <button className="view-button" onClick={() => onViewChange('map')}>
                    <img src={mapIcon} alt="mapIcon" />
                    <span>지도</span>
                </button>
            </div>
        </div>
    );
}

export default Header;