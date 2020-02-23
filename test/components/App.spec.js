import React from 'react';
import {
    mount,
} from 'enzyme';
import App from '../../src/components/App';


describe('App', () => {
    let renderedComponent;

    const render = props => mount(React.createElement(App, props));

    describe('content', () => {
        it('renders a message', () => {
            const testComponent = render({
                message: 'Hello World!',
            });
            expect(testComponent.find('[data-test="tx-app__message"]').text()).toBe('Hello World!');
        });
    });
});
