import React, { useState } from 'react';
import './HospitalListView.css';

function HospitalListView({ hospitals, hospitalDetails, onViewChange }) {
    const itemsPerPage = 10;
    const maxVisiblePages = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedHospital, setExpandedHospital] = useState(null);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentHospitals = hospitals.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(hospitals.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const getPageRange = () => {
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);
        const startPage = Math.max(currentPage - halfVisiblePages, 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    const toggleExpansion = (hospital) => {
        if (expandedHospital === hospital) {
            setExpandedHospital(null);
        } else {
            setExpandedHospital(hospital);
        }
    };

    return (
        <div>
            <div className='search-filter-container'>
                
            </div>

            <div className='list-container'>
                {currentHospitals.map(hospital => {
                    // 현재 병원의 상세 정보
                    const detailData = hospitalDetails.find(detail => detail.hpid === hospital.hpid);
                    console.log(detailData);
                    console.log(hospital.hpid);

                    return (
                    <div key={hospital.hpid} className={`list-item ${expandedHospital === hospital ? 'expanded' : ''}`}>
                        <div className='item-info'>
                            <h3>{hospital.duty_name} {hospital.center_type == 0 ? "(응급)" : "(외상)"} </h3>
                            <p>{hospital.duty_addr}</p>
                            <p>대표: {hospital.duty_tel1}</p>
                            <p>응급실: {hospital.duty_tel3}</p>
                            {expandedHospital === hospital && (
                                <div className='detail-info'>
                                    <h3>상세 정보</h3>
                                    <p>진료과목: {detailData.dgid_id_name}</p>

                                    <table className='detail-table'>
                                        <tbody>
                                            <tr>
                                                <td>응급실</td>
                                                <td>{detailData.hvec}</td>
                                                
                                                <td>응급실</td>
                                                <td>{detailData.mkioskty25}</td>

                                                <td>신생아</td>
                                                <td>{detailData.mkioskty10}</td>
                                            </tr>

                                            <tr>
                                                <td>수술실</td>
                                                <td>{detailData.hvoc}</td>

                                                <td>뇌출혈수술</td>
                                                <td>{detailData.mkioskty1}</td>

                                                <td>중증화상</td>
                                                <td>{detailData.mkioskty11}</td>
                                            </tr>

                                            <tr>
                                                <td>신경중환자</td>
                                                <td>{detailData.hvcc}</td>

                                                <td>뇌경색의재관류</td>
                                                <td>{detailData.mkioskty2}</td>

                                                <td>병상수</td>
                                                <td>{detailData.hpbdn}</td>
                                            </tr>

                                            <tr>
                                                <td>신생중환자</td>
                                                <td>{detailData.hvncc}</td>

                                                <td>심근경색의재관류</td>
                                                <td>{detailData.mkioskty3}</td>

                                                <td>흉부중환자실</td>
                                                <td>{detailData.hpccuyn}</td>
                                            </tr>

                                            <tr>
                                                <td>흉부중환자</td>
                                                <td>{detailData.hvccc}</td>

                                                <td>복부손상의수술</td>
                                                <td>{detailData.mkioskty4}</td>

                                                <td>신경중환자실</td>
                                                <td>{detailData.hpcuyn}</td>
                                            </tr>

                                            <tr>
                                                <td>일반중환자</td>
                                                <td>{detailData.hvicc}</td>

                                                <td>사지접합의수술</td>
                                                <td>{detailData.mkioskty5}</td>

                                                <td>응급실</td>
                                                <td>{detailData.hperyn}</td>
                                            </tr>

                                            <tr>
                                                <td>입원실</td>
                                                <td>{detailData.hvgc}</td>

                                                <td>응급내시경</td>
                                                <td>{detailData.mkioskty6}</td>

                                                <td>입원실</td>
                                                <td>{detailData.hpgryn}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td>입원실가용여부</td>
                                                <td>{detailData.duty_hayn == 1 ? 'Y' : 'N'}</td>

                                                <td>응급투석</td>
                                                <td>{detailData.mkioskty7}</td>

                                                <td>일반중환자실</td>
                                                <td>{detailData.hpicuyn}</td>
                                            </tr>

                                            <tr>
                                                <td>병상수</td>
                                                <td>{detailData.duty_hano}</td>

                                                <td>조선산모</td>
                                                <td>{detailData.mkioskty8}</td>

                                                <td>신생아중환자실</td>
                                                <td>{detailData.hpnicuyn}</td>
                                            </tr>

                                            <tr>
                                                <td>응급실운영여부</td>
                                                <td>{detailData.duty_eryn == 1 ? 'Y' : 'N'}</td>

                                                <td>정신질환자</td>
                                                <td>{detailData.mkioskty9}</td>

                                                <td>수술실</td>
                                                <td>{detailData.hpopyn}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            )}
                        </div>
                        <div className='item-link'>
                            <button onClick={() => onViewChange('map', hospital.wgs_84_lat, hospital.wgs_84_lon)}>지도에서 보기</button>
                            <button className='detail-button' onClick={() => toggleExpansion(hospital)}>
                                {expandedHospital === hospital ? '상세정보 닫기' : '상세정보 보기'}
                            </button>
                        </div>
                    </div>
                    );
                })}
            </div>

            <div className='pagination'>
                <button onClick={handleFirstPage}>First</button>
                {getPageRange().map((pageNumber, index) => (
                    <button
                        key={index}
                        className={pageNumber === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button onClick={handleLastPage}>Last</button>
            </div>
        </div>
    );
}

export default HospitalListView;

