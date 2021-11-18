import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

const TodoHeadBlock = styled.div`
    padding-top: 40px; 
    padding-left: 32px;
    padding-right: 32px; 
    padding-bottom: 24px; 
    border-bottom: 1px solid #e9ecef;

    h1 {
        margin: 0;
        font-size: 30px; 
        color: #343a40;
        font-weight: 700;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 16px; 
        font-weight: 700;
    }
    .tesks-left {
        color: #20c997;
        font-size: 16px; 
        margin-top: 30px; 
        font-weight: 700;
    }
`;

function TodoHead() {
    // 배열 가지고오기
    const todos = useTodoState();
    // todos배열 안에있는 todos 항목들중에서 done이 false인 것들을 가져옴
    const undoneTesks = todos.filter(todo => !todo.done);

    // 날짜 구현
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {//한국어 포맷을 쓸꺼야
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // 요일 구현 
    const dayName = today.toLocaleDateString('ko-KR', {
        weekday: 'long'
    });

    return (
        <TodoHeadBlock>
            <h1>
                {/* 2021년 11월 18일 */}
                {dateString}
            </h1>
            <div className="day">
                {/* 목요일 */}
                {dayName}
            </div>
            <div className="tesks-left">할 일 {undoneTesks.length}개 남음</div>
        </TodoHeadBlock>
    )
}

export default TodoHead;
