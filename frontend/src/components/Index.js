import React from 'react';
import './Index.css';

const Index = ({ onClose }) => {
    return (
        <div className="index-container">
            <div className='index-explanation'>
                <p className='index-title'>어디에서나 확인 가능한 응급실 정보</p>
                <p>전국 522개 응급실의 실시간, 상세 정보를 열람하고</p>
                <p>지도에서 각 병원의 위치를 확인해보세요.</p>
            </div>

            <button className="start-button" onClick={onClose}>시작하기 ⮕</button>
        </div>
    );
};

export default Index;