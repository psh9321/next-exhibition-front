import Link from 'next/link';

import emptyPageStyles from "@/styles/emptyPage.module.css"

const EmptyDataPage = () => {

    

    return (
        <div className={emptyPageStyles.emptyWrapper}>
            <dl>
                <dt>
                    {/* <Ban/> */}
                    존재 하지 않는 페이지입니다.
                </dt>
                <dd>
                    주소가 잘못 입력 되었거나, <br/>
                    페이지의 주소 변경,<br/> 
                    혹은 삭제 되어 <br/>
                    요청하신 페이지를 찾을 수 없습니다.
                </dd>
                <dd>
                    <Link href={"/"}>메인페이지로 가기</Link>
                </dd>
            </dl>
        </div>
    )
}

export default EmptyDataPage