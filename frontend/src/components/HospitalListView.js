import React, { useState } from 'react';
import './HospitalListView.css';

function HospitalListView({ hospitals }) {
    const itemsPerPage = 10;
    const maxVisiblePages = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentHospitals = hospitals.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(hospitals.length / itemsPerPage);
    const maxPage = Math.min(totalPages, maxVisiblePages);

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

    return (
        <div>
            <div className='search-filter-container'>
                
            </div>

            <div className='list-container'>
                {currentHospitals.map(hospital => (
                    <div key={hospital.hpid} className='list-item'>
                        <h3>{hospital.duty_name} {hospital.center_type === 0 ? "(응급)" : "(외상)"} </h3>
                        <p>{hospital.duty_addr}</p>
                        <p>대표: {hospital.duty_tel1}</p>
                        <p>응급실: {hospital.duty_tel3}</p>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <button onClick={handleFirstPage}>First</button>
                {Array.from({ length: maxPage }).map((_, index) => {
                    const pageNumber = index + 1;
                    const isFirstPage = pageNumber === 1;
                    const isLastPage = pageNumber === totalPages;
                    return (
                        <button
                            key={index}
                            className={pageNumber === currentPage ? 'active' : ''}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={isFirstPage || isLastPage}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                <button onClick={handleLastPage}>Last</button>
            </div>
        </div>
    );
}

export default HospitalListView;
