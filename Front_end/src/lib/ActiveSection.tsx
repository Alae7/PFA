import { useState } from 'react';
import NavAdmin from './Nav/NavAdmin';

const ActiveSection = (WrappedComponent) => {
    const HOC = (props) => {
        const [activeSection, setActiveSection] = useState('personalInformation');

        return (
            <div className="flex">
                <NavAdmin setActiveSection={setActiveSection} />
                <div className="flex-1">
                    <WrappedComponent
                        {...props}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />
                </div>
            </div>
        );
    };

    return HOC;
};

export default ActiveSection;
