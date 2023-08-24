import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import HospitalListView from './HospitalListView';
import Sidebar from './Sidebar';
import './HospitalList.css';

function HospitalList() {
    const [hospitals, setHospitals] = useState([]);
    const [hospitalDetails, setHospitalDetails] = useState([]);
    const [hospitalRealTimes, setHospitalRealTimes] = useState([]);

    const [selectedView, setSelectedView] = useState('list');
    const [selectedHospital, setSelectedHospital] = useState({ latitude: 37.5665, longitude: 126.9780 });

    const [isDetailLoading, setIsDetailLoading] = useState(true);
    const [isRealtimeLoading, setIsRealtimeLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 백엔드 API에서 병원 목록 데이터 fetch
        axios.get('http://localhost:8000/api/hospitals/')
            .then(response => {
                setHospitals(response.data);
            })
            .catch(error => {
                setError('병원 목록 데이터를 가져오는 데 실패했습니다.');
            });
            
        // 백엔드 API에서 병원 상세 데이터 fetch
        axios.get('http://localhost:8000/api/hospital_details/')
            .then(response => {
                setHospitalDetails(response.data);
                setIsDetailLoading(false);
            })
            .catch(error => {
                setError('병원 상세 데이터를 가져오는 데 실패했습니다.');
            });

        // 백엔드 API에서 병원 실시간 데이터 fetch
        axios.get('http://localhost:8000/api/hospital_realtime/')
            .then(response => {
                setHospitalRealTimes(response.data);
                setIsRealtimeLoading(false);
            })
            .catch(error => {
                setError('병원 실시간 데이터를 가져오는 데 실패했습니다.');
            });
    }, []);

    const handleViewChange = (view, latitude, longitude) => {
        setSelectedView(view);
        setSelectedHospital({ latitude, longitude })
    };

    if (isDetailLoading || isRealtimeLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        // 사이드바에서 선택한 버튼에 따라 목록 뷰, 지도 뷰 표시
        <div className="sidebar-container">
            <Sidebar onViewChange={handleViewChange} />

            <div className="select-view-container">
                {selectedView === 'list' ? (
                    <HospitalListView hospitals={hospitals} hospitalDetails={hospitalDetails} hospitalRealTimes={hospitalRealTimes} onViewChange={handleViewChange}/>
                ) : (
                    <MapComponent hospitals={hospitals} selectedHospital={selectedHospital}/>
                )}
            </div>
        </div>
    );
}

export default HospitalList;

