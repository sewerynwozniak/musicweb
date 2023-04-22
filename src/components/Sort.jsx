import React, {useState} from 'react'
import arrowIcon from '../../src/assets/arrow.png'

const Sort = ({sortFuncProp}) => {

    const currentSort = useState('Sort by date')
    const [isOpen, setIsOpen] = useState(false)
    const sortList = [
        {
            id:1,
            title:'Sort by title',
            sort:'title'

        },
        {
            id:2,
            title:'Sort by artist',
            sort:'artist'

        },
        {
            id:3,
            title:'Sort by rate',
            sort:'rating'

        },
    ]


    const manageSortFunc = (e)=>{
        sortFuncProp(e.target.dataset.sort)
        setIsOpen(false)
    }


    const sortListDisplay = sortList.map(el=>(
        <li 
            data-sort={el.sort}
            key={el.id}
            onClick={manageSortFunc}
        >
            {el.title}
        </li>
    ))


    const openDropDown = ()=>{
        setIsOpen(!isOpen)
    }


  return (
    <div className='sort__wrapper'>
        <div 
            className='sort__current'
            onClick={openDropDown}
        >
            <span>{currentSort}</span>
            <img className={isOpen?'sort__arrowUp':''} src={arrowIcon} alt="" />
        </div>

        <ul className={`sort__dropdown ${!isOpen?'sort__close':''}`}>
            {sortListDisplay}
        </ul>
    </div>
  )
}

export default Sort