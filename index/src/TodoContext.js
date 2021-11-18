import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true,
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false,
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false,
    }
];

// 추후 useReducer에서 사용할 함수, state, action을 가져와서 다음 상태를 return 해주는 함수
/*
    상태 업데이트 = 
    CREATE : 새로운 항목 추가
    TOGGLE : on/off
    REMOVE : 지우기
*/
function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            //업데이트 하는 법
            return state.map(
                // 모든 todo 변환, 만약 todo.id action.id으로 받아온 id랑 ? 같다면 해당 todo를 업데이트 해줌, done값을 기존 값에다가 반전 시킴
                // todo.id !== action.id 유지시킴
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE': 
            // todo항목들에 대하, todo.id !== action.id 일치하지 않는것만 가져와서 삭제한다
            return state.filter(todo => todo.id !== action.id)
        default : 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// state, dispatch를 위한 두개의 컨텍스트 만들기
// React.createContext(); or 상단에서 불러오기
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
// next.id 값을 관리하기 위해 useRef 불러오기
const TodoNextIdContext = createContext();

// TodoStateContext.Provider

// 컴포넌트 만들기(최적화 위해 따로따로 만듬)
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// const state = useContext(TodoStateContext);
// 커스텀 훅 만들기
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    // return useContext(TodoDispatchContext);
    const context = useContext(TodoDispatchContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

// TodoNextIdContext를 위한 커스텀 훅 만들기
// todo create에서 next.id를 참조하고 싶을 때
export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

// 추가적으로 하면 좋은 작업 : 컨텍스트가 없을 때 에러처리 