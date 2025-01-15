import React from 'react'

function TableFilters() {
  return (
    <div className='table-filters'>
        <div className='table-filters-container'>
            <div className="stable-filters-container">
            <input type='checkbox' id='stableCoin' defaultChecked={true }/>
            <label htmlFor='stableCoin'>avec stable coin</label>
            </div>
        <div className="no-list-btn">
            <p>aucune liste </p>
        </div>
          <div className="fav-list">
            <p>Liste des favoris</p>
            <img src="./assets/star-full.svg" alt="icon star" />
          </div>    
        </div>
    </div>
  );
};

export default TableFilters