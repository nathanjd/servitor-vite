import { Army } from '../lib/parse-army-text';

export const defaultArmy: Army = {
    id  : 'default-army-id',
    name: 'Example Chaos Space Marines',
    text: [
        '# Example Chaos Space Marines',
        '## Character',
        'Chaos Lord (Warlord) (Undivided) - 95',
        'Dark Commune (Undivided) - 65',
        '## Battleline',
        '10 Cultist Mob (Nurgle): flamer, grenade launcher, heavy stubber, 7 firearms - 55',
        '5 Legionaries (Slaanesh): (icon, heavy melee, plasma pistol), heavy melee, 3 chainswords - 90',
        '## Transports',
        'Chaos Rhino (Nurgle): havoc launcher, combi-weapon, combi-bolter - 75',
        '## Other',
        '16 Accursed Cultists (Undivided) - 210',
        '5 Chosen (Undivided): (plasma pistol, power fist, icon), (plasma pistol, pair of accursed weapons), 2 combi-weapons - 130',
        'Predator Annihilator (Undivided): predator twin lascannon, 2 lascannons, havoc launcher, combi-weapon - 130',
        'Predator Destructor (Tzeench): predator autocannon, 2 heavy bolters, havoc launcher, combi-bolter - 130',
    ].join('\n'),

    // 95+65+55+90+75+210+130+130+130
    points: 980,
    units : [
        {
            name  : 'Chaos Lord (Warlord) (Undivided)',
            models: [
                { wargear: [] },
            ],
            points: 95,
            text  : 'Chaos Lord (Warlord) (Undivided) - 95',
        },
        {
            name  : '5 Dark Commune (Undivided)',
            models: [
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
            ],
            points: 65,
            text  : 'Dark Commune (Undivided) - 65',
        },
        {
            name  : '10 Cultist Mob (Nurgle)',
            models: [
                { wargear: ['flamer'] },
                { wargear: ['grenade launcher'] },
                { wargear: ['heavy stubber'] },
                { wargear: ['firearm'] },
                { wargear: ['firearm'] },
                { wargear: ['firearm'] },
                { wargear: ['firearm'] },
                { wargear: ['firearm'] },
                { wargear: ['firearm'] },
                { wargear: ['firearm'] },
            ],
            points: 55,
            text  : '10 Cultist Mob (Nurgle): flamer, grenade launcher, heavy stubber, 7 firearms - 55',
        },
        {
            name  : '5 Legionaries (Slaanesh)',
            models: [
                { wargear: ['icon', 'heavy melee', 'plasma pistol'] },
                { wargear: ['heavy melee'] },
                { wargear: ['chainsword'] },
                { wargear: ['chainsword'] },
                { wargear: ['chainsword'] },
            ],
            points: 90,
            text  : '5 Legionaries (Slaanesh): (icon, heavy melee, plasma pistol), heavy melee, 3 chainswords - 90',
        },
        {
            name  : 'Chaos Rhino (Nurgle)',
            models: [
                { wargear: ['havoc launcher', 'combi-weapon', 'combi-bolter'] },
            ],
            points: 75,
            text  : 'Chaos Rhino (Nurgle): havoc launcher, combi-weapon, combi-bolter - 75',
        },
        {
            name  : '16 Accursed Cultists (Undivided)',
            models: [
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
                { wargear: [] },
            ],
            points: 210,
            text  : '16 Accursed Cultists (Undivided) - 210',
        },
        {
            name  : '5 Chosen (Undivided)',
            models: [
                { wargear: ['plasma pistol', 'power fist', 'icon'] },
                { wargear: ['plasma pistol, pair of accursed weapons'] },
                { wargear: ['combi-weapon'] },
                { wargear: ['combi-weapon'] },
                { wargear: [] },
            ],
            points: 130,
            text  : '5 Chosen (Undivided): (plasma pistol, power fist, icon), (plasma pistol, pair of accursed weapons), 2 combi-weapons - 130',
        },
        {
            name  : 'Predator Annihilator (Undivided)',
            models: [
                {
                    wargear: [
                        'predator twin lascannon',
                        'lascannon',
                        'lascannon',
                        'havoc launcher',
                        'combi-weapon',
                    ],
                },
            ],
            points: 130,
            text  : 'Predator Annihilator (Undivided): predator twin lascannon, 2 lascannons, havoc launcher, combi-weapon - 130',
        },
        {
            name  : 'Predator Destructor (Undivided)',
            models: [
                {
                    wargear: [
                        'predator autocannon',
                        'heavy bolter',
                        'heavy bolter',
                        'havoc launcher',
                        'combi-weapon',
                    ],
                },
            ],
            points: 130,
            text  : 'Predator Destructor (Tzeench): predator autocannon, 2 heavy bolters, havoc launcher, combi-bolter - 130',
        },
    ],
};


export const oneUnit: Army = {
    id    : 'one-unit-army-id',
    name  : '',
    points: 100,
    text  : 'Unit Name - 100',
    units : [
        {
            name  : 'Unit Name',
            models: [
                { wargear: [] },
            ],
            points: 100,
            text  : 'Unit Name - 100',
        },
    ],
};

export const oneUnitWithOneWargear: Army = {
    id    : 'one-unit-with-one-wargear-army-id',
    name  : 'Unit Name',
    points: 100,
    text  : 'Unit Name: wargear name - 100',
    units : [
        {
            name  : 'Unit Name',
            models: [
                { wargear: ['wargear name'] },
            ],
            points: 100,
            text  : 'Unit Name: wargear name - 100',
        },
    ],
};

export const oneUnitWithWargear: Army = {
    id    : 'one-unit-with-wargear-army-id',
    name  : 'Unit Name',
    points: 100,
    text  : 'Unit Name: wargear 1, wargear 2 - 100',
    units : [
        {
            name  : 'Unit Name',
            models: [
                { wargear: ['wargear 1', 'wargear 2'] },
            ],
            points: 100,
            text  : 'Unit Name: wargear 1, wargear 2 - 100',
        },
    ],
};
