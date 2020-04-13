import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import categoryAPI from '../api/categoryAPI';

const ChooseCategory = () => {
    const category = ['총류', '철학', '종교', '사회과학', '자연과학', '기술과학', '예술', '언어', '문학', '역사'];
    const choosenCategory = [];
    const history = useHistory();
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();

    const onSubmit = useCallback(async () => {
        const userName = query.get('user');

        if (choosenCategory.length) {
            const choosen = await categoryAPI(choosenCategory, userName);

            alert(`${choosen}이(가) 제출되었습니다. 반영된 독후감 피드를 확인해보세요!`);
            history.push('/');
        } else {
            alert('한가지 이상 선택해주세요.')
        }
    }, []);

    const onChange = useCallback((e) => {
        if (e.target.checked) {
            choosenCategory.push(e.target.value);
        } else {
            choosenCategory.pop(e.target.value);
        }
    }, []);

    return (
        <>
            {
                category.map((el, index) => {
                    return (
                        <div key={index}>
                            <input
                                type='checkbox'
                                value={el}
                                onChange={onChange}
                            />
                            <label>{el}</label>
                        </div>
                    )
                })
            }
            <button onClick={onSubmit}>Submit</button>
        </>
    );
}

export default ChooseCategory
