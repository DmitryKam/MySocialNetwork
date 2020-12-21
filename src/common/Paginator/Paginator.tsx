import React, {useState} from 'react';
import s from './Paginator.module.css';
import cn from "classnames"

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p:number)=>void
    portionSize?:number
}


const Paginator:React.FC<PaginatorPropsType> = ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize = 20},)=> {

    let pagesCount =Math.ceil(totalItemsCount/pageSize);
    let pages = [];

    for (let i=1; i<= pagesCount;i++){
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber,setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber-1)*portionSize+1;
    let rightPortionPageNumber = portionNumber*portionSize;


    return<div className={s.paginator}>
            {portionNumber>1 &&
            <button onClick={()=>{setPortionNumber(portionNumber-1)}}> PREW</button>}

            {pages
                .filter(p=>p>=leftPortionPageNumber&& p<=rightPortionPageNumber)
                .map((p=>{
                    return(
                        <span
                            className={cn({
                                [s.selectedPage]:currentPage ===p
                            },  s.pageNumber) }
                            key={p}
                            onClick={(e)=>onPageChanged(p)}

                        >{p}
                    </span>
                    )}))
        }




                {portionNumber>portionNumber &&
                <button onClick={()=>{setPortionNumber(portionNumber+1)}}> NEXT</button>}


            {pages.map(p=>{
                return(
                    <span key={p}
                          onClick={(e)=>onPageChanged(p)}
                          className={currentPage === p ? s.selectedPage : ''}
                    >{p}
                    </span>
                )})}
        </div>
}

export default Paginator;