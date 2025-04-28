import { WeaponProfile } from '../lib/stats/mean-weapon-roll';

export const laspistol: WeaponProfile = {
    name            : 'Laspistol',
    range           : 12,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 3,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['pistol'],
};

export const lasgun: WeaponProfile = {
    name            : 'Lasgun',
    range           : 24,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 3,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['rapid fire 1'],
};

export const boltPistol: WeaponProfile = {
    name            : 'Bolt pistol',
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['pistol'],
};

export const boltgun: WeaponProfile = {
    name            : 'Boltgun',
    range           : 24,
    attacks         : '2',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : [],
};

export const combiBolter: WeaponProfile = {
    name            : 'Combi-bolter',
    range           : 24,
    attacks         : '2',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['rapid fire 2'],
};

export const combiWeapon: WeaponProfile = {
    name            : 'Combi-weapon',
    range           : 24,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : [
        'anti-infantry 4+',
        'devastating wounds',
        'rapid fire 1',
    ],
};

export const flamer: WeaponProfile = {
    name            : 'Flamer',
    range           : 12,
    attacks         : 'd6',
    hitSkill        : -Infinity,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['ignores cover', 'torrent'],
};

export const plasmaPistol: WeaponProfile = {
    name            : 'Plasma pistol - standard',
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['pistol'],
};

export const plasmaPistolSupercharge: WeaponProfile = {
    name            : 'Plasma pistol - supercharge',
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['devastating wounds', 'hazardous', 'pistol'],
};

export const plasmaGun: WeaponProfile = {
    name            : 'Plasma gun - standard',
    range           : 24,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['rapid fire 1'],
};

export const plasmaGunSupercharge: WeaponProfile = {
    name            : 'Plasma gun - supercharge',
    range           : 24,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['devastating wounds', 'hazardous', 'rapid fire 1'],
};

export const heavyBolter: WeaponProfile = {
    name            : 'Heavy bolter',
    range           : 36,
    attacks         : '3',
    hitSkill        : 4,
    strength        : 5,
    armorPenetration: 1,
    damage          : '2',
    keywords        : ['heavy', 'sustained hits 1'],
};

export const autocannon: WeaponProfile = {
    name            : 'Autocannon',
    range           : 48,
    attacks         : '2',
    hitSkill        : 4,
    strength        : 9,
    armorPenetration: 1,
    damage          : '3',
    keywords        : ['heavy'],
};

export const lascannon: WeaponProfile = {
    name            : 'Lascannon',
    range           : 48,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 12,
    armorPenetration: 3,
    damage          : 'd6+1',
    keywords        : ['heavy'],
};
