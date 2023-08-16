import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import HospitalListView from './HospitalListView';
import Sidebar from './Sidebar';
import './HospitalList.css';

function HospitalList() {
    const [hospitals, setHospitals] = useState([]);
    const [selectedView, setSelectedView] = useState('map');
    console.log("entered1")

    useEffect(() => {
        // 백엔드 API에서 병원 목록 데이터 fetch
        axios.get('http://localhost:8000/api/hospitals/')
            .then(response => {
                setHospitals(response.data);
            })
            .catch(error => {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
            });
    }, []);

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    return (
        // 사이드바에서 선택한 버튼에 따라 목록 뷰, 지도 뷰 표시
        <div className="sidebar-container">
            <Sidebar onViewChange={handleViewChange} />

            <div className="select-view-container">
                {selectedView === 'map' ? (
                    <MapComponent hospitals={hospitals} />
                ) : (
                    <HospitalListView hospitals={hospitals} />
                )}
            </div>
        </div>
    );
}

export default HospitalList;
