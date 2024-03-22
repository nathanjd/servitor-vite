interface Props {
    name: string;
}

export const ModelCard = (props: Props): JSX.Element => {
    const {name} = props;
    return (
        <div>
            <h4>{name}</h4>
        </div>
    );
};
