import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { areas } from './cities';
import { SearchContext } from '../../../../../contexts/SearchContext';
import './Area.scss';

const Area = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedSubArea, setSelectedSubArea] =
    useState('');
  const [subAreas, setSubAreas] = useState([]);
  const [facilitySearch, setFacilitySearch] = useState('');
  const [isAvailableOnly, setIsAvailableOnly] =
    useState(true);

  const { setSearchConditions } = useContext(SearchContext);

  // selectedArea(시/도)가 변경될 때 해당 지역의 subArea(시/군/구) 업데이트
  useEffect(() => {
    const foundArea = areas.find(
      (area) => area.name === selectedArea,
    );
    if (foundArea) {
      setSubAreas(foundArea.subArea);
    } else {
      setSubAreas([]);
    }
  }, [selectedArea]);

  // 시/도 변경 시 선택된 시/도 업데이트, 시/군/구 초기화
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedSubArea('');
  };

  // 시/군/구 변경 시 선택된 시/군/구 업데이트
  const handleSubAreaChange = (e) => {
    setSelectedSubArea(e.target.value);
  };

  // 키워드 검색 기능
  const handleFacilitySearchChange = (e) => {
    setFacilitySearch(e.target.value);
  };

  // 이용가능 체크박스
  const handleAvailabilityChange = (e) => {
    setIsAvailableOnly(e.target.checked);
  };

  // 검색 버튼
  const handleSearch = () => {
    setSearchConditions({
      selectedArea,
      selectedSubArea,
      facilitySearch,
      isAvailableOnly,
      isSearchClicked: true,
    });
  };

  // 초기화 버튼
  const resetArea = () => {
    setSelectedArea('');
    setSelectedSubArea('');
    setFacilitySearch('');
    setIsAvailableOnly(true);
    setSearchConditions({
      selectedArea: '',
      selectedSubArea: '',
      facilitySearch: '',
      isAvailableOnly: true,
      isSearchClicked: false,
    });
  };

  // input 태그 Enter키, ESC키 작동함수
  const KeyboardSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setFacilitySearch('');
    }
  };

  return (
    <div className='area-selector'>
      <div className='search-box'>
        <select
          className='select-box'
          value={selectedArea}
          onChange={handleAreaChange}
        >
          <option value=''>시/도</option>
          {areas.map((area) => (
            <option key={area.name} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          className='select-box'
          value={selectedSubArea}
          onChange={handleSubAreaChange}
        >
          <option value=''>시/군/구</option>
          {subAreas.map((subArea) => (
            <option key={subArea} value={subArea}>
              {subArea}
            </option>
          ))}
        </select>
        <label>
          <div className='checkbox-box'>
            <input
              type='checkbox'
              className='able-checkbox'
              checked={isAvailableOnly}
              onChange={handleAvailabilityChange}
            />
            <span className='checkbox-content'>
              이용가능
            </span>
          </div>
        </label>
      </div>
      <div className='search-box'>
        <input
          className='search-input'
          type='text'
          placeholder='충전소 이름 검색'
          value={facilitySearch}
          onChange={handleFacilitySearchChange}
          onKeyDown={KeyboardSearch}
        />
        <button
          className='search-btn'
          onClick={handleSearch}
        >
          검색
        </button>
        <button className='reset-btn' onClick={resetArea}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default Area;
