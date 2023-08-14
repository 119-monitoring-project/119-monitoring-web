import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

function HospitalList() {
    const [hospitals, setHospitals] = useState([]);
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

    return (
        <div>
            <MapComponent hospitals={hospitals} />
        </div>
    );
}

export default HospitalList;
