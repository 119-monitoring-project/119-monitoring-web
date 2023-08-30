import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import HospitalListView from './HospitalListView';
import './HospitalList.css';
import Header from './Header';
import Loading from './Loading';
import Index from './Index';

function HospitalList() {
    const [hospitals, setHospitals] = useState([]);
    const [hospitalDetails, setHospitalDetails] = useState([]);
    const [hospitalRealTimes, setHospitalRealTimes] = useState([]);

    const [selectedView, setSelectedView] = useState('list');
    const [selectedHospital, setSelectedHospital] = useState({ latitude: 37.5665, longitude: 126.9780 });

    const [isDetailLoading, setIsDetailLoading] = useState(true);
    const [isRealtimeLoading, setIsRealtimeLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showIndex, setShowIndex] = useState(true);

    useEffect(() => {
        // 백엔드 API에서 병원 목록 데이터 fetch
        axios.get('http://52.79.71.4:8000/api/hospitals/')
            .then(response => {
                setHospitals(response.data);
            })
            .catch(error => {
                setError('병원 목록 데이터를 가져오는 데 실패했습니다.');
            });
            
        // 백엔드 API에서 병원 상세 데이터 fetch
        axios.get('http://52.79.71.4:8000/api/hospital_details/')
            .then(response => {
                setHospitalDetails(response.data);
                setIsDetailLoading(false);
            })
            .catch(error => {
                setError('병원 상세 데이터를 가져오는 데 실패했습니다.');
            });

        // 백엔드 API에서 병원 실시간 데이터 fetch
        axios.get('http://52.79.71.4:8000/api/hospital_realtime/')
            .then(response => {
                setHospitalRealTimes(response.data);
                setIsRealtimeLoading(false);
            })
            .catch(error => {
                setError('병원 실시간 데이터를 가져오는 데 실패했습니다.');
            });
    }, []);

    const handleViewChange = (view, latitude, longitude) => {
        setShowIndex(false);
        setSelectedView(view);
        setSelectedHospital({ latitude, longitude })
    };

    if (isDetailLoading || isRealtimeLoading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        // 사이드바에서 선택한 버튼에 따라 목록 뷰, 지도 뷰 표시
        <div className="content-container">
            <Header onViewChange={handleViewChange} />

            {/* 인덱스 컴포넌트 출력 */}
            {showIndex ? (
                <Index onClose={() => setShowIndex(false)} />
            ) : (
                <React.Fragment>
                    <div className="select-view-container">
                        {selectedView === 'list' ? (
                            <HospitalListView hospitals={hospitals} hospitalDetails={hospitalDetails} hospitalRealTimes={hospitalRealTimes} onViewChange={handleViewChange}/>
                        ) : (
                            <MapComponent hospitals={hospitals} selectedHospital={selectedHospital}/>
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default HospitalList;

