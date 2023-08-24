import React, { useState, useEffect } from 'react';
import './HospitalListView.css';

function HospitalListView({ hospitals = [], hospitalDetails = [], hospitalRealTimes = [], onViewChange }) {
    const itemsPerPage = 10;
    const maxVisiblePages = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedDetail, setExpandedDetail] = useState(null);
    const [expandedRealTime, setExpandedRealTime] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedRealtimeCondition, setSelectedRealtimeCondition] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    
    // 검색, 필터 조건 변경 시 1페이지로 이동
    useEffect(() => {
        setCurrentPage(1);
    }, [isFiltered, searchQuery, selectedCondition, selectedRealtimeCondition]);

    // 검색, 필터링
    const filteredHospitals = hospitals.filter(hospital => {
        const nameMatches = hospital.duty_name.includes(searchQuery);
        const detail = hospitalDetails.find(detail => detail.hpid === hospital.hpid);
        const realtime = hospitalRealTimes.find(realtime => realtime.hpid === hospital.hpid);

        const conditionMatches = detail[selectedCondition] === 'Y' || detail[selectedCondition] > 0 || selectedCondition === '';
        const realtimeConditionMatches = 
            realtime ? (realtime[selectedRealtimeCondition] === 'Y' || realtime[selectedRealtimeCondition] > 0 || selectedRealtimeCondition === ''): false;

        return nameMatches && conditionMatches && realtimeConditionMatches;
    });

    // 검색, 필터링 조건이 적용된 경우 filteredHospitals를, 적용되지 않은 경우 hospitals를 사용
    const activeList = isFiltered ? filteredHospitals : hospitals;
    const totalPages = Math.ceil(activeList.length / itemsPerPage);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentHospitals = activeList.slice(firstIndex, lastIndex);

    // 사용자로부터 검색어, 필터링 조건 받아서 설정
    const handleSearchFilter = (query, condition, realtimeCondition) => {
        setSearchQuery(query);
        setSelectedCondition(condition);
        setSelectedRealtimeCondition(realtimeCondition);
        setIsFiltered(query || condition !== null || realtimeCondition !== null);
    };

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

    // 상세 정보 창 토글
    const toggleDetailExpansion = (hospital) => {
        if (expandedDetail === hospital || !activeList.includes(hospital)) {
            setExpandedDetail(null);
        } else {
            setExpandedDetail(hospital);
        }
    };

    // 실시간 병상 정보 창 토글
    const toggleRealTimeExpansion = (hospital) => {
        if (expandedRealTime === hospital || !activeList.includes(hospital)) {
            setExpandedRealTime(null);
        } else {
            setExpandedRealTime(hospital);
        }
    };

    // 실시간 정보 동기화 버튼 클릭 시 페이지 새로고침해 axios 로직 재실행
    const handleSyncRealTimeData = () => {
        window.location.reload();
    };

    return (
        <div>
            <div className='search-filter-container'>
                <input
                    type='text'
                    placeholder='병원 이름을 입력하세요.'
                    value={searchQuery}
                    onChange={(e) => handleSearchFilter(e.target.value, selectedCondition, selectedRealtimeCondition)}
                />

                <select
                    value={selectedCondition}
                    onChange={(e) => handleSearchFilter(searchQuery, e.target.value, selectedRealtimeCondition)}
                >
                    <option value=''>상세정보 필터링</option>
                    <option value='duty_eryn'>응급실</option>
                    <option value='hvoc'>수술실</option>
                    <option value='hvcc'>신경중환자</option>
                    <option value='hvncc'>신생중환자</option>
                    <option value='hvccc'>흉부중환자</option>
                    <option value='hvicc'>일반중환자</option>
                    <option value='duty_hayn'>입원실</option>
                    <option value='duty_hano'>병상수</option>
                    <option value='mkioskty1'>뇌출혈수술</option>
                    <option value='mkioskty2'>뇌경색의재관류</option>
                    <option value='mkioskty3'>심근경색의재관류</option>
                    <option value='mkioskty4'>복부손상의수술</option>
                    <option value='mkioskty5'>사지접합의수술</option>
                    <option value='mkioskty6'>응급내시경</option>
                    <option value='mkioskty7'>응급투석</option>
                    <option value='mkioskty8'>조산산모</option>
                    <option value='mkioskty9'>정신질환자</option>
                    <option value='mkioskty10'>신생아</option>
                    <option value='mkioskty11'>중증화상</option>
                    <option value='hpccuyn'>흉부중환자실</option>
                    <option value='hpcuyn'>신경중환자실</option>
                    <option value='hpicuyn'>일반중환자실</option>
                    <option value='hpnicuyn'>신생아중환자실</option>
                </select>

                <select
                    value={selectedRealtimeCondition}
                    onChange={(e) => handleSearchFilter(searchQuery, selectedCondition, e.target.value)}
                >
                    <option value=''>실시간 정보 필터링</option>
                    <option value='hvec'>응급실</option>
                    <option value='hvoc'>수술실</option>
                    <option value='hvcc'>신경중환자</option>
                    <option value='hvncc'>신생중환자</option>
                    <option value='hvccc'>흉부중환자</option>
                    <option value='hvicc'>일반중환자</option>
                    <option value='hvgc'>입원실</option>
                    <option value='hvctayn'>CT 가용여부</option>
                    <option value='hvmriayn'>MRI 가용여부</option>
                    <option value='hvangioayn'>혈관촬영기 가용여부</option>
                    <option value='hvventiayn'>인공호흡기 가용여부</option>
                    <option value='hvventisoayn'>인공호흡기(조산아) 가용여부</option>
                    <option value='hvincuayn'>인큐베이터 가용여부</option>
                    <option value='hvcrrtayn'>CRRT 가용여부</option>
                    <option value='hvecmoayn'>ECMO 가용여부</option>
                    <option value='hvoxyayn'>고압산소치료기 가용여부</option>
                    <option value='hvhypoayn'>중심체온조절유도기 가용여부</option>
                    <option value='hvamyn'>구급차 가용여부</option>
                    <option value='hv2'>내과 중환자실</option>
                    <option value='hv3'>외과 중환자실</option>
                    <option value='hv4'>정형외과 입원실</option>
                    <option value='hv5'>신경과 입원실</option>
                    <option value='hv6'>신경외과 중환자실</option>
                    <option value='hv7'>약물중환자</option>
                    <option value='hv8'>화상중환자</option>
                    <option value='hv9'>외상중환자</option>
                    <option value='hv10'>VENTI(소아)</option>
                    <option value='hv13'>격리진료구역 음압격리병상</option>
                    <option value='hv14'>격리진료구역 일반격리병상</option>
                    <option value='hv15'>소아음압격리</option>
                    <option value='hv16'>소아일반격리</option>
                    <option value='hv17'>[응급전용] 중환자실 음압격리</option>
                    <option value='hv18'>[응급전용] 중환자실 일반격리</option>
                    <option value='hv19'>[응급전용] 입원실 음압격리</option>
                    <option value='hv21'>[응급전용] 입원실 일반격리</option>
                    <option value='hv22'>감염병 전담병상 중환자실</option>
                    <option value='hv23'>감염병 전담병상 중환자실 내 음압격리병상</option>
                    <option value='hv24'>감염 중증 병상</option>
                    <option value='hv25'>감염 준,중증 병상</option>
                    <option value='hv26'>감염 중등증 병상</option>
                    <option value='hv27'>코호트 격리</option>
                    <option value='hv28'>소아</option>
                    <option value='hv29'>응급실 음압 격리 병상</option>
                    <option value='hv30'>응급실 일반 격리 병상</option>
                    <option value='hv31'>[응급전용] 중환자실</option>
                    <option value='hv32'>소아 중환자실</option>
                    <option value='hv33'>[응급전용] 소아중환자실</option>
                    <option value='hv34'>심장내과 중환자실</option>
                    <option value='hv35'>음압격리 중환자실</option>
                    <option value='hv36'>[응급전용] 입원실</option>
                    <option value='hv37'>[응급전용] 소아입원실</option>
                    <option value='hv38'>외상전용 입원실</option>
                    <option value='hv39'>외상전용 수술실</option>
                    <option value='hv40'>정신과 폐쇄병동 입원실</option>
                    <option value='hv41'>음압격리 입원실</option>
                    <option value='hv42'>분만실</option>
                    <option value='hv43'>화상전용처치실</option>
            </select>

                <button className='realtime-button' onClick={handleSyncRealTimeData}>실시간 정보 동기화</button>
            </div>

            <div className='list-container'>
                {currentHospitals.map(hospital => {
                    // 선택된 병원의 상세 정보
                    const detailData = hospitalDetails.find(detail => detail.hpid === hospital.hpid);

                    // 선택된 병원의 실시간 병상 정보
                    const realtimeData = hospitalRealTimes.find(realtime => realtime.hpid === hospital.hpid);

                    return (
                    <div key={hospital.hpid} className={`list-item ${expandedDetail === hospital ? 'expanded' : ''}`}>
                        <div className='basic-info'>
                            <h3>{hospital.duty_name} {hospital.center_type === '0' ? '(응급)' : '(외상)'} </h3>
                            <p>{hospital.duty_addr}</p>
                            <p>대표: {hospital.duty_tel1}</p>
                            <p>응급실: {hospital.duty_tel3}</p>
                            {expandedDetail === hospital && (
                                <div className='info-title'>
                                    <h3>상세 정보</h3>
                                    <p>진료과목: {detailData.dgid_id_name}</p>

                                    <table className='info-table'>
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
                                                <td>{detailData.hvicc} / {detailData.hvs01}</td>

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
                                                <td>{detailData.duty_hayn === '1' ? 'Y' : 'N'}</td>

                                                <td>응급투석</td>
                                                <td>{detailData.mkioskty7}</td>

                                                <td>일반중환자실</td>
                                                <td>{detailData.hpicuyn}</td>
                                            </tr>

                                            <tr>
                                                <td>병상수</td>
                                                <td>{detailData.duty_hano}</td>

                                                <td>조산산모</td>
                                                <td>{detailData.mkioskty8}</td>

                                                <td>신생아중환자실</td>
                                                <td>{detailData.hpnicuyn} / {realtimeData.hvs08}</td>
                                            </tr>

                                            <tr>
                                                <td>응급실운영여부</td>
                                                <td>{detailData.duty_eryn === '1' ? 'Y' : 'N'}</td>

                                                <td>정신질환자</td>
                                                <td>{detailData.mkioskty9}</td>

                                                <td>수술실</td>
                                                <td>{detailData.hpopyn}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {expandedRealTime === hospital && (
                                <div className='info-title'>
                                    <h3>실시간 병상 정보</h3>

                                    {realtimeData ? (
                                        <table className='info-table'>
                                            <tbody>
                                                <tr>
                                                    <td>응급실</td>
                                                    <td>{realtimeData.hvec}</td>
                                                    
                                                    <td>수술실</td>
                                                    <td>{realtimeData.hvoc} / {realtimeData.hvs22}</td>

                                                    <td>신경중환자</td>
                                                    <td>{realtimeData.hvcc} / {realtimeData.hvs11}</td>
                                                </tr>

                                                <tr>
                                                    <td>신생중환자</td>
                                                    <td>{realtimeData.hvncc}</td>
                                                    
                                                    <td>흉부중환자</td>
                                                    <td>{realtimeData.hvccc} / {realtimeData.hvs16}</td>

                                                    <td>일반중환자</td>
                                                    <td>{realtimeData.hvicc} / {realtimeData.hvs17}</td>
                                                </tr>

                                                <tr>
                                                    <td>일반입원실</td>
                                                    <td>{realtimeData.hvgc}</td>
                                                    
                                                    <td>당직의</td>
                                                    <td>{realtimeData.hvdnm}</td>
                                                    
                                                    <td>CT 가용여부</td>
                                                    <td>{realtimeData.hvctayn} ({realtimeData.hvs27})</td>
                                                </tr>

                                                <tr>
                                                    <td>MRI 가용여부</td>
                                                    <td>{realtimeData.hvmriayn} ({realtimeData.hvs28})</td>

                                                    <td>혈관촬영기 가용여부</td>
                                                    <td>{realtimeData.hvangioayn} ({realtimeData.hvs29})</td>
                                                    
                                                    <td>인공호흡기 가용여부</td>
                                                    <td>{realtimeData.hvventiayn} ({realtimeData.hvs30})</td>
                                                </tr>

                                                <tr>
                                                    <td>인공호흡기(조산아) 가용여부</td>
                                                    <td>{realtimeData.hvventisoayn} ({realtimeData.hvs31})</td>

                                                    <td>인큐베이터 가용여부</td>
                                                    <td>{realtimeData.hvincuayn} ({realtimeData.hvs32})</td>
                                                    
                                                    <td>CRRT 가용여부</td>
                                                    <td>{realtimeData.hvcrrtayn} ({realtimeData.hvs33})</td>
                                                </tr>

                                                <tr>
                                                    <td>ECMO 가용여부</td>
                                                    <td>{realtimeData.hvecmoayn} ({realtimeData.hvs34})</td>

                                                    <td>고압산소치료기 가용여부</td>
                                                    <td>{realtimeData.hvoxyayn} ({realtimeData.hvs37})</td>
                                                    
                                                    <td>중심체온조절유도기 가용여부</td>
                                                    <td>{realtimeData.hvhypoayn} ({realtimeData.hvs35})</td>
                                                </tr>

                                                <tr>
                                                    <td>구급차 가용여부</td>
                                                    <td>{realtimeData.hvamyn}</td>

                                                    <td>응급당직의 직통연락처</td>
                                                    <td>{realtimeData.hv1}</td>
                                                    
                                                    <td>내과 중환자실</td>
                                                    <td>{realtimeData.hv2} / {realtimeData.hvs06}</td>
                                                </tr>

                                                <tr>
                                                    <td>외과 중환자실</td>
                                                    <td>{realtimeData.hv3} / {realtimeData.hvs07}</td>

                                                    <td>정형외과 입원실</td>
                                                    <td>{realtimeData.hv4}</td>
                                                    
                                                    <td>신경과 입원실</td>
                                                    <td>{realtimeData.hv5}</td>
                                                </tr>

                                                <tr>
                                                    <td>신경외과 중환자</td>
                                                    <td>{realtimeData.hv6} / {realtimeData.hvs12}</td>

                                                    <td>약물중환자</td>
                                                    <td>{realtimeData.hv7}</td>
                                                    
                                                    <td>화상중환자</td>
                                                    <td>{realtimeData.hv8} / {realtimeData.hvs13}</td>
                                                </tr>

                                                <tr>
                                                    <td>외상중환자</td>
                                                    <td>{realtimeData.hv9} / {realtimeData.hvs14}</td>

                                                    <td>VENTI(소아)</td>
                                                    <td>{realtimeData.hv10}</td>
                                                    
                                                    <td>인큐베이터</td>
                                                    <td>{realtimeData.hv11}</td>
                                                </tr>

                                                <tr>
                                                    <td>소아당직의 직통연락처</td>
                                                    <td>{realtimeData.hv12}</td>

                                                    <td>격리진료구역 음압격리병상 </td>
                                                    <td>{realtimeData.hv13} / {realtimeData.hvs46}</td>
                                                    
                                                    <td>격리진료구역 일반격리병상</td>
                                                    <td>{realtimeData.hv14} / {realtimeData.hvs47}</td>
                                                </tr>

                                                <tr>
                                                    <td>소아음압격리</td>
                                                    <td>{realtimeData.hv15} / {realtimeData.hvs48}</td>

                                                    <td>소아일반격리</td>
                                                    <td>{realtimeData.hv16} / {realtimeData.hvs49}</td>
                                                    
                                                    <td>[응급전용] 중환자실 음압격리</td>
                                                    <td>{realtimeData.hv17} / {realtimeData.hvs50}</td>
                                                </tr>

                                                <tr>
                                                    <td>[응급전용] 중환자실 일반격리</td>
                                                    <td>{realtimeData.hv18} / {realtimeData.hvs51}</td>

                                                    <td>[응급전용] 입원실 음압격리</td>
                                                    <td>{realtimeData.hv19} / {realtimeData.hvs52}</td>
                                                    
                                                    <td>[응급전용] 입원실 일반격리</td>
                                                    <td>{realtimeData.hv21} / {realtimeData.hvs53}</td>
                                                </tr>

                                                <tr>
                                                    <td>감염병 전담병상 중환자실</td>
                                                    <td>{realtimeData.hv22} / {realtimeData.hvs54}</td>

                                                    <td>감염병 전담병상 중환자실 내 음압격리병상</td>
                                                    <td>{realtimeData.hv23} / {realtimeData.hvs55}</td>
                                                    
                                                    <td>감염 중증 병상</td>
                                                    <td>{realtimeData.hv24} / {realtimeData.hvs56}</td>
                                                </tr>

                                                <tr>
                                                    <td>감염 준,중증 병상</td>
                                                    <td>{realtimeData.hv25} / {realtimeData.hvs57}</td>

                                                    <td>감염 중등증 병상</td>
                                                    <td>{realtimeData.hv26} / {realtimeData.hvs58}</td>
                                                    
                                                    <td>코호트 격리</td>
                                                    <td>{realtimeData.hv27} / {realtimeData.hvs59}</td>
                                                </tr>

                                                <tr>
                                                    <td>소아</td>
                                                    <td>{realtimeData.hv28} / {realtimeData.hvs02}</td>

                                                    <td>응급실 음압 격리 병상</td>
                                                    <td>{realtimeData.hv29} / {realtimeData.hvs03}</td>
                                                    
                                                    <td>응급실 일반 격리 병상</td>
                                                    <td>{realtimeData.hv30} / {realtimeData.hvs04}</td>
                                                </tr>

                                                <tr>
                                                    <td>[응급전용] 중환자실</td>
                                                    <td>{realtimeData.hv31} / {realtimeData.hvs05}</td>

                                                    <td>소아 중환자실</td>
                                                    <td>{realtimeData.hv32} / {realtimeData.hvs09}</td>
                                                    
                                                    <td>[응급전용] 소아중환자실</td>
                                                    <td>{realtimeData.hv33} / {realtimeData.hvs10}</td>
                                                </tr>

                                                <tr>
                                                    <td>심장내과 중환자실</td>
                                                    <td>{realtimeData.hv34} / {realtimeData.hvs15}</td>

                                                    <td>음압격리 중환자실</td>
                                                    <td>{realtimeData.hv35} / {realtimeData.hvs18}</td>
                                                    
                                                    <td>[응급전용] 입원실</td>
                                                    <td>{realtimeData.hv36} / {realtimeData.hvs19}</td>
                                                </tr>

                                                <tr>
                                                    <td>[응급전용] 소아입원실</td>
                                                    <td>{realtimeData.hv37} / {realtimeData.hvs20}</td>

                                                    <td>외상전용 입원실</td>
                                                    <td>{realtimeData.hv38} / {realtimeData.hvs21}</td>
                                                    
                                                    <td>외상전용 수술실</td>
                                                    <td>{realtimeData.hv39} / {realtimeData.hvs23}</td>
                                                </tr>

                                                <tr>
                                                    <td>정신과 폐쇄병동 입원실</td>
                                                    <td>{realtimeData.hv40} / {realtimeData.hvs24}</td>

                                                    <td>음압격리 입원실</td>
                                                    <td>{realtimeData.hv41} / {realtimeData.hvs25}</td>
                                                    
                                                    <td>분만실</td>
                                                    <td>{realtimeData.hv42} / {realtimeData.hvs26}</td>
                                                </tr>

                                                <tr>
                                                    <td>화상전용처치실</td>
                                                    <td>{realtimeData.hv43} ({realtimeData.hvs36})</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>실시간 병상 정보를 제공하지 않는 병원입니다.</p>
                                    )}
                                </div>
                            )}

                        </div>
                        <div className='item-link'>
                            <button onClick={() => onViewChange('map', hospital.wgs_84_lat, hospital.wgs_84_lon)}>지도에서 보기</button>
                            <button className='detail-button' onClick={() => toggleDetailExpansion(hospital)}>
                                {expandedDetail === hospital ? '상세정보 닫기' : '상세정보 보기'}
                            </button>
                            <button className='realtime-button' onClick={() => toggleRealTimeExpansion(hospital)}>
                                {expandedRealTime === hospital ? '실시간 정보 닫기' : '실시간 정보 보기'}
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

