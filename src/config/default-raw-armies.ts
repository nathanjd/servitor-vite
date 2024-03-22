import { parseArmyText } from '../lib/parse-army-text.js';

export const defaultRawArmies = [
    {
        'id': 'default-raw-army-id-1',
        'text': 'New Army\nWarlord - 100\n',
    },
    {
        'id': 'default-raw-army-id-2',
        'text': 'Minimum Chaos Marines\n# Primary Combined Arms Chaos Marines\n## HQ\nSorcerer (Warlord) - 60\n\n## Troop\n10 Cultists - 50\n10 Cultists - 50\n',
    },
    {
        'id': 'default-raw-army-id-3',
        'text': 'Example Chaos Marines\n# Primary Combined Arms Chaos Marines\n## HQ\nSorcerer (Warlord): level 2, spell familiar, sigil, force sword, bolt pistol, melta bombs - 150\n\n## Troop\n5 Marines: melta gun, combi-melta, +ccws, melta bombs - 108\nRhino: dozer blade, dirge caster - 45\n\n10 Cultists - 50\n\n## Elite\n3 Terminators: combi-meltas, power axes, chainfist - 129\n\n## Fast\n5 Bikes: 2 melta guns, melta bombs - 135\n\n## Heavy\n5 Havocs: 2 plasma guns - 105\nRhino: dozer blade, havoc launcher - 52\n\n5 Havocs: 4 autocannons - 115\n\nPredator: autocannon, heavy bolters, havoc launcher - 107\n',
    },
];

export const parseDefaultRawArmies = () => {
    return defaultRawArmies
        .map(rawArmy => parseArmyText(rawArmy.text, rawArmy.id));
};
