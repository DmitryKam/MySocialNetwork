import React from 'react';
import { create } from "react-test-renderer";
import ProfileStatus from './ProfileStatus';


describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" getStatus={()=>{}} updateStatus={(text)=>{}}/>);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("it-kamasutra.com");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" getStatus={()=>{}} updateStatus={(text)=>{}}/>);
        const root = component.root
        let span = root.findByType('span')
        // @ts-ignore
        expect(span).not.toBeNull();
    });
    test("after creation <input> should be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" getStatus={()=>{}} updateStatus={(text)=>{}}/>);
        const root = component.root
        expect(()=>{
            let input = root.findByType('input');
        }).toThrow()
    });


    test("after creation <span> should be displayed correct ststus", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" getStatus={()=>{}} updateStatus={(text)=>{}}/>);
        const root = component.root
        let span = root.findByType('span')
        // @ts-ignore
        expect(span.children[0]).toBe("it-kamasutra.com");
    });

    test("input should be displayed in EditMode instat od span", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" getStatus={()=>{}} updateStatus={(text)=>{}}/>);
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe("it-kamasutra.com");
    });

    test("callback should be called", () => {

        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="it-kamasutra.com" getStatus={()=>{}} updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });


});