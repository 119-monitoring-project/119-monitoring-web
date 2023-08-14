import React, { useEffect } from 'react';

// const { kakao } = window;

const MapComponent = ({ hospitals = [] }) => {
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

        console.log(hospitals)

        // 병원 위치 마커로 표시
        hospitals.forEach(hospital => {
            const position = new window.kakao.maps.LatLng(hospital.wgs_84_lat, hospital.wgs_84_lon)

            const marker = new window.kakao.maps.Marker({position: position});
            marker.setMap(map);

            const content = `<div class="custom-overlay" style="background-color: #ffffff; padding: 10px; border: 1px solid #ccc;">` +
            '    <div class="info">' + 
            '        <div class="title">' + 
            `            ${hospital.duty_name}` + 
            // `            <div id="close" onclick=closeOverlay(overlay) title="닫기">X</div>` + 
            '        </div>' + 
            '        <div class="body">' +
            '            <div class="desc">' + 
            `                <div class="address">${hospital.duty_addr}</div>` + 
            `                <div class="representitive-tel">대표: ${hospital.duty_tel1}</div>` + 
            `                <div class="er-tel">응급실: ${hospital.duty_tel3}</div>` + 
            `                <div class="center-type">${hospital.center_type}</div>` + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +
            '</div>';

            const overlay = new window.kakao.maps.CustomOverlay({
                position: position,
                content: content
            })

            window.kakao.maps.event.addListener(marker, 'click', function(){
                overlay.setMap(map);
            });

        });

        // function closeOverlay(overlay){
        //     overlay.setMap(null);
        // };

        // const closeOverlay = overlay => {
        //     overlay.setMap(null);
        // };

        // 지도 타입 컨트롤, 줌 컨트롤 추가
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
        });
    };
    }, [hospitals]);

    return <div id="kakao-map" style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;

