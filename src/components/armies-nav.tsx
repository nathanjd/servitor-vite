import { Army } from '../lib/parse-army-text';

import { ArmiesNavItem } from './armies-nav-item';

interface Props {
    activeId: string,
    byId: { [id: string]: Army };
    onCreateArmy: () => void;
    onResetArmies: () => void;
    onSelectArmy: (id: string) => void;
    orderedIds: string[];
}

export const ArmiesNav = (props: Props): JSX.Element => {
    const {
        activeId,
        byId,
        onCreateArmy,
        onResetArmies,
        onSelectArmy,
        orderedIds,
    } = props;

    const items = orderedIds.map((id) => (
        <ArmiesNavItem
            id={id}
            isActive={activeId === id}
            key={id}
            name={byId[id].name}
            points={byId[id].points}
            onSelectArmy={onSelectArmy}
        />
    ));

    return (
        <div className="armies-listing">
            <div className="armies-header">
                <button
                    className="create-new-armies-button button"
                    onClick={onCreateArmy}
                >
                    New Army
                </button>
            </div>

            <nav className="armies-nav">
                <ol className="armies-nav-list">{items}</ol>
            </nav>

            <div className="armies-footer">
                <button className="button" onClick={onResetArmies}>
                    Reset Armies
                </button>
            </div>
        </div>
    );
};
