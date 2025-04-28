import { useCallback } from 'react';

interface Props {
    isNavOpen   : boolean;
    setIsNavOpen: (newIsNavOpen: boolean) => void;
}

export const AppHeader = (props: Props): JSX.Element => {
    const { isNavOpen, setIsNavOpen } = props;

    const handleExport = useCallback(async () => {
        console.log('export');
    }, []);

    const handleToggleNav = useCallback(() => {
        setIsNavOpen(!isNavOpen);
    }, [isNavOpen, setIsNavOpen]);

    return (
        <div className="app-header">
            <div className="header-nav">
                <button
                    className="toggle-nav-button button"
                    onClick={handleToggleNav}
                >
                    {isNavOpen ? 'Close Nav' : 'Open Nav'}
                </button>
            </div>

            <div className="header-title">
                <h1 className="app-title">Servitor - Army Editor</h1>
            </div>

            <div className="header-toolbar">
                <button
                    className="toggle-nav-button button"
                    onClick={handleExport}
                >
                    Export
                </button>
            </div>
        </div>
    );
};
