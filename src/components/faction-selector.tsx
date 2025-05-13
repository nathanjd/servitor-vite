
interface Props {
    factions: string[];
}

export const FactionSelector = (props: Props): JSX.Element => {
    const { factions } = props;
    return (
        <select name="factions" multiple>
            {factions.map(faction =>
                <option value={faction} key={faction}>{faction}</option>,
            )}
        </select>
    );
};
