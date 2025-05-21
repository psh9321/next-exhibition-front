import paginationStyles from "@/styles/(home)/pagination.module.css"

interface PAGINATION_INTERFACE {
    idx : number,
    list : number[][],
    page : number,
    total : number,
    moveToPage : (e : React.MouseEvent<HTMLButtonElement>) => void,
    nextChapter : () => void,
    prevChapter : () => void,
    firstPage : () => void,
    lastPage : () => void,
}

const Pagination = ({
    idx,
    list,
    page,
    // moveToPage,
    // total,
    // nextChapter,
    // lastPage,
    // prevChapter,
    // firstPage,
    // viewLength
} : PAGINATION_INTERFACE) => {
    return (
        <div className={paginationStyles.pagination}>
            {/* <button className="btnPrevev" onClick={firstPage}>
                <img src={btnPrevev} alt="" />
            </button>
            <button className="btnPrev" onClick={prevChapter}>
                <img src={btnPrev} alt="" />
            </button> */}

            <ol className={paginationStyles.list}>
                {list[idx]
                    ? list[idx].map((el, i) => {
                          return (
                              <li key={i}>
                                  <button
                                      className={`${page === el && paginationStyles.on }`}
                                      value={el}
                                    //   onClick={moveToPage}
                                  >
                                      {el + 1}
                                  </button>
                              </li>
                          );
                      })
                    : null}
            </ol>
            {/* {page === total ? null : (
                <>
                    <button onClick={nextChapter}>
                        <img src={btnNext} alt="" />
                    </button>
                    <button onClick={lastPage}>
                    <img src={btnNextet} alt="" />
                    </button>
                </>
            )} */}
                <>
                    {/* <button className="btnNext" onClick={nextChapter}>
                        <img src={btnNext} alt="" />
                    </button>
                    <button className="btnNextet" onClick={lastPage}>
                    <img src={btnNextet} alt="" />
                    </button> */}
                </>
        </div>
    )
}

export default Pagination