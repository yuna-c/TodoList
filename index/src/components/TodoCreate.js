import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover { 
        background: #63e6be; 
    }
    &:active { 
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 70px;
    height: 70px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 

    position: absolute; 
    left: 50%;
    bottom: 0px; 
    transform: translate(-50%, 50%);

    font-size: 60px; 
    color: #fff; 
    border-radius: 50%; 
    
    border: none; 
    outline: none; 

    transition:0.125s all ease-in;

    ${props => props.open && css`
        background: #ff6b6b;
        &:hover { 
            background: #ff8787;
        }
        &:active{
            background: #fa5252;
        }
        transform: translate(-50%, 50%) rotate(45deg);

    `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0; 
    left: 0; 
    position: absolute; 
`;

const InsertForm = styled.form`
    // onSubmit이벤트 사용할 수 있다
    background: #f8f9fa;
    padding: 32px; 
    padding-bottom: 72px;
    border-bottom-left-radius: 16px; 
    border-bottom-right-radius: 16px; 
    border-top:1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 16px;
    box-sizing: border-box; 
`;

function TodoCreate() {
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState('');
    // 삭제, 체크 상태값 관리
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    // 인풋상태 관리
    const onChange = e => setValue(e.target.value);
    // 새로고침 안되게 (상태창 날아가지 않게)
    const onSubmit = e => {
        e.preventDefault(); //브라우저에서 하는 행동 방지 할때, dispatch
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            }
        });
        setValue('');
        setOpen(false);
        nextId.current += 1;
    }


    // const nextId = useTodoNextId();
    // // 변화를 주고 싶을 때
    // nextId.current += 1;


    return (
        <>
            {open && 
                (<InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input 
                            placeholder="할 일을 입력 후, Enter 를 누르세요." 
                            autoFocus
                            onChange={onChange}
                            value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    )
}

export default React.memo(TodoCreate);
// 성능 최적화
