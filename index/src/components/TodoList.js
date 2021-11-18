import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px; 
    padding-bottom: 48px; 
    overflow-y: auto; 
    // background: #ddd;
`;

function TodoList() {
    // const state = useTodoState();
    // console.log(state);
    const todos = useTodoState();
    return (
        <TodoListBlock>
            {/* <TodoItem text="프로젝트 생성하기" done={true} />
            <TodoItem text="컴포넌트 스타일링 하기" done={true} />
            <TodoItem text="Context 만들기" done={false} />
            <TodoItem text="기능 구현하기" done={false} /> */}
            {todos.map( //각 todo item에 대해서 변환(key 필수)
                todo => <TodoItem 
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />
            )}
        </TodoListBlock>
    )
}

export default TodoList;
