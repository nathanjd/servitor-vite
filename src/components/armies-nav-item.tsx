import { useCallback } from 'react';

interface Props {
    id          : string;
    isActive    : boolean;
    name        : string;
    points      : number;
    onSelectArmy: (id: string) => void;
}

export const ArmiesNavItem = (props: Props): JSX.Element => {
    const { id, isActive, name, points, onSelectArmy } = props;

    const handleSelectArmy = useCallback(() => {
        onSelectArmy(id);
    }, [id, onSelectArmy]);

    const className = `armies-nav-item ${isActive ? ' active' : ''}`;

    return (
        <li className={className} key={id}>
            <a
                className="armies-nav-item-clickable"
                onClick={handleSelectArmy}
                tabIndex={0}
            >
                <h3 className="armies-nav-item-name">
                    {name || 'Untitled Army'}
                </h3>
                <h4 className="armies-nav-item-points">{points} Points</h4>
            </a>
        </li>
    );
};
