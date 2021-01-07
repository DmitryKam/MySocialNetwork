import React, {useState} from 'react';
import cn from 'classnames'

import s from './Paginator.module.css';


type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    portionSize?: number
}


const Paginator: React.FC<PaginatorPropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 20},) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages:Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}> PREW</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                        return (<span className={cn({
                                [s.selectedPage]: currentPage === p
                            }, s.pageNumber)}
                                      key={p}
                                      onClick={(e) => onPageChanged(p)
                                      }>{p}</span>
                        )
                    }
                )
        }

        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}> NEXT</button>}

    </div>
}

export default Paginator;