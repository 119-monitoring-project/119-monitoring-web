import React, { useEffect } from 'react';
import './MapComponent.css';

// const { kakao } = window;

const MapComponent = ({ hospitals = [], selectedHospital }) => {
    useEffect(() => {
        // 카카오맵 API 연동
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
            const container = document.getElementById('kakao-map');

            // 중심좌표(위도, 경도), 확대 정도 설정
            const options = {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 5,
            };

            const map = new window.kakao.maps.Map(container, options);

            console.log(hospitals);

            // 병원 위치 마커로 표시
            hospitals.forEach(hospital => {
                const position = new window.kakao.maps.LatLng(hospital.wgs_84_lat, hospital.wgs_84_lon);

                const marker = new window.kakao.maps.Marker({position: position});
                marker.setMap(map);

                // 마커 클릭 시 오버레이로 병원 정보 표시
                const content = `<div class="custom-overlay">` +
                '    <div class="info">' + 
                '       <div class="header">' + 
                '           <div class="title">' + 
                `               ${hospital.duty_name}` + 
                `               ${hospital.center_type === "0" ? "(응급)" : "(외상)"}` +
                '           </div>' + 
                `            <button class="close" title="닫기">X</button>` + 
                '        </div>' +
                '        <div class="body">' +
                '            <div class="desc">' + 
                `                <div class="address">${hospital.duty_addr}</div>` + 
                `                <div class="representitive-tel">대표: ${hospital.duty_tel1}</div>` + 
                `                <div class="er-tel">응급실: ${hospital.duty_tel3}</div>` +
                '            </div>' + 
                '        </div>' + 
                '    </div>' +
                '</div>';

                const overlay = new window.kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                    yAnchor: 1.35
                });

                // 오버레이 닫기 기능 추가
                window.kakao.maps.event.addListener(marker, 'click', function(){
                    overlay.setMap(map);

                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = content;

                    const closeBtn = tempDiv.querySelector('.close');
                    closeBtn.addEventListener('click', () => {
                        overlay.setMap(null);
                    });

                    overlay.setContent(tempDiv);
                });

                // 목록 뷰에서 선택된 병원의 위치로 지도 이동
                // 선택된 병원의 오버레이는 마커 클릭 없이도 자동으로 출력(닫기 기능도 별도로 구현함)
                if (selectedHospital && selectedHospital.latitude === hospital.wgs_84_lat && selectedHospital.longitude === hospital.wgs_84_lon) {
                    const centerPosition = new window.kakao.maps.LatLng(selectedHospital.latitude, selectedHospital.longitude);
                    map.setCenter(centerPosition);
                    overlay.setMap(map);

                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = content;

                    const closeBtn = tempDiv.querySelector('.close');
                    closeBtn.addEventListener('click', () => {
                        overlay.setMap(null);
                    });

                    overlay.setContent(tempDiv);
                }

            });

            // 지도 타입 컨트롤, 줌 컨트롤 추가
            const mapTypeControl = new window.kakao.maps.MapTypeControl();
            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            });
        };
    }, [hospitals, selectedHospital]);

    return <div id="kakao-map" />;
};

export default MapComponent;

