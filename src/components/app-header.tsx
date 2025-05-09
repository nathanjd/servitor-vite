import { useCallback } from 'react';

import { Export, FilePlus, Sidebar, Trash } from '@phosphor-icons/react';

interface Props {
    activeId    : string;
    isNavOpen   : boolean;
    onCreateArmy: () => void;
    onDeleteArmy: (id: string) => void;
    onExport    : () => void;
    setIsNavOpen: (newIsNavOpen: boolean) => void;
}

export const AppHeader = (props: Props): JSX.Element => {
    const {
        activeId,
        isNavOpen,
        onCreateArmy,
        onDeleteArmy,
        onExport,
        setIsNavOpen,
    } = props;

    const handleDeleteArmy = useCallback(() => {
        const shouldDelete = confirm(`Delete army? ${activeId}`);
        if (shouldDelete) {
            onDeleteArmy(activeId);
        }
    }, [activeId, onDeleteArmy]);

    const handleExport = useCallback(async () => {
        onExport();
    }, [onExport]);

    const handleToggleNav = useCallback(() => {
        setIsNavOpen(!isNavOpen);
    }, [isNavOpen, setIsNavOpen]);

    return (
        <div className="app-header">
            <div className="header-nav">
                <button
                    aria-label={isNavOpen ? 'Close Nav' : 'Open Nav'}
                    className="toggle-nav-button button icon-button"
                    onClick={handleToggleNav}
                >
                    <Sidebar />
                </button>
                <div className="button-spacer" />
                <button
                    aria-label="Create New Army"
                    className="create-new-armies-button button icon-button"
                    onClick={onCreateArmy}
                >
                    <FilePlus />
                </button>
                <div className="button-spacer" />
                <button
                    aria-label="Delete current army"
                    className="delete-army-button butto icon-button"
                    onClick={handleDeleteArmy}
                >
                    <Trash />
                </button>
            </div>

            <div className="header-title">
                <h1 className="app-title">Servitor - Army Editor</h1>
            </div>

            <div className="header-toolbar">
                <button
                    aria-label="Export all armies"
                    className="toggle-nav-button button icon-button"
                    onClick={handleExport}
                >
                    <Export />
                </button>
            </div>
        </div>
    );
};
