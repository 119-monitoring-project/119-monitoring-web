import React from 'react';
import './Sidebar.css';

function Sidebar({ onViewChange }) {
    return (
        <div className="sidebar">
            <button className="sidebar-button" onClick={() => onViewChange('map')}>지도</button>
            <button className="sidebar-button" onClick={() => onViewChange('list')}>목록</button>
        </div>
    );
}

export default Sidebar;
